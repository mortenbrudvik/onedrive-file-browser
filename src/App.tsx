import React, {useState} from 'react';
import {FilePicker} from "./features";
import {Button, Modal, Table, Title} from "@mantine/core";

function App() {
    
    const [files, setFiles] = useState<string[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    
    return (
        <div style={{margin: '20px'}}>
            <Button onClick={() => setShowPicker(true)}>Add files</Button>
            <Table>
                <thead>
                    <tr>
                        <th>File name</th>
                    </tr>
                </thead>
                <tbody>{
                    
                }</tbody>
            </Table>
            <Modal opened={showPicker} title="Testing" onClose={() => setShowPicker(false)} size="90%">
                <FilePicker onClose={() => setShowPicker(false)} onPicked={(files) => {
                    setFiles(files)
                }}/>
                
            </Modal>
        </div>
    );
}

export default App;