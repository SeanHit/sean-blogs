const path = require('path')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
module.exports = merge(baseWebpackConfig, {
  // 开发模式
  mode: 'development',
  // TODO 源码调试模式
  devtool : 'eval-cheap-module-source-map',
  devServer: {
    port:'4399',
    compress: false,
    // TODO 开启热更新，后面会讲react模块热替换具体配置
    hot: true,
    // TODO 解决history路由404问题
    historyApiFallback: true, 
    static: {
      //托管静态资源public文件夹
      directory: path.join(__dirname, "../public"),
    }
  },
})