# 微信小游戏正式主干巡检记录（2026-10-13）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过。
- 排查到正式网页验收壳在线/离线入口中仍残留 `leaderboardPanel`、`settingsPanel` 两组旧试玩面板节点，但当前正式主链路并未采集或驱动这些面板，属于会干扰验收口径的死结构。
- 版本戳仍停留在 `20261012-wxmini-41` / `2026-10-12 wxmini-41`，若继续沿用旧缓存名，网页壳和离线缓存刷新会不够明确。

## 已修复项

- 从 `mobile-wechat-standard.html` 与 `mobile-wechat-offline-standard.html` 中移除未接入正式主链路的 `leaderboardPanel`、`settingsPanel` 残留面板，收紧网页验收壳，只保留当前正式流程真实可达的界面节点。
- 按正式主干版本约定同步滚动版本戳到 `20261013-wxmini-42` / `2026-10-13 wxmini-42`，覆盖更新在线/离线网页壳引用参数、`runtime-config` 默认 `buildLabel` 与 `sw-standard.js` 缓存名，避免旧缓存继续命中。
- 输出并保存本次巡检报告。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- Banner 广告在不同机型下是否稳定贴底，且不遮挡顶部返回按钮、步数面板、下一颗预览和主画布交互区。
- 激励视频广告在加载失败、提前关闭、完整看完三种情况下，奖励按钮反馈与恢复路径是否符合当前验收预期。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
