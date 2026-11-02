// 每次生成后往产物目录写一个 .nojekyll
// 让 GitHub Pages 跳过 Jekyll 处理，直接按静态文件发布
const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_generate', () => {
  const file = path.join(hexo.public_dir, '.nojekyll');
  if (!fs.existsSync(file)) {
    fs.mkdirSync(hexo.public_dir, { recursive: true });
    fs.writeFileSync(file, '');
  }
});
