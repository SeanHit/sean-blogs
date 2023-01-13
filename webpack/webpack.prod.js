const path = require('path')
const {merge} = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  // 生产模式，会开启tree-shaking和压缩代码，已经其他优化
  mode: 'production',
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          // 复制public下文件
          from: path.resolve(__dirname, '../public'),
          // 复制到dist目录中
          to: path.resolve(__dirname,'../build'),
          // 忽略index.html
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        }
      ]
    })
  ]
})