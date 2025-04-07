/* Excluded from this release type: AnyPlugin */

/**
 * definePage is the mechanism for registering Pageclientcode implementation. Vault Java SDK
 * PageControllers can pass data.
 *
 *
 * @param initialize - The callback function that is executed from a PageController's onLoad
 * Response when first initialized.
 *
 * @returns A JsonObject which is returned from the response from the Vault Java SDK onEvent method
 *
 * @example Pagecliendcode implementation with Vanilla JS
 * ```js
 *
 * export default Vault.definePage(({element, data, pageContext, sendEvent})=>{
 *     element.textContent="Hello World";
 * });
 * ```
 *
 * @example Pagecliendcode implementation with React
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
export declare const definePage: <Data>(initialize: (params: PageParameters<Data>) => unknown) => unknown;

/**
 * The context which is available when a Page is run inside a browser from the definePage load callback.
 */
export declare interface PageContext {
    /**
     * Reloads the current page by calling the Vault Java SDK PageController onLoad method.
     */
    reload: () => void;
}

/**
 * Parameter used when the definePage loadCallback is run.
 */
export declare interface PageParameters<Data> {
    /**
     * Data passed in the PageLoadResponse from the Vault Java SDK PageController code to this method.
     *
     * @privateRemarks
     * This comment has to be copied to all params, unless we can figure out how to use
     * the inheritDoc tag...
     */
    data: Data;
    element: HTMLElement;
    pageContext: PageContext;
    sendEvent: SendEvent;
}

/* Excluded from this release type: PagePlugin */

/* Excluded from this release type: Runtime */

/**.
 * Client to fire events that the Vault Java SDK PageController onEvent method handles.
 *
 * @param eventName - The name of the event
 * @param data - JSON data send to the server event handler
 *
 * @returns A JsonObject which is returned from the response from the Vault Java SDK onEvent method
 *
 * @example Usage of sendEvent and various responses
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

export declare interface VaultApiClient {
    /**
     * Wrapped version of `fetch` that makes authorized requests to Vault REST API
     *   and prepends the /api prefix to the path
     *
     * @see {@link https://developer.veevavault.com/api/}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch}
     *
     * @remarks
     *
     * This only supports strings for the input, so you can't use a URL or a Request object.
     *
     * This naively prepends /api to the provided URL, so if you were to call with "http://example.com",
     *  it would make a request to "/api/http://example.com"
     *
     * @param input - The URL to make a request to
     * @param init - The options for the request
     */
    fetch: (input: string, init?: RequestInit) => Promise<Response>;
}

export declare const vaultApiClient: VaultApiClient;

export { }
