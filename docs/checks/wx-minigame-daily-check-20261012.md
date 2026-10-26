# 微信小游戏正式主干巡检记录（2026-10-12）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过。
- 排查到网页验收壳帮助文案仍写着“设置和本地榜都不会清掉当前局面”，但当前正式链路实际接通的是暂停、好友榜和宠物乐园；这会让验收口径与现状不一致。
- 复查 `js/services/ad-service.js` 后确认 Banner 贴底重排和激励视频异常收口逻辑仍在位，本次未发现新的确定性代码故障。

## 已修复项

- 修正 `mobile-wechat-standard.html` 与 `mobile-wechat-offline-standard.html` 中帮助面板文案，使网页验收壳描述与当前正式主干实际接通的页面流一致，避免把未接通的预留设置/本地榜误判为正式功能。
- 覆盖更新当日巡检报告为最新结果。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- `leaderboardPanel`、`settingsPanel` 这两组网页壳预留节点仍存在但未接入当前正式流程；如后续决定启用，需要先补齐入口、关闭按钮与数据逻辑，否则建议继续保持隐藏且不要纳入正式验收口径。
- 建议在微信开发者工具或真机复核两项行为：
  - Banner 广告是否稳定贴底显示，且不遮挡顶部返回按钮、步数面板与主画布。
  - 激励视频广告在加载失败、关闭未看完、完整看完三种情况下，奖励按钮反馈是否符合预期。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
