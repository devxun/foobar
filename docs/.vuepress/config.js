module.exports = {
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  title: 'FooBar',
  description: 'https://github.com/nobody-foo-bar-baz-qux',
  locales: {
    // 语言选择开关
    // '/': {
    //   // 将会被设置为 <html> 的 lang 属性
    //   lang: 'en-US',
    // },
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
          {
            text: 'Guidance-Of-Courses',
            link: '/guidance-of-courses/',
            ariaLabel: 'Guidance-Of-Courses Menu',
            items: [
              { text: 'Freshman', link: '/guidance-of-courses/freshman/' },
              { text: 'Sophomore', link: '/guidance-of-courses/sophomore/' },
              { text: 'Junior', link: '/guidance-of-courses/junior/' },
              { text: 'Senior', link: '/guidance-of-courses/senior/' },
            ],
          },
          {
            text: 'Front-end',
            ariaLabel: 'Front-end Menu',
            items: [
              { text: 'HTML', link: '/front-end/html/' },
              { text: 'CSS', link: '/front-end/css/' },
              { text: 'JavaScript', link: '/front-end/javascript/' },
              { text: 'Vue.js', link: '/front-end/vue/' },
              { text: 'React.js', link: '/front-end/react/' },
              { text: 'UI', link: '/front-end/ui/' },
              { text: 'Node.js', link: '/front-end/node/' },
              { text: 'TypeScript', link: '/front-end/typescript/' },
            ],
          },
          {
            text: 'Back-end',
            ariaLabel: 'Back-end Menu',
            items: [
              { text: 'Java', link: '/back-end/java/' },
              { text: 'Go', link: '/back-end/go/' },
              { text: 'PHP', link: '/back-end/php/' },
            ],
          },
          {
            text: 'Database',
            ariaLabel: 'Database Menu',
            items: [
              { text: 'SQL', link: '/database/sql/' },
              { text: 'NoSQL', link: '/database/nosql/' },
            ],
          },
          {
            text: 'Big-Data',
            ariaLabel: 'Big-Data Menu',
            items: [
              { text: 'Hadoop', link: '/big-data/hadoop/' },
              { text: 'Spark', link: '/big-data/spark/' },
            ],
          },
          {
            text: 'Software-List',
            ariaLabel: 'Software-List Menu',
            items: [{ text: 'Git', link: '/software-list/git/' }],
          },
          {
            text: 'My-Open-Source',
            ariaLabel: 'My-Open-Source Menu',
            items: [
              { text: 'GitHub', link: '/my-open-source/github/' },
              { text: 'Gitee', link: '/my-open-source/gitee/' },
            ],
          },
        ],
        sidebar: {
          '/front-end/ui/': [
            {
              title: 'UI',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Element'],
            },
          ],
          '/front-end/node/': [
            {
              title: 'Node.js',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Electron', 'Express'],
            },
          ],
          '/database/sql/': [
            {
              title: 'Enterprise',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Oracle', 'SQL-Server'],
            },
            {
              title: 'Personal',
              collapsable: false,
              children: ['MySQL', 'PostgreSQL'],
            },
          ],
          '/database/nosql/': [
            {
              title: 'Wide Column',
              collapsable: false,
              children: ['HBase'],
            },
            {
              title: 'Document',
              collapsable: false,
              children: ['MongoDB'],
            },
            {
              title: 'Key Value',
              collapsable: false,
              children: ['Redis'],
            },
          ],
          '/big-data/hadoop/': [
            {
              title: 'Hadoop',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['HDFS', 'MapReduce'],
            },
          ],
          '/software-list/git/': [
            {
              title: 'Git',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Git', 'TortoiseGit'],
            },
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
          {
            text: '计算机课程体系',
            link: '/zh/guidance-of-courses/',
            ariaLabel: '计算机课程体系菜单',
            items: [
              { text: '大一', link: '/zh/guidance-of-courses/freshman/' },
              { text: '大二', link: '/zh/guidance-of-courses/sophomore/' },
              { text: '大三', link: '/zh/guidance-of-courses/junior/' },
              { text: '大四', link: '/zh/guidance-of-courses/senior/' },
            ],
          },
          {
            text: '前端',
            ariaLabel: '前端菜单',
            items: [
              { text: 'HTML', link: '/zh/front-end/html/' },
              { text: 'CSS', link: '/zh/front-end/css/' },
              { text: 'JavaScript', link: '/zh/front-end/javascript/' },
              { text: 'Vue.js', link: '/zh/front-end/vue/' },
              { text: 'React.js', link: '/zh/front-end/react/' },
              { text: 'UI', link: '/zh/front-end/ui/' },
              { text: 'Node.js', link: '/zh/front-end/node/' },
              { text: 'TypeScript', link: '/zh/front-end/typescript/' },
            ],
          },
          {
            text: '后端',
            ariaLabel: '后端菜单',
            items: [
              { text: 'Java', link: '/zh/back-end/java/' },
              { text: 'Go', link: '/zh/back-end/go/' },
              { text: 'PHP', link: '/zh/back-end/php/' },
            ],
          },
          {
            text: '数据库',
            ariaLabel: '数据库菜单',
            items: [
              { text: 'SQL', link: '/zh/database/sql/' },
              { text: 'NoSQL', link: '/zh/database/nosql/' },
            ],
          },
          {
            text: '大数据',
            ariaLabel: '大数据菜单',
            items: [
              { text: 'Hadoop', link: '/zh/big-data/hadoop/' },
              { text: 'Spark', link: '/zh/big-data/spark/' },
            ],
          },
          {
            text: '软件列表',
            ariaLabel: '软件列表菜单',
            items: [{ text: 'Git', link: '/zh/software-list/git/' }],
          },
          {
            text: '我的开源项目',
            ariaLabel: '我的开源项目菜单',
            items: [
              { text: 'GitHub', link: '/zh/my-open-source/github/' },
              { text: 'Gitee', link: '/zh/my-open-source/gitee/' },
            ],
          },
          // {
          //   text: 'GitHub',
          //   link: 'https://github.com/nobody-foo-bar-baz-qux/foobar',
          // },
        ],
        sidebar: {
          '/zh/front-end/ui/': [
            {
              title: 'UI',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Element'],
            },
          ],
          '/zh/front-end/node/': [
            {
              title: 'Node.js',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Electron', 'Express'],
            },
          ],
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
          '/zh/big-data/hadoop/': [
            {
              title: 'Hadoop',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['HDFS', 'MapReduce'],
            },
          ],
          '/zh/software-list/git/': [
            {
              title: 'Git',
              // 侧边栏：让一个组永远都是展开状态
              collapsable: false,
              children: ['Git', 'TortoiseGit'],
            },
          ],
        },
      },
    },
  },
}
