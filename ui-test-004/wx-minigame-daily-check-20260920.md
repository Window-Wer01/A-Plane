# 微信小游戏每日巡检（正式主干）

日期：2026-09-20  
目标目录：`blob-merge-prototype/wx-minigame-standard`

## 本次结论

- 正式主链路文件齐全，入口关系仍符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- 重点语法检查通过：`js/blob-merge-core.js`、`js/game-wechat-standard.js`；补充检查 `js/services/runtime-config.js` 与 `sw-standard.js` 也通过。
- 现有结构校验脚本 `tools/verify-formal-integration.js` 通过，当前正式壳版本戳保持在 `20260918-wxmini-37` / `2026-09-18 wxmini-37`。

## 已检查范围

- 主入口与运行链路：`game.js`、`js/game-wechat-standard.js`、`js/blob-merge-core.js`、`js/wx-runtime.js`、`js/services/*.js`
- 小游戏配置：`game.json`、`project.config.json`、`wx-game.config.js`
- 网页验收壳与样式：`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js`

## 已修复

1. 补齐离线导航页关键资源预缓存
   - `sw-standard.js` 原先未将 `./assets/startup/guide-splash-750x1334.png` 纳入 `PRECACHE_URLS`
   - 这会导致离线首次打开验收壳时，导航页图片存在未命中缓存而缺失的风险
   - 已原位加入预缓存清单，保持现有文件名与路径不变

## 本次确认结果

- 未发现正式入口 `require` 路径错误，`game.js` 仍正确指向 `js/game-wechat-standard.js`
- 未发现 `js/game-wechat-standard.js` 对 `js/services/*` 的引用缺项或服务层断链
- `js/blob-merge-core.js` 中同等级球体的合并判定仍在碰撞分离逻辑之前执行，未出现回退
- 本次未发现会明确破坏正式小游戏主链路的 UI 层级冲突、布局遮挡或版本戳漂移问题

## 待人工确认

1. 正式提审参数仍为占位配置
   - `project.config.json` 与 `wx-game.config.js` 中 `appid` 仍为 `touristappid`
   - `wx-game.config.js` 中接口地址、排行榜地址、Banner 与激励视频广告位 ID 仍为空

2. 当前版本号是否需要继续滚动
   - 代码与网页验收壳当前统一为 `20260918-wxmini-37`
   - 若今天计划对外发布新包，需按你的版本规则统一升级所有相关版本戳后再发版

## 本次执行记录

- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node --check js/services/runtime-config.js`
- `node --check sw-standard.js`
- `node tools/verify-formal-integration.js`
