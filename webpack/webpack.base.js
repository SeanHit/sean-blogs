const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const isDEV = process.env.NODE_ENV === 'development' // 

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
            plugins: [
              isDEV && 'react-refresh/babel', // 如果是开发模式,就启动react热更新插件
              // ...
            ].filter(Boolean) ,
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
      },
      {
        // 对于图片文件,webpack4使用file-loader和url-loader来处理的,但webpack5不使用这两个loader了,而是采用自带的asset-module来处理
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',  
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 10. // 小于10KB转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
      // 处理媒体文件
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
      // 处理字体文件
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  },

  resolve: {
    extensions: ['.js','.tsx','.ts']
  },

  plugins: [
    new HtmlWebpackPlugin({
      // 模板定义的html的模版
      template: path.resolve(__dirname,'../public/index.html'),
      // 页面的标签的icon，名称也可以在这里设置
      favicon: path.resolve(__dirname, '../assets/images/avatar.jpeg'),
      // 方便起见，自动注入静态资源
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}