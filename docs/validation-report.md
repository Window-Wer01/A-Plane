# 整理校验报告

校验日期：2026-10-26

## 完整性

- 原始复制副本：257 个文件、41 个子目录、41,853,289 字节。
- `archive/original-snapshot/`：43 个顶层项目、257 个文件、41,853,289 字节。
- 因此交付内的原始快照与导入副本在文件数和总字节数上保持一致。

## 自动检查范围

`node tools/verify-project.js` 会执行：

- 当前主干必要文件检查。
- `game.json`、`project.config.json`、根 `package.json` 的 JSON 解析。
- 当前主干 JavaScript 文件的 `node --check` 语法检查。
- HTML 的本地 `src` / `href` 引用检查。
- CSS 的本地 `url(...)` 引用检查。
- Service Worker 本地缓存路径检查。
- 正式主干自带的 `tools/verify-formal-integration.js`。
- AppID、API 和广告位占位配置提示。

## 首次执行结果

结构、JSON、JavaScript 语法、静态资源引用和正式接入链路通过。

保留的预期警告：

- `project.config.json` 仍使用 `touristappid`。
- `wx-game.config.js` 仍使用 `touristappid`。
- API 地址尚未配置。
- Banner 广告位尚未配置。
- 激励视频广告位尚未配置。

## 未自动覆盖

- 微信开发者工具编译。
- 微信真机运行。
- 登录、接口、开放数据域、分享与广告后台联调。
- 浏览器视觉回归与不同移动设备安全区检查。
