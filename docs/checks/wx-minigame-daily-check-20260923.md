# 微信小游戏每日巡检 — 2026-09-23

目标目录：`blob-merge-prototype/wx-minigame-standard`

## 本次结论

- 正式主链路仍符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- `game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 已逐项核对，关键入口与引用未断链。
- 语法检查通过：`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`sw-standard.js`。
- 结构校验通过：`node tools/verify-formal-integration.js`。

## 本次发现

1. 排行榜面板的 `rankOfflineTip` 虽然存在于页面中，但运行脚本没有按在线/离线与榜单模式切换显示，导致本地榜、离线榜提示长期失效。
2. 结算区 `resultDoubleRewardBtn` 文案没有随局面状态切换，失败局和通关局都会沿用静态文案，网页壳提示与真实行为不一致。

## 已修复

1. 在 `js/game-wechat-standard.js` 中补上排行榜状态提示同步逻辑：
   - 离线时显示离线缓存提示；
   - 开放数据域未接画面时显示占位榜单提示；
   - 远端榜单未接入时显示本地模拟榜提示。
2. 在 `js/game-wechat-standard.js` 中补上结算按钮动态文案：
   - 失败局显示“分享复活”；
   - 通关局显示“分享通关卡片”。
3. 将 `mobile-wechat-offline-standard.html` 的结算按钮默认文案改为中性占位，避免脚本初始化前就出现误导性提示。

## 仍待人工确认

1. `wx-game.config.js` 与 `project.config.json` 中的 `appid` 仍是占位值 `touristappid`，正式提审前必须替换为真实小游戏 AppID。
2. `wx-game.config.js` 中接口地址、排行榜地址、Banner / 激励视频广告位 ID 仍为空，真机联调时需按正式环境补齐。
3. 建议在微信开发者工具或真机复核一次：
   - 排行榜页在离线、本地榜、开放数据域占位三种状态下的提示是否符合预期；
   - 失败结算与通关结算时，结算按钮文案和实际触发行为是否一致。

## 执行记录

- `node --check js/blob-merge-core.js`：通过
- `node --check js/game-wechat-standard.js`：通过
- `node --check js/services/runtime-config.js`：通过
- `node --check sw-standard.js`：通过
- `node tools/verify-formal-integration.js`：通过
