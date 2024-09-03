import vault from '@veeva/vault-web-sdk';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

export const hello = vault.definePage(({ element, data }) => {
    const { userId = '<userId>' } = data;

    const root = createRoot(element);
    root.render(
        <App userId={userId} />
    )
});
