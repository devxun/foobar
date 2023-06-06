# Vue 3

## 开始

### 简介

```js
// Vue 3
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```js
// Vue 2
import Vue from 'vue'

new Vue({
  data() {
    return {
      count: 0
    }
  }
}).$mount('#app')
```

```html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

#### API 风格

##### 选项式 API

```vue
<script>
export default {
  // `data()` 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // `methods` 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

##### 组合式 API

```vue
<script setup>
// 使用导入的 `API` 函数来描述组件逻辑
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 快速上手

#### 创建一个 `Vue` 应用

基于 `Vite` 构建工具：

```sh
npm init vue@latest # 当前指令将安装并执行 `create-vue`
```

```sh
# 基于 `Vue CLI` 构建工具
vue create hello-world
```

使用 `yarn` + `vite` 方式：

```js
// TODO: ...
```

#### 通过 `CDN` 使用 `Vue`

**Vue 3** `CDN` 地址：`https://unpkg.com/vue@3`

如果是 **Vue 2**，则地址为：`https://unpkg.com/vue@2`

***全局构建版本***

```html
<!-- 截止目前（2023年5月31日）的最新版本 -->
<script>https://unpkg.com/vue@3.3.4/dist/vue.global.js</script> 

<div id="app">{{ message }}</div>

<script>
  // 该版本的所有顶层 `API` 都以属性的形式暴露在了全局的 `Vue` 对象上
  const { createApp } = Vue
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

## 基础

### 创建一个应用

#### 应用实例

每个 `Vue` 应用都是通过 `createApp` **函数** 创建一个新的 **应用实例**：

```js
// Vue 3
import { createApp } from 'vue'

const app = createApp({
  // 根组件选项
  // data
  // methods
  // computed
  // watch
})

app.mount('#app')
```

```js
// Vue 2
import Vue from 'vue'

const app = new Vue({
  // 根组件选项
  // data
  // methods
  // computed
  // watch
})

app.$mount('#app')
```

#### 根组件

传入 `createApp` 的 **对象** 实际上是一个组件，称之为 **根组件**。

```js
import { createApp } from 'vue'

// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

#### 挂载应用

应用实例必须在调用了 `.mount()` 方法后才会渲染出来。该方法接收一个 **容器** 参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串：

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

或：

```html
<div class="app"></div>
```

```js
app.mount('.app')
```

应用根组件的内容将会被渲染在容器元素里面。

