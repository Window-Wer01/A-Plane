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
      bannerVisible: false,
      bannerResizeHandler: null,
      rewardCloseHandler: null,
      rewardErrorHandler: null
    };

    function canUseBanner() {
      return Boolean(wxApi && typeof wxApi.createBannerAd === "function" && config.ads && config.ads.bannerUnitId);
    }

    function canUseRewarded() {
      return Boolean(wxApi && typeof wxApi.createRewardedVideoAd === "function" && config.ads && config.ads.rewardedVideoUnitId);
    }

    function getWindowMetrics() {
      if (!wxApi || typeof wxApi.getSystemInfoSync !== "function") {
        return null;
      }
      try {
        return wxApi.getSystemInfoSync();
      } catch {
        return null;
      }
    }

    function layoutBanner() {
      const bannerAd = runtime.bannerAd;
      if (!bannerAd || !bannerAd.style) return;
      const metrics = getWindowMetrics();
      if (!metrics) return;
      const windowWidth = Number(metrics.windowWidth || metrics.screenWidth || 320) || 320;
      const windowHeight = Number(metrics.windowHeight || metrics.screenHeight || 568) || 568;
      const safeAreaBottom = metrics.safeArea && Number(metrics.safeArea.bottom)
        ? Number(metrics.safeArea.bottom)
        : windowHeight;
      const bottomInset = Math.max(8, windowHeight - safeAreaBottom + 8);
      const bannerWidth = Math.max(300, Math.min(320, windowWidth));
      const bannerHeight = Number(bannerAd.style.realHeight || bannerAd.style.height || 96) || 96;
      bannerAd.style.width = bannerWidth;
      bannerAd.style.left = Math.max(0, (windowWidth - bannerWidth) / 2);
      bannerAd.style.top = Math.max(0, windowHeight - bannerHeight - bottomInset);
    }

    function detachRewardListeners() {
      if (!runtime.rewardedVideoAd) return;
      try {
        if (runtime.rewardCloseHandler && typeof runtime.rewardedVideoAd.offClose === "function") {
          runtime.rewardedVideoAd.offClose(runtime.rewardCloseHandler);
        }
      } catch {
        if (typeof runtime.rewardedVideoAd.offClose === "function") {
          runtime.rewardedVideoAd.offClose();
        }
      }
      try {
        if (runtime.rewardErrorHandler && typeof runtime.rewardedVideoAd.offError === "function") {
          runtime.rewardedVideoAd.offError(runtime.rewardErrorHandler);
        }
      } catch {
        if (typeof runtime.rewardedVideoAd.offError === "function") {
          runtime.rewardedVideoAd.offError();
        }
      }
      runtime.rewardCloseHandler = null;
      runtime.rewardErrorHandler = null;
    }

    function init() {
      if (canUseBanner() && !runtime.bannerAd) {
        runtime.bannerAd = wxApi.createBannerAd({
          adUnitId: config.ads.bannerUnitId,
          style: { left: 0, top: 0, width: 320 }
        });
        layoutBanner();
        if (typeof runtime.bannerAd.onResize === "function" && !runtime.bannerResizeHandler) {
          runtime.bannerResizeHandler = function () {
            layoutBanner();
          };
          runtime.bannerAd.onResize(runtime.bannerResizeHandler);
        }
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
        layoutBanner();
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
        detachRewardListeners();
        const finish = function (result) {
          if (settled) return;
          settled = true;
          detachRewardListeners();
          resolve(result);
        };
        runtime.rewardCloseHandler = function (res) {
          const granted = !!(res && (res.isEnded || typeof res.isEnded === "undefined"));
          finish({ granted: granted, mode: "rewarded-video", reason: reason });
        };
        runtime.rewardErrorHandler = function () {
          finish({ granted: false, mode: "rewarded-video-error", reason: reason });
        };
        runtime.rewardedVideoAd.onClose(runtime.rewardCloseHandler);
        if (typeof runtime.rewardedVideoAd.onError === "function") {
          runtime.rewardedVideoAd.onError(runtime.rewardErrorHandler);
        }
        runtime.rewardedVideoAd.show()
          .catch(() => runtime.rewardedVideoAd.load().then(() => runtime.rewardedVideoAd.show()))
          .catch(() => {
            finish({ granted: false, mode: "rewarded-video-failed", reason: reason });
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
