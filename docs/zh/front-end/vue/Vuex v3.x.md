# Vuex v3.x

## 介绍

### `Vuex` 是什么

`Vuex` 是一个专为 `Vue.js` 应用程序开发的 **状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 

#### 什么是“状态管理模式”

**单向数据流** 示例：

```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- **`state`**，驱动应用的数据源；

- **`view`**，以声明方式将 **`state`** 映射到视图；
- **`actions`**，响应在 **`view`** 上的用户输入导致的状态变化。

如果是 **多个组件共享状态**，就需要把组件的共享状态抽取出来，以一个全局单例模式管理。

### 安装

#### 直接下载 / `CDN` 引用

`https://unpkg.com/vuex` 链接会一直指向 `NPM` 上发布的最新版本。

指定特定的版本：`https://unpkg.com/vuex@3.6.2/dist/vuex.js`

在 `Vue` 之后引入 `vuex` 会进行自动安装：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

#### `NPM`

```sh
npm install vuex@^3.6.2 --save # 安装特定的版本
```

#### `Yarn`

```sh
yarn add vuex@^3.6.2
```

在一个模块化的打包系统中，必须显式地通过 `Vue.use()` 来安装 `Vuex`：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

### 开始

每一个 `Vuex `应用的核心就是 `store`（仓库）。`store` 是一个容器，包含着 **状态（state）**。

1. `Vuex` 的状态存储是响应式的。当 `Vue` 组件从 `store `中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变 `store` 中的状态。改变 `store` 中的状态的唯一途径就是显式地 **提交（commit）mutation**。

最基本的 `Vuex` 计数应用：

```html
<!-- 引入 `Vue` 和 `Vuex` -->
 <script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@3.6.2/dist/vuex.js"></script>

<div id="app">
  <h3>{{count}}</h3>
  <button @click="increment">+1</button>
</div>
```

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    },
  },
})

new Vue({
  store,
  computed: {
    count() {
      return this.$store.state.count
    },
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
  },
}).$mount('#app')
```

通过提交 `mutation` 的方式，而非直接改变 `store.state.count`，是因为要更明确地追踪到状态的变化。

## 核心概念

### `State`

#### 在 `Vue` 组件中获得 `Vuex` 状态

由于 `Vuex` 的状态存储是响应式的，从 `store` 实例中读取状态最简单的方法就是在计算属性中返回某个状态：

```js
// 创建一个 `Counter` 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

`Vuex` 通过 `store` 选项，提供了一种机制将状态从根组件 **注入** 到每一个子组件中（需调用 `Vue.use(Vuex)`）： 

```js
const app = new Vue({
  el: '#app',
  // 把 `store` 对象提供给 `store` 选项，这可以把 `store` 的实例注入所有的子组件
  // 也就是说现在在 `Counter` 子组件中也可以使用到 `store`
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。

#### `mapState` 辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用 `mapState` 辅助函数帮助生成计算属性：

```js
// 在单独构建的版本中辅助函数为 `Vuex.mapState`
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

示例：

```html
<div id="app">
  <h3>{{count}}</h3>
  <h3>{{countAlias}}</h3>
  <h3>{{countPlusLocalState}}</h3>
  <button @click="increment">+1</button>
</div>
```

```js
new Vue({
  store,
  data() {
    return {
      localState: 50,
    }
  },
  computed: new Vuex.mapState({
    count: (state) => state.count,
    // 别名，传字符串参数 'count' 等同于 `(state) => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，也就是当前组件的 `data` 的值，必须使用常规函数，不能使用箭头函数
    countPlusLocalState(state) {
      return this.localState + state.count
    },
  }),
  methods: {
    increment() {
      this.$store.commit('increment')
    },
  },
}).$mount('#app')
```

当映射的计算属性的名称与 `state` 的子节点名称相同时，也可以给 `mapState` 传一个字符串 **数组**。

```js
computed: new Vuex.mapState(['count'])
```

#### 对象展开运算符

`mapState` 函数返回的是一个对象。使用 **对象展开运算符** 可以将其展开后传给 `computed` 属性，然后与局部计算属性混合使用。

```js
// 展开运算符
// 数组
const mapState = ['cxk', 'male', ['sing', 'dance', 'rap', 'basketball']]

const result = [...mapState, 2.5]

console.log(result) // [ 'cxk', 'male', [ 'sing', 'dance', 'rap', 'basketball' ], 2.5 ]
// 对象
const mapState = {
  name: 'cxk',
  gender: 'male',
  hobbies: ['sing', 'dance', 'rap', 'basketball'],
}

