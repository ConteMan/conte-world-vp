module.exports = {
    title: 'ConteMan World',
    description: "ConteMan can't stop.",
    //theme: 'reco',
    theme: require.resolve('./theme'),
    themeConfig: {
        docsDir: 'docs',
        nav: [
            {text: 'Home', link: '/', icon: 'reco-home'},
            {text: 'TimeLine', link: '/timeline/', icon: 'reco-date'},
        ],
        type: 'blog',
        noFoundPageByTencent: false,
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认 2
                text: 'Category' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认 3
                text: 'Tag' // 默认 “标签”
            }
        },
        //logo: '/head.png',
        //authorAvatar: '/head.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航
        sidebar: 'auto',
        sidebarDepth: 4,
        // 最后更新时间
        lastUpdated: 'Last Updated',
        // 作者
        author: 'ConteMan',
        // 备案号
        record: 'xxxx',
        // 项目开始时间
        startYear: '2020',
        /**
         * 密钥 (if your blog is private)
         */
        friendLink: [
            {
                title: ' 午后南杂',
                desc: 'Enjoy when you can, and endure when you must.',
                email: '1156743527@qq.com',
                link: 'https://www.recoluan.com'
            },
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com'
            },
        ],
    }
}
