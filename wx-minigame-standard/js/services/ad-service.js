(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobAdService = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createAdService(options) {
    const wxApi = options && options.wxApi;
    const config = options && options.config ? options.config : {};
    const runtime = {
      bannerAd: null,
      rewardedVideoAd: null,
      bannerVisible: false
    };

    function canUseBanner() {
      return Boolean(wxApi && typeof wxApi.createBannerAd === "function" && config.ads && config.ads.bannerUnitId);
    }

    function canUseRewarded() {
      return Boolean(wxApi && typeof wxApi.createRewardedVideoAd === "function" && config.ads && config.ads.rewardedVideoUnitId);
    }

    function init() {
      if (canUseBanner() && !runtime.bannerAd) {
        runtime.bannerAd = wxApi.createBannerAd({
          adUnitId: config.ads.bannerUnitId,
          style: { left: 0, top: 0, width: 320 }
        });
      }
      if (canUseRewarded() && !runtime.rewardedVideoAd) {
        runtime.rewardedVideoAd = wxApi.createRewardedVideoAd({
          adUnitId: config.ads.rewardedVideoUnitId
        });
      }
    }

    function showBanner() {
      init();
      if (runtime.bannerAd && typeof runtime.bannerAd.show === "function") {
        runtime.bannerVisible = true;
        return runtime.bannerAd.show().catch(() => {});
      }
      runtime.bannerVisible = false;
      return Promise.resolve();
    }

    function hideBanner() {
      if (runtime.bannerAd && typeof runtime.bannerAd.hide === "function") {
        runtime.bannerVisible = false;
        runtime.bannerAd.hide();
      }
    }

    async function requestReward(reason) {
      init();
      if (!runtime.rewardedVideoAd) {
        return { granted: Boolean(config.debug && config.debug.useMockReward), mode: "mock", reason: reason };
      }

      return new Promise((resolve) => {
        let settled = false;
        runtime.rewardedVideoAd.offClose && runtime.rewardedVideoAd.offClose();
        runtime.rewardedVideoAd.onClose((res) => {
          if (settled) return;
          settled = true;
          const granted = !!(res && (res.isEnded || typeof res.isEnded === "undefined"));
          resolve({ granted: granted, mode: "rewarded-video", reason: reason });
        });
        runtime.rewardedVideoAd.show()
          .catch(() => runtime.rewardedVideoAd.load().then(() => runtime.rewardedVideoAd.show()))
          .catch(() => {
            if (settled) return;
            settled = true;
            resolve({ granted: false, mode: "rewarded-video-failed", reason: reason });
          });
      });
    }

    return {
      init: init,
      showBanner: showBanner,
      hideBanner: hideBanner,
      requestReward: requestReward
    };
  }

  return {
    createAdService: createAdService
  };
});
