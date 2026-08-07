# 啵啵星团静态分享说明

这是一个纯静态前端原型，不依赖数据库或后端服务。

## 文件说明

- `index.html`
  通用版入口，适合电脑浏览器验证
- `mobile.html`
  手机验证版入口，适合触控下滑投放测试
- `styles.css`
  样式文件
- `game.js`
  游戏逻辑

## 如何分享

把整个目录上传到任意静态托管即可，例如：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages
- 任意可直接托管 HTML/CSS/JS 的空间

## 上传后的访问方式

假设你的静态地址是：

`https://example.com/blob-merge-prototype/`

则：

- 电脑版入口：`https://example.com/blob-merge-prototype/index.html`
- 手机版入口：`https://example.com/blob-merge-prototype/mobile.html`

## 当前原型包含

- 单人可试玩
- 基础碰撞与合并
- 危险区提示与结束判定
- 手机下滑投放
- 本地最高分

## 当前原型未包含

- 多人模式
- 服务端排行榜
- 登录账号
- 商业化与支付
- 完整音效与正式美术资源
