'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
    other: './src/othermain.js'
    // vender: ['weui', 'font-awesome/css/font-awesome.css','./src/common.less', './src/utils/http.js', './src/utils/mock.js']
  },
  output: {
    path: config.build.assetsRoot,
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // use: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
        use: [
          {
            loader: 'url-loader',
            options:
            { // 这里的options选项参数可以定义多大的图片转换为base64
              name: '[name].min.[ext]',
              limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
              outputPath: 'static/img' //定义输出的图片文件夹
            }
          },
          {    //压缩图片要在file-loader之后使用
            loader: 'image-webpack-loader',
            options:
            {
              bypassOnDebug: true,
            }
          }

        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
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
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios':'axios',
    // 'element-ui': 'ELEMENT',
  },
}
