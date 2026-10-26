# 工程结构

```text
blob-merge-project/
├─ current/
│  └─ wx-minigame/          # 唯一当前开发主干
├─ docs/
│  ├─ checks/               # 2026-09 至 2026-10 的历史巡检记录
│  ├─ migration-notes.md    # 本次整理依据与迁移说明
│  └─ validation-report.md  # 本次自动校验结果
├─ tools/
│  └─ verify-project.js     # 工程级校验入口
├─ archive/
│  └─ original-snapshot/    # TRAE 原目录完整只读副本
├─ AGENTS.md                # 后续 Codex 工作规则
├─ README.md                # 使用与启动说明
├─ package.json             # 无依赖校验命令
└─ .gitignore
```

## `current/wx-minigame/`

来源为原项目的 `wx-minigame-standard/`，依据是：

- 目录 README 明确标注为“微信小游戏正式主干目录”。
- 最新巡检记录日期为 2026-10-22。
- 最新构建版本为 `20261022-wxmini-50`。
- 正式接入验证脚本、维护脚本和微信配置文件齐全。

整理时仅移出了巡检 Markdown、`.maintenance/` 状态和嵌套的旧 `ui-test-004/`，没有改动运行时代码和资源。

## `archive/original-snapshot/`

这是原始 `blob-merge-prototype` 的完整副本，共包含根目录网页原型、v47-v52 微信网页版本、`wx-minigame-ui-test-004/` 和 `wx-minigame-standard/`。它用于比较和追溯，不作为当前构建输入。

如需从历史版本找回功能，应先做差异分析，再把最小变更迁移到 `current/wx-minigame/`，不要整体覆盖。
