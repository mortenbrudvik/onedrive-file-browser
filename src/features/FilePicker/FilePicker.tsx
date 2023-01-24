import React from 'react';
import { IFilePickerOptions } from "./types";
import Browser from "./components/Browser";

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
}

export type FileItem = {
    id: string;
    name: string;
    url: string;
};

export const FilePicker = ({onClose, onPicked}: FilePickerProps) => {

    return (
        <div>
            <Browser baseUrl="https://x2lzs.sharepoint.com/" options={paramsTest} onClose={onClose} onPicked={(files) => {

                onPicked(files.map((file) => {
                    return {
                        id: file.id,
                        name: file.name,
                        url: file.webUrl
                    }
                }))}
            } />
        </div>
    );
};