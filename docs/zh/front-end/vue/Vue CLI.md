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

如果你可以使用 npx（最新版的 npm 应该已经自带），也可以直接这样调用命令：

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



## 配置参考