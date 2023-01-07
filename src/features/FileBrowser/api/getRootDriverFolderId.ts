import {Providers} from "@microsoft/mgt-react";

export const getRootDriveFolderId = async (siteId: string): Promise<string> => {
    const graphData: any = await Providers.client.api("/sites/" + siteId + "/drive/root://:/?$select=id").get();
    return graphData?.id;
}