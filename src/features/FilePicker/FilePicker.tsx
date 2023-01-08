import React, {useState} from 'react';
import { IFilePickerOptions } from "./types";
import { getToken } from "./auth";
import Browser from "./components/Browser";

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
        }
    }
};

export const FilePicker = () => {

    return (
        <div>
            <Browser baseUrl="https://x2lzs.sharepoint.com/" getToken={getToken} options={paramsTest} />
        </div>
    );
};