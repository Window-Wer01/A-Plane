(function (root) {
  function createWebAudioManager() {
    let audio = null;
    let unlocked = false;

    function ensureAudio() {
      if (audio) return audio;
      audio = new Audio("./assets/bgm-paper-boat.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.42;
      audio.playsInline = true;
      audio.setAttribute("playsinline", "");
      audio.setAttribute("webkit-playsinline", "");
      return audio;
    }

    return {
      start() {
        const player = ensureAudio();
        if (!unlocked) {
          unlocked = true;
          player.load();
        }
        player.play().catch(() => {});
      },
      stop() {
        if (!audio) return;
        audio.pause();
      }
    };
  }

  function initBlobMergeWebPreview(options = {}) {
    const canvasId = options.canvasId || "gameCanvas";
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      throw new Error(`找不到画布：${canvasId}`);
    }
    const ctx = canvas.getContext("2d");
    const audio = createWebAudioManager();

    const core = new root.BlobMergeCore({
      platform: {
        startBgm() {
          audio.start();
        },
        stopBgm() {
          audio.stop();
        },
        storageGet(key) {
          try {
            return localStorage.getItem(`wx-mini-preview:${key}`);
          } catch {
            return null;
          }
        },
        storageSet(key, value) {
          try {
            localStorage.setItem(`wx-mini-preview:${key}`, String(value));
          } catch {
            // ignore
          }
        },
        vibrate(duration) {
          if (navigator.vibrate) navigator.vibrate(duration);
        }
      }
    });

    core.attachRenderer(canvas, ctx);

    function resize() {
      const wrapper = canvas.parentElement || canvas;
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(568, Math.floor(rect.height));
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      core.setViewport(width, height, dpr);
      core.render();
    }

    function pointFromCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function pointFromEvent(event) {
      return pointFromCoords(event.clientX, event.clientY);
    }

    function onPointerDown(event) {
      event.preventDefault();
      const point = pointFromEvent(event);
      core.handlePointerDown(point.x, point.y);
    }

    function onPointerMove(event) {
      if (!(event.buttons & 1) && event.pointerType === "mouse") return;
      const point = pointFromEvent(event);
      core.handlePointerMove(point.x, point.y);
    }

    function onPointerUp(event) {
      const point = pointFromEvent(event);
      core.handlePointerUp(point.x, point.y);
    }

    function onMouseDown(event) {
      const point = pointFromCoords(event.clientX, event.clientY);
      core.handlePointerDown(point.x, point.y);
    }

    function onMouseMove(event) {
      const point = pointFromCoords(event.clientX, event.clientY);
      core.handlePointerMove(point.x, point.y);
    }

    function onMouseUp(event) {
      const point = pointFromCoords(event.clientX, event.clientY);
      core.handlePointerUp(point.x, point.y);
    }

    function onTouchStart(event) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return;
      const point = pointFromCoords(touch.clientX, touch.clientY);
      core.handlePointerDown(point.x, point.y);
    }

    function onTouchMove(event) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return;
      const point = pointFromCoords(touch.clientX, touch.clientY);
      core.handlePointerMove(point.x, point.y);
    }

    function onTouchEnd(event) {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const point = pointFromCoords(touch.clientX, touch.clientY);
      core.handlePointerUp(point.x, point.y);
    }

    function onClick(event) {
      const point = pointFromCoords(event.clientX, event.clientY);
      core.handlePointerDown(point.x, point.y);
      core.handlePointerUp(point.x, point.y);
    }

    canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
    canvas.addEventListener("pointermove", onPointerMove, { passive: false });
    canvas.addEventListener("pointerup", onPointerUp, { passive: false });
    canvas.addEventListener("pointercancel", onPointerUp, { passive: false });
    canvas.addEventListener("mousedown", onMouseDown, { passive: false });
    window.addEventListener("mousemove", onMouseMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
    canvas.addEventListener("click", onClick, { passive: false });
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        audio.stop();
      }
    });

    let lastTime = performance.now();
    function frame(now) {
      const dt = Math.min(0.033, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      core.update(dt);
      core.render();
      requestAnimationFrame(frame);
    }

    resize();
    root.__blobMergePreview = { core, resize };
    requestAnimationFrame(frame);
    return core;
  }

  root.initBlobMergeWebPreview = initBlobMergeWebPreview;
})(typeof globalThis !== "undefined" ? globalThis : this);
