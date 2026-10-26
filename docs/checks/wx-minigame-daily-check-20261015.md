# 微信小游戏正式主干巡检记录（2026-10-15）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/login-service.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过。
- 排查到一处确定性问题：失败局点击“分享复活”时，网页验收壳与微信小游戏主链路都会先累计一次分享，再判断是否仍有可用复活次数，导致无效操作也会污染分享统计。
- 在线/离线网页壳、`runtime-config.js` 与 `sw-standard.js` 仍停留在 `20261014-wxmini-43` / `2026-10-14 wxmini-43`，需要按正式主干规则统一滚动版本戳，避免缓存和页面文案继续落在旧版本。

## 已修复项

- 修复 `js/game-wechat-standard.js` 的复活分享判定：网页验收壳结算按钮与微信小游戏主链路现在都会先检查 `core.canShareRevive()`，没有可用复活时直接拦截，不再误记一次分享。
- 同步滚动版本戳到 `20261015-wxmini-44` / `2026-10-15 wxmini-44`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`js/services/runtime-config.js`、`sw-standard.js` 中的网页壳资源参数、`buildLabel` 与缓存名。
- 输出并保存本次巡检报告。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- 失败局在复活次数耗尽后，连续点击“分享复活”是否只提示不可复活，且不会继续增加分享统计。
- 新版本 `20261015-wxmini-44` 是否已正确刷新缓存；在线壳、离线壳与小游戏主链路显示的版本文案是否一致。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/login-service.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
