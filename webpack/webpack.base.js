const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // 入口文件
  entry: path.join(__dirname,'../src/index.tsx') ,
  // 出口文件
  output: {
    // 输出的js的名称
    filename:'static/js/[name].js',
    // 输出路径
    path: path.join(__dirname, '../build'),
    // w4需要配置clean-webpack-plugin来删除build的文件,w5内置了
    clean: true,
    // 打包后的文件的公共前缀路径
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设顺序从后往前，先处理ts，再处理jsx
            presets: ['@babel/preset-react','@babel/preset-typescript']
          }
        }
        
      }
    ]
  },

  resolve: {
    extensions: ['.js','.tsx','.ts']
  },

  plugins: [
    new HtmlWebpackPlugin({
      // 模板定义的html的模版
      template: path.resolve(__dirname,'../public/index.html'),
      // 方便起见，自动注入静态资源
      inject: true,
    })
  ]
}