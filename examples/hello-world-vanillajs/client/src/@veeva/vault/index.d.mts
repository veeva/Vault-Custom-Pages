/* Excluded from this release type: AnyPlugin */

/**
 * Defines the Custom Page client code and registers an implementation of the `Pageclientcode` MDL component. A Vault Java SDK
 * `PageController` can pass data using the load callback parameter.
 *
 *
 * @param initialize - The load callback function with parameter type {@link PageParameters}. Provides data to the client code from
 * Vault Java SDK's `PageController`. Executed from the `PageController#onLoad` response when
 * the Custom Page is initialized.
 *
 * @example Custom Page definition using Vanilla JS
 * ```js
 * import { definePage } from '@veeva/vault';
 *
 * export default definePage(({ element, data, pageContext, sendEvent }) => {
 *     element.textContent="Hello World";
 * });
 * ```
 *
 * @example Custom Page definition using React
 * ```js
 * import { createRoot } from 'react-dom/client';
 * import { definePage } from '@veeva/vault';
 *
 * const HelloWorld = () => {
 *      return <h1>Hello World</h1>;
 * };
 *
 * export default definePage(({ element, data, pageContext, sendEvent })=>{
 *     const root = createRoot(element);
 *     root.render(<HelloWorld />);
 * });
 * ```
 */
export declare function definePage<Data>(initialize: (params: PageParameters<Data>) => unknown): unknown;

/* Excluded from this release type: DialogContext */

/* Excluded from this release type: DialogParameters */

/* Excluded from this release type: DialogPlugin */

/* Excluded from this release type: DialogSize */

/* Excluded from this release type: EventNotifier */

/* Excluded from this release type: EventNotifierListener */

/**
 * Represents the context available when a `Page` runs inside a browser from the `definePage` load callback.
 */
export declare interface PageContext {
    /**
     * Reloads the current `Page` by calling Vault Java SDK `PageController#onLoad` method.
     *
     * @example Reload a custom page
     * ```js
     * import React from 'react';
     * import { definePage } from '@veeva/vault';
     * import { createRoot } from 'react-dom/client';
     *
     * const Component = ({ pageContext }) => {
     *     return (
     *         <div>
     *             <h1>
     *                 Simple page with reload button
     *             </h1>
     *             <button onClick={() => pageContext.reload()}>Click to reload the page</button>
     *         </div>
     *     );
     * }
     *
     * export default definePage(({ element, pageContext }) => {
     *     createRoot(element).render(<Component pageContext={pageContext} />);
     * });
     * ```
     */
    reload: () => void;
}

/**
 * Represents the parameters used when the `definePage` load callback runs.
 *
 * @example Defining a custom page with page parameters
 * ```js
 * import React from 'react';
 * import { createRoot } from 'react-dom/client';
 * import { definePage } from '@veeva/vault';
 *
 * export default definePage(({ data, element, pageContext: { reload }, sendEvent }) => {
 *      const root = createRoot(element);
 *
 *      const onFetchDetailsClick = async () => {
 *         const details = await sendEvent('fetchDetails', { userName: data.userName });
 *         console.log(details);
 *     };
 *
 *     root.render(
 *         <div>
 *             <h1>Hello {data.userName}</h1>
 *             <button onClick={onFetchDetailsClick}>Click to fetch details by dispatching an event</button>
 *             <button onClick={() => reload()}>Click to reload the page</button>
 *         </div>
 *     );
 * });
 * ```
 */
export declare interface PageParameters<Data> {
    /**
     * Data passed in the `PageLoadResponse` from Vault Java SDK `PageController` code.
     */
    data: Data;
    /**
     * Root HTML element to append to when writing client code.
     */
    element: HTMLElement;
    /**
     * Page context providing the `reload()` function.
     */
    pageContext: PageContext;
    /* Excluded from this release type: onDestroy */
    /**
     * Function to send an event to Vault Java SDK's `PageController#onEvent` method for handling.
     */
    sendEvent: SendEvent;
}

/* Excluded from this release type: PagePlugin */

/* Excluded from this release type: Runtime */

/**
 * Sends events to Vault Java SDK's `PageController#onEvent` method for handling.
 *
 * @param eventName - The name of the event
 * @param data - A `JsonObject` containing data to send to the server event handler
 *
 * @returns Data deserialized from the `JsonObject` returned in Vault Java SDK's `PageController#onEvent` method response
 *
 * @example Send an event to Vault Java SDK's `PageController#onEvent` method and handle the response
 * ```js
 * try {
 *      const response = await sendEvent('myEvent', {
 *          myNumValue: 1,
 *          myStringValue: 'hello',
 *      });
 *
 *      if (response?.data) {
 *          console.log('onEvent returned data');
 *      } else {
 *          console.log('onEvent returned without data');
 *      }
 * } catch (e) {
 *      console.log('sendEvent error:', e);
 * }
 * ```
 */
export declare type SendEvent = (eventName: string, data?: unknown) => Promise<{
    data?: unknown;
}>;

/**
 * Provides functions to use Vault API from client code.
 **/
export declare interface VaultApiClient {
    /**
     * Makes authorized requests to Vault API and prepends the `/api` prefix to the path.
     * This is a wrapped version of JavaScript's `fetch` function.
     *
     * @see {@link https://developer.veevavault.com/api/}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch}
     *
     * @remarks
     *
     * Only accepts strings as input, not URL or Request objects.
     *
     * Naively prepends `/api` to the provided URL. For example, calling this with "http://example.com"
     * would make a request to "/api/http://example.com".
     *
     * @param input - A URL string to make a request to
     * @param init - A {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request | RequestInit} object
     * containing any custom settings that you want to apply to the request
     * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promise}
     * which is fulfilled with a {@link https://developer.mozilla.org/en-US/docs/Web/API/Response | Response} object
     * representing the server's response
     *
     * @example Make a request to the Vault API
     * ```js
     * import { vaultApiClient } from '@veeva/vault'
     *
     * const response = await vaultApiClient.fetch(
     *       '/v25.1/objects/documents/301',
     *       {
     *         headers: {
     *           Accept: 'application/json',
     *         },
     *       }
     *     );
     * const json = response.json();
     * ```
     */
    fetch: (input: string, init?: RequestInit) => Promise<Response>;
}

/**
 * The exported instance of {@link VaultApiClient}
 */
export declare const vaultApiClient: VaultApiClient;

export { }
