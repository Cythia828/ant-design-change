import React from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import { formatMessage } from 'umi-plugin-react/locale';
import "../umirc.js";
import zhCN from './pages/locales/zh-CN.js';
import configureStore from './public/index';
import routers from './routers';

import "./assets/css/global.less";
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
export const locale = {
  default: 'zh_CN', //默认语言 zh-CN
};

render(
  <LocaleProvider locale={zhCN}>
    <Provider store={ store }>
      <Router routes={ routers } history={ history } />
    </Provider>
  </LocaleProvider>,
  document.getElementById('j-easylog')
);
