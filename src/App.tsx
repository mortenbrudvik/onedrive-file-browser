import React, {useState} from 'react';
import {FilePicker} from "./features";
import {Button, Divider, Group, Modal, Table, Title} from "@mantine/core";
import {FileItem} from "./features/FilePicker/FilePicker";
import {useIsSignedIn} from "./hooks/useIsSignIn";
import {Login, MgtTemplateProps, Person, PersonViewType} from "@microsoft/mgt-react";
import {User} from "@microsoft/microsoft-graph-types";
import './App.css';

function App() {
    


    const [isSignedIn] = useIsSignedIn();
    console.log("isSignedIn: " +isSignedIn);
    
    return (
        <div style={{margin: '20px'}}>
            
            <Group position="apart">
                <Title>File Manager</Title>
                <Login className="custom-mgt-dark">
                    <UserDetails template="signed-in-button-content"/>
                </Login>
            </Group>
            
            <Divider mb={30}/>

            {isSignedIn && <FileManager/>}

        </div>
    );
}

export default App;

const FileManager = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div >
            <Button onClick={() => setShowPicker(true)}>Add files</Button>
            <Table>
                <thead>
                <tr>
                    <th>File name</th>
                    <th>Url</th>
                </tr>
                </thead>
                <tbody>{
                    files.map((file) => {
                        return (
                            <tr key={file.id}>
                                <td>{file.name}</td>
                                <td>{file.url}</td>
                            </tr>
                        );
                    })
                }</tbody>
            </Table>
            <Modal opened={showPicker} title="Testing" onClose={() => setShowPicker(false)} size="90%">
                <FilePicker onClose={() => setShowPicker(false)} onPicked={(files) => {
                    setFiles(files)
                    setShowPicker(false);
                }}/>

            </Modal>
        </div>
    );
};

const UserDetails = (props: MgtTemplateProps) => {
    const me = props.dataContext as User;

    return (<Person className="custom-mgt-dark" personQuery="me" view={PersonViewType.oneline} />)
};