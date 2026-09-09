const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const requiredFiles = [
  "game.js",
  "game.json",
  "project.config.json",
  "wx-game.config.js",
  "README.md",
  "styles.css",
  "wechat-shell-standard.css",
  "sw-standard.js",
  "js/blob-merge-core.js",
  "js/game-wechat-standard.js",
  "js/wx-runtime.js",
  "js/services/runtime-config.js",
  "js/services/login-service.js",
  "js/services/ad-service.js",
  "js/services/share-service.js",
  "js/services/rank-service.js",
  "js/services/update-service.js",
  "mobile-wechat-standard.html",
  "mobile-wechat-offline-standard.html",
  "preview.html"
];

function ensureFile(filePath) {
  const absolutePath = path.join(ROOT, filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`缺少文件：${filePath}`);
  }
}

function read(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8");
}

function ensureIncludes(filePath, snippets) {
  const content = read(filePath);
  snippets.forEach((snippet) => {
    if (!content.includes(snippet)) {
      throw new Error(`${filePath} 缺少片段：${snippet}`);
    }
  });
}

requiredFiles.forEach(ensureFile);

ensureIncludes("game.js", [
  "wx-game.config.js",
  "initWxMiniGameMain",
  "require(\"./js/game-wechat-standard.js\")"
]);

ensureIncludes("js/wx-runtime.js", [
  "initWxMiniGameMain",
  "require(\"./game-wechat-standard.js\")"
]);

ensureIncludes("js/game-wechat-standard.js", [
  "services/runtime-config.js",
  "services/login-service.js",
  "services/ad-service.js",
  "services/share-service.js",
  "services/rank-service.js",
  "services/update-service.js",
  "initWebShell",
  "initWxMiniGameMain"
]);

function extractBuildLabel(html, filePath) {
  const match = html.match(/__BLOB_BUILD_LABEL__\s*=\s*"([^"]+)"/);
  if (!match) {
    throw new Error(`${filePath} 未声明 window.__BLOB_BUILD_LABEL__`);
  }
  return match[1];
}

function extractVersionKeys(html) {
  const keys = [];
  const re = /[?&]v=([0-9]{8}-wxmini-[0-9]{2})\b/g;
  let match;
  while ((match = re.exec(html))) {
    keys.push(match[1]);
  }
  return keys;
}

function ensureSameValues(label, values) {
  const unique = Array.from(new Set(values.filter(Boolean)));
  if (unique.length !== 1) {
    throw new Error(`${label} 版本戳不一致：${unique.join(" | ")}`);
  }
  return unique[0];
}

function extractRuntimeConfigFallbackBuildLabel(content) {
  const match = content.match(/__BLOB_BUILD_LABEL__"\s*,\s*"([^"]+)"/);
  return match ? match[1] : "";
}

function extractSwCacheVersionKey(content) {
  const match = content.match(/CACHE_NAME\s*=\s*"[^"]*?([0-9]{8}-wxmini-[0-9]{2})[^"]*"/);
  return match ? match[1] : "";
}

ensureIncludes("mobile-wechat-standard.html", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js"
]);

ensureIncludes("mobile-wechat-offline-standard.html", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js"
]);

ensureIncludes("sw-standard.js", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js"
]);

const onlineHtml = read("mobile-wechat-standard.html");
const offlineHtml = read("mobile-wechat-offline-standard.html");

const onlineBuildLabel = extractBuildLabel(onlineHtml, "mobile-wechat-standard.html");
const offlineBuildLabel = extractBuildLabel(offlineHtml, "mobile-wechat-offline-standard.html");
if (onlineBuildLabel !== offlineBuildLabel) {
  throw new Error(`网页验收壳 buildLabel 不一致：${onlineBuildLabel} vs ${offlineBuildLabel}`);
}

const onlineKeys = extractVersionKeys(onlineHtml);
const offlineKeys = extractVersionKeys(offlineHtml);
const versionKey = ensureSameValues("网页验收壳 v=", onlineKeys.concat(offlineKeys));

if (!onlineHtml.includes(onlineBuildLabel) || !offlineHtml.includes(onlineBuildLabel)) {
  throw new Error("网页验收壳 buildLabel 未完整写入到页面文案中（menuBuildNotice 等）");
}

const runtimeConfigFallback = extractRuntimeConfigFallbackBuildLabel(read("js/services/runtime-config.js"));
if (!runtimeConfigFallback) {
  throw new Error("runtime-config.js 未找到 __BLOB_BUILD_LABEL__ 的 fallback 值");
}
if (runtimeConfigFallback !== onlineBuildLabel) {
  throw new Error(`runtime-config.js buildLabel fallback 与网页验收壳不一致：${runtimeConfigFallback} vs ${onlineBuildLabel}`);
}

const swCacheKey = extractSwCacheVersionKey(read("sw-standard.js"));
if (!swCacheKey) {
  throw new Error("sw-standard.js 未包含可识别的 CACHE_NAME 版本戳");
}
if (swCacheKey !== versionKey) {
  throw new Error(`sw-standard.js CACHE_NAME 版本戳与网页验收壳不一致：${swCacheKey} vs ${versionKey}`);
}

console.log("微信小游戏正式接入结构校验通过。");
