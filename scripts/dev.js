'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var apiMocker = require('mocker-api');

var LibsLocation = {
  title: '袋鼠云日志－高性能可扩展的日志集中、搜索和分析平台',
};

module.exports = function makeWebpackConfig() {

  var config = {};

  config.mode = 'development'

  /**
   * entry 配置
   */
  config.entry = {
    easylog: path.join(__dirname, '../src/app.js')
  };

  /**
   * output 配置
   */
  config.output = {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  };

  /**
   * devtool 配置
   */
  config.devtool = 'inline-source-map';


  /**
   * loaders 配置
   */
  config.module = {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader', 'css-loader',
          {
            loader:'less-loader',
            options:{
              modifyVars:{
                "icon-url":"\'../src/assets/fonts/antd_icon\'"
              },
              javascriptEnabled:true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        include: /(src)/,
        use: ['style-loader', 'css-loader', 'fast-sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?[tv]=[\d.]+)*$/,
        exclude: /node_modules/,
        use: ['file-loader?name=assets/images/[name].[ext]']
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
        exclude: /node_modules/,
        use: ['file-loader?name=assets/fonts/[name].[ext]']
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader']
      },
      {
        test: /\.json/,
        use: ['json-loader']
      }
    ]
  };

  config.resolve = {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      models: path.resolve(__dirname, '../src/models'),
      services: path.resolve(__dirname, '../src/services'),
      utils: path.resolve(__dirname, '../src/utils'),
    },
  };


  /**
   * Plugins 配置
   */
  config.plugins = [

    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(false)
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [
            autoprefixer({
              browsers: ['last 2 version']
            })
          ]
        }
      }
    }),

    new HtmlWebpackPlugin({
      filename: 'easylog.html',
      template: path.join(__dirname, '../src/public/easylog.ejs'),
      inject: 'body',
      chunks: ['easylog'],
      assets: {
        favicon: './assets/images/favicon.ico',
        title: LibsLocation.title,
        config_js:  './config/config.dev.js',
        vendors: './assets/libs/vendors.dll.js',
      }
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(zh-cn).js/),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../manifest.json')
    }),

  ];

  /**
   * devServer 配置
   */
  config.devServer = {
    contentBase: './src',
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    disableHostCheck: true,
    before: function (app) {
      apiMocker(app, path.resolve('./mock/index.js'), {
        proxy: {
          '/log/api/v2/*': 'http://127.0.0.1:8080',
        },
        changeHost: true,
      })
    },
    proxy: [
      {
        path: '/log/api/v2/host/**',
        target: 'http://192.168.20.152:8855',
        // target: 'http://172.16.8.198:8855',
        changeOrigin: true,
      },
      {
        path: '/log/api/v2/agent/**',
        target: 'http://192.168.20.152:8855',
        // target: 'http://172.16.8.198:8855',
        changeOrigin: true,
      },
      {
        path: '/log/api/v2/forwarder/**',
        target: 'http://192.168.20.152:8855',
        // target: 'http://172.16.8.198:8855',
        changeOrigin: true,
      },
      {
        path: '/log/api/v2/**',
        target: 'http://172.16.8.198:81',
        changeOrigin: true,
      }
    ],
  };

  return config;
}();
