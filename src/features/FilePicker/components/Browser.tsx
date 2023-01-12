import React, { useRef, useEffect } from "react";
import {IFilePickerOptions, IAuthenticateCommand, SPItem} from "../types";
import {Providers} from "@microsoft/mgt-element";

export interface BrowserProps {
    baseUrl: string;
    options: IFilePickerOptions;
    onPicked: (items: SPItem[]) => void;
    onClose: () => void;
}

export async function getToken(command: IAuthenticateCommand): Promise<string> {

    console.log(command);
    return  await Providers.globalProvider.getAccessToken({ scopes:[command.resource + "/.default"] });
}

async function messageListener(onPicked: (items: SPItem[]) => void, onClose: () => void, getToken: (message: IAuthenticateCommand) => Promise<string>, port: MessagePort, message: any) {

    switch (message.data.type) {

        case "notification":
            console.log(`notification: ${JSON.stringify(message.data)}`);
            break;

        case "command":

            port.postMessage({
                type: "acknowledge",
                id: message.data.id,
            });

            const command = message.data.data;

            switch (command.command) {

                case "authenticate":

                    const token = await getToken(command);

                    if (typeof token !== "undefined" && token !== null) {

                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "token",
                                token,
                            }
                        });

                    } else {
                        console.error(`Could not get auth token for command: ${JSON.stringify(command)}`);
                    }

                    break;
                    
                case "pick":

                    port.postMessage({
                        type: "result",
                        id: message.data.id,
                        data: {
                            result: "success",
                        },
                    });

                    console.log(`OPEN >> ${JSON.stringify(command)}`);
                    
                    const items = command.items as SPItem[];
                    onPicked(items)

                    break;
                
                case "close":
                    console.log("close");
                    port.postMessage({
                        type: "result",
                        id: message.data.id,
                        data: {
                            result: "success",
                        },
                    });
                    
                    onClose();
                    break;
                    
                default:

                    console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

                    port.postMessage({
                        result: "error",
                        error: {
                            code: "unsupportedCommand",
                            message: command.command
                        },
                        isExpected: true,
                    });
                    break;
            }

            break;

        default:
            console.log("here");
            console.log(JSON.stringify(message));
            break;
    }
}

// file browser control
function Browser(props: BrowserProps) {

    const { baseUrl, options, onPicked, onClose } = props;

    const iframeRef: React.MutableRefObject<HTMLIFrameElement | null> = useRef(null);

    useEffect(() => {

        (async () => {

            if (iframeRef && iframeRef.current !== null && iframeRef.current.contentWindow) {

                const {contentWindow} = iframeRef.current;

                const authToken = await getToken({
                    resource: baseUrl,
                    command: "authenticate",
                    type: "SharePoint",
                });

                const queryString = new URLSearchParams({
                    filePicker: JSON.stringify(options),
                });
                const url = baseUrl + `_layouts/15/FilePicker.aspx?${queryString}`;

                const form = contentWindow.document.createElement("form");
                form.setAttribute("action", url);
                form.setAttribute("method", "POST");
                contentWindow.document.body.append(form);

                const input = contentWindow.document.createElement("input");
                input.setAttribute("type", "hidden")
                input.setAttribute("name", "access_token");
                input.setAttribute("value", authToken);
                form.appendChild(input);

                form.submit();

                const messageEventHandler = (event: MessageEvent<any>) => {
                    if (event.source && event.source === contentWindow) {

                        const message = event.data;

                        if (message.type === "initialize" && message.channelId === options.messaging.channelId) {

                            const port = event.ports[0];

                            port.addEventListener("message", messageListener.bind(null, onPicked, onClose, getToken, port));

                            port.start();

                            port.postMessage({
                                type: "activate",
                            });
                        }
                    }
                };

                window.addEventListener("message", messageEventHandler);

                return () => {
                    window.removeEventListener("message", messageEventHandler);
                };
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iframeRef]);

    return (
        <iframe ref={iframeRef} title="browserFrame" id="browserFrame" width="100%" height="600" frameBorder={0} />
    );
}

export default Browser;