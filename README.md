## 微信小游戏标准骨架

这个目录已经是新的主迁移目录，不再和旧的网页 `v47-v52` 试玩页混在一起。

### 目录说明

- `game.js`：微信小游戏入口
- `game.json`：小游戏配置
- `project.config.json`：微信开发者工具项目配置
- `mobile-wechat-standard.html`：迁移后的正式手机页
- `mobile-wechat-offline-standard.html`：迁移后的正式离线页
- `js/game-wechat-standard.js`：迁移后的完整网页逻辑
- `wechat-shell-standard.css`：迁移后的完整手机壳样式
- `preview.html`：PC 和手机都能直接验收的手机窗口预览页
- `js/blob-merge-core.js` / `js/wx-runtime.js`：小游戏标准骨架与后续共享核心入口

### 当前架构

这次先把结构和正式内容一起迁过来：

1. 微信小游戏部分单独处理
2. 完整手机页已经迁进这个目录
3. 网页预览和 PC 验收继续保留
4. 三端共用资源目录，后续再继续收拢玩法核心

### 当前可测试入口

- 微信开发者工具：导入这个目录 `wx-minigame-standard`
- PC 手机窗口验收：打开 `preview.html`
- 正式手机页：打开 `mobile-wechat-standard.html`

### 说明

这版已经不是纯骨架，而是“标准目录 + 正式迁移页 + 验收预览壳”。
后续继续在这里处理小游戏接口替换、资源压缩和共用核心收拢。
