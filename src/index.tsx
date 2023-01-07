import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Providers} from "@microsoft/mgt-react";
import {Msal2Provider} from '@microsoft/mgt-msal2-provider';
import {MantineProvider} from "@mantine/core";

Providers.globalProvider = new Msal2Provider({
    clientId: '714f59f6-e68c-454b-ab67-d73b6fa73f12',
    scopes: ['user.read', 'Files.Read', 'Files.Read.All', 'Sites.Read.All']
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: "dark"}}>
        <App />
    </MantineProvider>
);

