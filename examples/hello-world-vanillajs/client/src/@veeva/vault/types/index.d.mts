import { PageParameters, PageContext, PagePlugin } from './page.mjs';
import { VaultApiClient } from './services.mjs';
import { SendEvent } from './event.mjs';
export type { VaultApiClient, PageParameters, PagePlugin, PageContext, SendEvent };
/**
 * Used to ensure we know of all the plugin types in our internal tooling
 * DO NOT REMOVE THIS! We are planning on adding more than just Page*!!
 * @internal
 */
export type AnyPlugin = PagePlugin;
/**
 * This is defined in SDK because it makes sense that the SDK defines the public interface, and
 * technically, the globals in the iframe are the public interface.
 *
 * If you think of customer code as being written in vanilla JS (no imports) then they'd essentially
 * be writing code like `window.__vaultWebSdkClient.definePage(...)`, so that part is the public API.
 *
 * @internal
 */
export type Runtime = {
    __vaultMeta: {
        version: string | null;
    };
    __vaultModuleV5: {
        vaultApiClient: VaultApiClient;
        definePage<Data>(initialize: (params: PageParameters<Data>) => unknown): unknown;
    };
};
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
export declare const vaultApiClient: VaultApiClient;
