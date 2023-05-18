# Vue CLI

## 指南

### 介绍

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 `@vue/cli` 实现的交互式的项目脚手架。
- 通过 `@vue/cli` + `@vue/cli-service-global` 实现的零配置原型开发。
- 一个运行时依赖 (`@vue/cli-service`)，该依赖：
  - 可升级；
  - 基于 webpack 构建，并带有合理的默认配置；
  - 可以通过项目内的配置文件进行配置；
  - 可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

#### CLI

CLI (`@vue/cli`) 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。它可以通过 `vue create` 快速搭建一个新项目，或者直接通过 `vue serve` 构建新想法的原型。也可以通过 `vue ui` 通过一套图形化界面管理所有项目。

#### CLI 服务

CLI 服务 (`@vue/cli-service`) 是一个开发环境依赖。它是一个 npm 包，局部安装在每个 `@vue/cli` 创建的项目中。

CLI 服务是构建于 webpack 和 webpack-dev-server 之上的。它包含了：

- 加载其它 CLI 插件的核心服务；
- 一个针对绝大部分应用优化过的内部的 webpack 配置；
- 项目内部的 `vue-cli-service` 命令，提供 `serve`、`build` 和 `inspect` 命令。

#### CLI 插件

CLI 插件是向 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等。Vue CLI 插件的名字以 `@vue/cli-plugin-`（内建插件）或 `vue-cli-plugin-`（社区插件）开头，非常容易使用。

当在项目内部运行 `vue-cli-service` 命令时，它会自动解析并加载 `package.json` 中列出的所有 CLI 插件。

### 安装

可以使用下列任一命令安装这个新的包：

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

安装之后，就可以在命令行中访问 `vue` 命令。可以通过简单运行 `vue`，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

还可以用这个命令来检查其版本是否正确：

```bash
vue --version
```

#### 升级

如需升级全局的 Vue CLI 包，请运行：

```bash
npm update -g @vue/cli
# 或者
yarn global upgrade --latest @vue/cli # 需要添加路径 C:\Users\Wjh\AppData\Local\Yarn\Data\global\node_modules\.bin 到环境变量 path 中
```

##### 项目依赖

上面列出来的命令是用于升级全局的 Vue CLI。如需升级项目中的 Vue CLI 相关模块（以 `@vue/cli-plugin-` 或 `vue-cli-plugin-` 开头），请在项目目录下运行 `vue upgrade`：

```
用法： upgrade [options] [plugin-name]

（试用）升级 Vue CLI 服务及插件

选项：
  -t, --to <version>    升级 <plugin-name> 到指定的版本
  -f, --from <version>  跳过本地版本检测，默认插件是从此处指定的版本升级上来
  -r, --registry <url>  使用指定的 registry 地址安装依赖（淘宝镜像 https://registry.npmmirror.com）
  --all                 升级所有的插件
  --next                检查插件新版本时，包括 alpha/beta/rc 版本在内
  -h, --help            输出帮助内容
```

### 基础

#### 创建一个项目

##### vue create

运行以下命令来创建一个新项目：

```bash
vue create hello-world
```

`vue create` 命令有一些可选项，可以通过运行以下命令进行探索：

```bash
vue create --help
```

```
用法：create [options] <app-name>

创建一个由 `vue-cli-service` 提供支持的新项目

选项：

  -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
  -d, --default                   忽略提示符并使用默认预设选项
  -i, --inlinePreset <json>       忽略提示符并使用内联的 JSON 字符串预设选项
  -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
  -r, --registry <url>            在安装依赖时使用指定的 npm registry
  -g, --git [message]             强制 / 跳过 git 初始化，并可选的指定初始化提交信息
  -n, --no-git                    跳过 git 初始化
  -f, --force                     覆写目标目录可能存在的配置
  -c, --clone                     使用 git clone 获取远程预设选项
  -x, --proxy                     使用指定的代理创建项目
  -b, --bare                      创建项目时省略默认组件中的新手指导信息
  -h, --help                      输出使用帮助信息
```

