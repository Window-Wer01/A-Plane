# 当前资产清理计划

审计日期：2026-10-26

审计目录：`current/wx-minigame/assets/`

## 审计结果

- 资产文件总数：29
- 已被 HTML、CSS、JavaScript、JSON、Markdown 或 Service Worker 引用：25
- 未发现引用：4
- 当前资产总大小：8,101,401 字节
- 未引用候选合计：1,366,453 字节

## 待退役候选

```text
assets/startup/formal-opening-splash.mp4
assets/bubble-creature.png
assets/startup/formal-opening-splash-750x1334-2s.mp4
assets/ui-pixel-ref-20260918/preview/ui_full_preview_750x1334.png
```

以上文件在当前正式主干文本、运行入口和 Service Worker 缓存清单中均未找到引用，但仍需要完成一次网页试玩和微信开发者工具启动测试后再删除。

## 推荐清理步骤

1. 从 `main` 创建 `chore/remove-retired-assets` 分支。
2. 再次运行 `node tools/verify-project.js`，保存基线结果。
3. 只删除上述四个候选文件，不混入功能修改。
4. 再运行 `node tools/verify-project.js` 和 `node tools/build-playtest.js`。
5. 本地测试首页、开始游戏、音频、启动页和离线重载。
6. 推送分支并创建 Pull Request。
7. 等待 GitHub Actions 校验通过后再合并。
8. 合并后由 Pages 工作流自动发布，再检查 `VERSION.txt` 和手机页面。

旧资产不需要继续留在开发主干中。Git 提交历史和本地 `archive/original-snapshot/` 已承担追溯职责，因此不应把 `-old`、`-backup`、多版本复制件继续堆在运行目录。
