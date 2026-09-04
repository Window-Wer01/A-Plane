(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobRuntimeConfig = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function readString(source, key, fallbackValue) {
    const value = source && typeof source[key] === "string" ? source[key].trim() : "";
    return value || fallbackValue;
  }

  function createRuntimeConfig(root, wxApi) {
    const overrides = root && root.__BLOB_WX_CONFIG__ && typeof root.__BLOB_WX_CONFIG__ === "object"
      ? root.__BLOB_WX_CONFIG__
      : {};

    const appBase = readString(overrides, "appBaseUrl", "");
    const apiBase = readString(overrides, "apiBaseUrl", appBase);

    return {
      version: readString(root, "__BLOB_GAME_VERSION__", wxApi ? "standard-minigame" : "standard-web"),
      buildLabel: readString(root, "__BLOB_BUILD_LABEL__", "2026-09-04 00:30:00"),
      appId: readString(overrides, "appId", wxApi ? "touristappid" : ""),
      apiBaseUrl: apiBase,
      sync: {
        userInfoUrl: readString(overrides, "userInfoUrl", apiBase ? `${apiBase}/user/sync` : ""),
        loginExchangeUrl: readString(overrides, "loginExchangeUrl", apiBase ? `${apiBase}/auth/wechat/login` : ""),
        leaderboardUrl: readString(overrides, "leaderboardUrl", apiBase ? `${apiBase}/leaderboard` : "")
      },
      ads: {
        bannerUnitId: readString(overrides, "bannerUnitId", ""),
        rewardedVideoUnitId: readString(overrides, "rewardedVideoUnitId", "")
      },
      share: {
        title: readString(overrides, "shareTitle", "我要当大王，来帮我冲榜"),
        imageUrl: readString(overrides, "shareImageUrl", ""),
        query: readString(overrides, "shareQuery", "from=share")
      },
      ranking: {
        mode: readString(overrides, "rankingMode", wxApi ? "open-data" : "local")
      },
      debug: {
        logLifecycle: Boolean(overrides && overrides.logLifecycle),
        useMockReward: overrides && typeof overrides.useMockReward === "boolean" ? overrides.useMockReward : !wxApi
      }
    };
  }

  return {
    createRuntimeConfig: createRuntimeConfig
  };
});
