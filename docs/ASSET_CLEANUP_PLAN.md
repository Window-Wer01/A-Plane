# 当前资产清理记录

审计日期：2026-10-26

审计目录：`current/wx-minigame/assets/`

## 清理结果

- 清理前资产文件：29 个
- 当前保留资产文件：25 个
- 已删除未引用资产：4 个
- 减少体积：1,366,453 字节（约 1.30 MiB）
- `node tools/verify-project.js`：通过
- `node tools/build-playtest.js dist/playtest`：通过
- 构建版本：`2026-10-22 wxmini-50`

## 已退役文件

```text
assets/startup/formal-opening-splash.mp4
assets/bubble-creature.png
assets/startup/formal-opening-splash-750x1334-2s.mp4
assets/ui-pixel-ref-20260918/preview/ui_full_preview_750x1334.png
```

这些文件未被当前正式主干、网页验收入口或 Service Worker 缓存清单引用，删除后自动校验和手机试玩构建均通过。旧内容仍可从 Git 历史和迁移前标签 `legacy-before-codex-cleanup-2026-10-26` 恢复。

## 后续资产规则

1. 新资产只放入 `current/wx-minigame/assets/` 中实际使用的位置。
2. 不保留 `-old`、`-backup` 或仅供追溯的重复版本。
3. 替换资产时同步检查 HTML、CSS、JavaScript、JSON 和 `sw-standard.js`。
4. 每次资产修改后运行 `node tools/verify-project.js` 和试玩构建。
5. 历史追溯使用 Git 提交和标签，不在运行目录中堆副本。