#### CLI 服务

##### 使用命令

在一个 Vue CLI 项目中，`@vue/cli-service` 安装了一个名为 `vue-cli-service` 的命令。可以在 npm scripts 中以 `vue-cli-service`、或者从终端中以 `./node_modules/.bin/vue-cli-service` 访问这个命令。

这是使用默认 preset 的项目的 `package.json`：

``` json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```

可以通过 npm 或 Yarn 调用这些 script：

```bash
npm run serve
# OR
yarn serve
```

如果可以使用 npx（最新版的 npm 应该已经自带），也可以直接这样调用命令：

```bash
npx vue-cli-service serve
```

##### vue-cli-service serve

```
用法：vue-cli-service serve [options] [entry]

选项：

  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)
```

`vue-cli-service serve` 命令会启动一个开发服务器（基于 webpack-dev-server）并附带开箱即用的模块热重载（Hot-Module-Replacement）。

除了通过命令行参数，也可以使用 `vue.config.js` 里的 devServer 字段配置开发服务器。

命令行参数 `[entry]` 将被指定为唯一入口（默认值：`src/main.js`，TypeScript 项目则为 `src/main.ts`），而非额外的追加入口。尝试使用 `[entry]` 覆盖 `config.pages` 中的 `entry` 将可能引发错误。

##### vue-cli-service build

```
用法：vue-cli-service build [options] [entry|pattern]

选项：

  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录的内容
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化
```

`vue-cli-service build` 会在 `dist/` 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 vendor chunk splitting。它的 chunk manifest 会内联在 HTML 里。

这里还有一些有用的命令参数：

- `--modern` 使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。

- `--target` 允许将项目中的任何组件以一个库或 Web Components 组件的方式进行构建。

- `--report` 和 `--report-json` 会根据构建统计生成报告，它会帮助分析包中包含的模块们的大小。

##### vue-cli-service inspect

```
用法：vue-cli-service inspect [options] [...paths]

选项：

  --mode    指定环境模式 (默认值：development)
```

可以使用 `vue-cli-service inspect` 来审查一个 Vue CLI 项目的 webpack config。

##### 查看所有的可用命令

有些 CLI 插件会向 `vue-cli-service` 注入额外的命令。例如 `@vue/cli-plugin-eslint` 会注入 `vue-cli-service lint` 命令。可以运行以下命令查看所有注入的命令：

```bash
npx vue-cli-service help
```

也可以这样学习每个命令可用的选项：

```bash
npx vue-cli-service help [command]
```

### 开发

#### 项目目录树

```
│  .gitignore
│  babel.config.js
│  jsconfig.json
│  package.json
│  README.md
│  vue.config.js
│  yarn.lock
│
├─node_modules
├─public
│      favicon.ico
│      index.html
│
└─src
    │  App.vue
    │  main.js
    │
    ├─assets
    │      logo.png
    │
    └─components
            HelloWorld.vue
```

#### HTML 和静态资源

##### HTML

###### index 文件

`public/index.html` 文件是一个会被 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 处理的模板。在构建过程中，资源链接会被自动注入。另外，Vue CLI 也会自动注入 resource hint（`preload/prefetch`、manifest 和图标链接（当用到 PWA 插件时））以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接。

###### 插值

因为 index 文件被用作模板，所以可以使用 lodash template 语法插入内容：

- `<%= VALUE %>` 用来做不转义插值；
- `<%- VALUE %>` 用来做 HTML 转义插值；
- `<% expression %>` 用来描述 JavaScript 流程控制。

除了被 `html-webpack-plugin` 暴露的默认值之外，所有客户端环境变量也可以直接使用。例如，`BASE_URL` 的用法：

