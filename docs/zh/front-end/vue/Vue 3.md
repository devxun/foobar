# Vue 3

## 创建一个 Vue 3 应用

> **知识点**
>
> - 脚手架工具
>   - Vue 2 应用中，脚手架工具为 `Vue CLI`，基于 `webpack` 构建
>   - Vue 3 应用中，脚手架工具为 `create-vue`，基于 `Vite` 构建
> - 项目启动
>   - Vue 2 应用中，项目启动命令为 `npm run serve`
>   - Vue 3 应用中，项目启动命令为 `npm run dev`

```sh
npm init vue@latest
Need to install the following packages:
  create-vue@3.6.4
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

√ Project name: ... vue-project
√ Add TypeScript? ... No / Yes
√ Add JSX Support? ... No / Yes
√ Add Vue Router for Single Page Application development? ... No / Yes
√ Add Pinia for state management? ... No / Yes
√ Add Vitest for Unit Testing? ... No / Yes
√ Add an End-to-End Testing Solution? » - Use arrow-keys. Return to submit.
>   No
    Cypress
    Playwright
√ Add ESLint for code quality? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes

Scaffolding project in E:\project\pro\vue-project...

Done. Now run:

  cd vue-project
  npm install
  npm run dev


```

## 组合式 API

### `setup()`

**生命周期**

```vue
<script>
export default {
  // `setup()` 优先于 `beforeCreate()`，并自动执行
  setup() {
    console.log('setup')
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
}
</script>
```

`setup()` 钩子是在组件中使用组合式 API 的入口。

`setup()` 自身并不含对组件实例的访问权，即在 `setup()` 中访问 `this` 会是 `undefined`。 

```vue
<script>
export default {
  setup() {
    console.log('setup')
    console.log(this) // undefined
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
}
</script>
```

`setup()` 应该使用 `return` 同步地 **返回一个对象**。

> **知识点**
>
> - `ref()` 可以接收任意值类型
> - `reactive()` 只能接收对象类型（包括数组）

#### `ref()`

```vue
<!-- 使用 `ref()` 函数创建一个响应式对象，此对象只有一个指向其内部值的属性 `.value` -->
<script>
import { ref } from 'vue'

export default {
  setup() {
    console.log('setup')
    // 参数：简单类型 + 对象或数组类型
    const count = ref(0)
    const increment = () => count.value++
    return {
      count,
      increment,
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
}
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

#### 响应式对象 `reactive()`

```vue
<!-- 使用 `reactive()` 函数创建一个响应式对象 -->
<script>
import { reactive } from 'vue'

