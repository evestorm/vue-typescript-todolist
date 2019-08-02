<template>
  <div class="container">
    <Item v-for="(item, id) in todoList" :key="id" :item="item" @toggle-status="changeStatus" @trigger-delete="handleDelete"></Item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Item from '../components/item.vue';
import { TodoItem } from '../store';
import Storage from '../utils/storage';
import { Getter, Action } from 'vuex-class';

@Component({
  components: { Item },
  computed: {
    todoList() {
      return this.getterList(this.status)
    }
  }
})
export default class TodoListView extends Vue {
  @Prop(Boolean) private status?: boolean

  @Getter('getList') getterList?: TodoItem[]
  @Action('updateItem') private actionUpdateItem(id: string): void {}
  @Action('deleteItem') private actionDeleteItem(id: string): void {}

  // 自定义方法
  private changeStatus(status: boolean, id: string) {
    this.actionUpdateItem(id)
  }
  private handleDelete(id: string) {
    this.actionDeleteItem(id)
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>