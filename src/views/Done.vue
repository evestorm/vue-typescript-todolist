<template>
  <div class="done">
    <h1>已完成</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Done extends Vue {
  // @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.done {
  height: 100vh;
  overflow-y: hidden;
  box-sizing: border-box;
  padding-bottom: 50px;
}
</style>