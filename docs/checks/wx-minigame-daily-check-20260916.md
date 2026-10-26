# 微信小游戏每日巡检（正式主干）

日期：2026-09-16  
目标目录：`blob-merge-prototype/wx-minigame-standard`

## 本次结论

- 正式主链路文件齐全，入口引用关系符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- 语法检查通过；`tools/verify-formal-integration.js` 校验通过。

## 已检查范围（关键文件）

- 入口链路：`game.js`、`js/game-wechat-standard.js`、`js/services/*.js`、`js/blob-merge-core.js`
- 配置与壳：`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js`

## 已修复（原位修改，无新增杂散文件）

1. 滚动升级正式主干版本戳（保持原文件名与路径不变）
   - 统一版本戳为 `20260916-wxmini-27`，用于网页壳缓存刷新与离线缓存隔离。
   - `mobile-wechat-standard.html`：更新 `styles.css` / `wechat-shell-standard.css` / `sw-standard.js` / `js/*` 资源的 `?v=`；同步更新 `window.__BLOB_BUILD_LABEL__` 与页面文案 `menuBuildNotice`
   - `mobile-wechat-offline-standard.html`：同步更新 `?v=`、`window.__BLOB_BUILD_LABEL__` 与页面文案
   - `sw-standard.js`：更新 `CACHE_NAME` 版本戳（确保安装/激活后会重建缓存）
   - `js/services/runtime-config.js`：更新 `buildLabel` fallback（确保网页壳未注入时也一致）

## 未发现/未复现的问题

- 未发现入口 `require` 路径错误、服务层断链、离线缓存脚本关键资源缺失、明显的语法错误。
- 网页验收壳与 `runtime-config.js` 的 `buildLabel` / `v=` 版本戳、`sw-standard.js` 的 `CACHE_NAME` 版本戳一致（当前统一为 `20260916-wxmini-27`）。
- 备注：`mobile-wechat-standard.html` 之前使用过 `20260916-formal-splash-02` 作为部分资源的 `?v=`，本次已收敛为统一版本戳，避免校验脚本判定“版本戳不一致”。

## 待人工确认（需要你拍板才敢改）

1. **正式主干合并层级是否应为 11 级**
   - 当前 `js/blob-merge-core.js` 与 `js/game-wechat-standard.js` 内的类型/提示表仍为 7 档（与之前 UI-TEST-003 的 11 级规格可能不一致）。
   - 若你确认“正式主干也必须升到 11 级”，需要同步：核心类型表、UI 提示/展示、合并终点与碰撞半径（尤其 9/10/11 半径一致）以及资源引用策略（避免误引用 UI-TEST 资源路径）。

2. **是否需要把 `tools/verify-formal-integration.js` 的版本戳规则从 `YYYYMMDD-wxmini-XX` 进一步扩展**
   - 当前脚本只识别 `?v=YYYYMMDD-wxmini-XX` 的格式（正则：`/[?&]v=([0-9]{8}-wxmini-[0-9]{2})\\b/`），本次已按该格式滚动升级为 `20260916-wxmini-27`，校验通过。
   - 若后续需要引入更细分的版本（例如 `YYYYMMDD-formal-splash-XX`），需要同步升级脚本的提取规则，否则会误判“版本戳不一致”或“未提取到版本戳”。

## 本次执行记录

- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node tools/verify-formal-integration.js`
