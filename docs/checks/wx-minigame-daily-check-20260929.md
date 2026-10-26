# 微信小游戏正式主干每日巡检报告（2026-09-29）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持完整，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均存在且与正式主干结构一致。
- `js/services/runtime-config.js` 的默认分享查询参数仍是 `from=share`，与正式小游戏配置 `wx-game.config.js` 中的 `shareQuery: "from=minigame"` 不一致，存在网页验收壳与正式小游戏分享链路语义不统一的问题。
- `js/services/update-service.js` 在 `onUpdateReady` 时只记录日志，没有调用 `applyUpdate()`，会导致微信小游戏正式版检测到新包后无法自动进入更新应用流程。

## 已修复项

- 已将 `js/services/runtime-config.js` 的默认 `share.query` 回退值改为 `from=minigame`，使网页验收壳与正式小游戏主配置保持一致。
- 已补齐 `js/services/update-service.js` 的正式更新应用逻辑：收到 `onUpdateReady` 后会安全调用 `applyUpdate()`，并增加 `update-applying` / `update-apply-failed` 日志与防重复保护。
- 已同步滚动正式版本戳到 `20260929-wxmini-40`，并更新以下位置：
  - `mobile-wechat-standard.html`
  - `mobile-wechat-offline-standard.html`
  - `js/services/runtime-config.js`
  - `sw-standard.js`

## 校验结果

- `node tools/verify-formal-integration.js`：通过
- `node --check js/blob-merge-core.js`：通过
- `node --check js/game-wechat-standard.js`：通过
- `node --check js/services/runtime-config.js`：通过
- `node --check js/services/update-service.js`：通过
- `node --check sw-standard.js`：通过

## 待人工确认

- `appid`、接口地址、广告位 ID 仍是占位或空值，正式提审前仍需替换为真实配置。
- 建议在微信开发者工具或真机复核一次新包更新流程，确认 `onUpdateReady -> applyUpdate()` 在目标环境下按预期生效。
- 建议顺手验证分享链路 query 参数是否按 `from=minigame` 输出，并确认不影响当前分享统计与复活/通关卡片入口。
