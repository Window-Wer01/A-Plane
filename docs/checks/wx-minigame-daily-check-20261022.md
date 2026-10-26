# 微信小游戏正式主干巡检记录（2026-10-22）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/login-service.js`、`js/services/ad-service.js`、`js/services/share-service.js`、`js/services/rank-service.js`、`js/services/update-service.js`、`sw-standard.js`、`wx-game.config.js` 语法检查通过。
- 网页验收壳的“退出”按钮在浏览器环境下会继续走 `about:blank` 兜底，属于可确定的隐藏 BUG；在 `preview.html` 的 iframe 验收场景里会直接把手机壳页面切成空白。
- 两份网页验收壳帮助文案仍写着“向下滑动释放”，但当前正式主干真实行为是“左右瞄准，松手即投放”，存在交互说明与主链路实现不一致问题。

## 已修复项

- 移除 `js/game-wechat-standard.js` 中网页环境的 `about:blank` 兜底跳转，保留微信小游戏 / 微信内 H5 的退出尝试，避免网页验收壳与 `preview.html` 中点击“退出”后直接白屏。
- 同步修正 `mobile-wechat-standard.html` 与 `mobile-wechat-offline-standard.html` 的帮助文案，使其与当前正式主干的真实投放手势一致，减少验收误判。
- 同步滚动版本戳到 `20261022-wxmini-50` / `2026-10-22 wxmini-50`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`preview.html`、`js/services/runtime-config.js`、`sw-standard.js`，确保网页壳资源参数、`buildLabel` fallback、预览入口与 Service Worker 缓存名一致。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前必须替换为真实配置。
- 网页验收壳当前仍未直接复用 `game.js -> wx-game.config.js` 的配置注入入口；现阶段正式小游戏主链路正确，但网页验收壳对正式配置链的覆盖仍有限，如要进一步收口需单独确认浏览器侧 bootstrap 方案。
- 建议在微信开发者工具或真机复核三项行为：
- 新版本 `20261022-wxmini-50` 是否已正确刷新缓存；在线壳、离线壳、PC 预览入口与小游戏主链路显示的版本文案是否一致。
- 网页壳和 `preview.html` 中点击“退出”后是否稳定回到主菜单而不再出现空白页。
- 首页、排行榜、宠物乐园、暂停恢复、分享复活和 Banner 占位在当前正式主干下是否仍无新增层级冲突、点击漂移或遮挡。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/login-service.js`
- `node --check js/services/ad-service.js`
- `node --check js/services/share-service.js`
- `node --check js/services/rank-service.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
- `node --check wx-game.config.js`
