import React from 'react';
import {IFilePickerOptions, SPItem} from "./types";
import Browser from "./components/Browser";
import {getFileContent} from "./api/getFileContent";
import {FileItem} from "./types/FileItem";
import {Providers} from "@microsoft/mgt-element";

/*
* Schema for the options object
* https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/v8-schema?source=recommendations&view=odsp-graph-online
*/
const paramsTest: IFilePickerOptions = {
    sdk: "8.0",
    entry: {
        oneDrive: {}
    },
    authentication: {},
    messaging: {
        origin: "http://localhost:3000",
        channelId: "27"
    },
    selection: {
        mode: "multiple",
    },
    typesAndSources: {
        // filters: [".docx"],
        mode: "files",
        pivots: {
            oneDrive: true,
            recent: true,
            sharedLibraries: true,
        }
    },
    search: {
        enabled: true
    },
    tray: {
        prompt: "selection-summary",
    },            
    commands: {
        pick: {
            action: "select",
            label: "Select",
        },
        close: {
            label: "Cancel"
        },
    }
};

type FilePickerProps = {
    onClose: () => void;
    onPicked: (files: FileItem[]) => void;
};

export const FilePicker = ({onClose, onPicked}: FilePickerProps) => {
    const sharePointBaseUrl = "https://x2lzs.sharepoint.com/";

    return (
        <div>
            <Browser baseUrl={sharePointBaseUrl} options={paramsTest} onClose={onClose} onPicked={async (files) => {
                const filePromises = files.map((file) => {
                    return createFileItem(file);
                });

                console.log("Files picked");
                await Promise.all(filePromises)
                    .then((fileItems) => {
                        console.log(fileItems)
                        onPicked(fileItems);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }} />
        </div>
    );
};

const createFileItem = async (file: SPItem): Promise<FileItem> => {
    let url = file.webUrl; 
    if (hasFileExtension(file.name, "url")) {
        url = await extractUrl(file) ?? file.webUrl
    }
    const name = trimFileExtension(file.name);
    
    return {
        id: file.id,
        name: name,
        url: url
}};

const extractUrl = async (file: SPItem): Promise<string|null> => {
    const siteId = file.sharepointIds.siteId;
    const itemId = file.id;
    const content = await getFileContent(siteId, itemId);
    return parseUrl(content);
};

const parseUrl = (text: string) => {
    const pattern = /URL=(.*)/;
    const match = pattern.exec(text);
    return match ? match[1] : null;
};

const hasFileExtension = (fileName: string, extension: string): boolean => {
    const fileExtension = fileName.split('.').pop();
    return fileExtension === extension;
};

const trimFileExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.slice(0, lastDotIndex);
};




