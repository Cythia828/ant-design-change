'use strict';

var path = require('path');
var webpack = require('webpack');
import defaultSettings from '../src/defaultSettings';
const { pwa, primaryColor } = defaultSettings;
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST } = process.env;

module.exports = function makeWebpackConfig() {

  var config = {};

  config.mode = 'production'

  /**
   * entry 配置
   */
  config.entry = {
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'mirror-creator',
    ]
  };

  /**
   * output 配置
   */
  config.output = {
    path: path.join(__dirname, '../src/assets/libs'),
    filename: '[name].dll.js',
    library: '[name]_library'
  };

  /**
   * Plugins 配置
   */
  config.plugins = [

    new webpack.DllPlugin({
      path: path.join(__dirname, '../manifest.json'),
      name: '[name]_library'
    })
    
  ];

  return config;
}();
