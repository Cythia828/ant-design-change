'use strict';

// Modules
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var os = require('os');
var extractCSS = new ExtractTextPlugin('[name].bundle.css');

var LibsLocation = {
  title: '袋鼠云日志－高性能可扩展的日志集中、搜索和分析平台',
};

module.exports = function makeWebpackConfig() {

  var config = {};

  config.mode = 'production'

  config.entry = {
    easylog: ['babel-polyfill', './src/app.js'],
  };

  config.output = {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].bundle.[chunkhash:8].js',
    chunkFilename: '[name].bundle.[chunkhash:8].js',
  };

  /**
   * Devtool
   */
  config.devtool = false;

  config.module = {
    noParse: /jspdf/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }]
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader?{modifyVars:{"icon-url":"\'../src/assets/fonts/antd_icon\'"}}']
        })
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'fast-sass-loader']
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
      }
    ]
  };

  config.resolve = {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      models: path.resolve(__dirname, '../src/models'),
      services: path.resolve(__dirname, '../src/services'),
      utils: path.resolve(__dirname, '../src/utils'),
    }
  };

  /**
   * Plugins
   */
  config.plugins = [

    // new CleanWebpackPlugin(['dist']),

    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true),
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
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
      template: '../src/public/easylog.ejs',
      inject: 'body',
      chunks: ['easylog'],
      assets: {
        favicon: 'assets/images/favicon.ico',
        title: LibsLocation.title,
        config_js: 'config/config.js',
        vendors: 'assets/libs/vendors.dll.js',
        dta: 'assets/libs/dta.js',
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    extractCSS,
    // Only emit files when there are no errors
    // new webpack.NoErrorsPlugin(),

    // Minify all javascript
    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: '.cache/',
      uglifyJS: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../manifest.json')
    }),

    new CopyWebpackPlugin(
      [
        {
          from: 'src/index.html',
          to: 'index.html',
        },
        {
          from: 'src/config',
          to: 'config'
        },
        {
          from: 'src/assets',
          to: 'assets',
        }
      ], { ignore: ['*.scss'] })
  ];

  /**
   * Dev server configuration
   */
  config.devServer = {
    contentBase: './src',
    stats: 'minimal'
  };

  return config;
}();

