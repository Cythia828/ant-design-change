export default {
  plugins: [
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      antd: true,
      routes: {
        exclude: [/models\//],
      },
      polyfills: ['ie9'],
      locale: {
        default: 'zh-CN', //默认语言 zh-CN
        baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
        antd: true // 是否启用antd的<LocaleProvider />
      },
      library: 'react',
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loading.js',
      },
      dll: {
        exclude: [],
      },
      hardSource: true,
      pwa: true,
      hd: true,
      fastClick: true,
      title: 'default title',
      chunks: ['vendor', 'umi'],
      scripts: [
        { src: 'http://cdn/a.js' },
        { src: '<%= PUBLIC_PATH %>a.js' },
        { content: `alert('a');` },
      ],
      headScripts: [],
      metas: [
        { charset: 'utf-8' },
      ],
      links: [
        { rel: 'stylesheet', href: 'http://cdn/a.css' },
      ],
    }],
  ],
};