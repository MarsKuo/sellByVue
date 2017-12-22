'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  //表示webpack編譯js的入口
  entry: {
    app: './src/main.js'
  },
  // 輸出配置文件
  output: {
    //輸出文件的路徑
    path: config.build.assetsRoot,
    // 文件名稱  name 指的是 app ('./src/main.js') ==> app.js
    filename: '[name].js',
    // 請求靜態資源的絕對路徑
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //導入時的配置
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 對某種類型的文件，通過某個loader做出處理
  module: {
    rules: [
      // .vue類型的文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // .js類型的文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // 圖片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        //文件檔案，10KB以下，就會生成base64字串，並打包編譯進去js文件中
        options: {
          //文件大小
          limit: 10000,
          // 超過10kb文件會產生檔案
          //最後路徑名為 static/img/文件名.hash串.文件後綴
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 音頻視頻的處理
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      //字體圖標的處理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
