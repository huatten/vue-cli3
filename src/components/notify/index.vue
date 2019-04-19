<template>
  <transition name="m-popup-slide-top">
    <div
      v-show="bShow"
      class="m-notify m-popup m-popup_top"
      :class="[`m-notify_${type}`]"
    >{{ text }}</div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MNotify",
  props: {
    bShow: {
      //是否显示此通知
      type: Boolean,
      default: false
    },
    text: {
      //消息文本
      type: String,
      default: "删除成功"
    },
    time: {
      //展示时长(ms) 为0时候不消失
      type: [String, Number],
      default: 3000
    },
    type: {
      //通知类型
      type: String,
      default: "default" // default/success/failed/warning
    },
    //回调函数
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.m-notify {
  box-sizing: border-box;
  text-align: center;
  padding: 21px 30px;
  font-size: 28px;
  color: #fff;
  line-height: 34px;
  white-space: pre-wrap;
  &.m-notify_default {
    background: rgba(0, 0, 0, 0.7);
  }
  &.m-notify_success {
    background: $color_success;
  }
  &.m-notify_failed {
    background: $color_failed;
  }
  &.m-notify_warn {
    background: $color_warn;
  }
}
/*popup*/
.m-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  overflow-y: auto;
  transition: 0.3s ease-out;
  transform: translate3d(-50%, -50%, 0);
  &.m-popup_top {
    width: 100%;
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  &.m-popup-slide-top-enter,
  &.m-popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }
}
</style>
