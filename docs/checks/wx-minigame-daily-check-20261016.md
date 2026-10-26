# 微信小游戏正式主干巡检记录（2026-10-16）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过；正式主链路模块静态加载检查通过。
- 继续排查入口引用、服务层断链、网页验收壳与小游戏主链路一致性、关键资源路径与版本戳后，未发现新的可安全确定的逻辑断链问题。
- 在线/离线网页壳、`runtime-config.js`、`sw-standard.js` 仍停留在 `20261015-wxmini-44` / `2026-10-15 wxmini-44`，按正式主干规则需要继续统一滚动版本戳，避免旧缓存继续复用上一日资源。

## 已修复项

- 同步滚动版本戳到 `20261016-wxmini-45` / `2026-10-16 wxmini-45`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`js/services/runtime-config.js`、`sw-standard.js` 中的网页壳资源参数、`buildLabel` 与缓存名。
- 覆盖输出今天的正式主干巡检报告，便于继续按日报追踪。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- 新版本 `20261016-wxmini-45` 是否已正确刷新缓存；在线壳、离线壳与小游戏主链路显示的版本文案是否一致。
- 首页、排行榜、宠物乐园、结算分享复活、Banner 占位与主画布交互在当前正式主干下是否仍与昨日验收结论一致，没有出现新遮挡或点击漂移。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
- `node -e "..."` 静态模块加载检查
- `node -e "..."` 关键资源引用存在性检查
