# 微信小游戏每日巡检（正式主干）

日期：2026-09-18  
目标目录：`blob-merge-prototype/wx-minigame-standard`

## 本次结论

- 正式主链路文件齐全，入口引用关系仍符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- 本次巡检发现并修复了正式主干的版本戳漂移问题；修复后 `tools/verify-formal-integration.js` 校验通过。
- 重点语法检查通过：`js/blob-merge-core.js`、`js/game-wechat-standard.js`；补充检查 `js/services/runtime-config.js` 与 `sw-standard.js` 也通过。

## 已检查范围

- 入口链路：`game.js`、`js/game-wechat-standard.js`、`js/services/*.js`、`js/blob-merge-core.js`、`js/wx-runtime.js`
- 配置与壳：`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js`、`preview.html`

## 已修复

1. 统一正式主干版本戳与构建标识
   - 将网页验收壳资源 `?v=` 统一为 `20260918-wxmini-28`
   - 将网页壳 `window.__BLOB_BUILD_LABEL__` 与页面内 `menuBuildNotice` 统一为 `2026-09-18 wxmini-28`
   - 将 `js/services/runtime-config.js` 的 `buildLabel` fallback 同步为 `2026-09-18 wxmini-28`
   - 将 `sw-standard.js` 的 `CACHE_NAME` 版本戳同步为 `20260918-wxmini-28`

## 本次确认结果

- 未发现正式入口 `require` 路径错误，`game.js`、`js/wx-runtime.js` 均正确指向 `js/game-wechat-standard.js`
- 未发现 `js/game-wechat-standard.js` 对 `js/services/*` 的引用缺项
- 未发现 `tools/verify-formal-integration.js` 约束下的结构断链、资源清单缺失或构建标识失配
- `wechat-shell-standard.css` 中存在若干网页验收壳隐藏/保留样式，但本次未发现会直接破坏微信小游戏正式主链路的确定性问题

## 待人工确认

1. 正式主干是否需要同步到 11 级合并规格
   - 当前 `js/blob-merge-core.js` 和 `js/game-wechat-standard.js` 仍按 7 档类型表运行
   - 若正式版必须对齐 11 级，需要连同核心类型表、UI 展示、终局判定与半径配置一并改

2. 提审前的真实小游戏配置
   - `project.config.json` 与 `wx-game.config.js` 里的 `appid` 仍是占位值 `touristappid`
   - `wx-game.config.js` 中接口地址、排行榜地址、广告位 ID 仍为空，需在接正式服务时补齐

## 本次执行记录

- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check sw-standard.js`
- `node tools/verify-formal-integration.js`
