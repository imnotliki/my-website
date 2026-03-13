# Cloudflare Pages 部署指南

该项目已优化以支持 Cloudflare Pages 部署，并确保在中国境内无障碍访问。

## 部署步骤

1. **推送到 GitHub/GitLab**:
   - 确保将此项目推送到你的 GitHub 或 GitLab 仓库。

2. **在 Cloudflare Pages 创建项目**:
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
   - 选择 **Pages** > **Create a project** > **Connect to Git**。
   - 选择你的仓库 (`suzhenyao-portfolio`)。

3. **配置构建设置**:
   - **Framework preset**: 选择 `Vite`。
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables (可选)**: 无需额外配置。

4. **完成部署**:
   - 点击 **Save and Deploy**。

## 中国境内访问优化说明

为了确保在中国境内无需 VPN 即可正常访问，我们进行了以下更改：

1. **字体替换**:
   - 将 `Google Fonts` 替换为国内镜像 `fonts.font.im`，解决了加载缓慢或失败的问题。

2. **图片本地化**:
   - 将原本引用的 `Unsplash` 和 `Google Storage` 图片全部下载到本地 (`public/images/placeholders`)。
   - 修改代码引用本地图片，彻底移除了外部图片 CDN 依赖。

3. **构建配置修复**:
   - 修复了 `vite.config.ts` 中的 Tailwind CSS 插件引用，确保构建顺利。
   - 添加了 `public/_redirects` 文件，确保单页应用 (SPA) 路由正常工作。

## 本地开发

如果需要在本地运行：

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
npm run preview
```
