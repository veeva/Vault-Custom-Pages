import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import vault from '@veeva/vault-web-sdk';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

export default vault.definePage(({ element, sendEvent}) => {

    /*
        Required to use Material UI in the shadow DOM
        https://mui.com/material-ui/customization/shadow-dom/#how-to-use-the-shadow-dom-with-material-ui
     */
    const myCache = createCache({
        key: 'material-ui-emotion-cache',
        container: element
    });

    const root = createRoot(element);
    root.render(
        <CacheProvider value={myCache}>
            <App sendEvent={sendEvent} />
        </CacheProvider>
    );
})