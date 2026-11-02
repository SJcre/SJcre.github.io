# DByun的小站 — Hexo 源码

个人博客（[sjcre.github.io](https://sjcre.github.io)）的 Hexo 源码工程。

## 结构说明

单分支：**源码和产物都在 `main` 里**，产物在 `docs/` 子目录。

GitHub Pages 的发布源需要设为 **`main` 分支的 `/docs` 目录**
（仓库 Settings → Pages → Branch: `main`，Folder: `/docs`）。

`docs/` 是构建出来的，**不要手改**，改源码重新生成即可。

## 常用命令

```bash
npm install          # 首次或换机器后安装依赖
npx hexo new "标题"   # 新建文章 → source/_posts/
npx hexo server      # 本地预览 http://localhost:4000
npm run build        # 只构建：clean + generate，输出到 docs/
npm run publish      # 一键发布：构建 + 提交 docs + 推送到 GitHub
```

## 目录结构

```
_config.yml          站点配置（标题、URL、永久链接）
_config.diaspora.yml 主题配置（封面、音乐、一言、评论、搜索）
source/_posts/       文章 markdown
source/img/          图片资源（头像、logo、封面）
source/about|categories|tags|search/   独立页面
scaffolds/           新建文章的模板
scripts/nojekyll.js  构建后自动生成 .nojekyll
themes/diaspora/     主题（Fechin/hexo-theme-diaspora）
docs/                构建产物（需要提交，Pages 发布这里）
```

## 写文章的固定头

```markdown
---
title: 文章标题
date: 2026-11-02 20:00:00
tags:
  - 教程
---
```

URL 规则是 `:year/:month/:day/:title/`，和 4 年前的旧站保持一致，老链接不会失效。

## 发布流程

```bash
npm run publish
```

等价于 `hexo clean && hexo generate && git add docs && git commit && git push`。
推上去之后 GitHub Pages 会在 1 分钟内自动更新。

只想看效果不发布的话用 `npm run build`，然后直接打开 `docs/index.html` 或者 `hexo s` 更省事。

## 主题说明

主题是 [Fechin/hexo-theme-diaspora](https://github.com/Fechin/hexo-theme-diaspora)（MIT 许可）。

**上游已归档**，2022-07-05 后不再维护。因此本仓库把主题作为普通文件纳入版本控制
（不是 submodule），由自己接管维护，具体改动记在 `themes/diaspora/LOCAL-CHANGES.md`。

改主题代码前先看那个文件，避免和已有改动冲突。`LICENSE` 文件必须保留。

主题配置在根目录 `_config.diaspora.yml`，和主题代码分离，升级/替换主题时不会丢配置。

## 待办

- [x] 换回 Diaspora 主题，还原 2022 年的视觉样式
- [x] 补全旧文章「使用Github+Hexo搭建博客并美化」的后续章节
- [ ] `about` 页面目前是空的（和旧站一致），需要写点自我介绍
- [ ] 评论功能（gitalk）未启用，要用需先去 GitHub 建 OAuth 应用
