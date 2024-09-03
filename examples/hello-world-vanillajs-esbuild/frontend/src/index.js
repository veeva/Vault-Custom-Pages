import vault from '@veeva/vault-web-sdk';

export const world = vault.definePage(({ element, data }) => {
    const { userId = '<userId>' } = data;

    const helloWorld = document.createElement('h3');
    helloWorld.textContent = 'Hello World Vanilla JS!';

    const myUserDiv = document.createElement('div');
    myUserDiv.textContent = `Initiating user: ${userId}`;

    element.appendChild(helloWorld);
    element.appendChild(myUserDiv);
});
