<template>
  <div class="all">
    <h1>所有</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class All extends Vue {
  // @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.all {
  height: 100vh;
  overflow-y: hidden;
  box-sizing: border-box;
  padding-bottom: 50px;
}
</style>