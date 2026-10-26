# 微信小游戏正式主干巡检记录（2026-10-20）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过；`game.js` 入口导出检查通过。
- 本轮未发现新的正式主干入口断链、服务层配置断链、物理/碰撞/合并链路异常、网页验收壳结构缺失或小游戏主链路与网页壳脚本不一致问题。
- 当前网页壳、预览入口、`runtime-config.js` 与 `sw-standard.js` 仍停留在昨日版本 `20261019-wxmini-47` / `2026-10-19 wxmini-47`，继续保留会提高命中旧缓存的概率，属于可确定的资源版本戳问题。

## 已修复项

- 同步滚动版本戳到 `20261020-wxmini-48` / `2026-10-20 wxmini-48`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`preview.html`、`js/services/runtime-config.js`、`sw-standard.js`。
- 已确保网页验收壳资源参数、`window.__BLOB_BUILD_LABEL__`、`runtime-config.js` 的 `buildLabel` fallback、PC 预览入口 iframe 参数与 Service Worker 缓存名保持一致。
- 覆盖输出今日巡检报告，保持正式主干日报连续。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- 新版本 `20261020-wxmini-48` 是否已正确刷新缓存；在线壳、离线壳、PC 预览入口与小游戏主链路显示的版本文案是否一致。
- 首页、排行榜、宠物乐园、暂停恢复、分享复活和 Banner 占位在当前正式主干下是否仍无新增层级冲突、点击漂移或遮挡。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
- `node -e "..."` 版本戳同步检查
- `node -e "..."` 入口导出检查
