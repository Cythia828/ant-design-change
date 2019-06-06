var LOGAPICONF = {
    isTelecomVersion: false, // 电信版本配置项，主要是去掉顶部导航，所有导航放到左侧
    IS_ENTERPRISE: false, // 企业版 or SaaS版本
    isNongxin: false, //是否是农信
    isTianHong: false, // 是否是天弘版本
    APP_DOMAIN: '.dtstack.com', // 云日志部署的域
    APP_UIC_HOST: '//account.dtstack.com', // uic的host
    LOGINURL: '//account.dtstack.com/#/login', // 登录跳转地址
    FOOTER_RIGHT: (new Date()).getFullYear() + ' 杭州玳数科技有限公司 浙ICP备15044486号-1', // 统一页脚版权文案
    LOGSTATICVERSION: 'v3.0.5', // 标示云日志部署版本，运维同学可以根据情况自行定义
    COMPANYLOGO: 'assets/images/yunrizhi_03.svg', // 日志logo
    LIVETAIL_HOST: '116.62.175.25', // 实时websocket地址，必填
    LIVETAIL_PORT: 80, // http实时websocket端口，必填
    LIVETAIL_PORTS: 443, // https实时websocket端口，必填
    LOG_SERVER_HOST: '172.16.1.145', // logservie地址，必配，且不要http://
    TIME_RANGE_LIMIT: 7, // 时间选择控件限定时间范围，单位:天，没有限定可设置成false
    GRAFANA_TOKEN: 'Bearer eyJrIjoidkoySnpkc1ZvZ3czdmdpNGM2Q2d6NDNUNGZPbjh3TUgiLCJuIjoiYWRtaW4iLCJpZCI6MX0' // grafana令牌
}