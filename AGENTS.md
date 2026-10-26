# Codex 协作规则

## 工作范围

- 默认开发目录是 `current/wx-minigame/`。
- 本机如存在 `archive/original-snapshot/`，它是只读历史快照且不会上传 GitHub；除非用户明确要求，不得修改、重排或删除。
- `docs/checks/` 是历史巡检记录，不是运行时代码。
- 不要从根目录历史 v47-v52 文件反向覆盖当前主干。

## 架构边界

- `current/wx-minigame/game.js`：微信小游戏唯一正式入口。
- `current/wx-minigame/js/game-wechat-standard.js`：平台编排与界面运行层。
- `current/wx-minigame/js/blob-merge-core.js`：玩法核心；尽量保持与微信 API 解耦。
- `current/wx-minigame/js/services/`：登录、广告、分享、排行、更新与运行配置。
- HTML/CSS/Service Worker 是网页验收壳，修改资源版本时必须同步版本戳。

## 修改要求

- 修改正式主干后运行 `node tools/verify-project.js`（有 npm 时也可运行 `npm run verify`）。
- 修改 HTML、CSS、核心脚本或 Service Worker 时，保持两份验收壳、运行配置 fallback、`preview.html` 和缓存版本一致。
- 不提交真实密钥、登录令牌或广告后台凭据。
- 正式 AppID 和接口配置如需写入仓库，先确认其是否允许公开；优先使用部署时注入或私有配置。
- 新增资源时确认微信小游戏包体限制，并检查 Service Worker 缓存清单。
- 当前主干不保留 `-old`、`-backup` 或仅为历史追溯的多版本资产；旧内容由 Git 历史和本地 archive 负责保存。
- 删除资产应使用独立分支和独立提交，先证明无引用，再完成网页与微信开发者工具验证。

## 验证顺序

1. `node tools/verify-project.js`
2. 本地静态服务器打开 `current/wx-minigame/preview.html`
3. 微信开发者工具导入 `current/wx-minigame/`
4. 真机复核触控、分享、广告、缓存更新与安全区适配

## 交付记录

重要结构调整、版本戳滚动和未解决问题，应追加到 `docs/`，不要把临时报告堆回运行目录。
