## 啵啵星团（手机可试玩版）

这是一个纯静态网页小游戏（HTML/CSS/JS），适合用 **GitHub Pages** 托管后用手机直接打开测试。

### 本地运行

直接双击打开 `index.html` 或 `mobile.html` 也能跑（部分浏览器可能限制本地文件访问）。更推荐本地起一个静态服务器：

1. 在该目录打开终端
2. 运行：`python -m http.server 8080`
3. 访问：
   - PC：`http://127.0.0.1:8080/index.html`
   - 手机：`http://127.0.0.1:8080/mobile.html`

### GitHub Pages（手机测试推荐）

1. 把这个文件夹作为一个 GitHub 仓库的根目录推到 GitHub（下面我可以帮你做）
2. 到 GitHub 仓库：`Settings` → `Pages`
3. `Build and deployment` 里选择：
   - Source：`Deploy from a branch`
   - Branch：`main`（或你的默认分支） / `(root)`
4. 保存后等 1~2 分钟，GitHub 会给一个访问地址

手机打开地址：
- `https://<你的用户名>.github.io/<仓库名>/mobile.html`

PC 打开地址：
- `https://<你的用户名>.github.io/<仓库名>/index.html`

### 文件说明

- `mobile.html`：手机试玩页（首屏更聚焦画布）
- `index.html`：桌面页
- `game.js`：核心逻辑
- `styles.css`：样式

