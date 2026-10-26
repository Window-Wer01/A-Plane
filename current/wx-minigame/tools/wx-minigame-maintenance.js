/* eslint-disable no-console */
/**
 * 微信小游戏标准目录维护脚本（自查 + 清理临时文件）
 * 目标：稳定、可追溯、可回退。默认保守清理，只清理“明确是临时产物”的内容。
 *
 * 用法：
 *   node tools/wx-minigame-maintenance.js
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(ROOT, "..");

const MAINT_DIR = path.join(ROOT, ".maintenance");
const LAST_RUN_FILE = path.join(MAINT_DIR, "last_cleanup.json");
const CONFIG_FILE = path.join(ROOT, "tools", "wx-minigame-maintenance-config.json");

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function formatDateYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function formatDateLabel(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function bytesToMB(bytes) {
  return Math.round((bytes / (1024 * 1024)) * 100) / 100;
}

function listFilesRecursive(dirPath) {
  const out = [];
  const stack = [dirPath];
  while (stack.length) {
    const current = stack.pop();
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(current, item.name);
      if (item.isDirectory()) stack.push(full);
      else if (item.isFile()) out.push(full);
    }
  }
  return out;
}

function getDirSizeBytes(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  let total = 0;
  const files = listFilesRecursive(dirPath);
  for (const file of files) {
    try {
      total += fs.statSync(file).size;
    } catch {
      // ignore
    }
  }
  return total;
}

function runNodeCheck(relativePath) {
  const target = path.join(ROOT, relativePath);
  const result = spawnSync(process.execPath, ["--check", target], { encoding: "utf8" });
  return {
    ok: result.status === 0,
    output: (result.stdout || "") + (result.stderr || "")
  };
}

function runNodeScript(relativePath, args = []) {
  const target = path.join(ROOT, relativePath);
  const result = spawnSync(process.execPath, [target, ...args], { encoding: "utf8" });
  return {
    ok: result.status === 0,
    output: (result.stdout || "") + (result.stderr || "")
  };
}

function isOlderThanDays(filePath, days) {
  try {
    const stat = fs.statSync(filePath);
    const ageMs = Date.now() - stat.mtimeMs;
    return ageMs >= days * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) return { ok: true, removed: false };
  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
    return { ok: true, removed: true };
  } catch (err) {
    return { ok: false, removed: false, error: String(err && err.message ? err.message : err) };
  }
}

function main() {
  ensureDir(MAINT_DIR);
  const config = safeReadJson(CONFIG_FILE, {
    cleanupIntervalHours: 48,
    cleanupRetainDays: 7,
    keepTestFolders: ["ui-test-004"],
    deleteZipPattern: "^UI-TEST-\\d{3}.*\\.zip$"
  });

  const now = new Date();
  const ymd = formatDateYYYYMMDD(now);
  const dateLabel = formatDateLabel(now);
  const reportPath = path.join(ROOT, `wx-minigame-daily-check-${ymd}.md`);

  const lastRun = safeReadJson(LAST_RUN_FILE, { lastCleanupAt: 0 });
  const hoursSince = lastRun.lastCleanupAt ? (Date.now() - lastRun.lastCleanupAt) / (1000 * 60 * 60) : Infinity;
  const shouldCleanup = hoursSince >= Number(config.cleanupIntervalHours || 48);

  const lines = [];
  lines.push(`# 微信小游戏每日巡检（含清理）— ${dateLabel}`);
  lines.push("");
  lines.push(`目标目录：\`blob-merge-prototype/wx-minigame-standard\``);
  lines.push("");
  lines.push("## 概览");
  lines.push("");

  // 结构/语法自查（只做校验，不改动）
  const checks = [
    ["node --check js/blob-merge-core.js", runNodeCheck(path.join("js", "blob-merge-core.js"))],
    ["node --check js/game-wechat-standard.js", runNodeCheck(path.join("js", "game-wechat-standard.js"))],
    ["node --check js/services/runtime-config.js", runNodeCheck(path.join("js", "services", "runtime-config.js"))],
    ["node --check sw-standard.js", runNodeCheck("sw-standard.js")],
    ["node tools/verify-formal-integration.js", runNodeScript(path.join("tools", "verify-formal-integration.js"))]
  ];

  const allChecksOk = checks.every(([, r]) => r.ok);
  lines.push(`- 语法与结构校验：${allChecksOk ? "已通过" : "失败（见执行记录）"}`);

  // 空间统计（只做统计）
  const assetsSize = getDirSizeBytes(path.join(ROOT, "assets"));
  const jsSize = getDirSizeBytes(path.join(ROOT, "js"));
  const totalSize = getDirSizeBytes(ROOT);
  lines.push(`- 当前目录体量：约 ${bytesToMB(totalSize)}MB（assets ${bytesToMB(assetsSize)}MB / js ${bytesToMB(jsSize)}MB）`);

  lines.push(`- 清理策略：${shouldCleanup ? "本次满足 48 小时门槛，将执行保守清理" : "距离上次清理不足 48 小时，本次仅巡检不删文件"}`);
  lines.push("");

  // 清理（只删“明确是临时产物”，并可通过 config 保留）
  const cleanupLog = [];
  if (shouldCleanup) {
    // 1) 删除根目录下的 UI-TEST-xxx zip（老于 retainDays）
    const zipRe = new RegExp(String(config.deleteZipPattern || "^UI-TEST-\\d{3}.*\\.zip$"));
    const retainDays = Number(config.cleanupRetainDays || 7);
    try {
      const rootFiles = fs.readdirSync(REPO_ROOT);
      for (const name of rootFiles) {
        const full = path.join(REPO_ROOT, name);
        if (!zipRe.test(name)) continue;
        if (!isOlderThanDays(full, retainDays)) continue;
        const result = removePath(full);
        cleanupLog.push({
          target: `blob-merge-prototype/${name}`,
          action: result.ok && result.removed ? "deleted" : "failed",
          error: result.error || ""
        });
      }
    } catch (err) {
      cleanupLog.push({ target: "zip-scan", action: "failed", error: String(err && err.message ? err.message : err) });
    }

    // 2) 删除 wx-minigame-standard 下的 ui-test-*（老于 retainDays，且不在 keep 列表）
    const keep = new Set(Array.isArray(config.keepTestFolders) ? config.keepTestFolders : []);
    try {
      const children = fs.readdirSync(ROOT, { withFileTypes: true });
      for (const entry of children) {
        if (!entry.isDirectory()) continue;
        if (!/^ui-test-\d+$/i.test(entry.name)) continue;
        if (keep.has(entry.name)) continue;
        const full = path.join(ROOT, entry.name);
        if (!isOlderThanDays(full, retainDays)) continue;
        const result = removePath(full);
        cleanupLog.push({
          target: `blob-merge-prototype/wx-minigame-standard/${entry.name}`,
          action: result.ok && result.removed ? "deleted" : "failed",
          error: result.error || ""
        });
      }
    } catch (err) {
      cleanupLog.push({ target: "ui-test-scan", action: "failed", error: String(err && err.message ? err.message : err) });
    }

    // 标记本次清理时间
    fs.writeFileSync(LAST_RUN_FILE, JSON.stringify({ lastCleanupAt: Date.now() }, null, 2), "utf8");
  }

  lines.push("## 清理结果");
  lines.push("");
  if (!shouldCleanup) {
    lines.push("- 本次未执行删除（48 小时门槛未到）。");
  } else if (!cleanupLog.length) {
    lines.push("- 本次无可删除的临时产物（或都在保留列表中）。");
  } else {
    for (const item of cleanupLog) {
      if (item.action === "deleted") {
        lines.push(`- ✅ 已删除：\`${item.target}\``);
      } else if (item.action === "failed") {
        lines.push(`- ❌ 删除失败：\`${item.target}\`（${item.error || "unknown"}）`);
      } else {
        lines.push(`- ⚠️ 未知状态：\`${item.target}\``);
      }
    }
  }
  lines.push("");

  lines.push("## 执行记录");
  lines.push("");
  for (const [label, result] of checks) {
    lines.push(`- ${label}`);
    lines.push(`  - 结果：${result.ok ? "OK" : "FAILED"}`);
    const trimmed = String(result.output || "").trim();
    if (trimmed) {
      const preview = trimmed.split(/\r?\n/).slice(0, 10).join("\n");
      lines.push("  - 输出（前 10 行）：");
      lines.push("```");
      lines.push(preview);
      lines.push("```");
    }
  }

  fs.writeFileSync(reportPath, lines.join("\n") + "\n", "utf8");
  console.log(`done: ${path.relative(process.cwd(), reportPath)}`);
}

main();

