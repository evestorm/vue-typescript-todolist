<template>
  <div class="main">
    <!-- 顶部导航 -->
    <van-nav-bar :title="nowTitle" class="navbar">
      <van-icon class="delete" name="delete" slot="right" v-if="nowTitle === '完成'" @click="clearCompleted" />
    </van-nav-bar>
    <!-- 页面 -->
    <TodoListView :status="nowStatus"></TodoListView>
    <!-- 底部tabbar -->
    <van-tabbar active-color="238bd4" v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="todo-list-o" :info="todoCount">待办</van-tabbar-item>
      <van-tabbar-item icon="passed" :info="doneCount" class="done">完成</van-tabbar-item>
      <van-tabbar-item icon="orders-o">全部</van-tabbar-item>
    </van-tabbar>
    <!-- 添加任务modal -->
    <Popup :show="show" @trigger-close="closeModal"></Popup>
    <!-- 添加任务 -->
    <van-button @click="openModal" class="add-btn" round icon="plus" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import TodoListView from './TodoListView.vue';
import Popup from '../components/popup.vue';
import Storage from '../utils/storage';
import { Getter, Action } from 'vuex-class';
import { TodoItem, TODO_LIST } from '../store';

@Component({
  components: { Popup, TodoListView },
  computed: {
    todoCount() {
      return this.getterList(false).length
    },
    doneCount() {
      return this.getterList(true).length
    }
  }
})
export default class Main extends Vue {
  private active: number = 0
  private nowTitle: string = '待办'
  private nowStatus?: boolean = false

  private show: boolean = false

  @Watch('$route')
  private onRouteChange(route: Route) {
    switch (route.params.status) {
      case 'todo':
        this.nowStatus = false
        break;
      case 'done':
        this.nowStatus = true
        break;
      case 'all':
        this.nowStatus = undefined
        break;
      default:
        break;
    }
  }

  @Getter('getList') getterList?: TodoItem[]
  @Action('loadList') private actionLoadList(data: TodoItem[]): void {}
  @Action('clearCompleted') private actionClearCompleted(): void {}

  // 生命周期
  private created(): void {
    let list = Storage.get<TodoItem>(TODO_LIST)
    if (list) {
      this.actionLoadList(list)
    }
    this.changeTabBarActive()
  }

  private updated(): void {
    this.changeTabBarActive()
  }

  // 自定义方法
  private openModal(): void {
    this.show = true
  }

  private closeModal(): void {
    this.show = false
  }

  private clearCompleted(): void {
    this.actionClearCompleted()
  }

  private changeTabbar(active: number): void {
    switch (active) {
      case 0:
        this.$router.push({
          path: '/main/todo'
        })
        break
      case 1:
        this.$router.push({
          path: '/main/done'
        })
        break
      case 2:
        this.$router.push({
          path: '/main/all'
        })
        break
      default:
        break
    }
  }

  // 用户手动更改路由时，改变当前底部导航高亮
  private changeTabBarActive(): void {
    const routePath = this.$route.path
    switch (routePath) {
      case '/main/todo':
        this.active = 0
        this.nowTitle = '待办'
        break
      case '/main/done':
        this.active = 1
        this.nowTitle = '完成'
        break;
      case '/main/all':
        this.active = 2
        this.nowTitle = '全部'
        break
      default:
        this.active = 0
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 60px;
  padding-bottom: 50px;
  .navbar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    .delete.van-icon {
      color: #f44;
      font-size: 20px;
    }
  }
  .van-button.add-btn {
    position: absolute;
    right: 20px;
    bottom: 70px;
    height: 48px;
    box-shadow: 0px 0px 5px 0 rgba(46, 61, 73, 0.45);
    cursor: pointer;
    background-color: #02b3e4;
    border-color: #02b3e4;
    color: white;
  }
  .van-tabbar-item--active {
    color: #02b3e4;
  }
}
</style>