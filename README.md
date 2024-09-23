# Vault Custom Pages
For a high-level overview of Custom Pages, refer to [this Share page](https://veeva.veevashare.com/03645b0d85e3801000/) (under construction).

## Getting started

- [ ] Request the Vault Product team enable Custom Pages in your Vault (24R2.2+)
- [ ] Download and import [this Postman collection](https://github.com/veeva/Vault-Custom-Pages/blob/main/examples/custom_pages.postman_collection.json) and set up a Postman environment for your Vault (use API version v24.3).

---

### Hello World
- [ ] Download the [hello-world-react-esbuild](https://github.com/veeva/Vault-Custom-Pages/tree/main/examples/hello-world-react-esbuild) example project.
- [ ] Upload the [frontend/distribution.zip](https://github.com/veeva/Vault-Custom-Pages/blob/main/examples/hello-world-react-esbuild/frontend/distribution.zip) file via the "Create Distribution" endpoint in the provided Postman Collection.
- [ ] Deploy the [associated VPK](https://github.com/veeva/Vault-Custom-Pages/blob/main/examples/hello-world-react-esbuild/hello-world-react-esbuild.vpk) to Vault (the [Maven Plugin](https://github.com/veeva/vaultjavasdk-maven-plugin) is included).
  - This VPK includes both the required Java SDK and MDL for a Page/Tab.
- [ ] You can now navigate to the Tab or directly to the page URL: `https://{vaultDNS}/ui/#custom/page/hello-world-react-esbuild`

---

### Development
The below steps are designed for the pre-configured examples in this repo (e.g. Simple Form). We recommend starting with
one of these projects and building out. Otherwise, you can refer to the example `package.json` and `pom.xml` files to determine the required dependencies and configuration.

#### Frontend
- [ ] From the terminal, navigate to the `frontend` folder and run `npm install`
- [ ] Change the frontend code as you see fit
- [ ] Run `npm run build`
  -  This will bundle and zip your frontend code into a `distribution.zip` (see package.json for script details)
- [ ] Upload the `frontend/distribution.zip` file via the "Create Distribution" endpoint in the Postman Collection

#### Backend
- [ ] Backend development and deployment is the same as it for existing Java SDK
- [ ] For new or existing projects, your `pom.xml` needs the following in the dependencies section:

```
<dependency>
    <groupId>com.veeva.vault.earlyaccess.sdk.api</groupId>
    <artifactId>vault-earlyaccess-sdk-api</artifactId>
    <version>${vault.sdk.version}</version>
</dependency>
```

---

## Workarounds

Some libraries (e.g. Emotion-based libraries such as Material-UI) require specific setup when defining your Page in 
order for their CSS to work in Custom Pages. Common examples are documented below:

- Material-UI
```
import vault from '@veeva/vault-web-sdk';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// https://mui.com/material-ui/getting-started/usage/
export default vault.definePage(({ element }) => {
    const myCache = createCache({
        key: 'material-ui-emotion-cache',
        container: element
    });

    const root = createRoot(element);
    root.render(
        <CacheProvider value={myCache}>
            <App />
        </CacheProvider>
    );
})
```
Some libraries that use Emotion for styling rely on attributes set on the <html> tag to render styles correctly. However, when UI code is placed within the Shadow DOM, it isn't wrapped in an <html> tag. This can lead to visual and CSS issues due to the absence of necessary attributes.

To address these issues, it is recommended to wrap your UI code in a `<div>` or a similar container and apply the necessary attributes to ensure proper styling. For instance, Chakra UI requires the following attributes for correct CSS rendering:

```
 data-theme="light" style={{ 'color-scheme': 'light' }}
```

These attributes should be added to a container element that encapsulates the entire UI. When using other UI libraries, different attributes might be necessary. It is advisable to inspect the iframe in which the UI code is initially served to identify any specific attributes that need to be applied.

- Styled-Components
```
import vault from '@veeva/vault-web-sdk';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StyleSheetManager } from 'styled-components'


//https://styled-components.com/docs/basics#installation
export default vault.definePage(({ element }) => {
    // Must define this separately as react root can be cleared, and associated styles will also be cleared.
    const stylesRoot = document.createElement('div');
    const reactRoot = document.createElement('div');
    element.appendChild(stylesRoot);
    element.appendChild(reactRoot);

    const root = createRoot(reactRoot);
    root.render(
        <StyleSheetManager target={stylesRoot}>
            <App />
        </StyleSheetManager>
    );
})
```

---
