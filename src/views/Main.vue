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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  private active: number = 0
  private nowPathName: string | undefined
  private nowTitle: string = '待办'

  // 生命周期
  private created(): void {
    this.changeTabBarActive()
  }

  // 自定义方法
  private updated(): void {
    this.changeTabBarActive()
  }
  private changeTabbar(active: number): void {
    switch (active) {
      case 0:
        this.$router.push({
          name: 'todo',
        })
        break
      case 1:
        this.$router.push({
          name: 'done',
        })
        break
      case 2:
        this.$router.push({
          name: 'all',
        })
        break
      default:
        break
    }
  }

  // 改变当前底部导航高亮
  private changeTabBarActive(): void {
    this.nowPathName = this.$route.name
    switch (this.nowPathName) {
      case 'todo':
        this.active = 0
        break
      case 'done':
        this.active = 1
        break;
      case 'all':
        this.active = 2
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
  height: 100vh;
  box-sizing: border-box;
  padding-top: 60px;
  padding-bottom: 50px;
}
.navbar {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
</style>