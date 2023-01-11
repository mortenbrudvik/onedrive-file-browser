import React, {useState} from 'react';
import {FilePicker} from "./features";
import {Button, Modal, Table, Title} from "@mantine/core";
import {FileItem} from "./features/FilePicker/FilePicker";



function App() {
    
    const [files, setFiles] = useState<FileItem[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    
    return (
        <div style={{margin: '20px'}}>
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
}

export default App;