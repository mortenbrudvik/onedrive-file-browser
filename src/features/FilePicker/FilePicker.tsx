import React, {useState} from 'react';
import { IFilePickerOptions } from "./types";
import { getToken } from "./auth";
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
            //sharedLibraries: true,
            //myLists: true,
            //bing: false,
        }
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

export const FilePicker = () => {

    return (
        <div>
            <Browser baseUrl="https://x2lzs.sharepoint.com/" getToken={getToken} options={paramsTest} />
        </div>
    );
};