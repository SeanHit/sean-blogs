const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
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
          // 配置也可以单独建babel.config.js
          options: {
            // 预设顺序从后往前，先处理ts，再处理jsx
            presets: [
              //  babel 编译的预设,可以转换目前最新的js标准语法
              "@babel/preset-env",
              // {
              //  // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
              //   // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
              //   "useBuiltIns": 'usage',
              //   // 配置使用core-js低版本, 使用低版本js语法模拟高版本的库,也就是垫片
              //   "corejs": 3,
              // },
              '@babel/preset-react'
              ,'@babel/preset-typescript']
          }
        }
        
      },
      {
        test:/.(css|less)$/, // 匹配CSS文件
        // less-loader: 把less文件编译成css文件
        // css-loader: 解析css文件代码;
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        use: ['style-loader','css-loader', {
          // postcss-loader预处理css（比如压缩，添加前缀什么的）
          // autoprefixer：添加前缀决定添加哪些浏览器前缀到css中
          loader: 'postcss-loader',
          // 也可以跟目录创建postcss.config.js来操作
          options: {
            postcssOptions: {
              // 可以读取package.json里面的browsersList配置
              plugins: ['autoprefixer']
            }
          }
        } ,'less-loader']
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
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}