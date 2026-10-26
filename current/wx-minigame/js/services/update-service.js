(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobUpdateService = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createUpdateService(options) {
    const wxApi = options && options.wxApi;
    const logger = options && options.logger ? options.logger : function () {};
    let hasAppliedUpdate = false;

    function init() {
      if (!wxApi || typeof wxApi.getUpdateManager !== "function") {
        return { mode: "noop" };
      }

      const updateManager = wxApi.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        logger("check-for-update", res || {});
      });
      updateManager.onUpdateReady(function () {
        logger("update-ready", {});
        if (hasAppliedUpdate || typeof updateManager.applyUpdate !== "function") {
          return;
        }
        hasAppliedUpdate = true;
        logger("update-applying", {});
        try {
          updateManager.applyUpdate();
        } catch (error) {
          hasAppliedUpdate = false;
          logger("update-apply-failed", {
            message: error && error.message ? error.message : String(error || "")
          });
        }
      });
      updateManager.onUpdateFailed(function () {
        hasAppliedUpdate = false;
        logger("update-failed", {});
      });
      return { mode: "wx-update-manager" };
    }

    return {
      init: init
    };
  }

  return {
    createUpdateService: createUpdateService
  };
});
