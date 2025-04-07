import { SendEvent } from './event.mjs';
/**
 * The context which is available when a Page is run inside a browser from the definePage load callback.
 */
export interface PageContext {
    /**
     * Reloads the current page by calling the Vault Java SDK PageController onLoad method.
     */
    reload: () => void;
}
/**
 * Parameter used when the definePage loadCallback is run.
 */
export interface PageParameters<Data> {
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
/**
 * Plugin type shouldn't be documented because sdk consumers don't need to know the return type
 * @internal
 */
export interface PagePlugin<Data = unknown> {
    type: 'page';
    factory: (params: PageParameters<Data>) => unknown;
    demoParams?: Partial<PageParameters<Data>>;
}
