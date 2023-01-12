import { IAuthenticateCommand } from "./types";
import {Providers} from "@microsoft/mgt-element";

export async function getToken(command: IAuthenticateCommand): Promise<string> {

    console.log(command);
    return  await Providers.globalProvider.getAccessToken({ scopes:[command.resource + "/.default"] });
}
