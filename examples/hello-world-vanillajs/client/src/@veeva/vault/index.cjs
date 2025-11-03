"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// core/sdk/index.mts
var sdk_exports = {};
__export(sdk_exports, {
  definePage: () => definePage,
  vaultApiClient: () => vaultApiClient
});
module.exports = __toCommonJS(sdk_exports);

// core/sdk/package.json
var version = "1.3.3";

// core/sdk/index.mts
var win = window;
win.__vaultMeta.version = version;
function definePage(initialize) {
  return win.__vaultModuleV5.definePage(initialize);
}
var vaultApiClient = win.__vaultModuleV5.vaultApiClient;
