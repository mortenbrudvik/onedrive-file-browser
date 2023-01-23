import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MantineProvider} from "@mantine/core";
import {Msal2Provider} from "@microsoft/mgt-msal2-provider";
import {Providers} from "@microsoft/mgt-element";

Providers.globalProvider = new Msal2Provider({
    clientId: 'a069c895-ca3c-4555-966e-5d5a705d667b',
    authority: "https://login.microsoftonline.com/67722499-5640-479f-ba3d-81eda8de611e",
    redirectUri: 'http://localhost:3000',
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: "light"}}>
        <App />
    </MantineProvider>
);