``` html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

###### 构建一个多页应用

不是每个应用都需要是一个单页应用。Vue CLI 支持使用 `vue.config.js` 中的 `pages` 选项构建一个多页面的应用。构建好的应用将会在不同的入口之间高效共享通用的 chunk 以获得最佳的加载性能。

##### 处理静态资源

静态资源可以通过两种方式进行处理：

- 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。

- 放置在 `public` 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

###### 从相对路径导入

当在 JavaScript、CSS 或 `*.vue` 文件中使用相对路径（必须以 `.` 开头）引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有诸如 `<img src="...">`、`background: url(...)` 和 CSS `@import` 的资源 URL **都会被解析为一个模块依赖**。

例如，`url(./image.png)` 会被翻译为 `require('./image.png')`，而：

``` html
<img src="./image.png">
```

将会被编译到：

``` js
h('img', { attrs: { src: require('./image.png') }})
```

###### URL 转换规则

- 如果 URL 是一个绝对路径（例如 `/images/foo.png`），它将会被保留不变。

- 如果 URL 以 `.` 开头，它会作为一个相对模块请求被解释且基于文件系统中的目录结构进行解析。

- 如果 URL 以 `~` 开头，其后的任何内容都会作为一个模块请求被解析。这意味着甚至可以引用 Node 模块中的资源：

  ``` html
  <img src="~some-npm-package/foo.png">
  ```

- 如果 URL 以 `@` 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 `<projectRoot>/src` 的别名 `@`。**（仅作用于模版中）**

###### `public` 文件夹

任何放置在 `public` 文件夹的静态资源都会被简单的复制，而不经过 webpack。需要通过绝对路径来引用它们。

注意推荐将资源作为模块依赖图的一部分导入，这样它们会通过 webpack 的处理并获得如下好处：

- 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
- 文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
- 最终生成的文件名包含了内容哈希，因此不必担心浏览器会缓存它们的老版本。

`public` 目录提供的是一个**应急手段**，当通过绝对路径引用它时，留意应用将会部署到哪里。如果应用没有部署在域名的根部，那么需要为 URL 配置 publicPath 前缀：

- 在 `public/index.html` 或其它通过 `html-webpack-plugin` 用作模板的 HTML 文件中，需要通过 `<%= BASE_URL %>` 设置链接前缀：

  ``` html
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  ```

- 在模板中，首先需要向组件传入基础 URL：

  ``` js
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
  ```

  然后：

  ``` html
  <img :src="`${publicPath}my-image.png`">
  ```

###### 何时使用 `public` 文件夹

- 需要在构建输出中指定一个文件的名字。
- 有上千个图片，需要动态引用它们的路径。
- 有些库可能和 webpack 不兼容，这时除了将其用一个独立的 `<script>` 标签引入没有别的选择。

#### 模式

**模式**是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：

- `development` 模式用于 `vue-cli-service serve`
- `test` 模式用于 `vue-cli-service test:unit`
- `production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`

可以通过传递 `--mode` 选项参数为命令行覆写默认的模式。例如，如果想要在构建命令中使用开发环境变量：

```
vue-cli-service build --mode development
```

当运行 `vue-cli-service` 命令时，所有的环境变量都从对应的环境文件中载入。如果文件内部不包含 `NODE_ENV` 变量，它的值将取决于模式，例如，在 `production` 模式下被设置为 `"production"`，在 `test` 模式下被设置为 `"test"`，默认则是 `"development"`。

`NODE_ENV` 将决定应用运行的模式，是开发，生产还是测试，因此也决定了创建哪种 webpack 配置。

例如通过将 `NODE_ENV` 设置为 `"test"`，Vue CLI 会创建一个优化过后的，并且旨在用于单元测试的 webpack 配置，它并不会处理图片以及一些对单元测试非必需的其他资源。

同理，`NODE_ENV=development` 创建一个 webpack 配置，该配置启用热更新，不会对资源进行 hash 也不会打出 vendor bundles，目的是为了在开发的时候能够快速重新构建。

当运行 `vue-cli-service build` 命令时，无论要部署到哪个环境，应该始终把 `NODE_ENV` 设置为 `"production"` 来获取可用于部署的应用程序。

```js
// 例如
publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
```

## 配置参考

