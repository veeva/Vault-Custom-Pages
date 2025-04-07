// core/sdk/package.json
var version = "1.0.5";

// core/sdk/index.mts
var win = window;
win.__vaultMeta.version = version;
var definePage = win.__vaultModuleV5.definePage;
var vaultApiClient = win.__vaultModuleV5.vaultApiClient;
export {
  definePage,
  vaultApiClient
};
//# sourceMappingURL=index.mjs.map
