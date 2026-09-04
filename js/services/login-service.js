(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobLoginService = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createLoginService(options) {
    const wxApi = options && options.wxApi;
    const storage = options && options.storage;
    const config = options && options.config ? options.config : {};

    function buildGuestSession(extra) {
      return Object.assign({
        mode: wxApi ? "wx-guest" : "web-guest",
        playerId: `guest-${Date.now()}`,
        nickName: wxApi ? "微信游客" : "网页试玩玩家",
        openId: "",
        token: ""
      }, extra || {});
    }

    async function exchangeLogin(code) {
      if (!wxApi || !config.sync || !config.sync.loginExchangeUrl) {
        return buildGuestSession({ mode: wxApi ? "wx-local" : "web-local" });
      }

      return new Promise((resolve) => {
        wxApi.request({
          url: config.sync.loginExchangeUrl,
          method: "POST",
          data: { code: code, appId: config.appId || "" },
          success(res) {
            const payload = res && res.data && typeof res.data === "object" ? res.data : {};
            resolve(buildGuestSession({
              mode: payload.openId ? "wx-server" : "wx-local",
              playerId: String(payload.playerId || payload.openId || `wx-${Date.now()}`),
              nickName: String(payload.nickName || "微信玩家"),
              openId: String(payload.openId || ""),
              token: String(payload.token || "")
            }));
          },
          fail() {
            resolve(buildGuestSession({ mode: "wx-local" }));
          }
        });
      });
    }

    async function initSession() {
      const cachedRaw = storage && storage.get ? storage.get("session", "") : "";
      if (cachedRaw) {
        try {
          const parsed = JSON.parse(String(cachedRaw));
          if (parsed && parsed.playerId) {
            return parsed;
          }
        } catch {
          // ignore
        }
      }

      let session = null;
      if (wxApi && typeof wxApi.login === "function") {
        session = await new Promise((resolve) => {
          wxApi.login({
            success(res) {
              resolve(exchangeLogin(res && res.code ? res.code : ""));
            },
            fail() {
              resolve(buildGuestSession({ mode: "wx-login-failed" }));
            }
          });
        });
      } else {
        session = buildGuestSession();
      }

      if (storage && storage.set) {
        storage.set("session", JSON.stringify(session));
      }
      return session;
    }

    return {
      initSession: initSession
    };
  }

  return {
    createLoginService: createLoginService
  };
});
