<template>
  <div class="item" :class="{'check': item.status}">
    <div class="status-box" @click="toggleStatus(item.id)">
      <div class="status">
        <van-icon name="success" class="icon"/>
      </div>
    </div>
    <div class="content">
      <h4 class="title">{{item.title}}</h4>
      <p class="desc">{{item.desc}}</p>
    </div>
    <span class="delete" @click="triggerDelete(item.id)"><van-icon name="cross"/></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { TodoItem } from '../store';

@Component
export default class Item extends Vue {
  // 父组件传递的单个todo
  @Prop({required: true}) public readonly item!: TodoItem

  @Emit()
  private toggleStatus(id: string) {
    return this.item ? !this.item.status : false
  }
  @Emit()
  private triggerDelete(id: string) {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #eee;
    @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
      -webkit-transform: scaleY(.7);
      transform: scaleY(.7);
    }
    /* 给 dpr 2.0 的设备设置 0.5 的缩放 */
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }
  .status-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .status {
      width: 20px;
      height: 20px;
      border: 1px solid #eee;
      border-radius: 50%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        visibility: hidden;
      }
    }
  }

  .content {
    box-sizing: border-box;
    padding: 20px 0;
    margin: 0 60px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      font-weight: 500;
      padding: 10px 0;
      font-size: 18px;
      background-image: linear-gradient(to bottom, rgba(172, 106, 172, 0) 50%, #ac6aac 50%, #ac6aac 60%, rgba(172, 106, 172, 0) 60%);
      background-size: 0 100%;
      background-repeat: no-repeat;
      transition: all 0.3s ease-in;
    }
    .desc {
      color: grey;
      font-size: 14px;
      line-height: 18px;
      text-align: left;
      transition: all 0.3s ease-in;
    }
  }

  .delete {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.item.check {
  .status {
    background-color: #02b3e4;
  }
  .status-box {
    .status {
      .icon {
        visibility: visible;
      }
    }
  }
  .content {
    .title {
      color: #828282;
      text-decoration: line-through;
      animation: strike 0.3s;
      @keyframes strike {
        to {
          text-decoration-color: auto;
        }
        from {
          text-decoration-color: transparent;
        }
      }
    }
    .desc {
      color: #d8d8d8;
    }
  }
}
</style>
