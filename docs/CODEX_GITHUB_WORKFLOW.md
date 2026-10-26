# Codex 与 GitHub 的推荐协作方式

## 单一事实来源

- GitHub `main`：可发布、可回滚的稳定主干。
- 功能分支：每次需求的临时工作区。
- `current/wx-minigame/`：唯一游戏开发入口。
- GitHub Actions：统一校验、构建和部署。
- Git 历史：保存旧代码与旧资源，不在当前目录保留副本。

## 每个需求的完整循环

1. 用户给 Codex 一个明确目标和验收标准。
2. Codex从最新 `main` 创建 `feature/...` 或 `fix/...` 分支。
3. Codex修改 `current/wx-minigame/`，同步更新版本戳。
4. 本地运行 `node tools/verify-project.js`。
5. 生成试玩包并本地预览。
6. Codex提供变更摘要、测试结果和待确认风险。
7. 推送功能分支，创建 Pull Request。
8. GitHub Actions 自动检查 Pull Request，但不发布 Pages。
9. 审核通过后合并到 `main`。
10. `main` 的 Actions 自动构建 `dist/playtest` 并发布 GitHub Pages。
11. 手机打开 Pages 和 `VERSION.txt` 做最终验收。

## 分支命名

```text
feature/功能名称
fix/问题名称
chore/资产或工程整理
```

示例：

```text
feature/new-combo-feedback
fix/ios-audio-resume
chore/remove-retired-assets
```

## 提交原则

- 功能、Bug 修复、资产清理分别提交。
- 一个提交只表达一类变化。
- 删除资源必须单独提交，方便回滚。
- 不把真实 AppID、密钥或令牌写入仓库。
- 不直接在 GitHub 网页编辑大量游戏文件。

## 给 Codex 的标准任务模板

```text
请先同步 GitHub main，从 main 创建分支。
目标：……
验收标准：……
修改范围：current/wx-minigame/。
完成后运行完整校验和手机试玩构建，列出变更与风险。
先不要合并 main；创建 Pull Request 供我确认。
```

## 发布故障处理

- Pull Request 检查失败：不合并，Codex根据 Actions 日志修复。
- Pages 部署失败：检查 Actions 的 deploy job，不手工覆盖线上文件。
- 手机仍显示旧版：检查 `VERSION.txt`、缓存版本和 Service Worker。
- 新版有严重问题：在 GitHub revert 对应合并提交，再由 Actions 自动重新发布。
