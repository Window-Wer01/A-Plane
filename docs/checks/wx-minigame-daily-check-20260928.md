# 微信小游戏正式主干巡检报告（2026-09-28）

## 本次发现

- 正式主链路 `game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 仍保持完整，`game.json`、`project.config.json`、`wx-game.config.js`、`mobile-wechat-standard.html`、`mobile-wechat-offline-standard.html`、`wechat-shell-standard.css`、`sw-standard.js` 均存在且与正式主干结构一致。
- `js/blob-merge-core.js` 中怪物精灵图此前只写入 `./assets/...` 单一路径；该写法在网页壳可正常解析，但在微信小游戏运行时存在相对路径解析差异，容易导致正式小游戏侧精灵图加载失败或回退成纯色球体。
- 网页验收壳中仍保留 `leaderboardPanel`、`settingsPanel` 等预留节点，但当前 `js/game-wechat-standard.js` 没有把这些节点纳入正式交互链路，属于壳内保留面板，暂未作为本次安全修复目标直接改 UI。

## 已修复项

- 已将 `js/blob-merge-core.js` 的精灵图加载改为双路径回退：优先尝试 `assets/bubble-creature-refined-20260920.png`，失败后自动回退 `./assets/bubble-creature-refined-20260920.png`，提升微信小游戏正式环境与网页验收壳之间的资源兼容性。
- 已按正式主干约定同步刷新版本信息：
  - `mobile-wechat-standard.html`
  - `mobile-wechat-offline-standard.html`
  - `js/services/runtime-config.js`
  - `sw-standard.js`
- 当前正式版本戳已更新为 `20260928-wxmini-39`，`buildLabel` 已更新为 `2026-09-28 wxmini-39`，用于强制刷新网页壳缓存并确保与本次修复一致。

## 校验结果

- `node tools/verify-formal-integration.js`：通过
- `node --check js/blob-merge-core.js`：通过
- `node --check js/game-wechat-standard.js`：通过
- `node --check js/services/runtime-config.js`：通过
- `node --check sw-standard.js`：通过

## 待人工确认项

- 请在微信开发者工具或真机中复核本次精灵图是否已稳定显示为预期怪物贴图，而不是退化为纯色占位球。
- 请顺手确认网页验收壳中的返回按钮、技能区、宠物乐园电视按钮在新版缓存刷新后仍可正常点击和显示。
- `leaderboardPanel` 与 `settingsPanel` 目前仍是壳内预留面板；若后续要正式启用，需要先确认是否允许在当前极简 UI 下补回入口与交互。
