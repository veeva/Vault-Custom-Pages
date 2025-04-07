export interface VaultApiClient {
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
