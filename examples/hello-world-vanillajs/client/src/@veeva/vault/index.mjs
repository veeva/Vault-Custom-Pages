// core/sdk/package.json
var version = "1.3.4";

// core/sdk/index.mts
var win = window;
win.__vaultMeta.version = version;
function definePage(initialize) {
  return win.__vaultModuleV5.definePage(initialize);
}
var vaultApiClient = win.__vaultModuleV5.vaultApiClient;
export {
  definePage,
  vaultApiClient
};
