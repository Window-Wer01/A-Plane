# 整理与迁移记录

整理日期：2026-10-26

## 来源

原始来源：

```text
C:\Users\Admin\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a3bd26259998ac0e360dce0\blob-merge-prototype
```

原目录保持不变。由于该路径受应用私有目录权限限制，先通过 Windows 文件资源管理器完整复制到 Codex 工作区，再在副本中分析和整理。

## 发现

- 原目录包含 257 个文件、41 个子目录，约 41.85 MB。
- 根目录同时存在早期桌面/手机网页、v47-v52 微信网页版本、离线壳、Service Worker 和样式快照。
- `wx-minigame-ui-test-004/` 是 2026-09-21 左右的 UI 测试基线。
- `wx-minigame-standard/` 是持续维护的正式主干，巡检记录更新到 2026-10-22。
- `wx-minigame-standard/ui-test-004/` 是正式目录内保留的旧测试快照。
- 未发现真实密钥；AppID、接口和广告位目前均为占位或空值。

## 整理决策

1. 以 `wx-minigame-standard/` 为唯一当前开发主干。
2. 将巡检记录移到 `docs/checks/`，避免运行目录继续堆积日报。
3. 当前主干不包含 `.maintenance/` 和嵌套 `ui-test-004/`。
4. 原始内容完整保存在 `archive/original-snapshot/`，保证可追溯。
5. 增加 `AGENTS.md`、工程级 README、结构说明和统一校验命令，方便后续 Codex 直接接手。

## 版本差异结论

`wx-minigame-standard/` 相比根级 `wx-minigame-ui-test-004/`，在核心逻辑、微信运行层、网页壳、Service Worker 和样式上均有后续修改。最新巡检记录还明确修复了网页退出白屏和帮助文案与投放手势不一致的问题。因此旧 UI 测试版不应重新成为开发基线。

## 后续优先事项

1. 用真实 AppID 在微信开发者工具导入并验证。
2. 明确登录、排行、广告和分享后端接口。
3. 决定配置注入策略，避免把敏感配置直接提交到版本库。
4. 真机验证 750×1334 参考 UI 在不同安全区、DPR 与全面屏上的表现。
5. 若继续维护网页验收壳，统一小游戏入口与浏览器 bootstrap 的配置来源。
