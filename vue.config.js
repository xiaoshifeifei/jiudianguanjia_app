const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: "dist", //build输出目录
  assetsDir: "assets", //静态资源目录（js, css, img）
  lintOnSave: false ,//是否开启eslint
  configureWebpack: {
    /*
     * provide the app's title in webpack's name field, so that
     * it can be accessed in index.html to inject the correct title.
     */
    resolve: {
      alias: {
        '@': resolve('src'),
        'icon':resolve('src/assets/images/icons')
      }
    }
  },
};
