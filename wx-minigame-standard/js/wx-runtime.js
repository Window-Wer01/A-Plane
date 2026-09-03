const BlobMergeCore = require("./blob-merge-core.js");

function createWxAudioManager() {
  let audio = null;
  let started = false;

  function ensureAudio() {
    if (audio) return audio;
    audio = wx.createInnerAudioContext();
    audio.src = "assets/bgm-loop.wav";
    audio.loop = true;
    audio.volume = 0.42;
    return audio;
  }

  return {
    start() {
      const player = ensureAudio();
      if (!started) {
        started = true;
      }
      player.play();
    },
    stop() {
      if (!audio) return;
      audio.pause();
    }
  };
}

function createRenderer() {
  const systemInfo = wx.getSystemInfoSync();
  const canvas = (typeof GameGlobal !== "undefined" && GameGlobal.canvas) ? GameGlobal.canvas : wx.createCanvas();
  const ctx = canvas.getContext("2d");
  const dpr = systemInfo.pixelRatio || 1;
  canvas.width = systemInfo.windowWidth * dpr;
  canvas.height = systemInfo.windowHeight * dpr;
  return {
    canvas,
    ctx,
    width: systemInfo.windowWidth,
    height: systemInfo.windowHeight,
    dpr
  };
}

function initWxMiniGame() {
  const renderer = createRenderer();
  const audio = createWxAudioManager();
  const core = new BlobMergeCore({
    platform: {
      startBgm() {
        audio.start();
      },
      stopBgm() {
        audio.stop();
      },
      storageGet(key) {
        try {
          return wx.getStorageSync(`wx-mini-standard:${key}`);
        } catch {
          return "";
        }
      },
      storageSet(key, value) {
        try {
          wx.setStorageSync(`wx-mini-standard:${key}`, value);
        } catch {
          // ignore
        }
      },
      vibrate(duration) {
        if (duration > 24) {
          wx.vibrateShort({ type: "heavy" });
        } else {
          wx.vibrateShort({ type: "light" });
        }
      }
    }
  });

  if (typeof wx.setPreferredFramesPerSecond === "function") {
    wx.setPreferredFramesPerSecond(60);
  }

  core.attachRenderer(renderer.canvas, renderer.ctx);
  core.setViewport(renderer.width, renderer.height, renderer.dpr);

  function resize() {
    const systemInfo = wx.getSystemInfoSync();
    renderer.canvas.width = systemInfo.windowWidth * (systemInfo.pixelRatio || 1);
    renderer.canvas.height = systemInfo.windowHeight * (systemInfo.pixelRatio || 1);
    core.setViewport(systemInfo.windowWidth, systemInfo.windowHeight, systemInfo.pixelRatio || 1);
  }

  if (typeof wx.onWindowResize === "function") {
    wx.onWindowResize(resize);
  }

  let lastTime = Date.now();
  function loop() {
    const now = Date.now();
    const dt = Math.min(0.033, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;
    core.update(dt);
    core.render();
    requestAnimationFrame(loop);
  }

  wx.onTouchStart((event) => {
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) return;
    core.handlePointerDown(touch.clientX, touch.clientY);
  });
  wx.onTouchMove((event) => {
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) return;
    core.handlePointerMove(touch.clientX, touch.clientY);
  });
  wx.onTouchEnd((event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    core.handlePointerUp(touch.clientX, touch.clientY);
  });
  wx.onTouchCancel((event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    core.handlePointerUp(touch.clientX, touch.clientY);
  });

  wx.onHide(() => {
    audio.stop();
  });

  core.render();
  requestAnimationFrame(loop);
  return core;
}

module.exports = {
  initWxMiniGame
};
