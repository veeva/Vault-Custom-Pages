import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { definePage } from "@veeva/vault";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * Register the Page and define the callback function that is executed when the page is loaded.
 */
export default definePage(({ element }) => {
  /*
     Required to use Material UI in the shadow DOM
     https://mui.com/material-ui/customization/shadow-dom/#how-to-use-the-shadow-dom-with-material-ui
  */
  const myCache = createCache({
    key: "material-ui-emotion-cache",
    container: element,
  });

  /*
     Required to render Material UI Portals in the shadow DOM
  */
  const theme = createTheme({
    components: {
      MuiPopover: {
        defaultProps: {
          container: element,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: element,
        },
      },
    },
    typography: {
      fontSize: 18,
    },
  });

  const root = createRoot(element);
  root.render(
    <ThemeProvider theme={theme}>
      <CacheProvider value={myCache}>
        <App />
      </CacheProvider>
    </ThemeProvider>,
  );
});
