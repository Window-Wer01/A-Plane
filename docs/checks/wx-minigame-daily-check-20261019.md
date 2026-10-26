# 微信小游戏正式主干巡检记录（2026-10-19）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持连通，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均在位。
- `tools/verify-formal-integration.js` 通过；`js/blob-merge-core.js`、`js/game-wechat-standard.js`、`js/services/runtime-config.js`、`js/services/update-service.js`、`sw-standard.js` 语法检查通过；入口模块 `game.js` 导出正常。
- 本轮未发现正式主干入口断链、服务层配置断链、核心物理/碰撞/合并链路代码异常或网页验收壳脚本缺失问题。
- 发现 `js/game-wechat-standard.js` 对小游戏运行时的 `onTouchStart`、`onTouchMove`、`onTouchEnd`、`onTouchCancel`、`onHide` 事件直接注册，若遇到裁剪运行环境、低配模拟器或特殊工具链注入环境缺少对应钩子，存在启动阶段直接抛错并中断主循环的风险。

## 已修复项

- 为 `js/game-wechat-standard.js` 中的小游戏触摸事件与 `onHide` 生命周期事件补上显式能力判断，仅在对应 API 存在时才注册，避免非完整运行环境下因缺失钩子导致正式主干启动失败。
- 同步滚动版本戳到 `20261019-wxmini-47` / `2026-10-19 wxmini-47`，覆盖更新 `mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`preview.html`、`js/services/runtime-config.js`、`sw-standard.js`，确保网页验收壳、PC 预览入口、`buildLabel` 与离线缓存名保持一致。
- 覆盖输出今日巡检报告，保持正式主干日报连续。

## 仍待人工确认

- `appid`、接口地址、`bannerUnitId`、`rewardedVideoUnitId` 仍是占位或空值，正式提审前需要替换为真实配置。
- 建议在微信开发者工具或真机复核两项行为：
- 新版本 `20261019-wxmini-47` 是否已正确刷新缓存；在线壳、离线壳、PC 预览入口与小游戏主链路显示的版本文案是否一致。
- 在微信开发者工具、真机和任一裁剪模拟环境中，小游戏是否都能正常进入主循环，且返回后台再回前台时不会出现 Banner 残留、暂停状态错乱或触摸失效。

## 本次执行

- `node tools/verify-formal-integration.js`
- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check js/services/update-service.js`
- `node --check sw-standard.js`
- `node -e "const game=require('./game.js'); ..."` 入口导出检查
- `node -e "..."` 关键版本戳同步检查
