import {useEffect, useState} from "react";
import {Providers} from "@microsoft/mgt-react";
import {Site} from "@microsoft/microsoft-graph-types";

export const useSites = () => {
    const [sites, setSites] = useState<Site[]>([]);

    const fetchSites = async () => {
        const domainData = await Providers.client?.api("/sites/root?$select=siteCollection").get();
        const domain = domainData.siteCollection.hostname.split(".")[0];
        const sites: Site[] = await Providers.client?.api("/sites?search=" + domain + ".sharepoint&$Select=id,name,displayName,webUrl").get()
            .then((res) => res.value);

        console.log(sites);
        setSites(sites ?? []);
    };

    useEffect(() => {
        fetchSites();
    }, [])

    return sites;
}