const result = { ...mapState, age: 2.5 }

console.log(result)
/*
{
  nickname: 'cxk',
  gender: 'male',
  hobbies: [ 'sing', 'dance', 'rap', 'basketball' ],
  age: 2.5
}
*/
```

`Vuex` 示例：

```html
<script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@3.6.2/dist/vuex.js"></script>

<div id="app">
  <h3>{{name}}</h3>
  <h3>{{gender}}</h3>
  <h3>{{hobbies[3]}}</h3>
  <h3>{{countAge}}</h3>
</div>
```

```js
const store = new Vuex.Store({
  state: {
    name: 'cxk',
    gender: 'male',
    hobbies: ['sing', 'dance', 'rap', 'basketball'],
  },
})

new Vue({
  store,
  data() {
    return {
      age: 2.5,
    }
  },
  // 未使用对象展开运算符，代码不优雅，局部计算属性也包含在了 `mapState` 中
  computed: new Vuex.mapState({
    countAge() {
      return this.age
    },
    name: 'name',
    gender: 'gender',
    hobbies: 'hobbies',
  }),
  // 使用对象展开运算符简化写法，局部计算属性和 `mapState` 相互隔离
  computed: {
    countAge() {
      return this.age
    },
    ...new Vuex.mapState({ name: 'name', gender: 'gender', hobbies: 'hobbies' }),
  },
  // 甚至可以再简化一下
  computed: {
    countAge() {
      return this.age
    },
    ...new Vuex.mapState(['name', 'gender', 'hobbies']),
  },
}).$mount('#app')
```

### `Getter`

需要从 `store` 中的 `state` 中派生出一些状态，例如对列表进行过滤并计数： 

```js
// 后面给出具体示例
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，要么复制这个函数，或者抽取到一个共享函数然后在多处导入它，无论哪种方式都 **不是很理想**。

`Vuex` 允许在 `store` 中定义 `getter`（可以认为是 `store` 的计算属性）。就像计算属性一样，`getter` 的返回值会根据它的依赖被 **缓存** 起来，且只有当它的 **依赖值** 发生了改变才会被重新计算。**那这么说，`state` 就相当于是组件中的 `data`**。

`Getter` 接受 `state` 作为其第一个参数： 

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 通过属性访问

`Getter` 会暴露为 `store.getters` 对象，所以可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

`Getter` 也可以接受其他 `getter` 作为第二个参数： 

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

```js
store.getters.doneTodosCount // -> 1
```

在组件中使用 `Getter`：

```js
computed: {
  doneTodos() {
    return this.$store.getters.doneTodos
  },
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

**注意**，`getter` 在通过属性访问时是作为 `Vue` 的响应式系统的一部分缓存其中的。

示例：

```html
<div id="app">
  <h3>{{doneTodosCount}}</h3>
  <hr />
  <h3 v-for="todo in doneTodos" :key="todo.id">{{todo.text}}</h3>
</div>
```

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'Foo', done: true },
      { id: 2, text: 'Bar', done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
  },
})

new Vue({
  store,
  computed: {
    doneTodos() {
      return this.$store.getters.doneTodos
    },
    doneTodosCount() {
      return this.$store.getters.doneTodosCount
    },
  },
}).$mount('#app')
```

#### 通过方法访问

通过让 `getter` 返回一个函数，来实现给 getter 传参。在对 `store` 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

**注意**，`getter` 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

#### `mapGetters` 辅助函数

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 `getter` 混入 `computed` 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

示例：

```html
<div id="app">
  <h3>{{doneTodosCountAlias}}</h3>
  <hr />
  <h3 v-for="todo in doneTodosAlias" :key="todo.id">{{todo.text}}</h3>
</div>
```

```js
// 方式一
new Vue({
  store,
  computed: new Vuex.mapGetters({
    doneTodosAlias: 'doneTodos',
    doneTodosCountAlias: 'doneTodosCount',
  }),
}).$mount('#app')
// 方式二
new Vue({
  store,
  computed: {
    // 使用对象方式取别名
    ...new Vuex.mapGetters({ doneTodosAlias: 'doneTodos', doneTodosCountAlias: 'doneTodosCount' }),
  },
}).$mount('#app')
// 方式三
new Vue({
  store,
  computed: {
    // 直接展开到数组
    ...new Vuex.mapGetters(['doneTodos', 'doneTodosCount']),
  },
}).$mount('#app')
```

