# GitHub Pages 手机试玩：完整工作指引

适用工程：`blob-merge-project`

当前手机试玩构建：`2026-10-22 wxmini-50`

## 1. 开发工程与发布包

开发工程是 `blob-merge-project/`，后续代码修改位置是：

```text
blob-merge-project/current/wx-minigame/
```

GitHub Pages 试玩发布包是：

```text
blob-merge-mobile-playtest/
```

GitHub Pages 只需要试玩发布包里的内容，不需要上传完整开发工程。

## 2. 每次开发后的本地流程

在 `blob-merge-project` 根目录运行：

```powershell
node tools/verify-project.js
node tools/build-playtest.js
```

第一条命令检查正式主链路、JSON、JavaScript 语法、HTML/CSS 资源路径、Service Worker 缓存路径和版本一致性。第二条命令会清空并重新生成同级的 `blob-merge-mobile-playtest/`。

不要把人工维护的唯一文件只放在试玩包里，因为下次构建会重建该目录。长期代码和文档应放在开发工程内。

## 3. GitHub 需要更新的内容

GitHub Pages 仓库发布目录应与最新试玩包保持一致：

```text
index.html                              # 手机默认入口，必须更新
mobile-wechat-standard.html             # 在线手机入口
mobile-wechat-offline-standard.html     # 离线兜底入口
preview.html                            # PC 手机框预览
styles.css                              # 基础样式
wechat-shell-standard.css               # 手机壳样式
sw-standard.js                          # Service Worker 与离线缓存
assets/                                 # 图片、音频、视频资源
js/                                     # 游戏核心与网页运行脚本
.nojekyll                               # 禁止 Jekyll 改写静态资源
VERSION.txt                             # 本次构建信息
README.md                               # 本发布说明
```

最稳妥的方式是同步试玩包中的全部内容，不要只猜测哪些 JS 文件变了。这样可以同步新增文件，并删除已经废弃的旧资源。

## 4. 不要上传到纯试玩仓库的内容

- `archive/` 历史快照。
- `docs/checks/` 巡检日报。
- 开发工程的 `.git/`。
- 微信开发者工具配置：`project.config.json`、`game.json`、`wx-game.config.js`。
- 真实 AppID、接口密钥、登录令牌或广告后台凭据。
- 本机缓存、临时文件和编辑器目录。

## 5. 更新已有 GitHub Pages 仓库

### 推荐：使用本地 Git 仓库

假设已有 GitHub 仓库位于：

```text
D:\Projects\blob-merge-playtest-github
```

1. 进入仓库并同步远端：

   ```powershell
   cd D:\Projects\blob-merge-playtest-github
   git pull --ff-only
   ```

2. 判断 Pages 实际发布目录：

   - `main / (root)`：试玩包内容复制到仓库根目录。
   - `main /docs`：试玩包内容复制到仓库的 `docs/`。
   - GitHub Actions：查看 `.github/workflows/` 中配置的上传目录。

3. 同步试玩包的全部内容，同时保留仓库自身文件：

   - `.git/`
   - `.github/workflows/`
   - `CNAME`
   - `LICENSE`

   `CNAME` 用于自定义域名，不能被试玩包覆盖或删除。

4. 检查变化：

   ```powershell
   git status
   git diff --stat
   ```

5. 确认后提交并推送：

   ```powershell
   git add --all
   git commit -m "chore: update mobile playtest"
   git push
   ```

6. 打开 GitHub 仓库的 `Actions` 或 `Settings -> Pages`，等待部署成功。

### GitHub 网页上传

可以使用 `Add file -> Upload files`，但网页上传不适合删除大量旧文件，也容易漏掉隐藏文件 `.nojekyll`。长期更新建议使用 Git 命令或让 Codex 操作本地仓库。

## 6. 第一次建立 GitHub Pages

1. 在 GitHub 新建仓库，例如 `blob-merge-playtest`。
2. 把试玩包的内容提交到 `main` 分支根目录。
3. 打开 `Settings -> Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`。
6. 保存并等待部署完成。
7. 用手机访问：

   ```text
   https://你的用户名.github.io/blob-merge-playtest/
   ```

如果仓库名称是 `你的用户名.github.io`，通常访问 `https://你的用户名.github.io/`。

## 7. 发布后确认新版本

1. 访问 `https://你的Pages地址/VERSION.txt`。
2. 确认 `build=` 是本次版本。
3. 打开首页，核对游戏菜单显示版本。
4. 确认 GitHub Pages 部署记录对应最新提交。
5. 手机测试首页、开始游戏、投放、合成、暂停、音效和返回菜单。

## 8. 仍显示旧版本时处理缓存

试玩页使用 Service Worker。GitHub 已更新但手机仍显示旧内容时：

1. 完全关闭网页后重新打开。
2. 临时添加查询参数，例如 `?refresh=20261026`。
3. Android Chrome：在站点设置中清除该网站的存储和缓存。
4. iPhone Safari：在“设置 -> Safari -> 高级 -> 网站数据”中删除对应站点数据。
5. PC Chrome：开发者工具 `Application -> Service Workers -> Unregister`，然后清除站点存储并刷新。

每次正式内容更新都应同步滚动以下文件中的构建/缓存版本：

- `mobile-wechat-standard.html`
- `mobile-wechat-offline-standard.html`
- `preview.html`
- `js/services/runtime-config.js`
- `sw-standard.js`

工程校验脚本会检查版本是否一致。建议让 Codex统一滚动，不要手工只改其中一个文件。

## 9. 发布前检查清单

- [ ] 已在 `current/wx-minigame/` 完成代码修改。
- [ ] 已滚动统一构建版本和 Service Worker 缓存名。
- [ ] `node tools/verify-project.js` 已通过。
- [ ] 已重新运行 `node tools/build-playtest.js`。
- [ ] GitHub 只同步试玩包，没有上传历史快照或真实密钥。
- [ ] 已保留 `CNAME` 和 `.github/workflows/`。
- [ ] `git diff --stat` 与预期一致。
- [ ] GitHub Pages 部署成功。
- [ ] `VERSION.txt` 显示最新版本。
- [ ] Android Chrome 和 iPhone Safari 至少各测试一次。

## 10. 以后交给 Codex 的推荐说法

如果 GitHub 仓库已经在本机：

> 修改完成后，滚动试玩版本，运行完整校验，生成手机试玩包，把试玩包同步到我的 GitHub Pages 本地仓库。保留 CNAME 和 GitHub Actions 配置，先展示 git diff，确认后再提交推送。

如果只有仓库网址：

> 这是我的 GitHub Pages 仓库地址：`仓库地址`。请检查当前登录和本地仓库情况，生成最新试玩包并准备更新。不要上传 archive、真实 AppID 或私密配置。

推送到 GitHub 是外部发布操作。如果没有获得明确推送授权，Codex 会在实际推送前请求确认。
