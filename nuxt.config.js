module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ATAI - BigData',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'keywords', name: 'keywords', content: '重庆理工大学ATAI实验室，大数据竞赛平台'},
      {hid: 'description', name: 'description', content: '重庆理工大学ATAI实验室，大数据竞赛平台'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/titlelogo.png'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  target: 'server',
  // target: 'static',
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // 开启打包分析
    // analyze: true,
    // assetFilter: function (assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  },
  plugins: [
    {src: '~/plugins/nuxt-swiper-plugin.js', ssr: false},
    '~/plugins/global.js',
    '~/plugins/router.js',
    // {src: '~plugins/nuxt-codemirror-plugin.js', ssr: false}
  ],

  css: [
    'swiper/dist/css/swiper.css',
    '@/assets/icon/iconfont.css',
    // // lib css
    // 'codemirror/lib/codemirror.css',
    // // merge css
    // 'codemirror/addon/merge/merge.css',
    // // theme css
    // 'codemirror/theme/base16-dark.css'
  ]
}