### `Mutations`

更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`。`Vuex` 中的每个 `mutation` 都有一个字符串的 **事件类型（type）** 和 一个 **回调函数（handler）**。这个回调函数实际就是进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    // 事件类型 type => `increment`
    // 回调函数 handler => `(state) { ... }`
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

要唤醒一个 `mutation handler`，需要以相应的 `type` 调用 **`store.commit`** 方法：

```js
store.commit('increment')
```

#### 提交载荷

可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

```js
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个 **对象**，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

```js
store.commit('increment', {
  amount: 10
})
```

#### 对象风格的提交方式

提交 `mutation` 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此 `handler` 保持不变。

一条重要的原则就是要记住 **mutation 必须是同步函数**。

#### 在组件中提交 `mutation`

可以在组件中使用 `this.$store.commit('xxx')` 提交 `mutation`，或者使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

示例：

```html
<div id="app">
  <h3>{{count}}</h3>
  <button @click="incrementAlias">+</button>
  <button @click="decrementAlias({amount: 1})">-</button>
</div>
```

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment: (state) => state.count++,
    decrement(state, payload) {
      state.count -= payload.amount
    },
  },
})

// 方式零
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    incrementAlias() {
      this.$store.commit('increment')
    },
    decrementAlias(payload) {
      this.$store.commit('decrement', payload)
      // 或
      this.$store.commit({
        type: 'decrement',
        amount: payload.amount
      })
    },
  },
}).$mount('#app')
// 方式一
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: new Vuex.mapMutations({
    incrementAlias: 'increment',
    decrementAlias: 'decrement',
  }),
}).$mount('#app')
// 方式二
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    ...new Vuex.mapMutations({
      incrementAlias: 'increment',
      decrementAlias: 'decrement',
    }),
  },
}).$mount('#app')
// 方式三：注意修改 `div` 插值
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    ...new Vuex.mapMutations(['increment', 'decrement']),
  },
}).$mount('#app')
```

### `Actions`

`Action` 类似于 `mutation`，不同在于：

- `Action` 提交的是 `mutation`，而不是直接变更状态。
- `Action` 可以包含任意 **异步** 操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 正常写法
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
  // `ES2015` 参数解构简化写法
  // 如 `{ commit, state }`，在 `{}` 就可以直接使用 `commit` 和 `state`
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
})
```

`Action` 函数接受一个与 `store` 实例具有 **相同方法和属性** 的 `context` 对象，因此可以调用 `context.commit` 提交一个 `mutation`，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。

#### 分发 `Action`

`Action` 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment') // 这个 `increment` 属于 `actions`，而不是 `mutations`
```

`Actions` 支持同样的载荷方式和对象方式进行分发，此时分发过去的载荷或对象实际上就是给提交 `mutation` 时候的载荷或对象使用：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

#### 在组件中分发 `Action`

在组件中使用 `this.$store.dispatch('xxx')` 分发 `action`，或者使用 ``mapActions`` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

示例：

```html
<div id="app">
  <h3>{{count}}</h3>
  <button @click="incrementAlias">+</button>
  <button @click="decrementAlias({amount: 1})">-</button>
</div>
```

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment: (state) => state.count++,
    decrement(state, payload) {
      state.count -= payload.amount
    },
  },
  actions: {
    // 参数解构
    increment({ commit }) {
      commit('increment')
    },
    // 传递载荷
    decrement: (context, payload) => {
      context.commit('decrement', payload)
    },
  },
})

// 方式零
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    incrementAlias() {
      this.$store.dispatch('increment')
    },
    decrementAlias(payload) {
      this.$store.dispatch('decrement', payload)
    },
  },
}).$mount('#app')

// 方式一
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: new Vuex.mapActions({
    incrementAlias: 'increment',
    decrementAlias: 'decrement',
  }),
}).$mount('#app')

// 方式二
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    ...new Vuex.mapActions({
      incrementAlias: 'increment',
      decrementAlias: 'decrement',
    }),
  },
}).$mount('#app')

// 方式三：注意修改 `div` 插值
new Vue({
  store,
  computed: {
    ...new Vuex.mapState(['count']),
  },
  methods: {
    ...new Vuex.mapActions(['increment', 'decrement']),
  },
}).$mount('#app')
```

### Modules

```
TODO: 
```

## 进阶

### 项目结构

```
TODO: https://github.com/vuejs/vuex/tree/3.x/examples/shopping-cart
```

