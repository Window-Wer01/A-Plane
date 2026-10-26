(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobRankService = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createRankService(options) {
    const wxApi = options && options.wxApi;
    const config = options && options.config ? options.config : {};

    function normalizeEntries(entries, session) {
      const fallbackName = session && session.nickName ? session.nickName : "你自己";
      return (Array.isArray(entries) ? entries : []).map((entry, index) => {
        const safeName = String(entry && entry.name ? entry.name : (index === 2 ? fallbackName : `玩家${index + 1}`)).slice(0, 24);
        const numericScore = Number(entry && entry.score);
        return {
          name: safeName,
          score: Number.isFinite(numericScore) ? Math.max(0, Math.floor(numericScore)) : 0
        };
      });
    }

    function buildLocalRanks(core, session) {
      const base = Math.max(24, Number(core && core.bestScore ? core.bestScore : 0));
      return {
        mode: "local",
        myRank: 3,
        entries: normalizeEntries([
          { name: "泡泡王", score: base + 80 },
          { name: "海獭团", score: base + 38 },
          { name: session && session.nickName ? session.nickName : "你自己", score: base },
          { name: "果冻仔", score: Math.max(8, base - 16) },
          { name: "团子兽", score: Math.max(6, base - 28) }
        ], session)
      };
    }

    async function refresh(core, session) {
      if (wxApi && config.sync && config.sync.leaderboardUrl && typeof wxApi.request === "function") {
        return new Promise((resolve) => {
          wxApi.request({
            url: config.sync.leaderboardUrl,
            method: "GET",
            success(res) {
              const payload = res && res.data && typeof res.data === "object" ? res.data : {};
              if (Array.isArray(payload.entries)) {
                resolve({
                  mode: "remote",
                  myRank: Number(payload.myRank || 0),
                  entries: normalizeEntries(payload.entries, session)
                });
                return;
              }
              resolve(buildLocalRanks(core, session));
            },
            fail() {
              resolve(buildLocalRanks(core, session));
            }
          });
        });
      }

      if (wxApi && typeof wxApi.getOpenDataContext === "function" && config.ranking && config.ranking.mode === "open-data") {
        return Object.assign(buildLocalRanks(core, session), { mode: "open-data-pending" });
      }

      return buildLocalRanks(core, session);
    }

    return {
      refresh: refresh
    };
  }

  return {
    createRankService: createRankService
  };
});
