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
export type SendEvent = (eventName: string, data?: unknown) => Promise<{
    data?: unknown;
}>;
