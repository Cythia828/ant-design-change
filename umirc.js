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
      locale: {},
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