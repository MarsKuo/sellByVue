'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')


// 导入express
const express = require('express')
// 创建express实例
const app = express()
// 1、读取json数据
var goods = require('../data/01-商品页(点菜).json');
var ratings = require('../data/02-商品页(评价).json');
var seller = require('../data/03-商品页(商家).json');

// 2、路由
//var routes = express.Router();

// 3.編寫接口
app.get('/api/goods', (req, res) => {
  	// 返回数据给客户端，返回json数据
  	res.json(goods);
  }),
  app.get('/api/ratings', (req,res) => {
  	// 返回数据给客户端，返回json数据
  	res.json(ratings);
  }),
  app.get('/api/seller', (req,res) => {
  	// 返回数据给客户端，返回json数据
  	res.json(seller);
  })

  // 4、中间件
  //app.use('/api',routes);



  const HOST = process.env.HOST

  //定義端口號 8080
  const PORT = process.env.PORT && Number(process.env.PORT)

  // webpack.base.conf與當前的配置進行合併
  const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
      // 傳入的參數False
      //針對css的預處理器做的處理
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    //調適代碼會比較方便的一個參數(eval-source-map)
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: true,
      hot: true,
      compress: true,
      host: HOST || config.dev.host,
      port: PORT || config.dev.port,
      //是否自動打開瀏覽器
      open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true, // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: config.dev.poll,
      }
      // ,
      // // 3、编写接口
      // before(app){
      // app.get('/api/goods', (req,res) => {
      // 	// 返回数据给客户端，返回json数据
      // 	res.json(goods);
      // }),
      // app.get('/api/ratings', (req,res) => {
      // 	// 返回数据给客户端，返回json数据
      // 	res.json(ratings);
      // }),
      // app.get('/api/seller', (req,res) => {
      // 	// 返回数据给客户端，返回json数据
      // 	res.json(seller);
      // })
    }
  },
    // 插件相關
    plugins: [
      new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
      //熱加載相關插件
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      //當編譯出錯，會跳過，使運行順利
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        // 編譯生成的html文件名
        filename: 'index.html',
        //模板的名稱
        template: 'index.html',
        // 表示打包輸出過程中，會自動添加到上述文件中
        // css 默認路徑是head標籤中
        // js 默認路徑是body裡面
        inject: true
      }),
    ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
