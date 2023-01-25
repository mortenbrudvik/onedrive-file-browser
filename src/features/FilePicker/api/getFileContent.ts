import {Providers} from "@microsoft/mgt-element";

export const getFileContent = async (siteId: string, itemId: string): Promise<string> => {
    const graphClient = Providers.globalProvider.graph;
    const content =  await graphClient.api(`/sites/${siteId}/drive/items/${itemId}?select=id,@microsoft.graph.downloadUrl`).get();
    const downloadUrl = content["@microsoft.graph.downloadUrl"];
    const response = await fetch(downloadUrl);
    return await response.text();
};