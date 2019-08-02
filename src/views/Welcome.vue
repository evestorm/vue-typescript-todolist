<template>
  <div class="welcome">
    <div class="main">
      <div class="main-logo">
        <img alt="logo" src="../assets/logo.png">
        <img alt="todo-logo" src="../assets/todo.png">
      </div>
    </div>
    <div class="bottom">
      <button @click="gotoHome">开始</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Welcome extends Vue {
  @Prop() private msg!: string;

  private gotoHome(e: any): void {
    this.$router.push({path: '/main/todo'});
  }
}
</script>

<style scoped lang="scss">
.welcome {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .main-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        width: 200px;
      }
      img:last-of-type {
        margin-top: 20px;
      }
      flex: 3;
      @media screen and (max-width: 460px) {
        img {
          width: 33.333333%;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    button {
      width: 100px;
      height: 46px;
      -webkit-appearance: none;
      border: 2px solid #02b3e4;
      border-radius: 20px;
      color: #02b3e4;
      font-size: 20px;
      background-color: transparent;
    }
  }
}
</style>
