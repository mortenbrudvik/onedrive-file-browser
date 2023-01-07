import {Container} from "@mantine/core";
import {useSites} from "./hooks/useSites";
import {DriveSelect} from "./DriveSelect";

export const FileBrowser = () => {

    const sites = useSites();
    
    return (
        <div>
        <h1>File Browser</h1>
            <Container ml={10} mt={20}>
                <DriveSelect sites={sites}/>
               
            </Container>
            
        </div>
    );
};
