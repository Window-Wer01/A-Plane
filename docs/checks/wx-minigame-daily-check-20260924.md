# 微信小游戏正式主干巡检日报（2026-09-24）

## 巡检范围

- 目标目录：`blob-merge-prototype/wx-minigame-standard`
- 按正式链路核对：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`
- 同步核对文件：`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js`

## 本次发现

- 正式主链路文件仍齐全，入口引用未断链，`tools/verify-formal-integration.js` 校验通过。
- 网页验收壳中的版本戳、`buildLabel`、`runtime-config.js` fallback 与 `sw-standard.js` 缓存版本仍保持一致，当前版本为 `20260920-wxmini-38` / `2026-09-20 wxmini-38`。
- 发现 `petParkScreen` 中 `wx-tv-action-btn` 已渲染，但 `js/game-wechat-standard.js` 里没有任何对应事件绑定，导致宠物乐园的“看视频”“金币买”“试试手气”按钮点击无反馈，属于正式网页验收壳中的死按钮问题。

## 已修复

- 在 `js/game-wechat-standard.js` 补充宠物乐园按钮绑定，打通网页验收壳侧的按钮反馈链路。
- 为宠物乐园增加本地验收态逻辑：
  - “看视频”按钮现在会触发占位奖励弹层，并立即发放对应数值加成。
  - “金币买”按钮现在会校验当前金币并扣除后发放对应数值加成。
  - “试试手气”按钮现在会稳定返回礼物或金币反馈，不再无响应。
- 补充 `rewardModal` 相关节点收集与关闭逻辑，避免奖励弹层处于纯静态摆设状态。

## 校验结果

- `node --check js/blob-merge-core.js`：通过
- `node --check js/game-wechat-standard.js`：通过
- `node tools/verify-formal-integration.js`：通过

## 待人工确认

- `project.config.json` 与 `wx-game.config.js` 中的 `appid` 仍为占位值 `touristappid`，正式提审前仍需替换为真实 AppID。
- `apiBaseUrl`、`userInfoUrl`、`loginExchangeUrl`、`leaderboardUrl`、广告位 ID 仍为空，当前仍以占位/本地承接逻辑运行。
- 建议在网页验收壳和微信开发者工具中各复核一次：宠物乐园按钮点击反馈、奖励弹层显示、金币扣减与数值变化是否符合当前验收预期。
