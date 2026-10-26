# 微信小游戏正式主干巡检记录（2026-10-21）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/rank-service.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过。
- 网页验收壳中技能栏、排行榜与结算分享区原先持续使用字符串 `innerHTML` 重建 DOM，其中排行榜还会直接把榜单名称与分数拼进 HTML，存在可确定的安全与性能隐患。
- 本轮代码改动后，正式主干版本戳若继续停留在 `20261020-wxmini-48` / `2026-10-20 wxmini-48`，会提高命中旧缓存的概率，属于可确定的资源版本戳问题。

## 已修复项

- 将网页壳的技能栏渲染改为基于 DOM 节点安全更新，并加入渲染键缓存，避免每帧重复重建工具按钮列表。
- 将排行榜渲染改为 `textContent` 安全写入，同时在 `js/services/rank-service.js` 增加远端榜单名称与分数的归一化处理，收口直接拼接 HTML 的注入风险。
- 将结算分享区改为 DOM 节点安全渲染，并加入渲染键缓存，减少结果面板在主循环中的重复重建。
- 同步滚动版本戳到 `20261021-wxmini-49` / `2026-10-21 wxmini-49`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`preview.html`、`js/services/runtime-config.js`、`sw-standard.js`，确保网页壳资源参数、`buildLabel` fallback、预览入口与 Service Worker 缓存名一致。
- 同步修正两份网页验收壳首页默认提示文案，避免在未配置正式用户同步接口时误导为“已接远端同步”状态。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前必须替换为真实配置。
- 分享复活链路当前仍是发起分享后立即执行本地复活，尚未接入可验证的分享成功判定；这次未直接改动发奖逻辑，避免在未确认产品规则前改变现有正式玩法闭环。
- 建议在微信开发者工具或真机复核三项行为：
- 新版本 `20261021-wxmini-49` 是否已正确刷新缓存，在线壳、离线壳、PC 预览入口与小游戏主链路显示的版本文案是否一致。
- 首页、排行榜、宠物乐园、暂停恢复、分享复活和 Banner 占位在当前正式主干下是否仍无新增层级冲突、点击漂移或遮挡。
- 分享复活与结算分享文案是否仍符合当前验收口径；若要改成“分享成功后再发放”，需要先确认正式奖励规则与服务端/微信侧校验方案。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/rank-service.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
