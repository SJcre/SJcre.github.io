# 本主题的本地改动记录

此目录是 [Fechin/hexo-theme-diaspora](https://github.com/Fechin/hexo-theme-diaspora) 的副本，
已从 GitHub 拉取后作为普通文件纳入本站仓库维护（不是 submodule）。

## 上游信息

| 项目 | 说明 |
| --- | --- |
| 上游仓库 | https://github.com/Fechin/hexo-theme-diaspora |
| 上游状态 | **已归档（archived）**，最后推送 2022-07-05，不再接受 issue/PR |
| 最初来源 | LoeiFy/Diaspora（WordPress 版，最后推送 2022-02-24） |
| 许可证 | MIT，Copyright (c) 2018 Fechin Li —— 见同目录 `LICENSE`，**不可删除** |

因为上游已停止维护，这里的改动不再向上游提交，仅服务本站。

## 改动清单

### 2026-11-03

**1. jQuery 改用本地文件 · `layout/_partial/scripts.ejs`**

原来加载 `//lib.baomitu.com/jquery/1.8.3/jquery.min.js`（360 CDN，协议相对地址）。
改为引用主题自带的 `js/jquery.min.js`，摆脱外部 CDN 依赖，离线/内网也能正常渲染。

**2. 无音源时不渲染播放器 · `layout/_partial/post/article.ejs`**

原逻辑用 `page.mp3 == '' | page.mp3 == null` 判断（位或，写法有问题），
且无论有没有音源都会输出 `<audio>` 和播放列表。
改为先计算是否存在可用音源，没有就整块跳过。

**3. 无音源时隐藏顶部播放按钮 · `layout/_partial/post/header.ejs`**

同一原因，页头那个"播放/暂停"图标原来恒定输出，点了没反应。
现在没有音源就不显示。

**4. 播放按钮点击加防御 · `source/js/diaspora.js`**

`$('#audio')[0].play()` 在元素不存在时会抛 TypeError，加了存在性判断。

**5. 清空失效音源 · `_config.yml`（本文件所在目录）**

默认 `mp3` 列表里是 `http://link.hhtjim.com/163/425570952.mp3`，
该网易云解析服务已挂（实测 HTTP 503），保留只会渲染出无声播放器，故清空。
要恢复音乐功能，在站点根目录 `_config.diaspora.yml` 里填可用的 mp3 直链即可。

## 遗留问题（上游自带，未处理）

- 一言接口依赖 `v1.hitokoto.cn`，实测响应 8 秒以上，首页那句可能很慢才出现
- 代码块字体走 Google Fonts（`fonts.googleapis.com`），国内网络下可能加载失败，
  失败时会退回系统等宽字体，不影响功能
- gitalk 评论默认关闭，启用需自行申请 GitHub OAuth 应用
- 主题 CSS/JS 未压缩，也没有做现代浏览器兼容性复查（2022 年的代码在 Chromium 下正常）

## 升级/回退

上游已归档，不存在"升级"。如需回退某个改动，直接 `git log` 查本仓库历史和
`themes/diaspora/` 路径即可，所有改动都在版本控制里。
