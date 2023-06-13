# Pinia

## 介绍

### 开始

#### 安装

当然，首先创建一个 **Vue 3** 应用：

```sh
npm init vue@latest
```

然后安装依赖，启动项目：

```sh
npm install
npm run dev
```

安装 `pinia`：

```sh
# yarn
yarn add pinia
# npm
npm install pinia
```

在 `main.js` 中：

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

#### `Store` 是什么？

承载着 **全局状态**。

有三个 **概念**：`state`，`getters`，`actions`，可以假设相当于 `data`，`computed`，`methods`。

### `Pinia` 是什么？

#### 基础示例

先创建一个 `Store`，为了规范，在 `src` 目录下新建 `stores` 文件夹，在其中新建 `counter.js` 文件（文件命名最好使用 `store` 的名字）：

```js
// counter.js
import { defineStore } from 'pinia'

// Option Store
export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

```js
// counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Setup Store
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++

  // 要记得 `return` 出去
  return {
    count,
    increment,
  }
})
```

为了规范，在 `src - components` 目录下，新建 `HelloPinia.vue` 文件：

```vue
<!-- HelloPinia.vue -->
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>
<template>
  <div>
    <h1>{{ counter.count }}</h1>
    <button @click="counter.increment()">+1</button>
  </div>
</template>
```

## 核心概念

### 定义 `Store`

使用 `defineStore` 定义。

可以对 `defineStore()` 的返回值进行任意命名，但最好使用 `store` 的名字，同时以 `use` 开头且以 `Store` 结尾（比如 `useCounterStore`，`useUserStore`，`useCartStore`，`useProductStore`）， 是一个符合组合式函数风格的约定 。

```js
// counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', ...)
```

第一个参数：`Store` 的 **名字**，被用作 **唯一** `id`；

第二个参数：可以接受两类值，`Option` 对象或 `Setup` 函数。

#### `Option Store`

```js
// counter.js
import { defineStore } from 'pinia'

export const userCounterStore = defineStore('counter', {
  // `state` 可以理解成是 `store` 的 `data`
  state() {
    return {
      count: 0,
    }
  },
  // `getters` 可以理解成是 `store` 的 `computed`
  getters: {
    // 推荐使用箭头函数
    /*
    doubleCount: (state) => state.count * 2
    */
    doubleCount(state) {
      return state.count * 2
    },
  },
  // `actions` 可以理解成是 `store` 的 `methods`
  actions: {
    increment() {
      this.count++
    },
  },
})
```

#### `Setup Store`

```js
// counter.js
import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

export const userCounterStore = defineStore('counter', () => {
  // `ref()` 就是 `state`
  const count = ref(0)

  // `computed()` 就是 `getters`
  const doubleCount = computed(() => count.value * 2)

  // `function()` 就是 `actions` 
  const increment = () => count.value++

  return {
    count,
    doubleCount,
    increment,
  }
})
```

#### 使用 `Store`

```vue
<!-- HelloPinia.vue -->
<script setup>
import { userCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counter = userCounterStore()

// 为了从 `store` 中提取属性时保持其响应性，`storeToRefs` 将为每一个响应式属性创建引用
const { count, doubleCount } = storeToRefs(counter)

// `actions` 可以直接解构
const { increment } = counter
</script>
<template>
  <div>
    <h1>{{ count }}</h1>
    <h1>{{ doubleCount }}</h1>
    <button @click="increment">+1</button>
  </div>
</template>
```

> **注意**：
>
> ```vue
> <!-- HelloPinia.vue -->
> <script setup>
> import { userCounterStore } from '@/stores/counter'
> 
> import { computed } from 'vue'
> 
> const counter = userCounterStore()
> 
> // `state` 如果直接解构的话，会破坏响应性
> const { count, doubleCount } = counter
> 
> // 也可以使用计算属性保持响应性
> const count = computed(() => counter.count)
> const doubleCount = computed(() => counter.doubleCount)
> </script>
> 
> <!-- 也可以通过 `store` 实例访问 `state`、`getters` 和调用 `actions` -->
> <template>
> <div>
>  <h1>{{ counter.count }}</h1>
>  <h1>{{ counter.doubleCount }}</h1>
>  <button @click="counter.increment()">+1</button>
> </div>
> </template>
> ```

### `State`

### `Getters`

大多数时候，`getters` 仅依赖 `state`，不过，有时它们也可能会使用其他 `getters`。 所以可以通过 `this` 访问到 **整个 `store` 实例**。

```js
// counter.js
import { defineStore } from 'pinia'

export const userCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0,
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    // 通过 `this` 访问
    doubleCountPlusOne() {
      return this.doubleCount + 1
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

#### 访问其他 `store` 的 `getters`

##### `Option Store`

```js
// user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        username: 'Hello',
        age: 17,
      },
    }
  },
  getters: {
    userAgePlusTwo(state) {
      return state.userInfo.age + 2
    },
  },
})
```

```js
// counter.js
import { defineStore } from 'pinia'

import { useUserStore } from './user'

export const userCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0,
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne() {
      return this.doubleCount + 1
    },
    plusUserGetters(state) {
      // 使用其他的 `state` 或 `getters`
      const user = useUserStore()
      return state.count + user.userAgePlusTwo
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

##### `Setup Store`

```js
// user.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    username: 'Hello',
    age: 17,
  })

  const userAgePlusTwo = computed(() => userInfo.value.age + 2)

  return {
    userInfo,
    userAgePlusTwo,
  }
})
```

```js
// counter.js
import { defineStore } from 'pinia'

import { useUserStore } from './user'

import { ref, computed } from 'vue'

export const userCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)
  const doubleCountPlusOne = computed(() => doubleCount.value + 1)
  const plusUserGetters = computed(() => {
    const user = useUserStore()
    return count.value + user.userAgePlusTwo
  })

  const increment = () => count.value++

  // 一定一定一定要记得 `return` 出去
  return {
    count,
    doubleCount,
    doubleCountPlusOne,
    plusUserGetters,
    increment,
  }
})
```

### `Actions`

`action` 也是通过 `this` 访问 **整个 `store` 实例**。

```js
// user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```



#### 访问其他 `Store` 的 `actions`

```js
// user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const count = ref(0)

  const increment = () => count.value++

  return {
    count,
    increment,
  }
})
```

```js
// counter.js
import { defineStore, storeToRefs } from 'pinia'

import { useUserStore } from './user'

export const userCounterStore = defineStore('counter', () => {
  const user = useUserStore()
  const { count } = storeToRefs(user)

  const { increment } = user

  return {
    count,
    increment,
  }
})
```

