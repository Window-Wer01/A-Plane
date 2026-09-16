# 微信小游戏每日巡检（正式主干）

日期：2026-09-16  
目标目录：`blob-merge-prototype/wx-minigame-standard`

## 本次结论

- 正式主链路文件齐全，入口引用关系符合 `README.md` 约定：`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js`。
- 语法检查通过；`tools/verify-formal-integration.js` 校验通过。

## 已检查范围（关键文件）

- 入口链路：`game.js`、`js/game-wechat-standard.js`、`js/services/*.js`、`js/blob-merge-core.js`
- 配置与壳：`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js`

## 已修复（原位修改，无新增杂散文件）

1. 移除“音乐开关”UI（符合当前正式主干约束：不保留音乐开关入口）
   - `mobile-wechat-standard.html`：删除 `pauseAudioBtn` 按钮，并重排暂停菜单序号
   - `mobile-wechat-offline-standard.html`：同上
   - `js/game-wechat-standard.js`：移除对 `pauseAudioBtn` 的文案刷新与点击绑定逻辑

## 未发现/未复现的问题

- 未发现入口 `require` 路径错误、服务层断链、离线缓存脚本关键资源缺失、明显的语法错误。
- 网页验收壳与 `runtime-config.js` 的 `buildLabel` / `v=` 版本戳、`sw-standard.js` 的 `CACHE_NAME` 版本戳一致（当前统一为 `20260910-wxmini-26`）。

## 待人工确认（需要你拍板才敢改）

1. **正式主干合并层级是否应为 11 级**
   - 当前 `js/blob-merge-core.js` 与 `js/game-wechat-standard.js` 内的类型/提示表仍为 7 档（与之前 UI-TEST-003 的 11 级规格可能不一致）。
   - 若你确认“正式主干也必须升到 11 级”，需要同步：核心类型表、UI 提示/展示、合并终点与碰撞半径（尤其 9/10/11 半径一致）以及资源引用策略（避免误引用 UI-TEST 资源路径）。

2. **是否需要滚动升级版本戳与 buildLabel**
   - 当前全套版本戳仍是 `20260910-wxmini-26`，一致但较旧；如你要求每日构建滚动，需要同时更新：两份网页壳 `v=`、`sw-standard.js` 的 `CACHE_NAME`、`runtime-config.js` fallback `buildLabel`（并保持 `verify-formal-integration.js` 仍能通过）。

## 本次执行记录

- `node --check js/blob-merge-core.js`
- `node --check js/game-wechat-standard.js`
- `node tools/verify-formal-integration.js`

