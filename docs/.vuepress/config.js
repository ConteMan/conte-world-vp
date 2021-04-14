module.exports = {
  title: 'ConteWorld',
  description: 'Slow down, not so much to seize.',
  themeConfig: {
    search: true,
    nav: [
      { text: 'JavaScript', link: '/develop/' },
    ],
    sidebar: [
      {
        title: 'JavaScript',
        path: '/develop/JavaScript',
      }
    ],
    sidebarDepth: 2,
    displayAllHeaders: true,
    smoothScroll: true,
  },
  plugins: {
    '@vuepress/back-to-top': true,
    redirect: {
      redirectors: [
        {
          base: '/develop/',
          storage: true, // 保存最后一次访问的结果到 `localStorage`，供下次重定向使用
          alternative: [
            'JavaScript',
          ],
        },
      ],
    }
  }
}