const path = require('path');
const fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, dir);
}
function getLessVariables(file) {
  const themeContent = fs.readFileSync(file, 'utf-8');
  const variables = {};
  themeContent.split('\n').forEach(function(item) {
    if (item.includes('//') || item.includes('/*')) {
      return;
    }
    const _pair = item.split(':');
    if (_pair.length < 2) return;
    const key = _pair[0].replace('\r', '').replace('@', '');
    if (!key) return;
    const value = _pair[1]
      .replace(';', '')
      .replace('\r', '')
      .replace(/^\s+|\s+$/g, '');
    variables[key] = value;
  });
  return variables;
}

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#19be6b',
    height: '3px',
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/index.less'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios', '~/plugins/filters.js', '~/plugins/api-repositories.js', { src: '~/plugins/storeCache', ssr: false }, { src: '~/plugins/directive/loading/index.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    '@nuxtjs/toast',
  ],
  toast: {
    theme: 'bubble',
    position: 'top-center',
    duration: 3000,
    singleton: true,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  },
  /*
   ** 配置代理
   */
  proxy: {
    '/api/': {
      target: process.env.NODE_ENV === 'production' ? 'https://zhangjinpei.cn' : 'http://localhost:3000/',
      changeOrigin: true,
    },
    '/douban/': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/douban': '',
      },
    },
    '/douban/movie/': {
      target: 'http://api.douban.com/v2/movie',
      changeOrigin: true,
      pathRewrite: {
        '^/douban/movie/': '',
      },
    },
    '/doubanOld/': {
      target: 'https://movie.douban.com',
      changeOrigin: true,
      pathRewrite: {
        '^/doubanOld/': '',
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {},

    loaders: {
      less: {
        lessOptions: {
          modifyVars: getLessVariables(resolve('assets/css/variables.less')),
          javascriptEnabled: true,
        },
      },
    },
  },
  server: {
    port: 8000, // default: 3000
    // host: '0.0.0.0',
  },
};
