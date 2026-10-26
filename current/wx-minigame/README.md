## 微信小游戏正式主干目录

这个目录现在只承担一件事：作为微信小游戏正式接入主干。网页验收壳仍然保留，但它只用于验收，不再反向定义小游戏正式入口。

### 正式主链路

1. `game.js`
   微信小游戏唯一入口，正式包只从这里启动。
2. `js/game-wechat-standard.js`
   正式主运行脚本，负责把核心玩法、网页验收壳和微信能力层串起来。
3. `js/blob-merge-core.js`
   纯玩法核心层，只负责画布更新、碰撞、合成、结果状态。
4. `js/services/*.js`
   微信能力服务层，包括运行配置、登录、广告、分享、排行、更新。

### 目录说明

- `game.js`：微信小游戏正式入口
- `game.json`：小游戏配置
- `project.config.json`：微信开发者工具项目配置
- `wx-game.config.js`：小游戏运行配置，占位填写 AppID、接口地址、广告位 ID
- `mobile-wechat-standard.html`：网页验收壳在线入口
- `mobile-wechat-offline-standard.html`：网页验收壳离线入口
- `preview.html`：PC 验收用手机窗口预览页
- `wechat-shell-standard.css`：网页验收壳样式
- `sw-standard.js`：网页离线缓存脚本
- `js/services/runtime-config.js`：统一读取版本、接口地址、广告位和分享配置
- `js/services/login-service.js`：登录与会话初始化
- `js/services/ad-service.js`：Banner / 激励视频广告封装
- `js/services/share-service.js`：分享与分享状态封装
- `js/services/rank-service.js`：排行数据封装
- `js/services/update-service.js`：更新管理封装

### 当前可测试入口

- 微信开发者工具：导入这个目录 `wx-minigame-standard`
- PC 手机窗口验收：打开 `preview.html`
- 网页验收在线入口：打开 `mobile-wechat-standard.html`
- 网页验收离线入口：打开 `mobile-wechat-offline-standard.html`

### 接入说明

- 当前 `project.config.json` 与 `wx-game.config.js` 里的 `appid` 仍是开发占位值 `touristappid`
- 正式提审前必须替换成你的真实小游戏 AppID
- 若要接正式登录、排行、激励视频和 Banner，需要在运行时配置中补上接口地址与广告位 ID

### 当前状态

这版已经从“网页试玩分支”收成“正式小游戏主干 + 网页验收壳 + 微信能力服务层”的结构。
后续新功能应优先接到 `game.js -> game-wechat-standard.js -> services/* -> blob-merge-core.js` 这一条链路上。
