# 微信小游戏正式主干巡检报告 2026-09-22

## 本次发现

- 正式主干目录结构、`README.md` 约定链路、关键配置文件和网页验收壳文件均齐全，`game.js -> js/game-wechat-standard.js -> js/services/* -> js/blob-merge-core.js` 未断链。
- 发现网页验收壳存在 3 个可见性问题：返回按钮箭头被 CSS 永久隐藏、技能计时条被 CSS 永久隐藏、游戏内宠物快捷入口被 CSS 强制隐藏。
- 发现 `js/blob-merge-core.js` 的精灵图加载仅依赖浏览器 `Image`，在微信小游戏环境下存在贴图加载兼容风险。

## 已修复项

- 修复 `wechat-shell-standard.css`：
  - 恢复 `wx-return-arrow` 的可见箭头绘制，避免右上角返回按钮显示为空白。
  - 调整 `wx-tool-timer` 显示逻辑，保留 `.hidden` 控制，确保技能计时条在生效时可见。
  - 移除 `wx-stage-mascot` 的强制隐藏，恢复游戏内宠物快捷入口点击能力。
- 修复 `js/blob-merge-core.js`：
  - 为精灵图加载补充 `wx.createImage` / `GameGlobal.Image` 兼容分支。
  - 放宽贴图尺寸判定，兼容 `naturalWidth` 不可用但 `width/height` 可用的微信小游戏图片对象。

## 校验结果

- `node --check js/blob-merge-core.js` 通过
- `node --check js/game-wechat-standard.js` 通过
- `node --check js/services/runtime-config.js` 通过
- `node --check sw-standard.js` 通过
- `node tools/verify-formal-integration.js` 通过

## 待人工确认

- `project.config.json` 与 `wx-game.config.js` 中的 `appid` 仍为占位值 `touristappid`，正式提审前必须替换为真实小游戏 AppID。
- 运行时接口地址、排行接口和广告位 ID 仍未填写，联网登录、排行、Banner 与激励视频仍需接入真实配置后再做联调。
- 建议在微信开发者工具或真机上手动复核本次恢复的 3 个 UI 入口：右上角返回按钮、技能计时条、游戏内宠物快捷入口。
