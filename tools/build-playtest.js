const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "current", "wx-minigame");
const DEFAULT_TARGET = path.resolve(ROOT, "..", "blob-merge-mobile-playtest");
const TARGET = path.resolve(process.argv[2] || DEFAULT_TARGET);

const files = [
  "mobile-wechat-standard.html",
  "mobile-wechat-offline-standard.html",
  "preview.html",
  "styles.css",
  "wechat-shell-standard.css",
  "sw-standard.js"
];
const directories = ["assets", "js"];

function assertSafeTarget(target) {
  if (target === ROOT || target === SOURCE || target.length < 10) {
    throw new Error(`拒绝使用不安全的发布目标：${target}`);
  }
}

function copyFile(relativePath) {
  const sourcePath = path.join(SOURCE, relativePath);
  const targetPath = path.join(TARGET, relativePath);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`正式主干缺少发布文件：${relativePath}`);
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

assertSafeTarget(TARGET);

if (!fs.existsSync(SOURCE)) {
  throw new Error(`找不到正式主干：${SOURCE}`);
}

fs.rmSync(TARGET, { recursive: true, force: true });
fs.mkdirSync(TARGET, { recursive: true });

for (const relativePath of files) {
  copyFile(relativePath);
}
for (const relativePath of directories) {
  const sourcePath = path.join(SOURCE, relativePath);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`正式主干缺少发布目录：${relativePath}`);
  }
  fs.cpSync(sourcePath, path.join(TARGET, relativePath), { recursive: true });
}

fs.copyFileSync(
  path.join(SOURCE, "mobile-wechat-standard.html"),
  path.join(TARGET, "index.html")
);
fs.copyFileSync(
  path.join(ROOT, "docs", "GITHUB_PLAYTEST_DETAILED.md"),
  path.join(TARGET, "README.md")
);
fs.writeFileSync(path.join(TARGET, ".nojekyll"), "", "utf8");

const html = fs.readFileSync(path.join(SOURCE, "mobile-wechat-standard.html"), "utf8");
const buildMatch = html.match(/__BLOB_BUILD_LABEL__\s*=\s*["']([^"']+)["']/);
const buildLabel = buildMatch ? buildMatch[1] : "unknown";
const metadata = [
  `build=${buildLabel}`,
  `source=current/wx-minigame`,
  `generated=${new Date().toISOString()}`,
  "entry=index.html",
  ""
].join("\n");
fs.writeFileSync(path.join(TARGET, "VERSION.txt"), metadata, "utf8");

console.log(`手机试玩包生成完成：${TARGET}`);
console.log(`构建版本：${buildLabel}`);
