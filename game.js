const runtimeConfig = require("./wx-game.config.js");
const { initWxMiniGameMain } = require("./js/game-wechat-standard.js");

if (typeof globalThis !== "undefined") {
  globalThis.__BLOB_WX_CONFIG__ = Object.assign({}, runtimeConfig, globalThis.__BLOB_WX_CONFIG__ || {});
}

if (typeof wx !== "undefined") {
  initWxMiniGameMain();
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initWxMiniGameMain,
    runtimeConfig
  };
}
