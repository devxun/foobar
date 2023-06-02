# Vue Router v3.x

## 安装

### 直接下载 / CDN

https://unpkg.com/vue-router@3.6.5/dist/vue-router.js

在 `vue ` 后面加载 `vue-router` 即可使用：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

### NPM

```sh
npm install vue-router # 这样安装的其实是在 NPM 发布的最新版本的 vue-router v4.x
# 对于创建的 Vue 2 项目，要求 vue-router v3.x，则需要安装指定版本号的 vue-router，例如 v3.6.5
npm install vue-router@^3.6.5
# 或使用 yarn
yarn add vue-router@^3.6.5
```

如果在一个由 `@vue/cli` 创建的模块化工程中使用，必须要在 `main.js` 中通过 `Vue.use()` 明确地安装路由功能：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

## 基础

### 起步

基本的思想就是：将组件 `components` 映射到路由 `routes`，然后告诉 `Vue Router` 在哪里渲染它们。

#### HTML

```html
<!-- 引入 `vue` v2.7.14 -->
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<!-- 引入 `vue-router` v3.6.5 -->
<script src="https://unpkg.com/vue-router@3/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 `router-link` 组件来导航 -->
    <!-- 通过传入 `to` 属性指定链接（路由） -->
    <!-- `<router-link>` 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

#### JavaScript

```js
// 0. 如果使用模块化机制编程，导入 `Vue` 和 `VueRouter`，要调用 `Vue.use(VueRouter)`

// 1. 定义（路由）组件。
// 当前是使用 `template` 采用模板解析的方式
// 也可以从其他单页面应用 `import` 进来
// import Foo from './Foo.vue'
const Foo = { template: '<div>foo</div>' }
// import Bar from './Bar.vue'
const Bar = { template: '<div>bar</div>' }

// 2. 映射路由
// 每个路由应该映射一个组件。 其中 `component` 可以是
// 通过 `Vue.extend()` 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 `router` 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 千万记得要通过 `router` 配置参数注入路由，
// 从而让整个应用都有路由功能，否则不起任何作用
const app = new Vue({
  router
}).$mount('#app')

// 或
const app = new Vue({
  el: '#app',
  router
})
```

### 动态路由匹配

如果需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，有一个 `User` 组件，对于所有 `id` 各不相同的用户，都要使用这个组件来渲染。那么，就可以在 `vue-router` 的路由路径中使用动态路径参数 `dynamic segment` 来达到这个效果： 

```html
<div id="app">
  <p>
    <router-link to="/user/foo">Go to /user/foo</router-link>
    <router-link to="/user/bar">Go to /user/bar</router-link>
  </p>
  <router-view></router-view>
</div>
```

```js
// 当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数以冒号开头标记
    { path: '/user/:id', component: User } // 像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 嵌套路由

实际的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件。

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

