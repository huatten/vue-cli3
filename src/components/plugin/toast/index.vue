<template>
  <transition name="fade">
    <div class="m-toast" v-show="bShow">
      <transition :name="translate">
        <div :class="['toast-wrap', position, iconShow ? 'toast-wrap__icon' : '']" v-show="bShow">
          <div class="toast-icon" v-show="iconShow">
            <span :class="iconClass">
              <m-icon :name="iconClass"></m-icon>
            </span>
          </div>
          <div class="toast-text">{{ text }}</div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MToast",
  data() {
    return {};
  },
  props: {
    bShow: {
      // 是否显示此toast
      type: Boolean,
      default: false
    },
    text: {
      // 提醒文字
      type: String,
      default: "我是toast"
    },
    position: {
      // 提醒容器位置
      type: String,
      default: "middle"
    },
    iconClass: {
      // 容器icon
      type: String,
      default: ""
    },
    time: {
      // 显示时间
      type: Number,
      default: 2500
    },
    callback: {
      type: Function
    }
  },
  computed: {
    iconShow() {
      const iconClass = this.iconClass;
      const ICON = ["success", "failed ", "warn"];
      return ICON.includes(iconClass);
    },
    translate() {
      return this.position === "top"
        ? "translate-top"
        : this.position === "middle"
        ? "translate-middle"
        : this.position === "bottom"
        ? "translate-bottom"
        : "";
    }
  }
};
</script>
<style lang="scss" scoped>
.m-toast {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2018;
  background-color: transparent;
  backface-visibility: hidden;
  .toast-wrap {
    width: fit-content;
    max-width: 70%;
    min-width: 200px;
    padding: 20px 22px;
    line-height: 36px;
    background-color: rgba(50, 50, 51, 0.88);
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 2019;
    color: #fff;
    font-size: 28px;
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    flex-direction: column;
    box-sizing: content-box;
    white-space: pre-wrap;
    &.toast-wrap__icon {
      min-width: 170px;
      max-width: 240px;
      padding: 32px 28px;
      .toast-text {
        padding-top: 12px;
      }
    }
    &.top {
      top: 10%;
      bottom: auto;
    }
    &.middle {
      transform: translate3d(-50%, -50%, 0);
    }
    &.bottom {
      top: auto;
      bottom: 10%;
    }
  }
  .toast-icon {
    width: 70px;
    height: 70px;
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
    margin: 16px 0;
    span {
      display: inline-block;
      width: 68px;
      height: 68px;
    }
  }
}
.translate-top-enter-active,
.translate-top-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-top-enter,
.translate-top-leave-active {
  top: -10% !important;
  opacity: 0;
}
.translate-middle-enter-active,
.translate-middle-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-middle-enter,
.translate-middle-leave-active {
  transform: translate3d(0, 80%, 0);
  opacity: 0;
}
.translate-bottom-enter-active,
.translate-bottom-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-bottom-enter,
.translate-bottom-leave-active {
  bottom: -10% !important;
  opacity: 0;
}
</style>
