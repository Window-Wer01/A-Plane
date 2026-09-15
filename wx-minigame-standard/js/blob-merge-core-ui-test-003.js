(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BlobMergeCoreUiTest003 = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 750;
  const HEIGHT = 1036;
  const WALL = 22;
  const TOP = 62;
  const FLOOR = 1014;
  const DANGER_Y = 154;
  const GRAVITY = 1120;
  const WALL_RESTITUTION = 0.68;
  const FLOOR_RESTITUTION = 0.56;
  const FRUIT_RESTITUTION = 0.84;
  const FRICTION = 0.992;
  const DROP_COOLDOWN = 0.24;
  const MAX_LEVEL = 6;
  const ASSET_ROOT = "./assets/ui-test-003/creatures/";
  const FRUITS = [
    { name: "苹果", radius: 38, score: 2, color: "#ff6969", file: "creature_level_01_apple@2x.png" },
    { name: "橙子", radius: 48, score: 4, color: "#ffad36", file: "creature_level_02_orange@2x.png" },
    { name: "柠檬", radius: 59, score: 8, color: "#ffe85a", file: "creature_level_03_lemon@2x.png" },
    { name: "西瓜", radius: 72, score: 16, color: "#63d8df", file: "creature_level_04_watermelon@2x.png" },
    { name: "李子", radius: 88, score: 32, color: "#ff83bd", file: "creature_level_05_plum@2x.png" },
    { name: "猕猴桃", radius: 105, score: 64, color: "#93d65c", file: "creature_level_06_kiwi@2x.png" },
    { name: "葡萄", radius: 126, score: 128, color: "#a96bd8", file: "creature_level_07_grape@2x.png" }
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  class BlobMergeCoreUiTest003 {
    constructor(options = {}) {
      this.platform = options.platform || {};
      this.canvas = null;
      this.ctx = null;
      this.viewport = { width: WIDTH, height: HEIGHT, dpr: 1 };
      this.scale = 1;
      this.offsetX = 0;
      this.offsetY = 0;
      this.images = FRUITS.map((fruit) => this.createImage(ASSET_ROOT + fruit.file));
      this.idSeed = 1;
      this.onStateChange = typeof options.onStateChange === "function" ? options.onStateChange : null;
      this.state = {};
      this.reset();
    }

    createImage(src) {
      if (typeof Image === "undefined") return null;
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      return image;
    }

    attachRenderer(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
    }

    setViewport(width, height, dpr = 1) {
      this.viewport = { width: Math.max(1, width), height: Math.max(1, height), dpr: Math.max(1, dpr) };
      this.scale = Math.min(this.viewport.width / WIDTH, this.viewport.height / HEIGHT);
      this.offsetX = (this.viewport.width - WIDTH * this.scale) * 0.5;
      this.offsetY = (this.viewport.height - HEIGHT * this.scale) * 0.5;
    }

    reset() {
      this.state = {
        fruits: [],
        particles: [],
        flashes: [],
        score: 0,
        merges: 0,
        highestLevel: 0,
        nextLevel: this.randomDropLevel(),
        pointerX: WIDTH * 0.5,
        cooldown: 0,
        elapsed: 0,
        dangerTime: 0,
        running: false,
        paused: false,
        gameOver: false
      };
      this.idSeed = 1;
      this.emitState();
    }

    start() {
      if (this.state.gameOver) this.reset();
      this.state.running = true;
      this.state.paused = false;
      if (this.platform.startBgm) this.platform.startBgm();
      this.emitState();
    }

    togglePause() {
      if (!this.state.running || this.state.gameOver) return;
      this.state.paused = !this.state.paused;
      if (this.state.paused) {
        if (this.platform.stopBgm) this.platform.stopBgm();
      } else if (this.platform.startBgm) {
        this.platform.startBgm();
      }
      this.emitState();
    }

    randomDropLevel() {
      const roll = Math.random();
      return roll < 0.54 ? 0 : roll < 0.86 ? 1 : 2;
    }

    createFruit(level, x, y, vx = 0, vy = 0) {
      return {
        id: this.idSeed++,
        level,
        x,
        y,
        vx,
        vy,
        radius: FRUITS[level].radius,
        angle: random(-0.08, 0.08),
        angularVelocity: random(-0.45, 0.45),
        age: 0,
        mergeLock: 0.12,
        squash: 0,
        squashVelocity: 0
      };
    }

    dropAt(worldX) {
      if (!this.state.running || this.state.paused || this.state.gameOver || this.state.cooldown > 0) return false;
      const level = this.state.nextLevel;
      const radius = FRUITS[level].radius;
      const x = clamp(worldX, WALL + radius, WIDTH - WALL - radius);
      this.state.fruits.push(this.createFruit(level, x, TOP + radius, 0, 20));
      this.state.nextLevel = this.randomDropLevel();
      this.state.cooldown = DROP_COOLDOWN;
      this.emitState();
      return true;
    }

    setPointerFromScreen(rawX, rawY) {
      const point = this.screenToWorld(rawX, rawY);
      this.state.pointerX = clamp(point.x, WALL + 42, WIDTH - WALL - 42);
      return point;
    }

    screenToWorld(rawX, rawY) {
      return {
        x: (rawX - this.offsetX) / this.scale,
        y: (rawY - this.offsetY) / this.scale
      };
    }

    update(dt) {
      dt = clamp(dt, 0.001, 0.034);
      this.state.cooldown = Math.max(0, this.state.cooldown - dt);
      this.updateEffects(dt);
      if (!this.state.running || this.state.paused || this.state.gameOver) return;
      this.state.elapsed += dt;
      const steps = 4;
      for (let step = 0; step < steps; step += 1) {
        const subDt = dt / steps;
        this.integrate(subDt);
        this.resolveCollisions();
        this.resolveMerges();
      }
      this.updateDanger(dt);
    }

    integrate(dt) {
      for (const fruit of this.state.fruits) {
        fruit.age += dt;
        fruit.mergeLock = Math.max(0, fruit.mergeLock - dt);
        fruit.vy = Math.min(1200, fruit.vy + GRAVITY * dt);
        fruit.x += fruit.vx * dt;
        fruit.y += fruit.vy * dt;
        fruit.angle += fruit.angularVelocity * dt;
        fruit.vx *= FRICTION;
        fruit.angularVelocity *= 0.996;
        fruit.squashVelocity += -fruit.squash * 82 * dt;
        fruit.squashVelocity *= 0.76;
        fruit.squash += fruit.squashVelocity * dt;

        if (fruit.x - fruit.radius < WALL) {
          fruit.x = WALL + fruit.radius;
          fruit.vx = Math.abs(fruit.vx) * WALL_RESTITUTION;
          fruit.angularVelocity += fruit.vy * 0.0007;
          fruit.squash = Math.max(fruit.squash, 0.07);
        } else if (fruit.x + fruit.radius > WIDTH - WALL) {
          fruit.x = WIDTH - WALL - fruit.radius;
          fruit.vx = -Math.abs(fruit.vx) * WALL_RESTITUTION;
          fruit.angularVelocity -= fruit.vy * 0.0007;
          fruit.squash = Math.max(fruit.squash, 0.07);
        }
        if (fruit.y + fruit.radius > FLOOR) {
          const impact = Math.abs(fruit.vy);
          fruit.y = FLOOR - fruit.radius;
          fruit.vy = -impact * FLOOR_RESTITUTION;
          fruit.vx *= 0.985;
          fruit.squash = Math.max(fruit.squash, clamp(impact / 1800, 0.04, 0.2));
          fruit.squashVelocity = -fruit.squash * 7;
          if (Math.abs(fruit.vy) < 28) fruit.vy = 0;
        }
      }
    }

    mass(fruit) {
      return Math.max(1, fruit.radius * fruit.radius);
    }

    resolveCollisions() {
      const fruits = this.state.fruits;
      for (let i = 0; i < fruits.length; i += 1) {
        for (let j = i + 1; j < fruits.length; j += 1) {
          const a = fruits[i];
          const b = fruits[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minDistance = a.radius + b.radius;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= minDistance * minDistance) continue;
          const distance = Math.sqrt(distanceSquared) || 0.001;
          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = minDistance - distance;
          const massA = this.mass(a);
          const massB = this.mass(b);
          const totalMass = massA + massB;
          a.x -= nx * overlap * (massB / totalMass);
          a.y -= ny * overlap * (massB / totalMass);
          b.x += nx * overlap * (massA / totalMass);
          b.y += ny * overlap * (massA / totalMass);

          const relativeX = b.vx - a.vx;
          const relativeY = b.vy - a.vy;
          const normalSpeed = relativeX * nx + relativeY * ny;
          if (normalSpeed >= 0) continue;
          const inverseMassA = 1 / massA;
          const inverseMassB = 1 / massB;
          const impulse = (-(1 + FRUIT_RESTITUTION) * normalSpeed) / (inverseMassA + inverseMassB);
          a.vx -= impulse * nx * inverseMassA;
          a.vy -= impulse * ny * inverseMassA;
          b.vx += impulse * nx * inverseMassB;
          b.vy += impulse * ny * inverseMassB;
          const impact = clamp(Math.abs(normalSpeed) / 900, 0.03, 0.16);
          a.squash = Math.max(a.squash, impact);
          b.squash = Math.max(b.squash, impact);
        }
      }
    }

    resolveMerges() {
      const fruits = this.state.fruits;
      const removed = new Set();
      const added = [];
      for (let i = 0; i < fruits.length; i += 1) {
        const a = fruits[i];
        if (removed.has(a.id) || a.mergeLock > 0) continue;
        for (let j = i + 1; j < fruits.length; j += 1) {
          const b = fruits[j];
          if (removed.has(b.id) || b.mergeLock > 0 || a.level !== b.level) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const threshold = (a.radius + b.radius) * 1.025;
          if (dx * dx + dy * dy > threshold * threshold) continue;
          removed.add(a.id);
          removed.add(b.id);
          const level = Math.min(MAX_LEVEL, a.level + 1);
          const x = (a.x + b.x) * 0.5;
          const y = (a.y + b.y) * 0.5;
          const merged = this.createFruit(level, x, y, (a.vx + b.vx) * 0.18, -150 - level * 18);
          merged.squash = -0.2;
          merged.squashVelocity = 2.8;
          added.push(merged);
          this.spawnMergeFx(x, y, level);
          this.applyShockwave(x, y, merged.radius, removed);
          this.state.score += FRUITS[level].score * 10;
          this.state.merges += 1;
          this.state.highestLevel = Math.max(this.state.highestLevel, level);
          if (this.platform.playMergeSound) this.platform.playMergeSound(level);
          if (this.platform.vibrate) this.platform.vibrate(level >= 4 ? 38 : 18);
          break;
        }
      }
      if (removed.size) {
        this.state.fruits = fruits.filter((fruit) => !removed.has(fruit.id)).concat(added);
        this.emitState();
      }
    }

    applyShockwave(x, y, radius, ignored) {
      const range = radius * 2.8;
      for (const fruit of this.state.fruits) {
        if (ignored.has(fruit.id)) continue;
        const dx = fruit.x - x;
        const dy = fruit.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance >= range) continue;
        const force = (1 - distance / range) * 310;
        fruit.vx += (dx / distance) * force;
        fruit.vy += (dy / distance) * force - 45;
      }
    }

    spawnMergeFx(x, y, level) {
      const color = FRUITS[level].color;
      this.state.flashes.push({ x, y, radius: 20, life: 0.36, maxLife: 0.36, color });
      const count = 18 + level * 4;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + random(-0.12, 0.12);
        const speed = random(145, 330 + level * 22);
        const life = random(0.5, 0.9);
        this.state.particles.push({
          kind: i % 3 === 0 ? "star" : "dot",
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 55,
          size: random(4, 9 + level * 0.8),
          rotation: random(0, Math.PI * 2),
          spin: random(-7, 7),
          life,
          maxLife: life,
          color: i % 5 === 0 ? "#fff7b2" : color
        });
      }
    }

    updateEffects(dt) {
      for (const flash of this.state.flashes) {
        flash.life -= dt;
        flash.radius += 540 * dt;
      }
      this.state.flashes = this.state.flashes.filter((flash) => flash.life > 0);
      for (const particle of this.state.particles) {
        particle.life -= dt;
        particle.vy += 420 * dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.rotation += particle.spin * dt;
        particle.vx *= 0.985;
      }
      this.state.particles = this.state.particles.filter((particle) => particle.life > 0);
    }

    updateDanger(dt) {
      let unsafe = false;
      for (const fruit of this.state.fruits) {
        if (fruit.age > 1 && fruit.y - fruit.radius < DANGER_Y) {
          unsafe = true;
          break;
        }
      }
      this.state.dangerTime = clamp(this.state.dangerTime + (unsafe ? dt : -dt * 1.8), 0, 2.8);
      if (this.state.dangerTime >= 2.8) {
        this.state.gameOver = true;
        this.state.running = false;
        if (this.platform.stopBgm) this.platform.stopBgm();
        this.emitState();
      }
    }

    drawStar(ctx, x, y, radius, rotation) {
      ctx.beginPath();
      for (let i = 0; i < 10; i += 1) {
        const angle = rotation - Math.PI * 0.5 + (Math.PI * i) / 5;
        const length = i % 2 === 0 ? radius : radius * 0.43;
        const px = x + Math.cos(angle) * length;
        const py = y + Math.sin(angle) * length;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    render() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const dpr = this.viewport.dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
      ctx.save();
      ctx.translate(this.offsetX, this.offsetY);
      ctx.scale(this.scale, this.scale);
      this.drawScene(ctx);
      ctx.restore();
    }

    drawScene(ctx) {
      ctx.fillStyle = "rgba(4, 24, 44, 0.46)";
      ctx.fillRect(WALL, TOP, WIDTH - WALL * 2, FLOOR - TOP);
      const warning = clamp(this.state.dangerTime / 2.8, 0, 1);
      ctx.strokeStyle = warning > 0.6 ? "#ff5e78" : "rgba(255,232,90,.72)";
      ctx.lineWidth = 4;
      ctx.setLineDash([16, 12]);
      ctx.beginPath();
      ctx.moveTo(WALL + 12, DANGER_Y);
      ctx.lineTo(WIDTH - WALL - 12, DANGER_Y);
      ctx.stroke();
      ctx.setLineDash([]);

      const guideX = clamp(this.state.pointerX, WALL + 42, WIDTH - WALL - 42);
      ctx.strokeStyle = "rgba(247,251,244,.36)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(guideX, TOP + 8);
      ctx.lineTo(guideX, DANGER_Y - 8);
      ctx.stroke();

      for (const fruit of this.state.fruits) this.drawFruit(ctx, fruit);
      this.drawEffects(ctx);

      if (this.state.paused || this.state.gameOver || !this.state.running) {
        ctx.fillStyle = "rgba(7,26,47,.62)";
        ctx.fillRect(WALL, TOP, WIDTH - WALL * 2, FLOOR - TOP);
        ctx.textAlign = "center";
        ctx.fillStyle = "#f7fbf4";
        ctx.font = "900 54px sans-serif";
        ctx.fillText(this.state.gameOver ? "果篮装满啦" : this.state.paused ? "已暂停" : "点击开始", WIDTH / 2, 480);
        ctx.fillStyle = "#ffe85a";
        ctx.font = "700 26px sans-serif";
        ctx.fillText(this.state.gameOver ? "按重新开始再挑战" : "拖动瞄准，松手投放", WIDTH / 2, 530);
        ctx.textAlign = "start";
      }
    }

    drawFruit(ctx, fruit) {
      const image = this.images[fruit.level];
      const ready = image && image.complete && image.naturalWidth > 0;
      const squash = clamp(fruit.squash, -0.22, 0.22);
      ctx.save();
      ctx.translate(fruit.x, fruit.y);
      ctx.rotate(fruit.angle);
      ctx.scale(1 + squash, 1 - squash);
      ctx.shadowColor = "rgba(0,0,0,.28)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 7;
      if (ready) {
        const size = fruit.radius * 2.2;
        ctx.drawImage(image, -size / 2, -size / 2, size, size);
      } else {
        ctx.fillStyle = FRUITS[fruit.level].color;
        ctx.beginPath();
        ctx.arc(0, 0, fruit.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawEffects(ctx) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const flash of this.state.flashes) {
        const alpha = clamp(flash.life / flash.maxLife, 0, 1);
        const gradient = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius);
        gradient.addColorStop(0, `rgba(255,255,255,${alpha * 0.95})`);
        gradient.addColorStop(0.38, flash.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = alpha;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 7 * alpha;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius * 0.82, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const particle of this.state.particles) {
        ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
        ctx.fillStyle = particle.color;
        if (particle.kind === "star") {
          this.drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.62, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      ctx.restore();
    }

    getSnapshot() {
      return {
        score: this.state.score,
        merges: this.state.merges,
        highestLevel: this.state.highestLevel,
        nextLevel: this.state.nextLevel,
        nextName: FRUITS[this.state.nextLevel].name,
        nextImage: ASSET_ROOT + FRUITS[this.state.nextLevel].file,
        danger: this.state.dangerTime / 2.8,
        paused: this.state.paused,
        gameOver: this.state.gameOver,
        running: this.state.running
      };
    }

    emitState() {
      if (this.onStateChange) this.onStateChange(this.getSnapshot());
    }
  }

  BlobMergeCoreUiTest003.FRUITS = FRUITS;
  BlobMergeCoreUiTest003.DESIGN_SIZE = { width: WIDTH, height: HEIGHT };
  return BlobMergeCoreUiTest003;
});
