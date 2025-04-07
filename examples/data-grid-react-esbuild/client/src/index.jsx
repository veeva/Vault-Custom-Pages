import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { definePage } from '@veeva/vault';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@veeva/vault.css';

/**
 * Register the Page and define the callback function that is executed when the page is loaded.
 */
export default definePage(({ element }) => {
    /*
     Required to use Material UI in the shadow DOM
     https://mui.com/material-ui/customization/shadow-dom/#how-to-use-the-shadow-dom-with-material-ui
  */
    const myCache = createCache({
        key: 'material-ui-emotion-cache',
        container: element,
        prepend: true,
    });

    const root = createRoot(element);
    root.render(
        <CacheProvider value={myCache}>
            <App />
        </CacheProvider>,
    );
});
