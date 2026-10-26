# 啵啵星团（Blob Merge）开发工程

本目录是从 TRAE 工作区项目整理出的 Codex 后续开发版本。原始 TRAE 目录未被修改；迁移前内容由 Git 历史和标签 `legacy-before-codex-cleanup-2026-10-26` 保留，本机另有不上传 GitHub 的完整归档。

## 开发入口

唯一的当前开发主干：

```text
current/wx-minigame/
```

主调用链：

```text
game.js
  -> js/game-wechat-standard.js
     -> js/services/*
     -> js/blob-merge-core.js
```

GitHub 工程不保存 `archive/` 或散落的旧版本副本。需要追溯时使用 Git 历史或迁移前标签，不要从旧提交反向覆盖当前主干。

## 快速开始

### 微信开发者工具

在微信开发者工具中导入：

```text
current/wx-minigame
```

当前 AppID 仍为 `touristappid`。正式登录、广告、排行或提审前，需要同时检查：

- `current/wx-minigame/project.config.json`
- `current/wx-minigame/wx-game.config.js`

### 网页预览

在工程根目录运行：

```powershell
python -m http.server 8080
```

然后访问：

- PC 手机框预览：`http://127.0.0.1:8080/current/wx-minigame/preview.html`
- 在线验收壳：`http://127.0.0.1:8080/current/wx-minigame/mobile-wechat-standard.html`
- 离线验收壳：`http://127.0.0.1:8080/current/wx-minigame/mobile-wechat-offline-standard.html`

不要直接使用 `file://` 判断 Service Worker 或缓存行为。

## 校验

工程无需安装依赖。安装 Node.js 后，在根目录运行：

```powershell
node tools/verify-project.js
```

如果本机提供 npm，也可以运行 `npm run verify`。只运行当前主干自带的正式接入检查：

```powershell
node current/wx-minigame/tools/verify-formal-integration.js
```

## 当前已知待配置项

- `appid` / `appId` 是 `touristappid`。
- API 地址为空。
- Banner 与激励视频广告位 ID 为空。
- 网页验收壳尚未完全复用小游戏入口的配置注入链。
- 微信开发者工具与真机行为仍需在真实 AppID 下复核。

更多说明见 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 和 [docs/migration-notes.md](docs/migration-notes.md)。

## 生成手机试玩发布包

修改正式主干并通过校验后，运行：

```powershell
node tools/build-playtest.js
```

默认会在本工程同级生成 `blob-merge-mobile-playtest/`。该目录可以直接作为 GitHub Pages 发布内容，其中 `index.html` 就是手机试玩入口。完整步骤见 `docs/GITHUB_PLAYTEST_DETAILED.md`。

GitHub 自动协作方案见：

- `docs/CODEX_GITHUB_WORKFLOW.md`
- `docs/ASSET_CLEANUP_PLAN.md`
- `.github/workflows/pages.yml`
