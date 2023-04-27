module.exports = {
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  title: 'FooBar',
  description: 'https://github.com/nobody-foo-bar-baz-qux',
  locales: {
    '/': {
      // 将会被设置为 <html> 的 lang 属性
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    sidebarDepth: 2, // 侧边栏：嵌套的标题链接
    displayAllHeaders: true, // 侧边栏：显示所有页面的标题链接
    searchMaxSuggestions: 10, // 调整默认搜索框显示的搜索结果数量
    repo: 'https://github.com/nobody-foo-bar-baz-qux/foobar',
    // Git 仓库和编辑链接
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    locales: {
      '/': {
        lastUpdated: 'Last Updated',
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        algolia: {},
        nav: [
          { text: 'Front-end', link: '/front-end/' },
          { text: 'Back-end', link: '/back-end/' },
          {
            text: 'Database',
            ariaLabel: 'Database Menu',
            items: [
              { text: 'SQL', link: '/database/sql/' },
              { text: 'NoSQL', link: '/database/nosql/' },
            ],
          },
          { text: 'Big-Data', link: '/big-data/' },
        ],
        sidebar: {
          '/': [
            /* ... */
          ],
          '/nested/': [
            /* ... */
          ],
        },
      },
      '/zh/': {
        lastUpdated: '上次更新',
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用.',
            buttonText: '刷新',
          },
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: '计算机课程体系', link: '/zh/guidance-of-courses/' },
          { text: '前端', link: '/zh/front-end/' },
          { text: '后端', link: '/zh/back-end/' },
          {
            text: '数据库',
            ariaLabel: '数据库菜单',
            items: [
              { text: 'SQL', link: '/zh/database/sql/' },
              { text: 'NoSQL', link: '/zh/database/nosql/' },
            ],
          },
          { text: '大数据', link: '/zh/big-data/' },
          { text: '软件列表', link: '/zh/software-list/' },
          { text: '我的开源项目', link: '/zh/my-open-source/' },
          // {
          //   text: 'GitHub',
          //   link: 'https://github.com/nobody-foo-bar-baz-qux/foobar',
          // },
        ],
        sidebar: {
          '/zh/database/sql/': [
            {
              title: '企业',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Oracle', 'SQL-Server'],
            },
            {
              title: '个人',
              collapsable: false,
              children: ['MySQL', 'PostgreSQL'],
            },
          ],
          '/zh/database/nosql/': [
            {
              title: '宽列数据库',
              collapsable: false,
              children: ['HBase'],
            },
            {
              title: '文档数据库',
              collapsable: false,
              children: ['MongoDB'],
            },
            {
              title: '键值数据库',
              collapsable: false,
              children: ['Redis'],
            },
          ],
        },
      },
    },
  },
}
