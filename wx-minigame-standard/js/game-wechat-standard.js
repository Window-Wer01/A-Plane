(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("./blob-merge-core.js"), typeof globalThis !== "undefined" ? globalThis : this);
  } else {
    root.GameWechatStandard = factory(root.BlobMergeCore, root);
    if (root.document && root.document.getElementById("gameCanvas")) {
      const boot = function () {
        if (root.__BLOB_GAME_AUTO_INIT__ === false) return;
        root.GameWechatStandard.initWebShell(root.document);
      };
      if (root.document.readyState === "loading") {
        root.document.addEventListener("DOMContentLoaded", boot, { once: true });
      } else {
        boot();
      }
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (BlobMergeCore, root) {
  "use strict";

  if (!BlobMergeCore) {
    throw new Error("BlobMergeCore 未加载，无法启动微信标准版运行时。");
  }

  const TYPE_META = [
    { label: "1号 种子球", hint: "先铺底，别急着冲高。" },
    { label: "2号 幼芽球", hint: "优先补低洼位，减少侧翻。" },
    { label: "3号 啵啵球", hint: "中路别堆太尖，先做承托。" },
    { label: "4号 果冻球", hint: "这是过渡球，尽量别悬空。" },
    { label: "5号 轨道球", hint: "开始占空间了，别挤满右侧。" },
    { label: "6号 星核球", hint: "高阶球要有大底座支撑。" },
    { label: "7号 大王球", hint: "再稳一次，就能直接收王。" }
  ];

  const TOOL_PRESETS = [
    { key: "capsule", label: "神秘胶囊", count: 5, desc: "临时抬高安全线" },
    { key: "clean", label: "移除道具", count: 5, desc: "清掉一种低阶球" },
    { key: "rage", label: "发脾气", count: 5, desc: "随机放大一个目标" },
    { key: "split", label: "分裂弹", count: 5, desc: "命中后拆成低阶球" }
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function getTypeMeta(index) {
    return TYPE_META[clamp(index, 0, TYPE_META.length - 1)] || TYPE_META[0];
  }

  function safeText(node, text) {
    if (node) node.textContent = text;
  }

  function show(node, visible) {
    if (!node) return;
    node.classList.toggle("hidden", !visible);
  }

  function createStorageAdapter(prefix, wxApi) {
    return {
      get(key, fallbackValue) {
        try {
          const raw = wxApi
            ? wxApi.getStorageSync(`${prefix}:${key}`)
            : root.localStorage.getItem(`${prefix}:${key}`);
          return raw === null || raw === undefined || raw === "" ? fallbackValue : raw;
        } catch {
          return fallbackValue;
        }
      },
      set(key, value) {
        try {
          if (wxApi) {
            wxApi.setStorageSync(`${prefix}:${key}`, value);
          } else {
            root.localStorage.setItem(`${prefix}:${key}`, String(value));
          }
        } catch {
          // ignore
        }
      }
    };
  }

  function createWebAudioManager(settings) {
    let audio = null;

    function ensureAudio() {
      if (audio) return audio;
      audio = new Audio("./assets/bgm-loop.wav");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = settings.volume;
      audio.playsInline = true;
      audio.setAttribute("playsinline", "");
      audio.setAttribute("webkit-playsinline", "");
      return audio;
    }

    return {
      start() {
        if (!settings.audioEnabled) return;
        const player = ensureAudio();
        player.volume = settings.volume;
        player.play().catch(() => {});
      },
      stop() {
        if (!audio) return;
        audio.pause();
      },
      syncVolume() {
        if (audio) audio.volume = settings.volume;
      }
    };
  }

  function createWxAudioManager(settings, wxApi) {
    let audio = null;

    function ensureAudio() {
      if (audio) return audio;
      audio = wxApi.createInnerAudioContext();
      audio.src = "assets/bgm-loop.wav";
      audio.loop = true;
      audio.volume = settings.volume;
      return audio;
    }

    return {
      start() {
        if (!settings.audioEnabled) return;
        const player = ensureAudio();
        player.volume = settings.volume;
        player.play();
      },
      stop() {
        if (!audio) return;
        audio.pause();
      },
      syncVolume() {
        if (audio) audio.volume = settings.volume;
      }
    };
  }

  function createCore(platform) {
    return new BlobMergeCore({
      platform: {
        startBgm() {
          platform.audio.start();
        },
        stopBgm() {
          platform.audio.stop();
        },
        storageGet(key) {
          return platform.storage.get(key, "");
        },
        storageSet(key, value) {
          platform.storage.set(key, value);
        },
        vibrate(duration) {
          if (!platform.settings.vibrateEnabled) return;
          if (platform.wx) {
            platform.wx.vibrateShort({ type: duration > 24 ? "heavy" : "light" });
            return;
          }
          if (root.navigator && root.navigator.vibrate) {
            root.navigator.vibrate(duration);
          }
        }
      }
    });
  }

  function createLoop(updateFrame) {
    let lastTime = 0;

    function frame(now) {
      if (!lastTime) lastTime = now;
      const dt = Math.min(0.033, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      updateFrame(dt);
      root.requestAnimationFrame(frame);
    }

    root.requestAnimationFrame(frame);
  }

  function buildMockRankings(core) {
    const base = Math.max(32, core.bestScore || 0);
    return [
      { name: "泡泡王", score: base + 72 },
      { name: "小海獭", score: base + 40 },
      { name: "你自己", score: base },
      { name: "布丁团", score: Math.max(8, base - 12) },
      { name: "团子兽", score: Math.max(6, base - 24) }
    ];
  }

  function initToolGrid(container) {
    if (!container || container.dataset.ready === "true") return;
    container.innerHTML = TOOL_PRESETS.map((tool) => (
      `<button class="wx-tool-btn" type="button" data-tool-key="${tool.key}" aria-label="${tool.label}">
        <span class="wx-tool-btn__label">${tool.label}</span>
        <strong class="wx-tool-btn__count">x${tool.count}</strong>
        <span class="wx-tool-btn__desc">${tool.desc}</span>
      </button>`
    )).join("");
    container.dataset.ready = "true";
  }

  function collectElements(doc) {
    const ids = [
      "shellNotice", "menuBuildNotice", "shellNetworkState", "shellWelcomeTip",
      "menuScreen", "friendRankScreen", "petParkScreen", "gameScreen",
      "menuStartBtn", "menuRankBtn", "menuPetBtn", "menuExitBtn",
      "rankBackBtn", "rankRefreshBtn", "rankOfflineTip", "friendLeaderboardList", "myRankValue", "rankSyncState",
      "petBackBtn", "petGardenTip", "petCoinValue", "petEnergyStatus", "petEnergyFill", "petEnergyValue",
      "petMoodStatus", "petMoodFill", "petMoodValue", "petGiftStatus", "petGiftValue",
      "petCleanStatus", "petCleanFill", "petCleanValue", "petBubble", "petAvatar",
      "gameCanvas", "scoreValue", "bestValue", "currentStepValue", "minStepValue",
      "nextBlob", "nextName", "nextHint", "statusBanner", "npcBanner",
      "topEnergyFill", "topMoodFill", "topCleanFill", "gameOfflineHint",
      "gameMenuBtn", "gameAudioBtn", "gamePetChip", "gamePetEmoji", "gamePetText",
      "gameToolGrid", "gameToolTimer", "pausePanel", "resumeGameBtn", "pauseRestartBtn", "pauseHelpBtn",
      "resultPanel", "resultTitle", "resultScore", "resultBest", "resultDuration", "resultCoins",
      "resultDoubleRewardBtn", "resultRestartBtn", "resultExitBtn", "resultShareBoard", "resultShareStatus"
    ];
    const elements = {};
    ids.forEach((id) => {
      elements[id] = doc.getElementById(id);
    });
    elements.gameShell = doc.querySelector(".wx-board-shell") || elements.gameCanvas?.parentElement || null;
    return elements;
  }

  function initWebShell(doc) {
    const elements = collectElements(doc);
    const canvas = elements.gameCanvas;
    if (!canvas) {
      throw new Error("找不到 `gameCanvas`，无法启动网页壳运行时。");
    }

    const settingsStorage = createStorageAdapter("wx-standard-settings");
    const settings = {
      audioEnabled: settingsStorage.get("audio-enabled", "1") !== "0",
      vibrateEnabled: settingsStorage.get("vibrate-enabled", "1") !== "0",
      volume: clamp(Number(settingsStorage.get("volume", 0.42)) || 0.42, 0, 1)
    };
    const storage = createStorageAdapter("wx-standard-runtime");
    const audio = createWebAudioManager(settings);
    const core = createCore({ storage, audio, settings });
    const ctx = canvas.getContext("2d");
    core.attachRenderer(canvas, ctx);

    let currentScreen = "menu";
    let lastGameOverState = false;

    function persistSettings() {
      settingsStorage.set("audio-enabled", settings.audioEnabled ? "1" : "0");
      settingsStorage.set("vibrate-enabled", settings.vibrateEnabled ? "1" : "0");
      settingsStorage.set("volume", settings.volume);
    }

    function resizeCanvas() {
      const wrapper = elements.gameShell || canvas.parentElement || canvas;
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width || 390));
      const height = Math.max(540, Math.floor(rect.height || 680));
      const dpr = Math.max(1, Math.min(2, root.devicePixelRatio || 1));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      core.setViewport(width, height, dpr);
      core.render();
    }

    function setScreen(name) {
      currentScreen = name;
      show(elements.menuScreen, name === "menu");
      show(elements.friendRankScreen, name === "rank");
      show(elements.petParkScreen, name === "pet");
      show(elements.gameScreen, name === "game");
      if (name === "game") {
        root.requestAnimationFrame(resizeCanvas);
      }
    }

    function openPausePanel() {
      if (!core.state.started || core.state.gameOver) return;
      if (!core.state.paused) {
        core.togglePause();
      }
      show(elements.pausePanel, true);
    }

    function closePausePanel(resumeGame) {
      show(elements.pausePanel, false);
      if (resumeGame && core.state.paused && !core.state.gameOver) {
        core.togglePause();
      }
    }

    function restartRunAndEnterGame() {
      show(elements.resultPanel, false);
      show(elements.pausePanel, false);
      core.resetRun();
      if (settings.audioEnabled) {
        audio.stop();
      }
      setScreen("game");
      syncUi();
    }

    function syncRankPanel() {
      const ranks = buildMockRankings(core);
      safeText(elements.myRankValue, "第 3 名");
      safeText(elements.rankSyncState, root.navigator?.onLine ? "本地模拟已更新" : "离线缓存中");
      if (elements.friendLeaderboardList) {
        elements.friendLeaderboardList.innerHTML = ranks.map((entry, index) => (
          `<li class="leaderboard-item">
            <span class="leaderboard-rank">${index + 1}</span>
            <span class="leaderboard-name">${entry.name}</span>
            <strong class="leaderboard-score">${entry.score}</strong>
          </li>`
        )).join("");
      }
    }

    function syncPetPanel() {
      const scoreFactor = clamp(Math.floor(core.state.score / 16), 0, 10);
      const mergesFactor = clamp(core.state.merges, 0, 10);
      const dangerFactor = clamp(10 - Math.round(core.state.warningTime * 3), 0, 10);
      const giftCount = Math.max(0, Math.floor(core.state.score / 48));
      const coinValue = core.state.score + core.state.merges * 3;

      safeText(elements.petCoinValue, String(coinValue));
      safeText(elements.petEnergyStatus, "体力越高，开局越稳。");
      safeText(elements.petEnergyValue, `${scoreFactor}/10`);
      if (elements.petEnergyFill) elements.petEnergyFill.style.width = `${scoreFactor * 10}%`;

      safeText(elements.petMoodStatus, "连消越多，开心度越高。");
      safeText(elements.petMoodValue, `${mergesFactor}/10`);
      if (elements.petMoodFill) elements.petMoodFill.style.width = `${mergesFactor * 10}%`;

      safeText(elements.petGiftStatus, "当前礼物数量按本局表现模拟。");
      safeText(elements.petGiftValue, `${giftCount} 件`);

      safeText(elements.petCleanStatus, "危险越低，清洁度越高。");
      safeText(elements.petCleanValue, `${dangerFactor}/10`);
      if (elements.petCleanFill) elements.petCleanFill.style.width = `${dangerFactor * 10}%`;

      safeText(elements.petBubble, core.state.gameOver ? "辛苦啦，下一局继续冲。" : "先把底铺平，清洁度会更稳。");
      safeText(elements.petAvatar, core.state.gameOver ? "👑" : "🐾");
    }

    function syncResultPanel() {
      if (!core.state.gameOver) {
        show(elements.resultPanel, false);
        return;
      }
      show(elements.resultPanel, true);
      safeText(elements.resultTitle, core.state.success ? "挑战成功" : "这局翻车了");
      safeText(elements.resultScore, formatDuration(core.state.elapsedMs));
      safeText(elements.resultBest, String(core.state.score));
      safeText(elements.resultDuration, String(core.state.score * 2));
      safeText(elements.resultCoins, String(core.state.score + core.state.merges * 3));
      safeText(elements.resultShareStatus, "分享、复活、翻倍奖励接口后续接微信正式能力。");
      if (elements.resultShareBoard) {
        elements.resultShareBoard.innerHTML = `
          <div class="mini-stat"><span>最高阶</span><strong>${getTypeMeta(core.state.highestType).label}</strong></div>
          <div class="mini-stat"><span>合成次数</span><strong>${core.state.merges}</strong></div>
          <div class="mini-stat"><span>危险累计</span><strong>${core.state.warningTime.toFixed(1)}s</strong></div>
        `;
      }
    }

    function syncGameHud() {
      const nextMeta = getTypeMeta(core.state.nextType);
      safeText(elements.scoreValue, String(core.state.score));
      safeText(elements.bestValue, String(core.bestScore || 0));
      safeText(elements.currentStepValue, String(core.state.drops));
      safeText(elements.minStepValue, String(core.bestScore || 0));
      safeText(elements.nextName, nextMeta.label);
      safeText(elements.nextHint, nextMeta.hint);
      safeText(elements.statusBanner, core.state.message);
      safeText(elements.npcBanner, core.state.paused ? "小精灵说：先暂停，别急着乱点。" : "小精灵说：底部铺稳，越打越轻松。");
      safeText(elements.gamePetEmoji, core.state.gameOver ? "👑" : core.state.paused ? "😴" : "🐾");
      safeText(elements.gamePetText, core.state.gameOver ? "本局已结束" : core.state.paused ? "当前已暂停" : "当前精灵状态");
      safeText(elements.gameAudioBtn, settings.audioEnabled ? "音乐开" : "音乐关");
      elements.gameAudioBtn?.classList.toggle("is-off", !settings.audioEnabled);
      if (elements.nextBlob) {
        elements.nextBlob.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.08) 38%), ${["#7dd3fc","#86efac","#f9a8d4","#c4b5fd","#fdba74","#fde68a","#93c5fd"][core.state.nextType] || "#7dd3fc"}`;
      }

      const energyPercent = clamp(Math.round((core.state.score % 100) / 10) * 10, 10, 100);
      const moodPercent = clamp(Math.round(core.state.merges * 14), 10, 100);
      const cleanPercent = clamp(100 - Math.round((core.state.warningTime / 2.6) * 100), 8, 100);
      if (elements.topEnergyFill) elements.topEnergyFill.style.height = `${energyPercent}%`;
      if (elements.topMoodFill) elements.topMoodFill.style.height = `${moodPercent}%`;
      if (elements.topCleanFill) elements.topCleanFill.style.height = `${cleanPercent}%`;

      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      safeText(elements.shellNetworkState, offline ? "离线也可游玩" : "在线同步待接入");
      safeText(elements.shellWelcomeTip, offline ? "当前是离线状态，核心玩法不受影响。" : "后续接微信接口后，这里会同步用户信息与好友数据。");
      safeText(elements.shellNotice, offline ? "当前离线游玩中，核心玩法保持可用。" : "当前是网页验收壳，后续可平移到微信小游戏接口层。");
      show(elements.gameOfflineHint, offline && currentScreen === "game");
    }

    function syncUi() {
      initToolGrid(elements.gameToolGrid);
      safeText(elements.menuBuildNotice, `当前版本 ${root.__BLOB_GAME_VERSION__ || "standard-web"} · 更新时间 ${root.__BLOB_BUILD_LABEL__ || "未标注"}`);
      syncRankPanel();
      syncPetPanel();
      syncGameHud();
      syncResultPanel();
      if (!core.state.gameOver && lastGameOverState) {
        show(elements.resultPanel, false);
      }
      lastGameOverState = core.state.gameOver;
    }

    function pointFromClient(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function bindCanvasEvents() {
      const onPointerDown = function (event) {
        event.preventDefault();
        closePausePanel(false);
        const point = pointFromClient(event.clientX, event.clientY);
        core.handlePointerDown(point.x, point.y);
      };
      const onPointerMove = function (event) {
        if (event.pointerType === "mouse" && !(event.buttons & 1)) return;
        const point = pointFromClient(event.clientX, event.clientY);
        core.handlePointerMove(point.x, point.y);
      };
      const onPointerUp = function (event) {
        const point = pointFromClient(event.clientX, event.clientY);
        core.handlePointerUp(point.x, point.y);
      };
      canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
      canvas.addEventListener("pointermove", onPointerMove, { passive: false });
      canvas.addEventListener("pointerup", onPointerUp, { passive: false });
      canvas.addEventListener("pointercancel", onPointerUp, { passive: false });
      canvas.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    }

    function bindButtons() {
      elements.menuStartBtn?.addEventListener("click", restartRunAndEnterGame);
      elements.menuRankBtn?.addEventListener("click", function () { setScreen("rank"); syncUi(); });
      elements.menuPetBtn?.addEventListener("click", function () { setScreen("pet"); syncUi(); });
      elements.menuExitBtn?.addEventListener("click", function () {
        setScreen("menu");
        show(elements.resultPanel, false);
        show(elements.pausePanel, false);
      });

      elements.rankBackBtn?.addEventListener("click", function () { setScreen("menu"); });
      elements.rankRefreshBtn?.addEventListener("click", syncRankPanel);
      elements.petBackBtn?.addEventListener("click", function () { setScreen("menu"); });

      elements.gameMenuBtn?.addEventListener("click", function () {
        if (core.state.paused) {
          show(elements.pausePanel, false);
          setScreen("menu");
          return;
        }
        openPausePanel();
      });

      elements.resumeGameBtn?.addEventListener("click", function () { closePausePanel(true); });
      elements.pauseRestartBtn?.addEventListener("click", restartRunAndEnterGame);
      elements.pauseHelpBtn?.addEventListener("click", function () {
        safeText(elements.statusBanner, "玩法说明：拖动对准，松手投放，同类会自动合成。");
      });

      elements.resultRestartBtn?.addEventListener("click", restartRunAndEnterGame);
      elements.resultExitBtn?.addEventListener("click", function () {
        show(elements.resultPanel, false);
        setScreen("menu");
      });
      elements.resultDoubleRewardBtn?.addEventListener("click", function () {
        safeText(elements.resultShareStatus, "当前网页验收版仅保留占位，后续接 `wx.shareAppMessage` 与激励广告。");
      });

      elements.gamePetChip?.addEventListener("click", function () {
        if (currentScreen === "game" && !core.state.gameOver && !core.state.paused) {
          openPausePanel();
        }
        setScreen("pet");
        syncUi();
      });

      elements.gameAudioBtn?.addEventListener("click", function () {
        settings.audioEnabled = !settings.audioEnabled;
        persistSettings();
        audio.syncVolume();
        if (!settings.audioEnabled) {
          audio.stop();
        } else if (core.state.started && !core.state.paused && !core.state.gameOver) {
          audio.start();
        }
        syncUi();
      });
    }

    bindCanvasEvents();
    bindButtons();
    initToolGrid(elements.gameToolGrid);
    setScreen("menu");
    resizeCanvas();
    syncUi();

    root.addEventListener("resize", resizeCanvas);
    root.addEventListener("online", syncUi);
    root.addEventListener("offline", syncUi);
    doc.addEventListener("visibilitychange", function () {
      if (doc.hidden) {
        audio.stop();
      } else if (settings.audioEnabled && core.state.started && !core.state.paused && !core.state.gameOver) {
        audio.start();
      }
    });

    createLoop(function (dt) {
      core.update(dt);
      core.render();
      syncUi();
    });

    return { core, resizeCanvas, setScreen };
  }

  function initWxMiniGameMain() {
    const wxApi = root.wx;
    if (!wxApi) {
      throw new Error("当前环境缺少 `wx`，不能启动微信小游戏主运行脚本。");
    }

    const settings = {
      audioEnabled: true,
      vibrateEnabled: true,
      volume: 0.42
    };
    const storage = createStorageAdapter("wx-mini-standard", wxApi);
    const audio = createWxAudioManager(settings, wxApi);
    const core = createCore({ storage, audio, settings, wx: wxApi });

    const systemInfo = wxApi.getSystemInfoSync();
    const canvas = (typeof GameGlobal !== "undefined" && GameGlobal.canvas) ? GameGlobal.canvas : wxApi.createCanvas();
    const ctx = canvas.getContext("2d");
    const dpr = systemInfo.pixelRatio || 1;
    canvas.width = systemInfo.windowWidth * dpr;
    canvas.height = systemInfo.windowHeight * dpr;
    core.attachRenderer(canvas, ctx);
    core.setViewport(systemInfo.windowWidth, systemInfo.windowHeight, dpr);

    function resize() {
      const info = wxApi.getSystemInfoSync();
      const nextDpr = info.pixelRatio || 1;
      canvas.width = info.windowWidth * nextDpr;
      canvas.height = info.windowHeight * nextDpr;
      core.setViewport(info.windowWidth, info.windowHeight, nextDpr);
      core.render();
    }

    if (typeof wxApi.setPreferredFramesPerSecond === "function") {
      wxApi.setPreferredFramesPerSecond(60);
    }
    if (typeof wxApi.onWindowResize === "function") {
      wxApi.onWindowResize(resize);
    }

    wxApi.onTouchStart(function (event) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return;
      core.handlePointerDown(touch.clientX, touch.clientY);
    });
    wxApi.onTouchMove(function (event) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return;
      core.handlePointerMove(touch.clientX, touch.clientY);
    });
    wxApi.onTouchEnd(function (event) {
      const touch = event.changedTouches[0];
      if (!touch) return;
      core.handlePointerUp(touch.clientX, touch.clientY);
    });
    wxApi.onTouchCancel(function (event) {
      const touch = event.changedTouches[0];
      if (!touch) return;
      core.handlePointerUp(touch.clientX, touch.clientY);
    });

    wxApi.onHide(function () {
      audio.stop();
      if (core.state.started && !core.state.gameOver && !core.state.paused) {
        core.togglePause();
      }
    });
    if (typeof wxApi.onShow === "function") {
      wxApi.onShow(function () {
        core.render();
      });
    }

    core.render();
    createLoop(function (dt) {
      core.update(dt);
      core.render();
    });

    return core;
  }

  return {
    initWebShell: initWebShell,
    initWxMiniGameMain: initWxMiniGameMain
  };
});
