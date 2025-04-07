import { definePage } from '@veeva/vault';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Define the expected response data returned from the PageController onLoad method
 */
interface OnPageLoadData {
    userId?: string;
}

/**
 * Register the Page and define the callback function this is executed when the page is loaded.
 */
export const helloWorld = definePage(
    ({ data = {} as OnPageLoadData, element }) => {
        // Read the user ID returned from the PageController onLoad method
        const userId = (data as OnPageLoadData).userId || '<userId>';

        const root = createRoot(element);
        root.render(<App userId={userId} />);
    },
);
