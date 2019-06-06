import { extend } from 'umi-request';
import { message } from 'antd';
import { hashHistory } from 'react-router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求的方式不匹配。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  if (status === 401) {
    message.error({
      title: '未登录或登录已过期，请重新登录。',
    });
    // @HACK
    // window.location.href = LOGAPICONF.LOGINURL;
    return;
  }
  message.error({
    title: `请求错误 ${status}: ${url}`,
    content: errortext,
  });
  // environment should not be used
  if (status === 403) {
    hashHistory.push('/exception/403');
    return;
  }
  // if (status <= 504 && status >= 500) {
  //   hashHistory.push('/exception/500');
  //   return;
  // }
  // if (status == 404 && status < 422) {
  //   hashHistory.push('/exception/404');
  // }
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
