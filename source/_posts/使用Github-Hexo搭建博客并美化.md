---
title: 使用Github+Hexo搭建博客并美化
date: 2022-01-31 21:00:00
tags:
  - 教程
---

用Github做一个静态博客

### 1. 安装Git

windows：到 git 官网上下载 [Download git](https://gitforwindows.org/)，下载后会有一个 Git Bash 的命令行工具。

Linux:使用下面的命令安装

```bash
$ sudo apt-get install git
```

安装好后，用 `git --version` 来查看一下版本

### 2. 安装Node.js

windows：[nodejs](https://nodejs.org/en/download/) 选择 LTS 版本就行了

linux:

```bash
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

安装好后执行：

```bash
$ node -v
$ npm -v
```

### 3. 安装Hexo

环境都有了就直接装Hexo，一条命令的事

```bash
$ npm install -g hexo-cli
```

装完看一下版本，能出版本号就说明装好了

```bash
$ hexo -v
```

国内下载慢的话可以先换个源，不然装到一半卡住很难受

```bash
$ npm config set registry https://registry.npmmirror.com
```

### 4. 初始化博客

找个空文件夹，比如 `D:\blog`，在里面执行

```bash
$ hexo init blog
$ cd blog
$ npm install
```

`hexo init` 会自动把整个博客的骨架拉下来，拉完长这样

```
blog
├── _config.yml      站点配置，标题、网址、部署都在这里
├── package.json     依赖清单
├── scaffolds        新建文章的模板
├── source           你写的东西都在这
│   └── _posts       文章就是这里的一个个 md 文件
└── themes           主题
```

站点基本信息改 `_config.yml` 开头那几行就行

```yaml
title: 你的站点名
subtitle: ''
author: 你的名字
language: zh-CN
```

### 5. 本地跑起来看看

```bash
$ hexo s
```

浏览器打开 http://localhost:4000 就能看到默认主题的样子了。改文章、改配置保存一下页面会自动刷新，调试很方便。

记住这几个常用命令

| 命令 | 作用 |
| --- | --- |
| `hexo new "文章标题"` | 新建一篇文章，生成在 `source/_posts` |
| `hexo s` | 本地预览 |
| `hexo g` | 生成静态文件到 `public` |
| `hexo clean` | 清掉缓存和 `public` |
| `hexo d` | 部署到远程仓库 |

写文章就是在 `source/_posts` 里新建一个 md，上面留一段头部信息

```markdown
---
title: 文章标题
date: 2022-01-31 21:00:00
tags:
  - 教程
---

正文从这里开始
```

### 6. 部署到Github

先去 Github 新建一个仓库，**名字必须是 `你的用户名.github.io`**，一个字都不能错，不然访问不了。

然后装部署插件

```bash
$ npm install hexo-deployer-git --save
```

打开 `_config.yml`，把最下面的 deploy 改成这样

```yaml
deploy:
  type: git
  repo: https://github.com/你的用户名/你的用户名.github.io.git
  branch: main
```

然后一条命令发布

```bash
$ hexo clean && hexo g -d
```

等个一两分钟，访问 `https://你的用户名.github.io` 就出来了。

这里有个坑要特别注意，**仓库的分支名要和配置里写的一致**。当年新建仓库默认分支是 `master`，现在默认是 `main`，两个对不上就会一直 404，而且要等好几分钟才生效，新手很容易以为是配置写错了。

### 7. 美化

默认主题实在谈不上好看，换一个。我用的是 [Diaspora](https://github.com/Fechin/hexo-theme-diaspora)，风格是整屏封面加简介，很适合做个人主页。

先把主题拉到 `themes` 目录

```bash
$ git clone https://github.com/Fechin/hexo-theme-diaspora.git themes/diaspora
```

再改 `_config.yml`

```yaml
theme: diaspora
```

主题自己的配置在 `themes/diaspora/_config.yml`，主要改这几项

- `welcome_cover` 首页那张大封面图
- `cover` 文章封面，可以写多张随机用
- `links` 底部的社交图标，支持 facebook、twitter、github、wechat、email
- `hitokoto` 首页那句一言
- `mp3` 背景音乐，可以直接填网易云的解析外链
- `gitalk` 评论，要先去 Github 建一个 OAuth 应用拿 clientID 和 clientSecret

图片统一放在 `source/img` 下面，配置里写 `/img/xxx.jpg` 这种以斜杠开头的绝对路径，写相对路径在子页面里会挂。

**分类和标签页**要自己建，不能自动生成

```bash
$ hexo new page categories
$ hexo new page tags
```

然后在这两个文件的头部加上对应的 type

```markdown
---
title: 分类
type: categories
---
```

标签页就写 `type: tags`。

**搜索**功能得装个插件生成索引文件

```bash
$ npm install hexo-generator-searchdb --save
```

`_config.yml` 里加上

```yaml
search:
  path: search.xml
  field: post
  format: html
```

最后建一个搜索页，头部写 `type: search`，主题就会把搜索框渲染出来。

```bash
$ hexo new page search
```

### 8. 踩过的坑

折腾了两天踩的坑都记在这，省得以后再犯

- **改了主题没效果的**，先 `hexo clean` 再 `hexo g`，缓存不清永远看的是旧的
- **路由 404 但文件明明生成了**，仓库分支名和 deploy 配置里的 branch 对不上
- **中文标题的链接很长一坨**，是 URL 自动编码了，看着丑但能正常访问
- **图片不显示**，路径要以 `/` 开头，而且 `source` 下的文件会被复制到站点根目录，`source/img/a.jpg` 对应 `/img/a.jpg`
- **部署上去发现源码泄露**，这是最致命的。`你的用户名.github.io` 这个仓库的根目录会被整个当成网页发布，所以**千万别把 Hexo 源码直接放进去**，源码要么放另一个分支要么放另一个仓库，只让 `public` 里的产物上到发布分支
- **22 端口连不上 Github**，很多校园网和公司网会封，可以改用 443 通道，在 `~/.ssh/config` 里把 `github.com` 指到 `ssh.github.com` 的 443 端口

---

> 2026 年补充：这篇是四年前写的，Hexo 已经从 6.0 更到 7.x，上面命令基本没变，只有两处要注意：新建仓库的默认分支现在是 `main` 而不是 `master`；`hexo-deployer-git` 和 `hexo-generator-searchdb` 也还在正常维护，直接装最新版就行。

