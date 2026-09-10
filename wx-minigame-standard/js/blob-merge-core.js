(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobMergeCore = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const BASE_DESIGN_WIDTH = 420;
  const BASE_DESIGN_HEIGHT = 760;
  const DESIGN_WIDTH = 750;
  const DESIGN_HEIGHT = 1334;
  const SCALE_X = DESIGN_WIDTH / BASE_DESIGN_WIDTH;
  const SCALE_Y = DESIGN_HEIGHT / BASE_DESIGN_HEIGHT;
  const SCALE_UI = Math.min(SCALE_X, SCALE_Y);
  const sx = (value) => value * SCALE_X;
  const sy = (value) => value * SCALE_Y;
  const su = (value) => value * SCALE_UI;
  const rect = (x, y, w, h) => ({ x: sx(x), y: sy(y), w: sx(w), h: sy(h) });
  const PIT = { x: 22, y: 154, width: 706, height: 1036 };
  const FLOOR_Y = PIT.y + PIT.height;
  const DANGER_LINE_Y = PIT.y + 60;
  const SPAWN_Y = 108;
  const DROP_COOLDOWN = 0.26;
  const BASE_GRAVITY = 560;
  const MAX_FALL_SPEED_BASE = 660;
  const MERGE_SCORE_FACTOR = 16;
  const MAX_WARNING_TIME = 2.6;
  const WALL_BOUNCE = 0.44;
  const FLOOR_BOUNCE = 0.34;
  const BLOB_RESTITUTION = 0.74;
  const STACK_SQUISH_PUSH = 64;
  const STACK_SQUISH_DOWN = 20;
  const MERGE_TOUCH_GAP = -0.8;
  const TOOL_DEFAULT_STOCK = 5;
  const CAPSULE_DURATION = 30;
  const CAPSULE_SAFE_BONUS = 0.05;
  const RAGE_DURATION = 5;
  const RAGE_RECOVER_DURATION = 0.28;
  const RAGE_SCALE = 2.5;
  const TOOL_META = {
    capsule: { label: "神秘胶囊", desc: "30 秒内危险线抬高 5%" },
    clean: { label: "移除道具", desc: "随机清掉一种 1-3 级生物" },
    rage: { label: "发脾气", desc: "下半区 4-6 级目标扩大并挤压 5 秒" },
    split: { label: "分裂弹", desc: "下一颗命中后把目标裂成两个 1 级生物" }
  };
  const TOOL_KEYS = ["capsule", "clean", "rage", "split"];
  const COUNTDOWN_TOTAL = 3;
  const MAX_REVIVES_PER_RUN = 3;
  const BUTTONS = {
    restart: rect(18, 18, 84, 38),
    pause: rect(318, 18, 84, 38)
  };
  const TYPES = [
    { key: "seed", label: "种子球", radius: su(18), color: "#7dd3fc", score: 1 },
    { key: "bud", label: "幼芽球", radius: su(24), color: "#86efac", score: 2 },
    { key: "puff", label: "啵啵球", radius: su(31), color: "#f9a8d4", score: 4 },
    { key: "jelly", label: "果冻球", radius: su(40), color: "#c4b5fd", score: 8 },
    { key: "orbit", label: "轨道球", radius: su(52), color: "#fdba74", score: 16 },
    { key: "core", label: "星核球", radius: su(66), color: "#fde68a", score: 32 },
    { key: "king", label: "大王球", radius: su(82), color: "#93c5fd", score: 64 }
  ];
  const RESULT_BUTTON = rect(120, 478, 180, 52);
  const RESULT_REVIVE_BUTTON = rect(36, 478, 112, 52);
  const RESULT_RESTART_BUTTON = rect(156, 478, 104, 52);
  const RESULT_EXIT_BUTTON = rect(268, 478, 108, 52);
  const CANVAS_TOOL_LAYOUT = [
    { key: "capsule", ...rect(24, 768, 82, 54) },
    { key: "clean", ...rect(112, 768, 82, 54) },
    { key: "rage", ...rect(200, 768, 82, 54) },
    { key: "split", ...rect(288, 768, 78, 54) }
  ];
  const DOM_VIEW_TOP = Math.max(0, SPAWN_Y - 12);

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
      this.monsterSprites = this.loadMonsterSprites();
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
        bgmReady: false,
        popups: [],
        bursts: [],
        sparks: [],
        cameraPunch: 0,
        countdownActive: false,
        countdownRemaining: 0,
        countdownValue: 0
      };
      this.revivesUsed = 0;
      this.reviveSnapshots = [];
      this.idSeed = 1;
      this.resetRun();
    }

    loadMonsterSprites() {
      try {
        if (typeof Image === "undefined") return null;
        const createSprite = function (src) {
          const sprite = new Image();
          sprite.decoding = "async";
          sprite.src = src;
          return sprite;
        };
        return {
          bubble: createSprite("./assets/bubble-creature.png")
        };
      } catch {
        return null;
      }
    }

    getMonsterSprite(typeIndex) {
      if (!this.monsterSprites) return null;
      return this.monsterSprites.bubble || null;
    }

    attachRenderer(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
    }

    setViewport(width, height, dpr = 1) {
      this.viewport.width = Math.max(1, width);
      this.viewport.height = Math.max(1, height);
      this.viewport.dpr = Math.max(1, dpr);
      if (this.platform.domUi) {
        this.sceneScale = this.viewport.width / DESIGN_WIDTH;
        this.sceneOffsetX = 0;
        this.sceneOffsetY = -DOM_VIEW_TOP * this.sceneScale;
        return;
      }
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
        baseRadius: type.radius,
        color: type.color,
        moodSeed: Math.random() * Math.PI * 2,
        blinkSeed: Math.random() * Math.PI * 2,
        age: 0,
        specialType: null,
        specialArmed: false
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
      this.state.popups = [];
      this.state.bursts = [];
      this.state.sparks = [];
      this.state.cameraPunch = 0;
      this.state.toolStocks = this.createDefaultToolStocks();
      this.state.capsuleTimer = 0;
      this.state.rageTimer = 0;
      this.state.rageRecoverTimer = 0;
      this.state.rageBlobId = null;
      this.state.splitBombArmed = false;
      this.state.countdownActive = false;
      this.state.countdownRemaining = 0;
      this.state.countdownValue = 0;
      this.dragging = false;
      this.pointerDownAt = null;
      this.revivesUsed = 0;
      this.reviveSnapshots = [];
      this.recordReviveSnapshot();
      if (this.platform.stopBgm) {
        this.platform.stopBgm();
      }
    }

    createDefaultToolStocks() {
      return {
        capsule: TOOL_DEFAULT_STOCK,
        clean: TOOL_DEFAULT_STOCK,
        rage: TOOL_DEFAULT_STOCK,
        split: TOOL_DEFAULT_STOCK
      };
    }

    armStartCountdown() {
      this.state.started = false;
      this.state.paused = false;
      this.state.gameOver = false;
      this.state.success = false;
      this.state.countdownActive = true;
      this.state.countdownRemaining = COUNTDOWN_TOTAL;
      this.state.countdownValue = COUNTDOWN_TOTAL;
      this.state.message = "红线正在闪烁，3 秒后开始。";
      this.platform.stopBgm && this.platform.stopBgm();
    }

    completeStartCountdown() {
      this.state.countdownActive = false;
      this.state.countdownRemaining = 0;
      this.state.countdownValue = 0;
      this.state.started = true;
      this.state.paused = false;
      this.state.message = "开始了，先把底部铺平。";
      this.platform.startBgm && this.platform.startBgm();
    }

    getDangerLineY() {
      const safeLift = this.state.capsuleTimer > 0 ? PIT.height * CAPSULE_SAFE_BONUS : 0;
      return DANGER_LINE_Y - safeLift;
    }

    getToolStocks() {
      if (!this.state.toolStocks) {
        this.state.toolStocks = this.createDefaultToolStocks();
      }
      return this.state.toolStocks;
    }

    getToolTimerText() {
      if (this.state.countdownActive) {
        return "";
      }
      if (this.state.capsuleTimer > 0) {
        return `神秘胶囊生效中，剩余 ${Math.ceil(this.state.capsuleTimer)} 秒`;
      }
      if (this.state.rageTimer > 0 || this.state.rageRecoverTimer > 0) {
        const remain = this.state.rageTimer > 0 ? this.state.rageTimer : this.state.rageRecoverTimer;
        return `发脾气生效中，剩余 ${Math.ceil(remain)} 秒`;
      }
      if (this.state.splitBombArmed) {
        return "分裂弹待命中";
      }
      return "";
    }

    getToolSnapshot() {
      const stocks = this.getToolStocks();
      return TOOL_KEYS.map((key) => {
        const meta = TOOL_META[key];
        const stock = Math.max(0, Number(stocks[key] || 0));
        const active =
          (key === "capsule" && this.state.capsuleTimer > 0) ||
          (key === "rage" && (this.state.rageTimer > 0 || this.state.rageRecoverTimer > 0)) ||
          (key === "split" && this.state.splitBombArmed);
        return {
          key,
          label: meta.label,
          desc: meta.desc,
          stock,
          active,
          disabled: stock <= 0 || !this.state.started || this.state.paused || this.state.gameOver || this.state.countdownActive
        };
      });
    }

    setStatus(text) {
      this.state.message = text;
    }

    getBottomHalfBounds() {
      if (!this.state.blobs.length) {
        return { top: PIT.y, bottom: PIT.y + PIT.height, splitY: PIT.y + PIT.height / 2 };
      }
      let top = Infinity;
      let bottom = -Infinity;
      for (let i = 0; i < this.state.blobs.length; i += 1) {
        const blob = this.state.blobs[i];
        top = Math.min(top, blob.y - blob.radius);
        bottom = Math.max(bottom, blob.y + blob.radius);
      }
      if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom <= top) {
        top = PIT.y;
        bottom = PIT.y + PIT.height;
      }
      return {
        top,
        bottom,
        splitY: top + (bottom - top) * 0.5
      };
    }

    getRemoveToolTargetTypeIndex() {
      const lowTypes = Array.from(new Set(
        this.state.blobs
          .map((blob) => blob.typeIndex)
          .filter((typeIndex) => typeIndex >= 0 && typeIndex <= 2)
      ));
      if (!lowTypes.length) return null;
      return lowTypes[Math.floor(Math.random() * lowTypes.length)];
    }

    getRageToolTarget() {
      const bounds = this.getBottomHalfBounds();
      const lowerHalfBlobs = this.state.blobs.filter((blob) => (
        blob.typeIndex >= 3 && blob.typeIndex <= 5 && blob.y >= bounds.splitY
      ));
      if (!lowerHalfBlobs.length) return null;
      const grouped = new Map();
      for (let i = 0; i < lowerHalfBlobs.length; i += 1) {
        const blob = lowerHalfBlobs[i];
        const area = Math.PI * blob.radius * blob.radius;
        const current = grouped.get(blob.typeIndex) || { typeIndex: blob.typeIndex, totalArea: 0, blobs: [] };
        current.totalArea += area;
        current.blobs.push(blob);
        grouped.set(blob.typeIndex, current);
      }
      const topGroups = Array.from(grouped.values())
        .sort((a, b) => b.totalArea - a.totalArea)
        .slice(0, 2);
      if (!topGroups.length) return null;
      const chosenGroup = topGroups[Math.floor(Math.random() * topGroups.length)];
      const target = chosenGroup.blobs[Math.floor(Math.random() * chosenGroup.blobs.length)];
      return target || null;
    }

    restoreRageBlob(blob) {
      if (!blob) return;
      blob.radius = blob.baseRadius || TYPES[blob.typeIndex].radius;
    }

    activateTool(key) {
      if (!TOOL_META[key]) {
        return { ok: false, message: "未知技能" };
      }
      if (!this.state.started || this.state.paused || this.state.gameOver || this.state.countdownActive) {
        return { ok: false, message: "当前状态不能用技能" };
      }
      const stocks = this.getToolStocks();
      if ((stocks[key] || 0) <= 0) {
        return { ok: false, message: `${TOOL_META[key].label}已用完` };
      }

      let ok = false;
      if (key === "capsule") {
        this.state.capsuleTimer = Math.max(this.state.capsuleTimer, CAPSULE_DURATION);
        this.setStatus("神秘胶囊发动，危险线暂时上抬 5%");
        ok = true;
      } else if (key === "clean") {
        const targetTypeIndex = this.getRemoveToolTargetTypeIndex();
        if (targetTypeIndex == null) {
          return { ok: false, message: "场上暂时没有 1-3 级目标" };
        }
        const before = this.state.blobs.length;
        this.state.blobs = this.state.blobs.filter((blob) => blob.typeIndex !== targetTypeIndex);
        const removedCount = before - this.state.blobs.length;
        this.setStatus(`移除道具发动，已清掉 ${TYPES[targetTypeIndex].label} 共 ${removedCount} 个`);
        ok = removedCount > 0;
      } else if (key === "rage") {
        const target = this.getRageToolTarget();
        if (!target) {
          return { ok: false, message: "场上暂时没有可发脾气的 4-6 级目标" };
        }
        if (this.state.rageBlobId) {
          const prev = this.state.blobs.find((blob) => blob.id === this.state.rageBlobId);
          this.restoreRageBlob(prev);
        }
        target.radius = (target.baseRadius || TYPES[target.typeIndex].radius) * RAGE_SCALE;
        target.vx *= 0.82;
        target.vy *= 0.82;
        this.state.rageBlobId = target.id;
        this.state.rageTimer = RAGE_DURATION;
        this.state.rageRecoverTimer = 0;
        this.setStatus(`发脾气发动，${TYPES[target.typeIndex].label} 巨化并挤压周围 5 秒`);
        ok = true;
      } else if (key === "split") {
        if (this.state.splitBombArmed) {
          return { ok: false, message: "分裂弹已经待命" };
        }
        this.state.splitBombArmed = true;
        this.setStatus("分裂弹待命，下一颗下落生物会在命中后裂解目标");
        ok = true;
      }

      if (ok) {
        stocks[key] = Math.max(0, Number(stocks[key] || 0) - 1);
        return { ok: true, message: this.state.message };
      }
      return { ok: false, message: `${TOOL_META[key].label}当前无法使用` };
    }

    createReviveSnapshot() {
      return {
        blobs: this.state.blobs.map((blob) => ({ ...blob })),
        pointerX: this.state.pointerX,
        nextType: this.state.nextType,
        score: this.state.score,
        drops: this.state.drops,
        merges: this.state.merges,
        highestType: this.state.highestType,
        warningTime: this.state.warningTime,
        elapsedMs: this.state.elapsedMs,
        toolStocks: { ...this.getToolStocks() },
        capsuleTimer: this.state.capsuleTimer,
        rageTimer: this.state.rageTimer,
        rageRecoverTimer: this.state.rageRecoverTimer,
        rageBlobId: this.state.rageBlobId,
        splitBombArmed: this.state.splitBombArmed
      };
    }

    recordReviveSnapshot() {
      this.reviveSnapshots.push(this.createReviveSnapshot());
      if (this.reviveSnapshots.length > 64) {
        this.reviveSnapshots = this.reviveSnapshots.slice(-64);
      }
    }

    canShareRevive() {
      return !this.state.success && this.state.gameOver && this.revivesUsed < MAX_REVIVES_PER_RUN && this.reviveSnapshots.length > 0;
    }

    restoreReviveSnapshot(snapshot) {
      if (!snapshot) return false;
      this.state.blobs = snapshot.blobs.map((blob) => ({ ...blob }));
      this.state.pointerX = snapshot.pointerX;
      this.state.nextType = snapshot.nextType;
      this.state.score = snapshot.score;
      this.state.drops = snapshot.drops;
      this.state.merges = snapshot.merges;
      this.state.highestType = snapshot.highestType;
      this.state.warningTime = snapshot.warningTime;
      this.state.elapsedMs = snapshot.elapsedMs;
      this.state.popups = [];
      this.state.bursts = [];
      this.state.sparks = [];
      this.state.cameraPunch = 0;
      this.state.toolStocks = { ...snapshot.toolStocks };
      this.state.capsuleTimer = snapshot.capsuleTimer || 0;
      this.state.rageTimer = snapshot.rageTimer || 0;
      this.state.rageRecoverTimer = snapshot.rageRecoverTimer || 0;
      this.state.rageBlobId = snapshot.rageBlobId || null;
      this.state.splitBombArmed = Boolean(snapshot.splitBombArmed);
      this.state.dropCooldown = 0;
      this.state.started = true;
      this.state.paused = false;
      this.state.gameOver = false;
      this.state.success = false;
      this.state.countdownActive = false;
      this.state.countdownRemaining = 0;
      this.state.countdownValue = 0;
      this.setStatus(`分享复活成功，已回退到结束前更早的局面。剩余 ${Math.max(0, MAX_REVIVES_PER_RUN - this.revivesUsed)} 次`);
      this.platform.startBgm && this.platform.startBgm();
      return true;
    }

    shareRevive() {
      if (!this.canShareRevive()) {
        return { ok: false, message: "当前无法分享复活" };
      }
      const targetDrops = Math.max(0, this.state.drops - 10);
      let snapshot = this.reviveSnapshots[0] || null;
      for (let i = this.reviveSnapshots.length - 1; i >= 0; i -= 1) {
        const candidate = this.reviveSnapshots[i];
        if (candidate && candidate.drops <= targetDrops) {
          snapshot = candidate;
          break;
        }
      }
      if (!snapshot) snapshot = this.reviveSnapshots[0] || null;
      if (!snapshot) {
        return { ok: false, message: "没有可用的复活快照" };
      }
      this.revivesUsed += 1;
      const ok = this.restoreReviveSnapshot(snapshot);
      return { ok, message: this.state.message, remain: Math.max(0, MAX_REVIVES_PER_RUN - this.revivesUsed) };
    }

    applySplitBombHit(splitBlob, targetBlob) {
      if (!splitBlob || !targetBlob) return false;
      const offset = Math.max(18, TYPES[0].radius * 1.15);
      const leftBlob = this.createBlob(
        0,
        clamp(targetBlob.x - offset, PIT.x + 20, PIT.x + PIT.width - 20),
        Math.max(PIT.y + 30, targetBlob.y - 8),
        -64,
        -110
      );
      const rightBlob = this.createBlob(
        0,
        clamp(targetBlob.x + offset, PIT.x + 20, PIT.x + PIT.width - 20),
        Math.max(PIT.y + 30, targetBlob.y - 8),
        64,
        -110
      );
      this.state.blobs = this.state.blobs.filter((blob) => blob.id !== splitBlob.id && blob.id !== targetBlob.id);
      this.state.blobs.push(leftBlob, rightBlob);
      this.setStatus("分裂弹命中，目标已裂成两个 1 级生物");
      return true;
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
      if (this.state.started || this.state.countdownActive) return;
      this.armStartCountdown();
    }

    dropBlob() {
      if (this.state.gameOver || this.state.paused || this.state.countdownActive) return;
      if (this.state.dropCooldown > 0) return;
      if (!this.state.started) return;
      const typeIndex = this.state.nextType;
      const spawnX = clamp(this.state.pointerX, PIT.x + 28, PIT.x + PIT.width - 28);
      const initialVy = -36 + Math.random() * 18;
      const initialVx = 0;
      const blob = this.createBlob(typeIndex, spawnX, SPAWN_Y, initialVx, initialVy);
      if (this.state.splitBombArmed) {
        blob.specialType = "splitBomb";
        blob.specialArmed = true;
        this.state.splitBombArmed = false;
      }
      this.state.blobs.push(blob);
      this.state.nextType = this.randomTypeIndex();
      this.state.dropCooldown = DROP_COOLDOWN;
      this.state.drops += 1;
      this.state.message = `已投下 ${TYPES[typeIndex].label}，下一手优先整理支撑面。`;
      this.recordReviveSnapshot();
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
      if (this.state.countdownActive) {
        this.state.countdownRemaining = Math.max(0, this.state.countdownRemaining - dt);
        this.state.countdownValue = Math.max(1, Math.ceil(this.state.countdownRemaining));
        if (this.state.countdownRemaining <= 0) {
          this.completeStartCountdown();
        }
        return;
      }
      if (!this.state.started || this.state.paused || this.state.gameOver) {
        return;
      }

      this.state.elapsedMs += dt * 1000;
      this.state.capsuleTimer = Math.max(0, this.state.capsuleTimer - dt);
      const subSteps = 3;
      const subDt = dt / subSteps;
      for (let i = 0; i < subSteps; i += 1) {
        this.advanceBlobs(subDt);
        this.updateRage(subDt);
        this.resolveCollisions();
        this.resolveMerges();
        this.updateDanger(subDt);
      }
      this.updateFx(dt);
    }

    advanceBlobs(dt) {
      const blobs = this.state.blobs;
      for (let i = 0; i < blobs.length; i += 1) {
        const blob = blobs[i];
        blob.age += dt;
        blob.vy = Math.min(blob.vy + this.getBlobGravity(blob) * dt, this.getBlobMaxFallSpeed(blob));
        blob.x += blob.vx * dt;
        blob.y += blob.vy * dt;
        blob.vx *= 0.99976;
        blob.vy *= 0.99986;

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
          if (Math.abs(blob.vy) < 14) blob.vy = 0;
        }
      }
    }

    updateRage(dt) {
      if (!this.state.rageBlobId) return;
      const blobs = this.state.blobs;
      const rageBlob = blobs.find((blob) => blob.id === this.state.rageBlobId);
      if (!rageBlob) {
        this.state.rageBlobId = null;
        this.state.rageTimer = 0;
        this.state.rageRecoverTimer = 0;
        return;
      }
      if (this.state.rageTimer > 0) {
        this.state.rageTimer = Math.max(0, this.state.rageTimer - dt);
        for (let i = 0; i < blobs.length; i += 1) {
          const blob = blobs[i];
          if (blob.id === rageBlob.id) continue;
          const dx = blob.x - rageBlob.x;
          const dy = blob.y - rageBlob.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const pushRange = rageBlob.radius + blob.radius + 54;
          if (dist > pushRange) continue;
          const force = (1 - dist / pushRange) * 220;
          const nx = dx / dist;
          const ny = dy / dist;
          blob.vx += nx * force * dt;
          blob.vy += ny * force * dt * 0.65;
        }
        if (this.state.rageTimer <= 0) {
          this.state.rageRecoverTimer = RAGE_RECOVER_DURATION;
        }
        return;
      }
      if (this.state.rageRecoverTimer > 0) {
        this.state.rageRecoverTimer = Math.max(0, this.state.rageRecoverTimer - dt);
        const recoverRatio = 1 - this.state.rageRecoverTimer / RAGE_RECOVER_DURATION;
        rageBlob.radius = (rageBlob.baseRadius || TYPES[rageBlob.typeIndex].radius) * (RAGE_SCALE - ((RAGE_SCALE - 1) * recoverRatio));
        if (this.state.rageRecoverTimer <= 0) {
          this.restoreRageBlob(rageBlob);
          this.state.rageBlobId = null;
        }
      }
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

          if (a.specialType === "splitBomb" && a.specialArmed) {
            if (this.applySplitBombHit(a, b)) return;
          }
          if (b.specialType === "splitBomb" && b.specialArmed) {
            if (this.applySplitBombHit(b, a)) return;
          }

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          const massA = this.getBlobMass(a);
          const massB = this.getBlobMass(b);
          const invMassA = 1 / massA;
          const invMassB = 1 / massB;
          const invMassSum = invMassA + invMassB;

          a.x -= nx * overlap * (invMassA / invMassSum);
          a.y -= ny * overlap * (invMassA / invMassSum);
          b.x += nx * overlap * (invMassB / invMassSum);
          b.y += ny * overlap * (invMassB / invMassSum);

          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const rel = rvx * nx + rvy * ny;
          const verticalLoad = Math.max(0, (a.radius + b.radius) - Math.abs(a.y - b.y));
          const tx = -ny;
          const ty = nx;
          const tangentRel = rvx * tx + rvy * ty;

          if (rel < 0) {
            const impulse = (-(1 + BLOB_RESTITUTION) * rel) / invMassSum;
            a.vx -= impulse * nx * invMassA;
            a.vy -= impulse * ny * invMassA;
            b.vx += impulse * nx * invMassB;
            b.vy += impulse * ny * invMassB;
          }

          const separationBoost = Math.min(30, overlap * 7.2);
          a.vx -= nx * separationBoost * invMassA * 8.4;
          a.vy -= ny * separationBoost * invMassA * 3.8;
          b.vx += nx * separationBoost * invMassB * 8.4;
          b.vy += ny * separationBoost * invMassB * 3.8;

          const slipBoost = Math.min(16, Math.abs(tangentRel) * 0.06 + overlap * 1.35);
          a.vx -= tx * slipBoost * invMassA;
          a.vy -= ty * slipBoost * invMassA * 0.2;
          b.vx += tx * slipBoost * invMassB;
          b.vy += ty * slipBoost * invMassB * 0.2;

          if (verticalLoad > minDist * 0.24) {
            const sideDir = dx === 0 ? (Math.random() > 0.5 ? 1 : -1) : Math.sign(dx);
            const squishPower = Math.min(1, verticalLoad / minDist);
            const lateral = STACK_SQUISH_PUSH * squishPower;
            const downward = STACK_SQUISH_DOWN * squishPower;
            a.vx -= sideDir * lateral * invMassA;
            b.vx += sideDir * lateral * invMassB;
            a.vy += downward * invMassA;
            b.vy += downward * invMassB;
          }
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
          if (a.specialType === "splitBomb" || b.specialType === "splitBomb") continue;
          if (a.age <= 0.01 || b.age <= 0.01) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const minDist = a.radius + b.radius;
          if (dist > minDist - MERGE_TOUCH_GAP) continue;
          removed.add(a.id);
          removed.add(b.id);
          const nextIndex = Math.min(TYPES.length - 1, a.typeIndex + 1);
          const merged = this.createBlob(
            nextIndex,
            (a.x + b.x) * 0.5,
            (a.y + b.y) * 0.5,
            (a.vx + b.vx) * 0.035,
            Math.min((a.vy + b.vy) * 0.035, -210)
          );
          spawned.push(merged);
          this.applyMergeShockwave(merged.x, merged.y, merged.radius, [merged.id]);
          this.spawnPopup(merged.x, merged.y, `啵！+${TYPES[nextIndex].score}`, TYPES[nextIndex].color);
          this.spawnBurst(merged.x, merged.y, TYPES[nextIndex].color, 1.18 + nextIndex * 0.28);
          this.spawnSparks(
            merged.x,
            merged.y,
            TYPES[nextIndex].color,
            14 + nextIndex * 3,
            210 + nextIndex * 32,
            0.68 + nextIndex * 0.04
          );
          if (nextIndex >= 4) {
            this.state.cameraPunch = Math.max(this.state.cameraPunch, 0.03 + nextIndex * 0.006);
          }
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
      let stableBlobCount = 0;
      const dangerLineY = this.getDangerLineY();
      for (let i = 0; i < this.state.blobs.length; i += 1) {
        const blob = this.state.blobs[i];
        const stableNearStack =
          Math.abs(blob.vy) <= 18 &&
          (blob.y + blob.radius >= FLOOR_Y - 6 || blob.y >= dangerLineY - blob.radius * 0.35);
        if (!stableNearStack) continue;
        stableBlobCount += 1;
        topY = Math.min(topY, blob.y - blob.radius);
      }
      if (stableBlobCount > 0 && topY <= dangerLineY) {
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
        if (this.platform.domUi) {
          if (hitRect(point, RESULT_BUTTON)) {
            this.resetRun();
            this.armStartCountdown();
          }
          return;
        }
        if (this.canShareRevive() && hitRect(point, RESULT_REVIVE_BUTTON)) {
          if (typeof this.platform.requestShareRevive === "function") {
            this.platform.requestShareRevive();
          } else {
            this.shareRevive();
          }
          return;
        }
        if (hitRect(point, RESULT_RESTART_BUTTON)) {
          this.resetRun();
          this.armStartCountdown();
          return;
        }
        if (hitRect(point, RESULT_EXIT_BUTTON)) {
          this.resetRun();
        }
        return;
      }

      if (hitRect(point, BUTTONS.restart)) {
        this.resetRun();
        this.armStartCountdown();
        return;
      }
      if (hitRect(point, BUTTONS.pause)) {
        this.togglePause();
        return;
      }
      if (!this.platform.domUi) {
        for (let i = 0; i < CANVAS_TOOL_LAYOUT.length; i += 1) {
          const rect = CANVAS_TOOL_LAYOUT[i];
          if (hitRect(point, rect)) {
            this.activateTool(rect.key);
            return;
          }
        }
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
      if (this.state.cameraPunch > 0) {
        const shake = this.state.cameraPunch * 16;
        ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake * 0.7);
      }
      ctx.scale(this.sceneScale, this.sceneScale);
      this.drawScene(ctx);
      ctx.restore();
    }

    drawScene(ctx) {
      if (this.platform.domUi) {
        ctx.fillStyle = "rgba(16, 33, 72, 0.22)";
        ctx.fillRect(0, PIT.y - 32, DESIGN_WIDTH, PIT.height + 64);
      } else {
        const panelGradient = ctx.createLinearGradient(0, 0, 0, DESIGN_HEIGHT);
        panelGradient.addColorStop(0, "#13274a");
        panelGradient.addColorStop(1, "#0f1f39");
        ctx.fillStyle = panelGradient;
        this.roundRect(ctx, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 28, true, false);
        this.drawHud(ctx);
      }

      this.drawPit(ctx);
      this.drawGuideLine(ctx);
      this.drawBlobs(ctx);
      this.drawFx(ctx);
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
      const dangerLineY = this.getDangerLineY();
      const countdownBlink = this.state.countdownActive && Math.floor((this.state.countdownRemaining % 1) * 10) < 5;
      ctx.strokeStyle = countdownBlink ? "#ef4444" : percent > 0.7 ? "#ef4444" : percent > 0.25 ? "#f59e0b" : "rgba(248,113,113,0.55)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(PIT.x + 16, dangerLineY);
      ctx.lineTo(PIT.x + PIT.width - 16, dangerLineY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (!this.platform.domUi) {
        ctx.fillStyle = "#fee2e2";
        ctx.font = "700 12px sans-serif";
        ctx.fillText(this.state.capsuleTimer > 0 ? "危险线↑" : "危险线", PIT.x + 16, dangerLineY - 8);

        ctx.fillStyle = "rgba(255,255,255,0.12)";
        this.roundRect(ctx, 20, 134, 350, 10, 999, true, false);
        ctx.fillStyle = percent > 0.7 ? "#ef4444" : percent > 0.25 ? "#f59e0b" : "#38bdf8";
        this.roundRect(ctx, 20, 134, 350 * percent, 10, 999, true, false);
      }
      if (percent > 0.02) {
        ctx.fillStyle = `rgba(251,113,133,${Math.min(0.12, percent * 0.16)})`;
        ctx.fillRect(PIT.x + 2, PIT.y + 2, PIT.width - 4, Math.max(0, dangerLineY - PIT.y));
      }
    }

    drawBlobs(ctx) {
      const blobs = this.state.blobs.slice().sort((a, b) => a.radius - b.radius);
      for (let i = 0; i < blobs.length; i += 1) {
        const blob = blobs[i];
        const sprite = this.getMonsterSprite(blob.typeIndex);
        const spriteReady = sprite && sprite.complete && sprite.naturalWidth > 0;
        ctx.save();
        ctx.translate(blob.x, blob.y);
        if (spriteReady) {
          ctx.fillStyle = "#111827";
          ctx.beginPath();
          ctx.arc(0, 0, blob.radius, 0, Math.PI * 2);
          ctx.fill();
          const coverSize = blob.radius * 3.2;
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, blob.radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.globalAlpha = 1;
          ctx.drawImage(sprite, -coverSize / 2, -coverSize / 2 - blob.radius * 0.18, coverSize, coverSize);
          ctx.restore();
          ctx.restore();
          continue;
        }

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
        ctx.moveTo(guideX, this.platform.domUi ? PIT.y + 8 : 78);
        ctx.lineTo(guideX, PIT.y + 18);
        ctx.stroke();
        if (!this.platform.domUi) {
          ctx.fillStyle = TYPES[this.state.nextType].color;
          ctx.beginPath();
          ctx.arc(guideX, 94, TYPES[this.state.nextType].radius * 0.72, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    drawFx(ctx) {
      for (let i = 0; i < this.state.popups.length; i += 1) {
        const popup = this.state.popups[i];
        const alpha = clamp(popup.life / 0.9, 0, 1);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = popup.color;
        ctx.font = "700 18px sans-serif";
        const width = ctx.measureText(popup.text).width;
        ctx.fillText(popup.text, popup.x - width / 2, popup.y);
        ctx.restore();
      }

      for (let i = 0; i < this.state.sparks.length; i += 1) {
        const spark = this.state.sparks[i];
        const alpha = clamp(spark.life / spark.maxLife, 0, 1);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < this.state.bursts.length; i += 1) {
        const burst = this.state.bursts[i];
        const alpha = clamp(burst.life / burst.maxLife, 0, 1);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = burst.color;
        ctx.lineWidth = Math.max(2, 4 * alpha);
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    updateFx(dt) {
      for (let i = 0; i < this.state.popups.length; i += 1) {
        const popup = this.state.popups[i];
        popup.life -= dt;
        popup.y -= 36 * dt;
      }
      this.state.popups = this.state.popups.filter((popup) => popup.life > 0);

      for (let i = 0; i < this.state.bursts.length; i += 1) {
        const burst = this.state.bursts[i];
        burst.life -= dt;
        burst.radius += 140 * dt * burst.scale;
      }
      this.state.bursts = this.state.bursts.filter((burst) => burst.life > 0);

      for (let i = 0; i < this.state.sparks.length; i += 1) {
        const spark = this.state.sparks[i];
        spark.life -= dt;
        spark.vy += 360 * dt;
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.vx *= 0.986;
        spark.vy *= 0.988;
      }
      this.state.sparks = this.state.sparks.filter((spark) => spark.life > 0);

      this.state.cameraPunch = Math.max(0, this.state.cameraPunch - dt * 0.12);
    }

    getBlobMass(blob) {
      const r = blob.radius || TYPES[blob.typeIndex].radius;
      return Math.max(0.8, r * r * 0.012);
    }

    getBlobGravity(blob) {
      return BASE_GRAVITY * (0.78 + blob.typeIndex * 0.055);
    }

    getBlobMaxFallSpeed(blob) {
      return MAX_FALL_SPEED_BASE * (0.92 + blob.typeIndex * 0.048);
    }

    spawnPopup(x, y, text, color = "#fff7ed") {
      this.state.popups.push({ x, y, text, color, life: 0.9 });
    }

    spawnBurst(x, y, color, scale = 1) {
      this.state.bursts.push({
        x,
        y,
        color,
        life: 0.65 + scale * 0.08,
        maxLife: 0.65 + scale * 0.08,
        radius: 24 + scale * 14,
        scale
      });
    }

    spawnSparks(x, y, color, count, speedBase, lifeBase) {
      const n = Math.max(6, Math.floor(count));
      for (let i = 0; i < n; i += 1) {
        const a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.35;
        const s = speedBase * (0.6 + Math.random() * 0.9);
        const life = lifeBase * (0.75 + Math.random() * 0.6);
        this.state.sparks.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - s * 0.08,
          r: 1.6 + Math.random() * 2.2,
          life,
          maxLife: life,
          color
        });
      }
    }

    applyMergeShockwave(x, y, mergedRadius, sourceIds = []) {
      const shockRange = mergedRadius * 2.4 + 38;
      for (let i = 0; i < this.state.blobs.length; i += 1) {
        const blob = this.state.blobs[i];
        if (sourceIds.includes(blob.id)) continue;
        const dx = blob.x - x;
        const dy = blob.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        if (dist > shockRange) continue;
        const power = (1 - dist / shockRange) * (mergedRadius * 2.45);
        const nx = dx / dist;
        const ny = dy / dist;
        blob.vx += nx * power * 4.1;
        blob.vy += ny * power * 1.8 - power * 0.22;
      }
    }

    drawOverlay(ctx) {
      if (this.state.countdownActive) {
        this.drawCountdownOverlay(ctx);
        return;
      }
      if (this.state.paused && !this.state.gameOver && !this.platform.domUi) {
        this.drawCenterPanel(ctx, "已暂停", "当前局面已冻结，点右上角继续或左上角重开。", "继续");
        return;
      }
      if (this.state.gameOver) {
        if (!this.platform.domUi) {
          this.drawCanvasResultOverlay(ctx);
        }
      }
      if (!this.platform.domUi) {
        this.drawCanvasToolBar(ctx);
      }
    }

    drawCountdownOverlay(ctx) {
      const remain = String(Math.max(1, this.state.countdownValue || 1));
      ctx.fillStyle = "rgba(2, 6, 23, 0.18)";
      ctx.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      ctx.fillStyle = "#f8fafc";
      ctx.font = `700 ${Math.round(su(92))}px sans-serif`;
      const textWidth = ctx.measureText(remain).width;
      ctx.fillText(remain, (DESIGN_WIDTH - textWidth) / 2, sy(394));
    }

    drawCanvasToolBar(ctx) {
      const tools = this.getToolSnapshot();
      for (let i = 0; i < CANVAS_TOOL_LAYOUT.length; i += 1) {
        const rect = CANVAS_TOOL_LAYOUT[i];
        const tool = tools.find((item) => item.key === rect.key);
        if (!tool) continue;
        ctx.fillStyle = tool.active ? "rgba(79, 70, 229, 0.96)" : tool.disabled ? "rgba(52, 63, 112, 0.62)" : "rgba(18, 24, 72, 0.92)";
        this.roundRect(ctx, rect.x, rect.y, rect.w, rect.h, su(18), true, false);
        ctx.strokeStyle = tool.active ? "rgba(196, 181, 253, 0.9)" : "rgba(196, 220, 255, 0.16)";
        ctx.lineWidth = su(1.5);
        this.roundRect(ctx, rect.x, rect.y, rect.w, rect.h, su(18), false, true);
        ctx.fillStyle = "#eef2ff";
        ctx.font = `700 ${Math.round(su(12))}px sans-serif`;
        const shortLabel = tool.label.length > 4 ? tool.label.slice(0, 4) : tool.label;
        const labelWidth = ctx.measureText(shortLabel).width;
        ctx.fillText(shortLabel, rect.x + (rect.w - labelWidth) / 2, rect.y + sy(21));
        ctx.font = `700 ${Math.round(su(14))}px sans-serif`;
        const stockText = `x${tool.stock}`;
        const stockWidth = ctx.measureText(stockText).width;
        ctx.fillText(stockText, rect.x + (rect.w - stockWidth) / 2, rect.y + sy(42));
      }

      const timerText = this.getToolTimerText();
      if (timerText) {
        ctx.fillStyle = "rgba(18, 24, 72, 0.92)";
        this.roundRect(ctx, sx(28), sy(734), sx(334), sy(26), su(999), true, false);
        ctx.fillStyle = "#eef2ff";
        ctx.font = `600 ${Math.round(su(12))}px sans-serif`;
        const width = ctx.measureText(timerText).width;
        ctx.fillText(timerText, (DESIGN_WIDTH - width) / 2, sy(751));
      }
    }

    drawCanvasResultOverlay(ctx) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.56)";
      ctx.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      ctx.fillStyle = "#10213d";
      this.roundRect(ctx, sx(24), sy(204), sx(342), sy(356), su(28), true, false);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = su(2);
      this.roundRect(ctx, sx(24), sy(204), sx(342), sy(356), su(28), false, true);

      const title = this.state.success ? "挑战成功" : "本局失败";
      ctx.fillStyle = "#f8fafc";
      ctx.font = `700 ${Math.round(su(28))}px sans-serif`;
      ctx.fillText(title, sx(46), sy(252));
      ctx.fillStyle = "#cbd5e1";
      ctx.font = `500 ${Math.round(su(16))}px sans-serif`;
      this.drawWrappedText(ctx, `分数 ${this.state.score} · 合并 ${this.state.merges} 次 · 用时 ${formatSeconds(Math.floor(this.state.elapsedMs / 1000))}`, sx(46), sy(286), sx(296), sy(24));
      if (!this.state.success) {
        this.drawWrappedText(ctx, `分享复活剩余 ${Math.max(0, MAX_REVIVES_PER_RUN - this.revivesUsed)} 次，可回退到结束前约 10 步`, sx(46), sy(336), sx(296), sy(24));
      }

      if (!this.state.success && this.canShareRevive()) {
        this.drawButton(ctx, RESULT_REVIVE_BUTTON, "分享复活", "#7c3aed");
      }
      this.drawButton(ctx, RESULT_RESTART_BUTTON, "再来一局", "#22c55e");
      this.drawButton(ctx, RESULT_EXIT_BUTTON, "退出", "#475569");
    }

    drawCenterPanel(ctx, title, copy, action) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.56)";
      ctx.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      ctx.fillStyle = "#10213d";
      this.roundRect(ctx, sx(44), sy(244), sx(302), sy(308), su(28), true, false);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = su(2);
      this.roundRect(ctx, sx(44), sy(244), sx(302), sy(308), su(28), false, true);

      ctx.fillStyle = "#f8fafc";
      ctx.font = `700 ${Math.round(su(28))}px sans-serif`;
      ctx.fillText(title, sx(70), sy(304));
      ctx.fillStyle = "#cbd5e1";
      ctx.font = `500 ${Math.round(su(16))}px sans-serif`;
      this.drawWrappedText(ctx, copy, sx(70), sy(344), sx(250), sy(24));

      ctx.fillStyle = "#22c55e";
      this.roundRect(ctx, RESULT_BUTTON.x, RESULT_BUTTON.y, RESULT_BUTTON.w, RESULT_BUTTON.h, su(16), true, false);
      ctx.fillStyle = "#f8fafc";
      ctx.font = `700 ${Math.round(su(18))}px sans-serif`;
      ctx.fillText(action, RESULT_BUTTON.x + sx(50), RESULT_BUTTON.y + sy(32));
    }

    drawButton(ctx, rect, text, color) {
      ctx.fillStyle = color;
      this.roundRect(ctx, rect.x, rect.y, rect.w, rect.h, su(14), true, false);
      ctx.fillStyle = "#f8fafc";
      ctx.font = `700 ${Math.round(su(16))}px sans-serif`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, rect.x + (rect.w - textWidth) / 2, rect.y + sy(25));
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
