import {ComponentPropsWithoutRef, forwardRef, useState} from "react";
import {Group, Select, Text} from "@mantine/core";
import {getRootDriveFolderId} from "./api/getRootDriverFolderId";
import {Site} from "@microsoft/microsoft-graph-types";

type DriveSelectProps = {
    sites: Site[],
}

type ItemData = {
    itemId: string,
    siteId: string,
};

export const DriveSelect = ({sites}: DriveSelectProps)=> {
    const [itemData, setItemData] = useState<ItemData>({itemId: "", siteId: ""});
    
    const siteData = sites.map(site => ({
        label: site.displayName ?? "s",
        image: 'Globe',
        value: site.id ?? "",
        description: site?.displayName
    }));
    siteData.unshift({
        label: 'OneDrive',
        image: 'Globe',
        value: '',
        description: 'OneDrive'
    });
    
    return (
        <Select
            label="Select Drive"
            placeholder="Select Drive"
            defaultValue=""
            itemComponent={SelectDriveItem}
            data={siteData}
            onChange={async item => {
                console.log(item);
                if (!!item) {
                    const itemId = await getRootDriveFolderId(item);
                    console.log(itemId);
                    setItemData({
                        itemId: itemId,
                        siteId: item,
                    });
                } else {
                    setItemData({
                        itemId: "",
                        siteId: "",
                    });
                }
            }}
/>)}

const SelectDriveItem = forwardRef<HTMLDivElement, DriveItemProps>(
    ({ image, label, description, ...others }: DriveItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" opacity={0.65}>
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

interface DriveItemProps extends ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    description: string;
}