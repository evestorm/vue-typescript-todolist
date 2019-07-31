# 编写步骤

## 准备工作

### 创建项目

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

### 重置样式

样式重置采用 [reset.css](https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css) ，放在了 `public/css/` 目录下，文件最后追加了一些自定义样式。最后在 `public/index.html` 文件中引入：

```html
<link rel="stylesheet" type="text/css" href="./css/reset.css">
```

### 素材准备

图片素材例如logo放在了 `src/assets/` 目录下。

### 安装 Vant 组件库

```shell
npm i vant
npm i babel-plugin-import -D # 按需引入需要用到的插件
```

在 `main.ts` 下引用本项目所需所有组件：

```js
import { Button, Tabbar, TabbarItem, NavBar, Icon } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem)
.use(Icon).use(NavBar);
```

## 底部标签栏搭建

来到 `src/router.ts` 先配置一波路由：

```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view: string) {
  return () => import(`./views/${view}`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: loadView('Welcome'),
    },
    {
      path: '/main',
      component: loadView('Main'),
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: loadView('Todo'),
        },
        {
          path: 'done',
          name: 'done',
          component: loadView('Done'),
        },
        {
          path: 'all',
          name: 'all',
          component: loadView('All'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/',
      redirect: '/main',
    },
  ],
});
```

根据上面的路由结构我们创建相应文件：

- `src/views/`
  - `Main.vue` 此文件由 `Index.vue` 改名而来，用来充当底部标签对应页面的父容器
  - `Todo.vue` 待办列表页
  - `Done.vue` 完成列表页
  - `All.vue` 所有列表页

这些文件除了 `Main.vue` ，创建出来后添加类似下方模板代码方便等会查看基本效果：

```html
<template>
  <div class="todo">
    <p>我是列表</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Todo extends Vue {}
</script>

<style scoped lang="scss">
.todo {
  height: 100%;
  overflow-y: hidden;
}
</style>
```

然后回到 `src/views/Main.vue` 中编写页面结构：

```html
<template>
  <div class="main">
    <van-nav-bar :title="nowTitle" class="navbar"/>
    <router-view/>
    <van-tabbar active-color="238bd4" v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="todo-list-o" info="5">待办</van-tabbar-item>
      <van-tabbar-item icon="passed" info="10" class="done">完成</van-tabbar-item>
      <van-tabbar-item icon="orders-o">全部</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
```

具体业务代码在该文件中查看。

让我们回到浏览器，现在底部就会出现标签栏，点击后能够跳转到对应页面。
