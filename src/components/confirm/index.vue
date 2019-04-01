<template>
  <transition name="confirm-fade">
    <div class="m-confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wraper">
        <div class="confirm-cont">
          <div class="title" v-if="title">{{title}}</div>
          <p :class="[title ? 'has-title' : '','text']" v-html="text"></p>
          <div class="oprate m-hairline-top">
            <div
              class="cancel m-hairline-right"
              v-if="cancelBtnText"
              @click="cancel"
            >{{cancelBtnText}}</div>
            <div class="confirm" v-if="confirmBtnText" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { addClass, removeClass } from "assets/js/utils/dom";
export default {
  name: "MConfirm",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    text: {
      type: String,
      default: "您确定要取消吗？"
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    appendTo: {
      default: () => window.document.body //默认挂载到body
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  mounted() {
    if (this.appendTo) {
      this.appendTo.appendChild(this.$el);
    }
  },
  beforeDestroy() {
    if (this.appendTo) {
      this.appendTo.removeChild(this.$el);
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      addClass(document.body, "body-overflow-hidden");
    },
    hide() {
      this.showFlag = false;
      removeClass(document.body, "body-overflow-hidden");
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    confirm() {
      this.hide();
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.m-confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.7);
  backface-visibility: hidden;
  &.confirm-fade-enter-active {
    animation: confirm-fadeIn 0.3s;
  }
  .confirm-wraper {
    width: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 999;
    overflow: hidden;
  }
  .confirm-cont {
    width: 100%;
    border-radius: 10px;
    background: #fff;
    animation: confirm-zoom 0.3s;
    .title {
      font-size: 32px;
      color: $color_333;
      font-weight: 500;
      padding-top: 35px;
      text-align: center;
    }
    .text {
      padding: 50px 30px;
      line-height: 22px;
      text-align: center;
      line-height: 1.5;
      max-height: 60vh;
      font-size: 30px;
      color: #7d7e80;
      &.has-title {
        padding-top: 30px;
      }
    }
  }
  .oprate {
    display: flex;
    user-select: none;
    overflow: hidden;
    position: relative;
    &::before {
      content: "";
      pointer-events: none;
      box-sizing: border-box;
      position: absolute;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      transform: scale(0.5);
      border: 0 solid $color_border;
    }
    div {
      position: relative;
      display: inline-flex;
      flex: 1;
      height: 90px;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: $color_333;
      box-sizing: border-box;
      &.confirm {
        color: $color_orange;
      }
      &.cancel {
        &::before {
          content: "";
          pointer-events: none;
          box-sizing: border-box;
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          transform: scale(0.5);
          border: 0 solid $color_border;
        }
      }
    }
  }
}
@keyframes confirm-fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>
