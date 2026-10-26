const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const APP = path.join(ROOT, "current", "wx-minigame");

const requiredFiles = [
  "game.js",
  "game.json",
  "project.config.json",
  "wx-game.config.js",
  "preview.html",
  "mobile-wechat-standard.html",
  "mobile-wechat-offline-standard.html",
  "wechat-shell-standard.css",
  "sw-standard.js",
  "js/blob-merge-core.js",
  "js/game-wechat-standard.js",
  "js/services/runtime-config.js",
  "tools/verify-formal-integration.js"
];

const syntaxFiles = [
  "game.js",
  "wx-game.config.js",
  "sw-standard.js",
  "js/blob-merge-core.js",
  "js/game-wechat-standard.js",
  "js/web-runtime.js",
  "js/wx-runtime.js",
  "js/services/runtime-config.js",
  "js/services/login-service.js",
  "js/services/ad-service.js",
  "js/services/share-service.js",
  "js/services/rank-service.js",
  "js/services/update-service.js"
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function appPath(relativePath) {
  return path.join(APP, relativePath);
}

function checkLocalReference(ownerPath, reference) {
  const cleanReference = reference.split("#")[0].split("?")[0].trim();
  if (
    !cleanReference ||
    cleanReference.startsWith("data:") ||
    cleanReference.startsWith("http:") ||
    cleanReference.startsWith("https:") ||
    cleanReference.startsWith("//") ||
    cleanReference.startsWith("javascript:") ||
    cleanReference.startsWith("mailto:")
  ) {
    return;
  }
  const absolutePath = path.resolve(path.dirname(ownerPath), cleanReference);
  if (!absolutePath.startsWith(APP + path.sep)) {
    fail(`${path.relative(APP, ownerPath)} 引用了主干目录外路径：${reference}`);
    return;
  }
  if (!fs.existsSync(absolutePath)) {
    fail(`${path.relative(APP, ownerPath)} 引用了不存在的资源：${reference}`);
  }
}

function checkHtmlReferences(relativePath) {
  const ownerPath = appPath(relativePath);
  const content = fs.readFileSync(ownerPath, "utf8");
  const expression = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = expression.exec(content))) {
    checkLocalReference(ownerPath, match[1]);
  }
}

function checkCssReferences(relativePath) {
  const ownerPath = appPath(relativePath);
  const content = fs.readFileSync(ownerPath, "utf8");
  const expression = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let match;
  while ((match = expression.exec(content))) {
    checkLocalReference(ownerPath, match[1]);
  }
}

function checkServiceWorkerReferences(relativePath) {
  const ownerPath = appPath(relativePath);
  const content = fs.readFileSync(ownerPath, "utf8");
  const expression = /["'](\.\/[^"']+)["']/g;
  let match;
  while ((match = expression.exec(content))) {
    checkLocalReference(ownerPath, match[1]);
  }
}

if (!fs.existsSync(APP)) {
  fail("缺少 current/wx-minigame 开发主干。");
  process.exit();
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(appPath(relativePath))) {
    fail(`缺少文件：current/wx-minigame/${relativePath}`);
  }
}

for (const jsonFile of ["game.json", "project.config.json", "package.json"]) {
  const absolutePath = jsonFile === "package.json" ? path.join(ROOT, jsonFile) : appPath(jsonFile);
  try {
    JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(ROOT, absolutePath)} 不是有效 JSON：${error.message}`);
  }
}

for (const relativePath of syntaxFiles) {
  const result = spawnSync(process.execPath, ["--check", appPath(relativePath)], {
    encoding: "utf8"
  });
  if (result.status !== 0) {
    fail(`${relativePath} 语法检查失败：${result.stderr.trim()}`);
  }
}

for (const relativePath of [
  "preview.html",
  "mobile-wechat-standard.html",
  "mobile-wechat-offline-standard.html"
]) {
  checkHtmlReferences(relativePath);
}

for (const relativePath of ["styles.css", "wechat-shell-standard.css"]) {
  checkCssReferences(relativePath);
}

checkServiceWorkerReferences("sw-standard.js");

const integration = spawnSync(process.execPath, [appPath("tools/verify-formal-integration.js")], {
  cwd: APP,
  encoding: "utf8"
});
if (integration.status !== 0) {
  fail(`正式接入检查失败：${integration.stderr.trim() || integration.stdout.trim()}`);
}

const projectConfig = JSON.parse(fs.readFileSync(appPath("project.config.json"), "utf8"));
const runtimeConfig = fs.readFileSync(appPath("wx-game.config.js"), "utf8");
const warnings = [];

if (!projectConfig.appid || projectConfig.appid === "touristappid") {
  warnings.push("project.config.json 仍使用 touristappid");
}
if (/appId:\s*["']touristappid["']/.test(runtimeConfig)) {
  warnings.push("wx-game.config.js 仍使用 touristappid");
}
if (/apiBaseUrl:\s*["']["']/.test(runtimeConfig)) {
  warnings.push("API 地址尚未配置");
}
if (/bannerUnitId:\s*["']["']/.test(runtimeConfig)) {
  warnings.push("Banner 广告位尚未配置");
}
if (/rewardedVideoUnitId:\s*["']["']/.test(runtimeConfig)) {
  warnings.push("激励视频广告位尚未配置");
}

if (process.exitCode) {
  process.exit();
}

console.log("PASS: 工程结构、JSON、JavaScript 语法和正式接入链路校验通过。");
for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}
