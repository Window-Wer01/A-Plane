# 微信小游戏正式主干巡检记录（2026-10-17）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过；关键静态资源存在性检查通过。
- 本轮未发现新的可安全确定的入口断链、服务层断链、物理/碰撞/合并链路异常或网页验收壳与小游戏正式主链路不一致问题。
- 昨日版本戳仍停留在 `20261016-wxmini-45` / `2026-10-16 wxmini-45`，会继续复用上一日网页壳缓存；同时 `preview.html` 未显式携带版本参数，PC 验收入口存在继续命中旧页面缓存的风险。

## 已修复项

- 同步滚动版本戳到 `20261017-wxmini-46` / `2026-10-17 wxmini-46`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`js/services/runtime-config.js`、`sw-standard.js` 中的网页壳资源参数、`buildLabel` 与缓存名。
- 补充 `preview.html` 的 iframe 版本参数，使 PC 手机窗口验收页跟随正式网页壳版本同步刷新，降低旧缓存残留导致的误判风险。
- 覆盖输出今日巡检报告，保持正式主干日报连续。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- 新版本 `20261017-wxmini-46` 是否已正确刷新缓存；在线壳、离线壳、PC 预览入口与小游戏主链路显示的版本文案是否一致。
- 首页、排行榜、宠物乐园、分享复活、Banner 占位和主画布交互是否仍无新增遮挡、层级冲突或点击漂移。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
- `node -e "..."` 关键文件与资源存在性检查
