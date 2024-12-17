import { definePage } from "@veeva/vault";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/**
 * Register the Page and define the callback function this is executed when the page is loaded.
 */
export const helloWorld = definePage(({ data = {}, element }) => {
  // Read the user ID returned from the PageController onLoad method
  const { userId = "<userId>" } = data;

  const root = createRoot(element);
  root.render(<App userId={userId} />);
});
