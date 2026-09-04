(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobMergeCore = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const DESIGN_WIDTH = 390;
  const DESIGN_HEIGHT = 844;
  const PIT = { x: 19, y: 150, width: 352, height: 612 };
  const FLOOR_Y = PIT.y + PIT.height;
  const DANGER_LINE_Y = PIT.y + 60;
  const SPAWN_Y = 110;
  const DROP_COOLDOWN = 0.16;
  const GRAVITY = 1320;
  const MERGE_SCORE_FACTOR = 16;
  const MAX_WARNING_TIME = 2.6;
  const WALL_BOUNCE = 0.22;
  const FLOOR_BOUNCE = 0.16;
  const BUTTONS = {
    restart: { x: 18, y: 18, w: 84, h: 38 },
    pause: { x: 288, y: 18, w: 84, h: 38 }
  };
  const TYPES = [
    { key: "seed", label: "种子球", radius: 18, color: "#7dd3fc", score: 1 },
    { key: "bud", label: "幼芽球", radius: 24, color: "#86efac", score: 2 },
    { key: "puff", label: "啵啵球", radius: 31, color: "#f9a8d4", score: 4 },
    { key: "jelly", label: "果冻球", radius: 40, color: "#c4b5fd", score: 8 },
    { key: "orbit", label: "轨道球", radius: 52, color: "#fdba74", score: 16 },
    { key: "core", label: "星核球", radius: 66, color: "#fde68a", score: 32 },
    { key: "king", label: "大王球", radius: 82, color: "#93c5fd", score: 64 }
  ];
  const RESULT_BUTTON = { x: 105, y: 478, w: 180, h: 52 };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hitRect(point, rect) {
    return point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h;
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  class BlobMergeCore {
    constructor(options = {}) {
      this.platform = options.platform || {};
      this.canvas = null;
      this.ctx = null;
      this.viewport = { width: DESIGN_WIDTH, height: DESIGN_HEIGHT, dpr: 1 };
      this.sceneScale = 1;
      this.sceneOffsetX = 0;
      this.sceneOffsetY = 0;
      this.bestScore = this.readNumber("best-score", 0);
      this.dragging = false;
      this.pointerDownAt = null;
      this.lastTimestamp = 0;
      this.state = {
        blobs: [],
        pointerX: DESIGN_WIDTH / 2,
        nextType: 0,
        score: 0,
        drops: 0,
        merges: 0,
        highestType: 0,
        dropCooldown: 0,
        started: false,
        paused: false,
        gameOver: false,
        success: false,
        warningTime: 0,
        message: "点一下开始，先轻铺底。",
        elapsedMs: 0,
        bgmReady: false
      };
      this.idSeed = 1;
      this.resetRun();
    }

    attachRenderer(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
    }

    setViewport(width, height, dpr = 1) {
      this.viewport.width = Math.max(1, width);
      this.viewport.height = Math.max(1, height);
      this.viewport.dpr = Math.max(1, dpr);
      this.sceneScale = Math.min(this.viewport.width / DESIGN_WIDTH, this.viewport.height / DESIGN_HEIGHT);
      this.sceneOffsetX = (this.viewport.width - DESIGN_WIDTH * this.sceneScale) / 2;
      this.sceneOffsetY = (this.viewport.height - DESIGN_HEIGHT * this.sceneScale) / 2;
    }

    readNumber(key, fallbackValue) {
      const raw = this.platform.storageGet ? this.platform.storageGet(key) : null;
      const value = Number(raw);
      return Number.isFinite(value) ? value : fallbackValue;
    }

    writeNumber(key, value) {
      if (this.platform.storageSet) {
        this.platform.storageSet(key, Number(value));
      }
    }

    randomTypeIndex() {
      const table = [0, 0, 0, 1, 1, 1, 2, 2, 3];
      return table[Math.floor(Math.random() * table.length)];
    }

    createBlob(typeIndex, x, y, vx = 0, vy = 0) {
      const type = TYPES[typeIndex];
      return {
        id: this.idSeed++,
        typeIndex,
        x,
        y,
        vx,
        vy,
        radius: type.radius,
        color: type.color,
        moodSeed: Math.random() * Math.PI * 2,
        blinkSeed: Math.random() * Math.PI * 2,
        age: 0
      };
    }

    resetRun() {
      this.state.blobs = [];
      this.state.pointerX = DESIGN_WIDTH / 2;
      this.state.nextType = this.randomTypeIndex();
      this.state.score = 0;
      this.state.drops = 0;
      this.state.merges = 0;
      this.state.highestType = 0;
      this.state.dropCooldown = 0;
      this.state.started = false;
      this.state.paused = false;
      this.state.gameOver = false;
      this.state.success = false;
      this.state.warningTime = 0;
      this.state.message = "点一下开始，先轻铺底。";
      this.state.elapsedMs = 0;
      this.dragging = false;
      this.pointerDownAt = null;
      if (this.platform.stopBgm) {
        this.platform.stopBgm();
      }
    }

    togglePause() {
      if (this.state.gameOver) return;
      if (!this.state.started) return;
      this.state.paused = !this.state.paused;
      this.state.message = this.state.paused ? "已暂停，点右上角继续。" : "继续整理高点，别急着压中路。";
      if (this.state.paused) {
        this.platform.stopBgm && this.platform.stopBgm();
      } else {
        this.platform.startBgm && this.platform.startBgm();
      }
    }

    startIfNeeded() {
      if (this.state.started) return;
      this.state.started = true;
      this.state.paused = false;
      this.state.message = "开始了，先把底部铺平。";
      this.platform.startBgm && this.platform.startBgm();
    }

    dropBlob() {
      if (this.state.gameOver || this.state.paused) return;
      if (this.state.dropCooldown > 0) return;
      this.startIfNeeded();
      const typeIndex = this.state.nextType;
      const spawnX = clamp(this.state.pointerX, PIT.x + 28, PIT.x + PIT.width - 28);
      const blob = this.createBlob(typeIndex, spawnX, SPAWN_Y, randomRange(-30, 30), 0);
      this.state.blobs.push(blob);
      this.state.nextType = this.randomTypeIndex();
      this.state.dropCooldown = DROP_COOLDOWN;
      this.state.drops += 1;
      this.state.message = `已投下 ${TYPES[typeIndex].label}，下一手优先整理支撑面。`;
    }

    finishRun(success) {
      if (this.state.gameOver) return;
      this.state.gameOver = true;
      this.state.success = Boolean(success);
      this.state.paused = false;
      if (this.state.score > this.bestScore) {
        this.bestScore = this.state.score;
        this.writeNumber("best-score", this.bestScore);
      }
      this.state.message = success
        ? "你已经合出大王球，可以再来一局继续验收。"
        : "顶线失败了，点面板按钮直接重开。";
      this.platform.stopBgm && this.platform.stopBgm();
      this.platform.vibrate && this.platform.vibrate(success ? 18 : 40);
    }

    update(dt) {
      this.state.dropCooldown = Math.max(0, this.state.dropCooldown - dt);
      if (!this.state.started || this.state.paused || this.state.gameOver) {
        return;
      }

      this.state.elapsedMs += dt * 1000;
      const blobs = this.state.blobs;
      for (let i = 0; i < blobs.length; i += 1) {
        const blob = blobs[i];
        blob.age += dt;
        blob.vy += GRAVITY * dt;
        blob.x += blob.vx * dt;
        blob.y += blob.vy * dt;
        blob.vx *= 0.998;
        blob.vy *= 0.998;

        if (blob.x - blob.radius < PIT.x) {
          blob.x = PIT.x + blob.radius;
          blob.vx = Math.abs(blob.vx) * WALL_BOUNCE;
        }
        if (blob.x + blob.radius > PIT.x + PIT.width) {
          blob.x = PIT.x + PIT.width - blob.radius;
          blob.vx = -Math.abs(blob.vx) * WALL_BOUNCE;
        }
        if (blob.y + blob.radius > FLOOR_Y) {
          blob.y = FLOOR_Y - blob.radius;
          blob.vy = -Math.abs(blob.vy) * FLOOR_BOUNCE;
          if (Math.abs(blob.vy) < 18) blob.vy = 0;
        }
      }

      this.resolveCollisions();
      this.resolveMerges();
      this.updateDanger(dt);
    }

    resolveCollisions() {
      const blobs = this.state.blobs;
      for (let i = 0; i < blobs.length; i += 1) {
        for (let j = i + 1; j < blobs.length; j += 1) {
          const a = blobs[i];
          const b = blobs[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const minDist = a.radius + b.radius;
          if (dist >= minDist) continue;

          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * overlap * 0.5;
          a.y -= ny * overlap * 0.5;
          b.x += nx * overlap * 0.5;
          b.y += ny * overlap * 0.5;

          const push = overlap * 7.5;
          a.vx -= nx * push;
          a.vy -= ny * push;
          b.vx += nx * push;
          b.vy += ny * push;
        }
      }
    }

    resolveMerges() {
      const blobs = this.state.blobs;
      const removed = new Set();
      const spawned = [];
      for (let i = 0; i < blobs.length; i += 1) {
        if (removed.has(blobs[i].id)) continue;
        for (let j = i + 1; j < blobs.length; j += 1) {
          if (removed.has(blobs[j].id)) continue;
          const a = blobs[i];
          const b = blobs[j];
          if (a.typeIndex !== b.typeIndex) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          if (dist > (a.radius + b.radius) * 0.52) continue;
          removed.add(a.id);
          removed.add(b.id);
          const nextIndex = Math.min(TYPES.length - 1, a.typeIndex + 1);
          const merged = this.createBlob(
            nextIndex,
            (a.x + b.x) * 0.5,
            (a.y + b.y) * 0.5,
            (a.vx + b.vx) * 0.18,
            -180
          );
          spawned.push(merged);
          this.state.score += TYPES[nextIndex].score * MERGE_SCORE_FACTOR;
          this.state.merges += 1;
          this.state.highestType = Math.max(this.state.highestType, nextIndex);
          this.state.message = `合成了 ${TYPES[nextIndex].label}，继续留住底部空间。`;
          if (nextIndex === TYPES.length - 1) {
            this.finishRun(true);
          }
          break;
        }
      }

      if (!removed.size) return;
      this.state.blobs = blobs.filter((blob) => !removed.has(blob.id)).concat(spawned);
      if (this.state.score > this.bestScore) {
        this.bestScore = this.state.score;
        this.writeNumber("best-score", this.bestScore);
      }
    }

    updateDanger(dt) {
      if (!this.state.blobs.length) {
        this.state.warningTime = Math.max(0, this.state.warningTime - dt * 2);
        return;
      }
      let topY = FLOOR_Y;
      for (let i = 0; i < this.state.blobs.length; i += 1) {
        topY = Math.min(topY, this.state.blobs[i].y - this.state.blobs[i].radius);
      }
      if (topY <= DANGER_LINE_Y) {
        this.state.warningTime += dt;
      } else {
        this.state.warningTime = Math.max(0, this.state.warningTime - dt * 1.4);
      }
      if (this.state.warningTime >= MAX_WARNING_TIME) {
        this.finishRun(false);
      }
    }

    screenToWorld(x, y) {
      return {
        x: (x - this.sceneOffsetX) / this.sceneScale,
        y: (y - this.sceneOffsetY) / this.sceneScale
      };
    }

    handlePointerDown(rawX, rawY) {
      const point = this.screenToWorld(rawX, rawY);
      this.pointerDownAt = point;

      if (this.state.gameOver) {
        if (hitRect(point, RESULT_BUTTON)) {
          this.resetRun();
        }
        return;
      }

      if (hitRect(point, BUTTONS.restart)) {
        this.resetRun();
        return;
      }
      if (hitRect(point, BUTTONS.pause)) {
        this.togglePause();
        return;
      }
      this.dragging = true;
      this.state.pointerX = clamp(point.x, PIT.x + 28, PIT.x + PIT.width - 28);
      this.platform.startBgm && this.platform.startBgm();
    }

    handlePointerMove(rawX, rawY) {
      if (!this.dragging) return;
      const point = this.screenToWorld(rawX, rawY);
      this.state.pointerX = clamp(point.x, PIT.x + 28, PIT.x + PIT.width - 28);
    }

    handlePointerUp(rawX, rawY) {
      const point = this.screenToWorld(rawX, rawY);
      if (this.dragging) {
        this.state.pointerX = clamp(point.x, PIT.x + 28, PIT.x + PIT.width - 28);
        this.dragging = false;
        this.dropBlob();
      }
      this.pointerDownAt = null;
    }

    render() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      ctx.setTransform(this.viewport.dpr, 0, 0, this.viewport.dpr, 0, 0);
      ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);

      const background = ctx.createLinearGradient(0, 0, 0, this.viewport.height);
      background.addColorStop(0, "#091220");
      background.addColorStop(1, "#1b3157");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);

      ctx.save();
      ctx.translate(this.sceneOffsetX, this.sceneOffsetY);
      ctx.scale(this.sceneScale, this.sceneScale);
      this.drawScene(ctx);
      ctx.restore();
    }

    drawScene(ctx) {
      const panelGradient = ctx.createLinearGradient(0, 0, 0, DESIGN_HEIGHT);
      panelGradient.addColorStop(0, "#13274a");
      panelGradient.addColorStop(1, "#0f1f39");
      ctx.fillStyle = panelGradient;
      this.roundRect(ctx, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 28, true, false);

      this.drawHud(ctx);
      this.drawPit(ctx);
      this.drawGuideLine(ctx);
      this.drawBlobs(ctx);
      this.drawOverlay(ctx);
    }

    drawHud(ctx) {
      this.drawButton(ctx, BUTTONS.restart, "重开", "#0f766e");
      this.drawButton(ctx, BUTTONS.pause, this.state.paused ? "继续" : "暂停", "#1d4ed8");

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "700 24px sans-serif";
      ctx.fillText("我要当大王", 20, 96);

      ctx.font = "500 12px sans-serif";
      ctx.fillStyle = "rgba(219,234,254,0.88)";
      ctx.fillText("微信小游戏标准骨架 + 手机验收共用核心", 20, 118);

      this.drawInfoCard(ctx, 20, 642, 110, 72, "分数", String(this.state.score));
      this.drawInfoCard(ctx, 140, 642, 110, 72, "最高", String(this.bestScore));
      this.drawInfoCard(ctx, 260, 642, 110, 72, "用时", formatSeconds(Math.floor(this.state.elapsedMs / 1000)));

      ctx.fillStyle = "rgba(255,255,255,0.12)";
      this.roundRect(ctx, 20, 724, 350, 92, 22, true, false);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "600 14px sans-serif";
      ctx.fillText("当前提示", 34, 748);
      ctx.font = "500 14px sans-serif";
      ctx.fillStyle = "#cbd5e1";
      this.drawWrappedText(ctx, this.state.message, 34, 772, 322, 20);

      const next = TYPES[this.state.nextType];
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      this.roundRect(ctx, 260, 84, 110, 88, 18, true, false);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "600 12px sans-serif";
      ctx.fillText("下一只", 278, 108);
      ctx.beginPath();
      ctx.fillStyle = next.color;
      ctx.arc(300, 138, next.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 13px sans-serif";
      ctx.fillText(next.label, 324, 142);
    }

    drawInfoCard(ctx, x, y, w, h, label, value) {
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      this.roundRect(ctx, x, y, w, h, 18, true, false);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "600 12px sans-serif";
      ctx.fillText(label, x + 14, y + 22);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 24px sans-serif";
      ctx.fillText(value, x + 14, y + 52);
    }

    drawPit(ctx) {
      const pitGradient = ctx.createLinearGradient(0, PIT.y, 0, FLOOR_Y);
      pitGradient.addColorStop(0, "#0b1324");
      pitGradient.addColorStop(1, "#132340");
      ctx.fillStyle = pitGradient;
      this.roundRect(ctx, PIT.x, PIT.y, PIT.width, PIT.height, 28, true, false);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.34)";
      ctx.lineWidth = 2;
      this.roundRect(ctx, PIT.x, PIT.y, PIT.width, PIT.height, 28, false, true);
    }

    drawGuideLine(ctx) {
      const percent = clamp(this.state.warningTime / MAX_WARNING_TIME, 0, 1);
      ctx.strokeStyle = percent > 0.7 ? "#ef4444" : percent > 0.25 ? "#f59e0b" : "rgba(248,113,113,0.55)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(PIT.x + 16, DANGER_LINE_Y);
      ctx.lineTo(PIT.x + PIT.width - 16, DANGER_LINE_Y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#fee2e2";
      ctx.font = "700 12px sans-serif";
      ctx.fillText("危险线", PIT.x + 16, DANGER_LINE_Y - 8);

      ctx.fillStyle = "rgba(255,255,255,0.12)";
      this.roundRect(ctx, 20, 134, 350, 10, 999, true, false);
      ctx.fillStyle = percent > 0.7 ? "#ef4444" : percent > 0.25 ? "#f59e0b" : "#38bdf8";
      this.roundRect(ctx, 20, 134, 350 * percent, 10, 999, true, false);
    }

    drawBlobs(ctx) {
      const blobs = this.state.blobs.slice().sort((a, b) => a.radius - b.radius);
      for (let i = 0; i < blobs.length; i += 1) {
        const blob = blobs[i];
        ctx.save();
        ctx.translate(blob.x, blob.y);
        ctx.fillStyle = blob.color;
        ctx.beginPath();
        ctx.arc(0, 0, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath();
        ctx.arc(-blob.radius * 0.28, -blob.radius * 0.34, blob.radius * 0.34, 0, Math.PI * 2);
        ctx.fill();

        const blink = Math.sin(blob.age * 3 + blob.blinkSeed) > 0.92;
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = Math.max(2, blob.radius * 0.08);
        if (blink) {
          ctx.beginPath();
          ctx.moveTo(-blob.radius * 0.3, -blob.radius * 0.05);
          ctx.lineTo(-blob.radius * 0.1, -blob.radius * 0.05);
          ctx.moveTo(blob.radius * 0.1, -blob.radius * 0.05);
          ctx.lineTo(blob.radius * 0.3, -blob.radius * 0.05);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(-blob.radius * 0.18, -blob.radius * 0.05, blob.radius * 0.08, 0, Math.PI * 2);
          ctx.arc(blob.radius * 0.18, -blob.radius * 0.05, blob.radius * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = "#0f172a";
          ctx.fill();
        }

        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = Math.max(2, blob.radius * 0.07);
        ctx.beginPath();
        ctx.arc(0, blob.radius * 0.08, blob.radius * 0.28, 0.1, Math.PI - 0.1);
        ctx.stroke();
        ctx.restore();
      }

      if (!this.state.gameOver) {
        const guideX = clamp(this.state.pointerX, PIT.x + 28, PIT.x + PIT.width - 28);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(guideX, 78);
        ctx.lineTo(guideX, PIT.y + 18);
        ctx.stroke();

        ctx.fillStyle = TYPES[this.state.nextType].color;
        ctx.beginPath();
        ctx.arc(guideX, 94, TYPES[this.state.nextType].radius * 0.72, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawOverlay(ctx) {
      if (!this.state.started && !this.state.gameOver) {
        this.drawCenterPanel(ctx, "准备开始", "点任意位置开始。手机和 PC 都按这套尺寸验收。", "开始");
        return;
      }
      if (this.state.paused && !this.state.gameOver) {
        this.drawCenterPanel(ctx, "已暂停", "当前局面已冻结，点右上角继续或左上角重开。", "继续");
        return;
      }
      if (this.state.gameOver) {
        const title = this.state.success ? "挑战成功" : "挑战失败";
        const copy = this.state.success
          ? `你已经合出 ${TYPES[TYPES.length - 1].label}，当前分数 ${this.state.score}。`
          : `这局分数 ${this.state.score}，危险线累计超过阈值。`;
        this.drawCenterPanel(ctx, title, copy, "再来一局");
      }
    }

    drawCenterPanel(ctx, title, copy, action) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.56)";
      ctx.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      ctx.fillStyle = "#10213d";
      this.roundRect(ctx, 44, 244, 302, 308, 28, true, false);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 2;
      this.roundRect(ctx, 44, 244, 302, 308, 28, false, true);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 28px sans-serif";
      ctx.fillText(title, 70, 304);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "500 16px sans-serif";
      this.drawWrappedText(ctx, copy, 70, 344, 250, 24);

      ctx.fillStyle = "#22c55e";
      this.roundRect(ctx, RESULT_BUTTON.x, RESULT_BUTTON.y, RESULT_BUTTON.w, RESULT_BUTTON.h, 16, true, false);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 18px sans-serif";
      ctx.fillText(action, RESULT_BUTTON.x + 50, RESULT_BUTTON.y + 32);
    }

    drawButton(ctx, rect, text, color) {
      ctx.fillStyle = color;
      this.roundRect(ctx, rect.x, rect.y, rect.w, rect.h, 14, true, false);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 16px sans-serif";
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, rect.x + (rect.w - textWidth) / 2, rect.y + 25);
    }

    drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
      const chars = String(text).split("");
      let line = "";
      let cursorY = y;
      for (let i = 0; i < chars.length; i += 1) {
        const test = line + chars[i];
        if (ctx.measureText(test).width > maxWidth && line) {
          ctx.fillText(line, x, cursorY);
          line = chars[i];
          cursorY += lineHeight;
        } else {
          line = test;
        }
      }
      if (line) {
        ctx.fillText(line, x, cursorY);
      }
    }

    roundRect(ctx, x, y, w, h, r, fill, stroke) {
      const radius = Math.min(r, w * 0.5, h * 0.5);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    }
  }

  return BlobMergeCore;
});
