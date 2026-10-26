# GitHub Pages 手机试玩发布流程

## 每次更新后的标准流程

在 `blob-merge-project` 根目录执行：

```powershell
node tools/verify-project.js
node tools/build-playtest.js
```

生成目录：

```text
../blob-merge-mobile-playtest/
```

这个目录只包含手机网页试玩所需的 HTML、CSS、JavaScript、音频、视频和图片，不包含微信开发者工具配置，也不包含历史归档。

## 更新已有 GitHub Pages 仓库

将 `blob-merge-mobile-playtest/` 里的全部内容同步到原 GitHub Pages 仓库根目录，然后提交并推送。例如在原 GitHub 仓库目录中执行：

```powershell
git add --all
git commit -m "chore: update mobile playtest"
git push
```

如果你继续让 Codex 操作，只需要把本工程目录和 GitHub 仓库地址告诉 Codex，并说：

> 校验当前主干，生成最新手机试玩包，同步到已有 GitHub Pages 仓库并提交。

推送属于外部发布操作，Codex 会在实际执行前根据当前授权和登录状态处理。

## 第一次建立 GitHub Pages

1. 新建一个 GitHub 仓库。
2. 将试玩包中的全部文件放到仓库根目录并推送到 `main`。
3. 在 GitHub 仓库打开 `Settings -> Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`。
6. 等待 Pages 构建完成后，用手机打开 GitHub 提供的网址。

## 测试注意事项

- `index.html` 是默认手机试玩入口。
- `preview.html` 是电脑浏览器中的手机框预览入口。
- GitHub Pages 发布后若仍看到旧版本，先完全刷新页面；Service Worker 更新可能需要重新打开页面。
- 当前构建版本显示为 `20261022-wxmini-50`。
- 正式微信小游戏 AppID、登录和广告配置不影响这个纯网页试玩包。
