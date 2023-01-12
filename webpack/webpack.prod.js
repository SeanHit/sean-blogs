const path = require('path')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
module.exports = merge(baseWebpackConfig, {
  // 生产模式，会开启tree-shaking和压缩代码，已经其他优化
  mode: 'production',
})