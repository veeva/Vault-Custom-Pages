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
 *
 * export default Vault.definePage(({element, data, pageContext, sendEvent})=>{
 *     element.textContent="Hello World";
 * });
 * ```
 *
 * @example Custom Page definition using React
 * ```js
 *
 * import { createRoot } from 'react-dom/client';
 * import HelloWorld from './helloWorld';
 *
 *
 * export default Vault.definePage(({element, data, pageContext, sendEvent})=>{
 *     const root = createRoot(element);
 *     root.render(<HelloWorld />);
 * })
 *
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
     */
    reload: () => void;
}

/**
 * Represents the parameters used when the `definePage` load callback runs.
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
     * Function to send an event to Vault Java SDK `PageController`.
     */
    sendEvent: SendEvent;
}

/* Excluded from this release type: PagePlugin */

/* Excluded from this release type: Runtime */

/**
 * Sends events to Vault Java SDK's `PageController#onEvent` method for handling.
 *
 * @param eventName - The name of the event
 * @param data - JSON data to send to the server event handler
 *
 * @returns Data deserialized from the `JsonObject` returned in Vault Java SDK's `PageController#onEvent` method response
 *
 * @example Usage of `sendEvent` with response and error handling
 * ```js
 *     try {
 *             const response = await sendEvent("myEvent", {
 *                  myNumValue: 1,
 *                  myStringValue: "hello"
 *             });
 *
 *             if (response?.data) {
 *                 console.log("onEvent returned data");
 *             } else {
 *                 console.log("onEvent returned without data");
 *             }
 *         } catch (e) {
 *             console.log('sendEvent error: ', e);
 *         }
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
     *  Makes authorized requests to Vault API and prepends the `/api` prefix to the path.
     *  This is a wrapped version of JavaScript's `fetch` function.
     *
     * @see {@link https://developer.veevavault.com/api/}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch}
     *
     * @remarks
     *
     * Only accepts strings as input, not URL or Request objects.
     *
     * Naively prepends `/api` to the provided URL. For example, calling this with "http://example.com"
     *  would make a request to "/api/http://example.com".
     *
     * @param input - The URL to make a request to
     * @param init - The request options
     */
    fetch: (input: string, init?: RequestInit) => Promise<Response>;
}

/**
 * The exported instance of {@link VaultApiClient}
 */
export declare const vaultApiClient: VaultApiClient;

export { }
