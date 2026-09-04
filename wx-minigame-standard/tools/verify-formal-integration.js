const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const requiredFiles = [
  "game.js",
  "game.json",
  "project.config.json",
  "wx-game.config.js",
  "README.md",
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

ensureIncludes("mobile-wechat-standard.html", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js",
  "2026-09-04 00:30:00"
]);

ensureIncludes("mobile-wechat-offline-standard.html", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js",
  "2026-09-04 00:30:00"
]);

ensureIncludes("sw-standard.js", [
  "./js/services/runtime-config.js",
  "./js/services/login-service.js",
  "./js/services/ad-service.js",
  "./js/services/share-service.js",
  "./js/services/rank-service.js",
  "./js/services/update-service.js"
]);

console.log("微信小游戏正式接入结构校验通过。");
