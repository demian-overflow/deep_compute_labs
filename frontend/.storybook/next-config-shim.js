// Webpack shim for `next/config` so Storybook can import it during preview build.
// Exports `getConfig` and `setConfig` to mimic Next.js runtime-config API.
function getConfig() {
  return {
    serverRuntimeConfig: {},
    publicRuntimeConfig: {},
  };
}
function setConfig() {
  // noop
}
module.exports = { getConfig, setConfig };
module.exports.default = module.exports;
