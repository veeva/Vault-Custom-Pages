import { definePage } from '@veeva/vault';

export const helloWorld = definePage(({ element, data }) => {
    const { userId = '<userId>' } = data;

    const helloWorldContainer = document.createElement('div');
    helloWorldContainer.className = 'hello-world-container';
    const helloWorldHeading = document.createElement('h3');
    helloWorldHeading.textContent = 'Hello world!';
    helloWorldContainer.appendChild(helloWorldHeading);

    const currentUserContainer = document.createElement('div');
    currentUserContainer.className = 'current-user-container';
    const currentUserLabel = document.createElement('b');
    currentUserLabel.textContent = 'Initiating user: ';
    const userIdText = document.createElement('span');
    userIdText.textContent = userId;
    currentUserContainer.appendChild(currentUserLabel);
    currentUserContainer.appendChild(userIdText);

    element.appendChild(helloWorldContainer);
    element.appendChild(currentUserContainer);
});
