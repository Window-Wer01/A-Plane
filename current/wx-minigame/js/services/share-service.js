(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobShareService = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createShareService(options) {
    const wxApi = options && options.wxApi;
    const storage = options && options.storage;
    const config = options && options.config ? options.config : {};

    function readState() {
      const raw = storage && storage.get ? storage.get("share-state", "") : "";
      if (!raw) {
        return { totalShares: 0, reviveShares: 0, lastShareAt: "" };
      }
      try {
        const parsed = JSON.parse(String(raw));
        return Object.assign({ totalShares: 0, reviveShares: 0, lastShareAt: "" }, parsed || {});
      } catch {
        return { totalShares: 0, reviveShares: 0, lastShareAt: "" };
      }
    }

    function writeState(nextState) {
      if (storage && storage.set) {
        storage.set("share-state", JSON.stringify(nextState));
      }
    }

    function init() {
      if (wxApi && typeof wxApi.showShareMenu === "function") {
        wxApi.showShareMenu({ withShareTicket: true, menus: ["shareAppMessage", "shareTimeline"] });
      }
    }

    function emitShare(payload) {
      const state = readState();
      const nextState = Object.assign({}, state, {
        totalShares: state.totalShares + 1,
        lastShareAt: new Date().toISOString()
      });
      if (payload && payload.type === "revive") {
        nextState.reviveShares += 1;
      }
      writeState(nextState);

      if (wxApi && typeof wxApi.shareAppMessage === "function") {
        wxApi.shareAppMessage({
          title: config.share && config.share.title ? config.share.title : "我要当大王",
          imageUrl: config.share && config.share.imageUrl ? config.share.imageUrl : "",
          query: config.share && config.share.query ? `${config.share.query}&shareType=${payload && payload.type ? payload.type : "general"}` : ""
        });
        return { mode: "wx-share", granted: true, state: nextState };
      }

      return { mode: "mock-share", granted: true, state: nextState };
    }

    function getSummary() {
      const state = readState();
      return {
        totalShares: state.totalShares,
        reviveShares: state.reviveShares,
        lastShareAt: state.lastShareAt
      };
    }

    return {
      init: init,
      shareResult(payload) {
        return emitShare(Object.assign({ type: "result" }, payload || {}));
      },
      shareRevive(payload) {
        return emitShare(Object.assign({ type: "revive" }, payload || {}));
      },
      getSummary: getSummary
    };
  }

  return {
    createShareService: createShareService
  };
});