```html
<div id="app">
  <p>
    <router-link to="/user/foo">Go to /user/foo</router-link>
    <router-link to="/user/foo/profile">Go to /user/foo/profile</router-link>
    <router-link to="/user/foo/posts">Go to /user/foo/posts</router-link>
  </p>
  <!-- 这里的 `<router-view>` 是最顶层的出口 -->
  <router-view></router-view>
</div>
```

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <!-- 在嵌套的出口中渲染组件 -->
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 `/user/:id` 匹配成功，
          // UserHome 会被渲染在 User 的 <router-view> 中
          // 如果不提供空的子路由，当访问 `/user/:id` 时，User 的出口是不会渲染任何东西
          path: '',
          component: UserHome
        },
        {
          // 当 `/user/:id/profile` 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 `/user/:id/posts` 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

### 编程式导航

想要导航到不同的 URL，则使用 `router.push` 方法（或 `this.$router.push`）。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

| 声明式                  | 编程式             |
| ----------------------- | ------------------ |
| `router-link :to="..."` | `router.push(...)` |

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由，变成 /user/123
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 `params` 不生效，也就是说如果提供了 `path`，`params` 会被忽略，即 `path` 和 `params` 不能共用
router.push({ path: '/user', params: { userId }}) // -> /user
```

如果是命名路由的形式，即 `user/123`，则使用方法应该是 `name` 和 `params` 配合；

如果是带查询参数的形式，即 `/register?plan=private`，则使用方法应该是 `path` 和 `query` 配合。

### 命名路由

在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称：

```js
const router = new VueRouter({
  routes: [
    {
      // `path` 属性表示的路由格式是什么样子，params 对象的属性名就应该是什么样子
      // 比如说这儿路由格式为 `/user/:userId`，那么 params 对象的属性名就应该是 `userId`，这样才能匹配上
      path: '/user/:userId',
      // 此处表示的就是路由命名
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

等价于代码调用 `router.push()`：

```js
router.push({ name: 'user', params: { userId: 123 } })
```

这两种方式都会把路由导航到 `/user/123` 路径。

```html
<div id="app">
  <p>
    <!-- 编程式 -->
    <button @click="fun1">Go to foo</button>
    <button @click="fun2">Go to bar</button>
    <!-- 声明式 -->
    <router-link :to="{ name: 'user', params: { id: 'foo' }}">Go to foo</router-link>
    <router-link :to="{ name: 'user', params: { id: 'bar' }}">Go to bar</router-link>
  </p>
  <router-view></router-view>
</div>
```

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
    </div>
  `
}

const router = new VueRouter({
  routes: [{
    path: '/user/:id',
    name: 'user',
    component: User
  }]
})

const app = new Vue({
  router,
  methods: {
    fun1: function() {
      this.$router.push({ name: 'user', params: { id: 'foo' } })
    },
    fun2: function() {
      this.$router.push({ name: 'user', params: { id: 'bar' } })
    }
  }
}).$mount('#app')
```

### 命名视图

可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<div id="app">
  <h1>Named Views</h1>
  <ul>
    <li>
      <router-link to="/">/</router-link>
    </li>
    <li>
      <router-link to="/other">/other</router-link>
    </li>
  </ul>
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
</div>
```

```js
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

const app = new Vue({
  router,
  el: '#app'
})
```

#### 嵌套命名视图

```
/settings/emails                                       /settings/profile
+-----------------------------------+               +------------------------------+
| UserSettings                      |               | UserSettings                 |
| +-----+-------------------------+ |               | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +--------->  | | Nav | UserProfile        | |
| |     +-------------------------+ |               | |     +--------------------+ |
| |     |                         | |               | |     | UserProfilePreview | |
| +-----+-------------------------+ |               | +-----+--------------------+ |
+-----------------------------------+               +------------------------------+
```

```html
<div id="app">
  <h1>Nested Named Views</h1>
  <router-view></router-view>
</div>
```

```js
const UserSettingsNav = {
  template: `
    <div>
      <router-link to="/settings/emails">Set emails</router-link>
      <br>
      <router-link to="/settings/profile">Set profile</router-link>
    </div>
  `
}
const UserSettings = {
  template: `
    <div>
      <h2>User Settings</h2>
      <user-settings-nav></user-settings-nav>
      <router-view></router-view>
      <router-view name="helper"></router-view name="helper">
    </div>
  `,
  components: { UserSettingsNav }
}

const UserEmailsSubscriptions = {
  template: `
    <div>
      <h3>Email Subscriptions</h3>
    </div>
  `
}

const UserProfile = {
  template: `
    <div>
      <h3>Edit your profile</h3>
    </div>
  `
}

const UserProfilePreview = {
  template: `
    <div>
      <h3>Preview of your profile</h3>
    </div>
  `
}

const router = new VueRouter({
  routes: [
    {
      path: '/settings',
      // You could also have named views at tho top
      component: UserSettings,
      children: [
        {
          // 以 / 开头的嵌套路径会被当作根路径，所以 children 一般情况下 path 不用加 /
          // 此时访问时会和父路径拼接成 `/settings/emails` 形式
          path: 'emails',
          component: UserEmailsSubscriptions
        },
        {
          path: 'profile',
          components: {
            default: UserProfile,
            helper: UserProfilePreview
          }
        }]
    }
  ]
})

router.push('/settings/emails')

const app = new Vue({
  router,
  el: '#app'
})
```

### 重定向和别名

#### 重定向

```html
<div id="app">
  <li>
    <router-link to="/foo">Go to foo</router-link>
  </li>
  <li>
    <router-link to="/foobar">Go to foobar, but redirect to bar</router-link>
  </li>
  <li>
    <router-link to="/foobaz">Go to foobaz, but redirect to baz with params</router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const Foo = {
  template: `
    <div>Foo</div>
  `
}

const Bar = {
  template: `
    <div>Bar</div>
  `
}

const Baz = {
  template: `
    <div>Baz {{$route.params.id}}</div>
  `
}

const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo
    },
    {
      path: '/bar',
      component: Bar
    },
    {
      path: '/baz/:id',
      name: 'baz',
      component: Baz
    },
    {
      // 从 `/a` 重定向到 `/b`
      path: '/foobar',
      redirect: '/bar'
    },
    {
      // 重定向的目标也可以是一个命名的路由
      path: '/foobaz',
      redirect: { name: 'baz', params: { id: 123 } }
    }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

##### 动态重定向

```html
<div id="app">
  <li>
    <router-link to="/dynamic-redirect">
      /dynamic-redirect (redirects to /bar)
    </router-link>
  </li>
  <li>
    <router-link to="/dynamic-redirect/123">
      /dynamic-redirect/123 (redirects to /with-params/123)
    </router-link>
  </li>
  <li>
    <router-link to="/dynamic-redirect?to=foo">
      /dynamic-redirect?to=foo (redirects to /foo)
    </router-link>
  </li>
  <li>
    <router-link to="/dynamic-redirect#baz">
      /dynamic-redirect#baz (redirects to /baz)
    </router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const Foo = { template: `<div>foo</div>` }

const Bar = { template: `<div>bar</div>` }

const Baz = { template: `<div>baz</div>` }

const WithParams = { template: `<div>{{ $route.params.id }}</div>` }

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', name: 'baz', component: Baz },
    { path: '/with-params/:id', component: WithParams },
    {
      path: '/dynamic-redirect/:id?',
      redirect: to => {
        // to 是箭头函数的参数
        // 以下为解构赋值
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        //  hash，即地址栏 URL 中的 # 符号
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    },
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

#### 别名

重定向的意思是，当用户访问 `/a` 时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`；

别名的意思是，**`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配其实为 `/a`，就像用户访问 `/a` 一样。**  

```html
<div id="app">
  <li>
    <router-link to="/foo-alias">
      /foo-alias
    </router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const Foo = { template: '<div>foo</div>' }

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo, alias: '/foo-alias' }]
})

