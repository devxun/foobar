# Vue2

## 安装

### 直接用 `Script` 引入

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
```

## 介绍

### Vue.js 是什么？

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。

### 声明式渲染

#### 文本插值

数据和 DOM 已经被建立了关联，所有东西都是**响应式的**。验证：通过浏览器的 JavaScript 控制台，修改 `app.message` 的值，将看到相应地更新。

不再和 HTML 直接交互，一个 Vue 应用会将其挂载到一个 DOM 元素上，然后对其进行完全控制。

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

#### 绑定元素 attribute

**指令**带有前缀 `v-`，以表示它们是 Vue 提供的特殊 attribute。

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

### 条件

可以绑定到 DOM **结构**。

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

### 循环

`v-for` 指令可以绑定数组的数据来渲染一个项目列表。

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```

### 处理用户输入

用 `v-on` 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法。

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

提供了 `v-model` 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

### 组件化应用构建

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。

```js
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})

var app = new Vue(...)
```

```html
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```

从父作用域通过 prop 接口将数据传到子组件。

```js
// 子组件
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

```html
<div id="app-7">
  <ol>
    <!--
      现在为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      同时也需要为每个组件提供一个 key，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
// 父组件
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```

## Vue 实例

### 创建一个 Vue 实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的。

```js
var vm = new Vue({
  // 选项
})
```

### 数据与方法

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。

```js
// 数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// 反之亦然
data.a = 3
vm.a // => 3
```

值得注意的是只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的，也就是说如果添加一个新的 property，那么对其的改动将不会触发任何视图的更新。

如果知道会在晚些时候需要一个 property，但是一开始它为空或不存在，那么仅需要设置一些初始值即可。

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

唯一的例外是使用 `Object.freeze()`，这会阻止修改现有的 property，也意味着响应系统无法再*追踪*变化。

```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 `$`，以便与用户定义的 property 区分开来。

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

### 实例生命周期钩子

**生命周期钩子**的函数，给了用户在不同阶段添加自己的代码的机会。 

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。

不要在选项 property 或回调上使用箭头函数，因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

## 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

### 插值

#### 文本

数据绑定最常见的形式就是使用 Mustache 语法（双大括号）的文本插值。

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 `msg` property 的值。无论何时，绑定的数据对象上 `msg` property 发生了改变，插值处的内容都会更新。

通过使用 v-once 指令，也能执行一次性地插值，当数据改变时，插值处的内容不会更新。

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

#### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 `v-html` 指令。

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    rawHTML: '<span style="color: red">This should be red.</span>'
  }
})
```

这个 `span` 的内容将会被替换成为 property 值 `rawHtml`，直接作为 HTML，会忽略解析 property 值中的数据绑定。 

> 站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。 

#### Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令。

```html
<div v-bind:id="dynamicId"></div>
```

对于布尔 attribute（它们只要存在就意味着值为 `true`，所以谨防字符串形式），`v-bind` 工作起来略有不同。

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 `isButtonDisabled` 的值是 `null`、`undefined` 或 `false`，则 `disabled` attribute 甚至不会被包含在渲染出来的 `<button>` 元素中。 

#### 使用 JavaScript 表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```html
<div>{{ number + 1 }}</div>

<div>{{ ok ? 'YES' : 'NO' }}</div>

<div>{{ message.split('').reverse().join('') }}</div>

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，否则**不会**生效。

```js
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

> 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。不应该在模板表达式中试图访问用户定义的全局变量。

