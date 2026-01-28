import { vaultApiClient } from '@veeva/vault';

const VAULT_API_VERSION = 'v25.3';
const VAULT_CLIENT_ID = 'Custom-Page-Data-Grid';

const URL_QUERY = '/query';

const HTTP_HEADER_VAULT_DESCRIBE_QUERY = 'X-VaultAPI-DescribeQuery';
const HTTP_HEADER_VAULT_CLIENT_ID = 'X-VaultAPI-ClientID';
const HTTP_HEADER_CONTENT_TYPE = 'Content-Type';
const HTTP_HEADER_ACCEPT = 'Accept';

const HTTP_CONTENT_TYPE_XFORM = 'application/x-www-form-urlencoded';
const HTTP_CONTENT_TYPE_JSON = 'application/json';

/**
 * Executes a Vault query request
 * @param queryString - query to execute
 * @returns {Promise<any>} query response
 */
export async function query(queryString) {
    const headers = {
        [HTTP_HEADER_CONTENT_TYPE]: [HTTP_CONTENT_TYPE_XFORM],
        [HTTP_HEADER_VAULT_DESCRIBE_QUERY]: true,
        [HTTP_HEADER_VAULT_CLIENT_ID]: VAULT_CLIENT_ID,
    };
    const method = 'POST';
    const urlencoded = new URLSearchParams();
    urlencoded.append('q', queryString);

    const requestOptions = {
        headers,
        method,
        body: urlencoded,
    };

    const vaultQueryResponse = await vaultApiClient.fetch(
        `${VAULT_API_VERSION}${URL_QUERY}`,
        requestOptions,
    );

    return await vaultQueryResponse.json();
}

/**
 * Executes a paginated Vault query request based on the URL from a prior query
 * @param pageUrl
 * @returns {Promise<any>}
 */
export async function queryByPage(pageUrl) {
    const headers = {
        [HTTP_HEADER_ACCEPT]: [HTTP_CONTENT_TYPE_JSON],
        [HTTP_HEADER_CONTENT_TYPE]: [HTTP_CONTENT_TYPE_XFORM],
        [HTTP_HEADER_VAULT_DESCRIBE_QUERY]: true,
        [HTTP_HEADER_VAULT_CLIENT_ID]: VAULT_CLIENT_ID,
    };
    const method = 'POST';

    const requestOptions = {
        headers,
        method,
    };

    // Page URLs start with /api/, which we need to remove when using with vaultApiClient
    const url = pageUrl.replace('/api/', '');
    const vaultQueryResponse = await vaultApiClient.fetch(url, requestOptions);

    return await vaultQueryResponse.json();
}

/*
 Converts a UTC DateTime to human-friendly format in the provided locale and timezone
 */
export const formatDateTime = ({
    utcDateTimeString,
    locale = 'en-US',
    timezone = 'UTC',
}) => {
    const utcDateTimeObj = new Date(utcDateTimeString);

    const formatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        timeZoneName: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return formatter.format(utcDateTimeObj);
};