const app = new Vue({
  router
}).$mount('#app')
```

### 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 `props` 将组件和路由解耦：

**取代与 `$route` 的耦合**

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```

**通过 `props` 解耦**

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
    
    // ...
    // 对于包含命名视图的路由，必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

#### 布尔模式

```html
<div id="app">
  <li>
    <router-link to="/foo/123">/foo</router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const Foo = {
  props: ['id'],
  template: '<div>foo {{id}}</div>'
}

const router = new VueRouter({
  // 如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性
  routes: [{ path: '/foo/:id', component: Foo, props: true }]
})

// ...
// 使用函数形式：
const Foo = {
  props: ['params'],
  template: '<div>foo {{params}}</div>'
}

const router = new VueRouter({
  routes: [{ path: '/foo/:id', component: Foo, props: route => ({ params: route.params.id }) }]
})

const app = new Vue({
  router
}).$mount('#app')
```

#### 对象模式

```js
const Foo = {
  props: ['name'],
  template: '<div>foo {{name}}</div>'
}

const router = new VueRouter({
  // 如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用
  routes: [{ path: '/foo/:id', component: Foo, props: { name: 'evan' } }]
})

const app = new Vue({
  router
}).$mount('#app')
```

#### 函数模式

```html
<div id="app">
  <li>
    <router-link to="/foo?q=vue">/foo</router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const Foo = {
  props: ['query'],
  template: '<div>foo {{query}}</div>'
}

const router = new VueRouter({
  // 创建一个函数返回 `props`，将静态值与基于路由的值结合
  // URL `/foo?q=vue` 会将 { query: 'vue' } 作为属性传递给 `Foo` 组件
  routes: [{ path: '/foo', component: Foo, props: route => ({ query: route.query.q }) }]
})

// ...
// 常规情况下：
const Foo = {
  template: '<div>foo {{$route.query.q}}</div>'
}

const router = new VueRouter({
  routes: [{
    path: '/foo',
    component: Foo
  }]
})

const app = new Vue({
  router
}).$mount('#app')
```

## 进阶

### 导航守卫

#### 全局前置守卫

