module.exports = {
  title: 'Nobody-Foo-Bar-Baz-Qux',
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
    locales: {
      '/': {
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
        nav: [{ text: 'Nested', link: '/nested/', ariaLabel: 'Nested' }],
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
        nav: [{ text: '嵌套', link: '/zh/nested/' }],
        sidebar: {
          '/zh/': [
            /* ... */
          ],
          '/zh/nested/': [
            /* ... */
          ],
        },
      },
    },
  },
}
