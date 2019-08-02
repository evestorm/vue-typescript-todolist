# 项目重点

## 项目初始化

```shell
vue create vue-typescript-todolist

# 手动选择配置
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Router, Vuex, CSS
 Pre-processors, Linter
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected 
polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fal
lback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supp
orted by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: TSLint
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert select
ion)Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

cd vue-typescript-todolist
npm run serve
```

## 样式重置

样式重置采用 [reset.css](https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css) ，放在了 `public/css/` 目录下，文件最后追加了一些自定义样式。最后在 `public/index.html` 文件中引入：

```html
<link rel="stylesheet" type="text/css" href="./css/reset.css">
```

顺便更改下 `viewport` ：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

## 素材准备

图片素材例如logo放在了 `src/assets/` 目录下。

## 安装 Vant 组件库

```shell
npm i vant
npm i babel-plugin-import -D # 按需引入需要用到的插件
```

在 `main.ts` 下引用本项目所需所有组件：

```js
import { Button, Tabbar, TabbarItem, NavBar, Icon, Popup, Field, Cell, CellGroup } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem)
.use(Icon).use(NavBar).use(Popup)
.use(Field).use(Cell).use(CellGroup);
```

## 第一次访问跳转欢迎页

```js
...
router.beforeEach((to, from, next) => {
  if (to.name === 'welcome') {
    next()
  } else {
    // 第一次访问页面转到欢迎页
    const versionNo = '1.0.0'
    if (!window.localStorage.getItem('update-version') || window.localStorage.getItem('update-version') !== versionNo) {
      window.localStorage.setItem('update-version', versionNo)
      next({name: 'welcome'})
    } else {
      next()
    }
  }
})

export default router
```

## TS 在 Vue 中的写法

### 组件

```html
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component({
  // 原组件名
  name: 'Home',
  // 原引入的子组件
  components: { Item },
  // 原 computed
  computed: {
    active() {

    }
  }
})
export default class XXX extends Vue {
  // 原 data 中组件内部属性
  private title: string = ''
  public count: number = 0
  public active?: boolean = false

  // 原 props 中组件需要的属性
  @Prop() private msg!: string

  // 原 watch 中组件需要监控的属性
  @Watch('$route')
  private onRouteChange(route: Route) {

  }
  @Watch('obj', { immediate: true, deep: true })
  private onShowChange(val: boolean, oldVal: boolean) {

  }

  // 生命周期函数
  private created(): void {

  }
  private mounted(): void {

  }

  // 自定义方法，不用写在methods里面了
  private gotoHome(e: any): void {
    this.$router.push({path: '/main/todo'});
  }
}
</script>
```

### $emit用法

```js
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e) {
    return e.target.value
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

等于

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}
```

### Vuex 的改变

原 `store.js` 写法参考 `src/store.ts`。

#### 在组件中使用 vuex

安装 `vuex-class` ：`npm i vuex-class`。

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Getter, Action, Mutation } from 'vuex-class'

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @Getter('foo') getterFoo
  @Getter('foo2') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo

  created () {
    this.stateFoo // -> store.state.foo
    this.getterFoo // -> store.getters.foo
    this.getterFoo2() // -> store.getters.foo2(2)
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
  }
}
```

### 详细文档 + 资源

- [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator) 在 vue-class-component 上增强更多的结合 Vue 特性的装饰器（e.g. @Prop @Emit @Inject）
- [vuex-class](https://www.npmjs.com/package/vuex-class)
- [TS -- vue和以前代码对比](https://www.kancloud.cn/cyyspring/vuejs/1058522)
