(function (root) {
  "use strict";

  const BGM_SRC = "./assets/ui-test-003/audio/bgm-fruit-candy-loop.m4a";
  const STORAGE_KEY = "ui-test-003:audio-enabled";

  function createAudio(settings) {
    let bgm = null;
    let context = null;
    let master = null;

    function ensureBgm() {
      if (bgm) return bgm;
      bgm = new Audio(BGM_SRC);
      bgm.loop = true;
      bgm.preload = "auto";
      bgm.volume = 0.38;
      bgm.playsInline = true;
      bgm.setAttribute("playsinline", "");
      bgm.setAttribute("webkit-playsinline", "");
      return bgm;
    }

    function ensureContext() {
      if (context) return context;
      const AudioContext = root.AudioContext || root.webkitAudioContext;
      if (!AudioContext) return null;
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = 0.28;
      master.connect(context.destination);
      return context;
    }

    function tone(frequency, start, duration, gain, type) {
      if (!context || !master) return;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = type || "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.16, start + duration);
      envelope.gain.setValueAtTime(0.0001, start);
      envelope.gain.exponentialRampToValueAtTime(gain, start + 0.012);
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);
    }

    return {
      start() {
        if (!settings.audioEnabled) return;
        const player = ensureBgm();
        player.play().catch(function () {});
        const ctx = ensureContext();
        if (ctx && ctx.state === "suspended") ctx.resume().catch(function () {});
      },
      stop() {
        if (bgm) bgm.pause();
      },
      setEnabled(enabled) {
        settings.audioEnabled = enabled;
        if (!enabled) this.stop();
      },
      playMerge(level) {
        if (!settings.audioEnabled) return;
        const ctx = ensureContext();
        if (!ctx) return;
        if (ctx.state === "suspended") ctx.resume().catch(function () {});
        const now = ctx.currentTime + 0.008;
        const base = 330 * Math.pow(2, level / 12);
        tone(base, now, 0.16, 0.24, "sine");
        tone(base * 1.5, now + 0.055, 0.2, 0.18, "triangle");
        tone(base * 2, now + 0.11, 0.24, 0.13, "sine");
      },
      get source() {
        return BGM_SRC;
      }
    };
  }

  function init(doc) {
    if (!root.BlobMergeCoreUiTest003) {
      throw new Error("UI-TEST-003 独立核心未加载");
    }
    const canvas = doc.getElementById("gameCanvas003");
    if (!canvas) throw new Error("找不到 UI-TEST-003 游戏画布");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("浏览器不支持 Canvas 2D");

    const nodes = {
      score: doc.getElementById("scoreValue003"),
      merges: doc.getElementById("mergeValue003"),
      level: doc.getElementById("levelValue003"),
      nextImage: doc.getElementById("nextFruit003"),
      nextName: doc.getElementById("nextName003"),
      danger: doc.getElementById("dangerFill003"),
      start: doc.getElementById("startButton003"),
      reset: doc.getElementById("resetButton003"),
      audio: doc.getElementById("audioButton003"),
      status: doc.getElementById("statusText003"),
      stage: doc.getElementById("gameStage003")
    };
    let storedAudio = true;
    try {
      storedAudio = root.localStorage.getItem(STORAGE_KEY) !== "0";
    } catch {
      storedAudio = true;
    }
    const settings = { audioEnabled: storedAudio };
    const audio = createAudio(settings);
    const core = new root.BlobMergeCoreUiTest003({
      platform: {
        startBgm: function () { audio.start(); },
        stopBgm: function () { audio.stop(); },
        playMergeSound: function (level) { audio.playMerge(level); },
        vibrate: function (duration) {
          if (root.navigator && root.navigator.vibrate) root.navigator.vibrate(duration);
        }
      },
      onStateChange: sync
    });
    core.attachRenderer(canvas, ctx);

    function sync(snapshot) {
      snapshot = snapshot || core.getSnapshot();
      if (nodes.score) nodes.score.textContent = String(snapshot.score);
      if (nodes.merges) nodes.merges.textContent = String(snapshot.merges);
      if (nodes.level) nodes.level.textContent = `${snapshot.highestLevel + 1}/7`;
      if (nodes.nextImage) {
        nodes.nextImage.src = snapshot.nextImage;
        nodes.nextImage.alt = `下一个水果：${snapshot.nextName}`;
      }
      if (nodes.nextName) nodes.nextName.textContent = snapshot.nextName;
      if (nodes.danger) nodes.danger.style.width = `${Math.round(snapshot.danger * 100)}%`;
      if (nodes.start) {
        nodes.start.textContent = snapshot.running
          ? (snapshot.paused ? "继续" : "暂停")
          : (snapshot.gameOver ? "再来" : "开始");
      }
      if (nodes.audio) {
        nodes.audio.textContent = settings.audioEnabled ? "音乐开" : "音乐关";
        nodes.audio.setAttribute("aria-pressed", settings.audioEnabled ? "true" : "false");
      }
      if (nodes.status) {
        nodes.status.textContent = snapshot.gameOver
          ? "危险线持续超时，本局结束"
          : snapshot.paused
            ? "已暂停"
            : snapshot.running
              ? "拖动瞄准，松手投放同级水果"
              : "点击开始，体验 7 级水果合成";
      }
    }

    function resize() {
      const rect = nodes.stage.getBoundingClientRect();
      const width = Math.max(300, Math.floor(rect.width));
      const height = Math.max(414, Math.floor(rect.height));
      const dpr = Math.max(1, Math.min(2, root.devicePixelRatio || 1));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      core.setViewport(width, height, dpr);
      core.render();
    }

    function point(event) {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    let aiming = false;
    canvas.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      const p = point(event);
      aiming = true;
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      core.setPointerFromScreen(p.x, p.y);
    }, { passive: false });
    canvas.addEventListener("pointermove", function (event) {
      if (!aiming) return;
      event.preventDefault();
      const p = point(event);
      core.setPointerFromScreen(p.x, p.y);
    }, { passive: false });
    canvas.addEventListener("pointerup", function (event) {
      if (!aiming) return;
      event.preventDefault();
      aiming = false;
      const p = point(event);
      const world = core.setPointerFromScreen(p.x, p.y);
      if (!core.state.running) core.start();
      core.dropAt(world.x);
      sync();
    }, { passive: false });
    canvas.addEventListener("pointercancel", function () { aiming = false; });
    canvas.addEventListener("contextmenu", function (event) { event.preventDefault(); });

    nodes.start.addEventListener("click", function () {
      if (!core.state.running) core.start();
      else core.togglePause();
      sync();
    });
    nodes.reset.addEventListener("click", function () {
      audio.stop();
      core.reset();
      core.start();
      sync();
    });
    nodes.audio.addEventListener("click", function () {
      settings.audioEnabled = !settings.audioEnabled;
      audio.setEnabled(settings.audioEnabled);
      try {
        root.localStorage.setItem(STORAGE_KEY, settings.audioEnabled ? "1" : "0");
      } catch {
        // 无存储权限时仅维持当前会话状态。
      }
      if (settings.audioEnabled && core.state.running && !core.state.paused) audio.start();
      sync();
    });

    root.addEventListener("resize", resize);
    doc.addEventListener("visibilitychange", function () {
      if (doc.hidden) audio.stop();
      else if (settings.audioEnabled && core.state.running && !core.state.paused) audio.start();
    });

    let previous = root.performance ? root.performance.now() : Date.now();
    function frame(now) {
      const dt = Math.min(0.034, Math.max(0.001, (now - previous) / 1000));
      previous = now;
      core.update(dt);
      core.render();
      sync();
      root.requestAnimationFrame(frame);
    }

    resize();
    sync();
    root.requestAnimationFrame(frame);
    const runtime = { core, audio, resize, settings };
    root.__uiTest003Runtime = runtime;
    return runtime;
  }

  root.GameWechatUiTest003 = { init, BGM_SRC };
  if (root.document) {
    const boot = function () {
      if (root.__UI_TEST_003_AUTO_INIT__ === false) return;
      init(root.document);
    };
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
      boot();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
