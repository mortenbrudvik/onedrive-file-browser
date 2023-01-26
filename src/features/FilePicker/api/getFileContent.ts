import {Providers} from "@microsoft/mgt-element";
export const getFileContent = async (siteId: string, itemId: string): Promise<string> => {
    const content = await Providers.globalProvider.graph.api(`/sites/${siteId}/drive/items/${itemId}?select=id,@microsoft.graph.downloadUrl`).get();
    const downloadUrl = content["@microsoft.graph.downloadUrl"];
    const response = await fetch(downloadUrl);
    return await response.text();
};

// Alternative implementation:
// export const getFileContent = async (siteId: string, itemId: string, accessToken: string): Promise<string> => {
//     const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${itemId}?select=id,@microsoft.graph.downloadUrl`;
//     const response = await fetch(url, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     });
//
//     if (!response.ok) {
//         throw new Error(`Failed to get file content: ${response.statusText}`);
//     }
//
//     const json = await response.json();
//     const downloadUrl = json["@microsoft.graph.downloadUrl"];
//
//     const fileResponse = await fetch(downloadUrl);
//     if (!fileResponse.ok) {
//         throw new Error(`Failed to download file: ${fileResponse.statusText}`);
//     }
//     return await fileResponse.text();
// };