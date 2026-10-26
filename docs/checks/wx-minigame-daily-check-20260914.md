# 微信小游戏正式主干｜每日巡检报告（2026-09-14）

巡检编号：`20260914-01`

目标目录：`blob-merge-prototype/wx-minigame-standard`

## 结论摘要

- 正式主干目录结构与入口链路完整，符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- 已完成语法检查与正式接入校验脚本运行，均通过；本次未发现可“安全确定且可直接修复”的配置/引用错误，因此未做代码改动（保持文件名与路径不变）。

## 已核对清单（通过）

- 文件存在性与路径一致性：
  - `game.js`
  - `js/game-wechat-standard.js`
  - `js/blob-merge-core.js`
  - `js/services/runtime-config.js`
  - `js/services/login-service.js`
  - `js/services/ad-service.js`
  - `js/services/share-service.js`
  - `js/services/rank-service.js`
  - `js/services/update-service.js`
  - `game.json`
  - `project.config.json`
  - `wx-game.config.js`
  - `mobile-wechat-standard.html`
  - `mobile-wechat-offline-standard.html`
  - `wechat-shell-standard.css`
  - `sw-standard.js`

- 网页验收壳与版本戳一致性（正式入口范围内）：
  - `mobile-wechat-standard.html` / `mobile-wechat-offline-standard.html` 内资源 `?v=` 一致：`20260910-wxmini-26`
  - `js/services/runtime-config.js` 的 `__BLOB_BUILD_LABEL__` fallback 与网页壳一致：`2026-09-10 wxmini-26`
  - `sw-standard.js` 的 `CACHE_NAME` 版本戳与网页壳一致：`20260910-wxmini-26`

## 执行的校验/检查（通过）

- Node 语法检查：
  - `node --check js/blob-merge-core.js`：通过
  - `node --check js/game-wechat-standard.js`：通过
- 正式链路校验脚本：
  - `node tools/verify-formal-integration.js`：输出 `微信小游戏正式接入结构校验通过。`

## 已修复项

- 无（本次未发现可在不引入风险前提下“安全确定可修复”的问题；保持正式主干稳定优先）。

## 仍待人工确认项（建议手机实机验证）

- 微信开发者工具真机/模拟器启动：
  - `game.js` 在 `wx` 环境下能否顺利进入 `initWxMiniGameMain()`，并正常创建/绑定画布、触摸事件、主循环。
- Banner/激励视频/分享/排行链路：
  - `wx-game.config.js` 目前仍为占位（`appId: touristappid`，接口地址/广告位 ID 为空），属于“可跑但服务能力为占位/降级”的预期状态；需要接入真实 AppID 与配置后再做完整联调。
- UI 层级与遮挡：
  - 网页壳（`wechat-shell-standard.css` + DOM UI）与小游戏（纯 Canvas）在同一套布局变量下是否存在遮挡/点击穿透问题，需真机点按确认（尤其：暂停按钮、道具区、Banner 区）。

## 备注（非正式主干阻断项）

- `mobile-wechat-ui-test-001.html`、`mobile-wechat-ui-test-002.html` 存在“服务脚本 `?v=` 版本戳仍指向旧值（如 `20260910-wxmini-24`）”的情况；它们不在 `README.md` 约定的正式入口范围内，本次按“只保证正式主干”原则未改动。

## 参考验收入口（不改文件名）

- 线上网页验收壳（按你约定的固定入口文件名）：`/wx-minigame-standard/mobile-wechat-standard.html`
  - 如需强制刷新缓存：可在地址后追加 `?v=20260914-01`（仅改变 URL 参数，不改文件名/路径）。

