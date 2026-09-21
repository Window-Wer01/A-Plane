# 微信小游戏每日巡检 — 2026-09-21

目标目录：`blob-merge-prototype/wx-minigame-standard`

## 概览

- 结构与正式链路：符合 `README.md` 约定的正式链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`，未发现断链或引用漂移。
- 版本戳一致性：网页验收壳 `?v=`、`sw-standard.js` 的 `CACHE_NAME`、`runtime-config.js` 的 `buildLabel fallback` 保持一致，当前统一为：
  - `v=20260920-wxmini-38`
  - `buildLabel=2026-09-20 wxmini-38`
- 语法与结构校验：已通过（见“执行记录”）。

## 已检查文件（关键点）

- 入口链路：
  - `game.js`：引用 `wx-game.config.js` 并加载 `js/game-wechat-standard.js`，在 `wx` 环境下调用 `initWxMiniGameMain()`。
  - `js/game-wechat-standard.js`：服务层 `js/services/*` 与核心 `js/blob-merge-core.js` 引用完整。
  - `js/blob-merge-core.js`：物理、碰撞、合并、渲染主循环存在且可解析。
- 配置与网页壳：
  - `game.json`、`project.config.json`、`wx-game.config.js`
  - `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`
  - `wechat-shell-standard.css`
  - `sw-standard.js`

## 隐患排查结论（本次未做代码改动）

- 物理/合并链路：
  - `js/blob-merge-core.js` 的 `resolveCollisions()` 中，同级球体在“碰撞分离/反弹”逻辑之前先执行合并判定（满足“接触即合成”的优先级要求）。
  - 额外的 `resolveMerges()` 仍保留作为兜底扫描（不影响上述优先级）。
- UI 层级/遮挡：
  - `wechat-shell-standard.css` 中 `#guideSplash` 使用高 `z-index` 且离场后 `hidden`，正常情况下不会长期遮挡交互。
  - `.wx-stage-overlay` 设置 `pointer-events: none`，其子元素再开启 `pointer-events: auto`，避免整层遮挡画布交互（结构合理）。
- 网页验收壳与小游戏主链路一致性：
  - 关键服务层脚本均在网页壳中显式引入，且 `tools/verify-formal-integration.js` 校验通过。

## 已修复项

- 本次巡检未发现“可安全确定、且必须立即修复”的代码/配置问题，因此未做原位改动。

## 仍待人工确认

- `wx-game.config.js` / `project.config.json` 中的 `appid` 仍为占位值 `touristappid`：提审前必须替换为真实 AppID。
- 若你今天计划发版（滚动版本戳），需要同步更新以下位置，避免缓存与校验脚本失败：
  - `mobile-wechat-standard.html` / `mobile-wechat-offline-standard.html` 的 `?v=` 与 `window.__BLOB_BUILD_LABEL__`
  - `js/services/runtime-config.js` 的 `buildLabel` fallback
  - `sw-standard.js` 的 `CACHE_NAME` 与 `sw` 注册 `?v=`

## 执行记录

- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check sw-standard.js`
- `node tools/verify-formal-integration.js`
  - 输出：`微信小游戏正式接入结构校验通过。`

