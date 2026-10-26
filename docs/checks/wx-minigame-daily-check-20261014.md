# 微信小游戏正式主干巡检记录（2026-10-14）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/login-service.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过。
- 排查到三个确定性问题：微信侧本地/失败会话会被旧缓存直接复用，导致后续真实登录不再重试；网页验收壳工具计时条永远被隐藏；宠物乐园“看视频”按钮未经过广告服务层就直接发奖励。
- 网页验收壳首页版本信息虽已写入 DOM，但被 `wechat-shell-standard.css` 长期隐藏；同时在线/离线壳、`runtime-config.js`、`sw-standard.js` 版本戳仍停留在 `20261013-wxmini-42` / `2026-10-13 wxmini-42`。
- 结果面板成功态仍带有“分享奖励/已到账”方向的旧占位语义，和当前未真正发放的正式链路不完全一致。

## 已修复项

- 调整 `js/services/login-service.js` 缓存复用策略：微信环境现在只复用真实 `wx-server` 会话；`wx-local`、`wx-login-failed`、`wx-guest` 不再固化为长期缓存，避免正式登录链路被旧游客态锁死。
- 修复 `js/game-wechat-standard.js` 中网页验收壳工具计时显示，`gameToolTimer` 现已读取 `core.getToolTimerText()`，不再始终隐藏。
- 修复宠物乐园“看视频”奖励路径：网页壳与小游戏正式链路现在统一走 `ad-service.requestReward()`，仅在回调确认 `granted` 后才发放属性加成，并补上防重复点击与异常提示。
- 将网页验收壳首页版本提示改为可见，方便直接核对缓存与构建版本。
- 收紧结果面板成功态文案，去掉“已到账”误导性表达，改为仅说明当前分享奖励仍在占位验证阶段，基础奖励不被伪造追加。
- 按正式主干版本约定同步滚动版本戳到 `20261014-wxmini-43` / `2026-10-14 wxmini-43`，覆盖更新在线/离线网页壳引用参数、`runtime-config` 默认 `buildLabel` 与 `sw-standard.js` 缓存名。
- 输出并保存本次巡检报告。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- `rank-service` 目前虽然已接远端榜单入口，但服务端鉴权字段与请求协议未在仓内定稿；若正式接口要求 `token/openId/playerId`，仍需按真实接口契约补齐。
- 建议在微信开发者工具或真机复核三项行为：
- 微信登录在“首次失败后恢复网络”的情况下，是否会重新走真实登录并拿到正式会话。
- 宠物乐园“看视频”在完整看完、提前关闭、加载失败三种情况下，属性加成与提示文案是否符合预期。
- Banner 广告在不同机型下是否稳定贴底，且不遮挡顶部返回按钮、步数面板、下一颗预览和主画布交互区。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/login-service.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
