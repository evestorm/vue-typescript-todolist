<template>
  <van-popup class="popup" round position="bottom"
  v-model="selfShow"
  @close="triggerClose"
  :style="{ height: '34%' }">
    <h3 class="header">添加任务</h3>
    <van-cell-group>
      <van-field
        v-model="item.title"
        required
        clearable
        label="标题"
        placeholder="请输入标题"
      />
      <van-field
        v-model="item.desc"
        type="textarea"
        label="描述"
        placeholder="请输入具体描述"
        required
      />
    </van-cell-group>
    <van-button class="add-btn" square type="primary" @click="addTodo">创建</van-button>
  </van-popup>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { getRandomStr } from '../utils/helper';
import { TodoItem } from '../store';
import Storage from '../utils/storage';
import { Getter, Action } from 'vuex-class';

@Component
export default class Popup extends Vue {
  @Prop(Boolean) private show: boolean = false
  private selfShow: boolean = false
  private item: TodoItem = {
    id: '',
    title: '',
    desc: '',
    status: false,
  }

  @Emit()
  private triggerClose() {/** */}

  @Watch('show')
  private onShowChange(val: boolean, oldVal: boolean) {
    this.selfShow = val
  }

  @Action('addItem') private actionAddItem(data: TodoItem): void {/**/}

  private addTodo() {
    this.item.id = getRandomStr(10)
    this.actionAddItem(this.item)
    this.item = {
      id: '',
      title: '',
      desc: '',
      status: false,
    }
    this.triggerClose()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.popup {
  box-sizing: border-box;
  padding: 0 20px;
  .header {
    margin: 20px 0;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  .add-btn {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