```html
<div id="app">
  <li>
    <router-link to="/user">/user</router-link>
  </li>
  <br>
  <router-view></router-view>
</div>
```

```js
const User = {
  template: '<div>User</div>'
}

const Login = {
  template: '<div>Login</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user', component: User, name: 'user', meta: { requireAuth: true } },
    { path: '/login', component: Login, name: 'login' }
  ]
})

/*
to: Route：即将要进入的目标路由对象
from: Route：当前导航正要离开的路由对象
next: Function：一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // next('/') 或者 next({ path: '/' })：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
    next({ name: 'login' })
  } else {
    // next()：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed 确认的。
    next()
  }
})

const app = new Vue({
  router
}).$mount('#app')
```

```js
// 确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。

// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 路由元信息

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

如何访问这个 `meta` 字段呢？

首先， `routes` 配置中的每个路由对象为**路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，可能匹配多个路由记录

例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

一个路由匹配到的所有路由记录会暴露为 `$route` 对象（还有在导航守卫中的路由对象）的 `$route.matched` 数组。因此，需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: '/login',
    })
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 过渡动效

#### 单个路由的过渡

让每个路由组件有各自的过渡效果，可以在各路由组件内使用 ` <transition> ` 并设置不同的 name。

```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```

#### 基于路由的动态过渡

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```js
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

`watch` 可以由**组件内的守卫**：`beforeRouteUpdate` 代替：

```js
beforeRouteUpdate(to, from, next) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 `/foo/:id`，在 `/foo/1` 和 `/foo/2` 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
}
```

```html
<div id="app">
  <h1>Transitions</h1>
  <ul>
    <li>
      <router-link to="/">/</router-link>
    </li>
    <li>
      <router-link to="/parent">/parent</router-link>
    </li>
    <li>
      <router-link to="/parent/foo">/parent/foo</router-link>
    </li>
    <li>
      <router-link to="/parent/bar">/parent/bar</router-link>
    </li>
  </ul>
  <transition name="fade" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
</div>
```

```js
const Home = {
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>hello</p>
    </div>
  `
}

const Parent = {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate(to, from, next) {
    // /parent 2
    // /parent/foo 3
    // /parent/bar 3
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    console.log(toDepth, fromDepth)
    // 从 /parent/foo 或 /parent/bar 跳转到 /parent 时，toDepth < fromDepth
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  template: `
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  `
}

const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    {
      path: '/parent',
      component: Parent,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
      ]
    }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

### 获取数据

#### 导航完成后获取数据

```html
<div id="app">
  <router-link to="/post/123">/post</router-link>
  <br>
  <router-view></router-view>
</div>
```

```js
const Post = {
  template: `
    <div class="post">
      <div v-if="loading" class="loading">
        Loading...
      </div>

      <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      loading: false,
      post: null
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = this.post = null
      if (this.$route.params.id) {
        this.loading = false
        this.post = {
          title: 'Post-Title',
          body: 'Post-Body'
        }
      }
    }
  }
}

const router = new VueRouter({
  routes: [{
    path: '/post/:id',
    component: Post
  }]
})

const app = new Vue({
  router
}).$mount('#app')
```

#### 导航完成前获取数据

```html
<div id="app">
  <router-link to="/post">/post</router-link>
  <router-link to="/post/123">/post/123</router-link>
  <br>
  <router-view></router-view>
</div>
```

```js
const Post = {
  template: `
    <div class="post">
      <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      post: null
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      const post = { title: 'Post-Title', body: 'Post-Body' }
      next(vm => vm.setData(post))
    } else {
      next('/')
    }
  },
  methods: {
    setData(post) {
      this.post = post
    }
  }
}

const router = new VueRouter({
  routes: [
    {
      path: '/post',
      component: Post
    },
    {
      path: '/post/:id',
      component: Post
    }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

### 路由懒加载

把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件：

#### 不采用懒加载形式：

```js
// 这种形式在首页渲染时，就会把所有路由对应的组件都加载进来
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
```

#### 采用懒加载形式：

```js
// 这种形式会在访问到某个路由时，才会加载对应组件，缩短了首屏渲染时间
// 使用 `webpackChunkName` 表示把组件按组分块，如果没有当前参数，组件块会被命名为 `0.js`
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // component: About
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```

## API

`TODO: 待定`