export default {
  setup() {
    console.log('setup')
    // 参数：对象或数组类型
    const state = reactive({ count: 0 })
    const increment = () => state.count++
    return {
      state,
      increment,
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
}
</script>

<template>
  <div>
    <h3>{{ state.count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

#### `<script setup>`

> 对于结合单文件组件使用的组合式 API，推荐通过 `<script setup></script>` 以获得更加简洁及符合 **人体工程学** 的语法。其实就是 **语法糖**。

```vue
<!-- `ref` -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

```vue
<!-- `reactive` -->
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
const increment = () => state.count++
</script>

<template>
  <div>
    <h3>{{ state.count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 计算属性 `computed()`

```vue
<!-- `ref` -->
<script setup>
import { computed, ref } from 'vue'

const arr = ref([1, 2, 3, 4, 5, 6, 7, 8])
const filterArray = computed(() => {
  return arr.value.filter((item) => item % 2 == 0)
})
</script>

<template>
  <div>
    <h3>{{ filterArray }}</h3>
  </div>
</template>
```

```vue
<!-- `reactive` -->
<script setup>
import { computed, reactive } from 'vue'

const arr = reactive([1, 2, 3, 4, 5, 6, 7, 8])
const filterArray = computed(() => {
  return arr.filter((item) => item % 2 == 0)
})
</script>

<template>
  <div>
    <h3>{{ filterArray }}</h3>
  </div>
</template>
```

### 侦听器 `watch()`

#### 侦听 `ref` 对象

```vue
<script setup>
import { watch, ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
watch(count, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

```vue
// 侦听多个来源，回调函数接受两个数组，分别对应来源数组中的新值和旧值
<script setup>
import { watch, ref } from 'vue'

const count = ref(0)
const cnt = ref(100)
const increment = () => count.value++
const decrement = () => cnt.value--
watch([count, cnt], ([newCount, newCnt], [oldCount, oldCnt]) => {
  console.log([newCount, newCnt], [oldCount, oldCnt])
})
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <h3>{{ cnt }}</h3>
    <button @click="increment">+1</button>
    <br />
    <button @click="decrement">-1</button>
  </div>
</template>
```

**`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。

```vue
<script setup>
import { watch, ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
watch(
  count,
  (newValue, oldValue) => {
    console.log(newValue, oldValue) // 0 undefined
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

**`deep`**：如果侦听源是对象，强制深度遍历，以便在深层级变更时触发回调。

```vue
<script setup>
import { watch, ref } from 'vue'

const state = ref({ count: 0 })
const increment = () => state.value.count++
watch(
  state,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div>
    <h3>{{ state.count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

```vue
<script setup>
import { watch, ref } from 'vue'

const state = ref({ count: 0, cnt: 100 })
const increment = () => state.value.count++
const decrement = () => state.value.cnt--
watch(
  // 精准侦听
  () => state.value.count,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }
)
</script>

<template>
  <div>
    <h3>{{ state.count }}</h3>
    <h3>{{ state.cnt }}</h3>
    <button @click="increment">+1</button>
    <br />
    <button @click="decrement">-1</button>
  </div>
</template>
```

#### 侦听 `reactive` 对象

当直接侦听一个响应式对象时，侦听器会自动启用深层模式。

```vue
<script setup>
import { watch, reactive } from 'vue'

const state = reactive({ count: 0 })
const increment = () => state.count++
watch(state, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
</script>

<template>
  <div>
    <h3>{{ state.count }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 组件基础

#### 父传子

```vue
<!-- 父组件 -->
<script setup>
import ChildComponent from './components/ChildComponent.vue'

import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <h3>Here is a child component!</h3>
    <!-- 在单文件组件中，推荐为子组件使用 `PascalCase` 的标签名，也可以使用 `/>` 来关闭一个标签 -->
    <!-- 传递动态或静态 props -->
    <ChildComponent :count="count" message="Parent message!" />
    <!-- 如果是直接在非单文件组件的 `DOM` 中书写模板，就需要使用 `kebab-case` 形式并显式地关闭这些组件的标签 -->
  </div>
</template>
```

```vue
<!-- 子组件：写法一 -->
<script setup>
// `defineProps` 是一个编译宏命令
// 字符串数组形式
const props = defineProps(['message'])
</script>

<template>
  <div>
    <h3>{{ props.message }}</h3>
  </div>
</template>
```

```vue
<!-- 子组件：写法二 -->
<script setup>
defineProps(['count', 'message'])
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <h3>{{ message }}</h3>
  </div>
</template>
```

```vue
<!-- 子组件：写法三 -->
<script setup>
// 对象形式
defineProps({
  count: Number,
  message: String,
})
</script>

<template>
  <div>
    <h3>{{ count }}</h3>
    <h3>{{ message }}</h3>
  </div>
</template>
```

> 如果一个 `prop` 的名字很长，子组件接收时应使用 `camelCase` 形式，父组件向子组件传递时，通常会将其写为 `kebab-case` 形式。

```vue
<!-- 父组件 -->
<script setup>
import ChildComponent from './components/ChildComponent.vue'

import { ref } from 'vue'
const longProp = ref('long prop')
</script>

<template>
  <div>
    <h3>Here is a child component!</h3>
    <ChildComponent :long-prop="longProp" />
  </div>
</template>
```

```vue
<!-- 子组件 -->
<script setup>
defineProps({
  longProp: String,
})
</script>

<template>
  <div>
    <h3>{{ longProp }}</h3>
  </div>
</template>
```

#### 子传父

```vue
<!-- 父组件 -->
<script setup>
import ChildComponent from './components/ChildComponent.vue'

import { ref } from 'vue'

const count = ref(0)
const increment = (n) => (count.value += n)
</script>

<template>
  <div>
    <h3>Here is a child component!</h3>
    <h4>{{ count }}</h4>
    <ChildComponent @increment="increment" />
  </div>
</template>
```

```vue
<!-- 子组件 -->
<script setup>
// `defineEmits` 是一个编译宏命令，不能在子函数中使用。必须直接放置在 `<script setup>` 的顶级作用域下
const emit = defineEmits(['increment'])

const sendDelta = () => {
  emit('increment', 2)
}
</script>

<template>
  <div>
    <button @click="sendDelta">+2</button>
  </div>
</template>
```

### 模板引用 `ref`

> 只可以 **在组件挂载后** 才能访问模板引用。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const h3Ref = ref(null)

onMounted(() => {
  console.log(h3Ref.value) // <h3>hello</h3>
})
</script>

<template>
  <div>
    <h3 ref="h3Ref">hello</h3>
  </div>
</template>
```

#### 组件上的 `ref`

```vue
<script setup>
import ChildComponent from './components/ChildComponent.vue'

import { ref, onMounted } from 'vue'

const h3Ref = ref(null)

const childRef = ref(null)

onMounted(() => {
  console.log(h3Ref.value)
  // 子组件未使用 `defineExpose` 显式暴露时，Proxy(Object) {__v_skip: true}
  // 子组件使用 `defineExpose` 显式暴露时，Proxy(Object) {count: RefImpl, __v_skip: true, increment: ƒ}
  console.log(childRef.value)
  
  console.log(childRef.value.count) // 0
  console.log(childRef.value.increment) // () => count.value++
  childRef.value.increment()
  console.log(childRef.value.count) // 1
})
</script>

<template>
  <div>
    <h3 ref="h3Ref">hello</h3>
    <ChildComponent ref="childRef" />
  </div>
</template>
```

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => count.value++

// 使用了 `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露
// 应该首先使用标准的 `props` 和 `emit` 接口来实现父子组件交互
defineExpose({
  count,
  increment,
})
</script>

<template>
  <div>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 依赖注入

`provide` 和 `inject`  主要解决 **`prop` 逐级透传** 问题，由顶层组件提供依赖，底层组件注入依赖。

```vue
<!-- App.vue -->
<script setup>
import { ref, provide } from 'vue'
import ChildComponent from './components/ChildComponent.vue'

const message = ref('hello')
// 传递数据
provide(/* 注入名 */ 'message', /* 值 */ message)
  
const count = ref(0)
const increment = () => count.value++
// 传递方法
provide('increment', increment)
</script>

<template>
  <div>
    <input v-model="message" />
    <h3>{{ count }}</h3>
    <ChildComponent />
  </div>
</template>
```

```vue
<!-- ChildComponent.vue -->
<script setup>
import GrandChildComponent from './GrandChildComponent.vue'
</script>

<template>
  <div>
    <GrandChildComponent />
  </div>
</template>
```

```vue
<!-- GrandChildComponent.vue -->
<script setup>
import { inject } from 'vue'

const message = inject(/* 注入名 */ 'message')
const increment = inject('increment')
</script>

<template>
  <div>
    <h3>{{ message }}</h3>
    <button @click="increment">+1</button>
  </div>
</template>
```
