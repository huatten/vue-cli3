<template>
  <div
    :class="['m-popup', hasMask && 'm-popup-has-mask', `m-popup-${position}`]"
    v-show="isPopupShow"
  >
    <m-overlay :showMask="hasMask && isPopupBoxShow" @taps="_onPopupMaskClick" class="m-popup-mask"></m-overlay>
    <transition
      :name="transitionName"
      @before-enter="_onPopupTransitionStart"
      @before-leave="_onPopupTransitionStart"
      @after-enter="_onPopupTransitionEnd"
      @after-leave="_onPopupTransitionEnd"
    >
      <div :class="['m-popup-box', transitionName]" v-show="isPopupBoxShow">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import { isInDocument } from "assets/js/utils/dom";
export default {
  name: "MPopup",
  props: {
    position: {
      type: String,
      default: "center"
    },
    transition: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    appendTo: {
      default: () => window.document.body //默认挂载到body
    }
  },
  data() {
    return {
      // controle popup mask & popup box
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (this.isAnimation) {
          setTimeout(() => {
            this._showPopupBox();
          }, 50);
        } else {
          this._showPopupBox();
        }
      } else {
        this._hidePopupBox();
      }
    }
  },
  computed: {
    transitionName() {
      return (
        this.transition ||
        (this.position ? `m-popup-slide-${this.position}` : "m-popup-fade")
      );
    }
  },
  mounted() {
    if (this.appendTo || !isInDocument(this.$el)) {
      this.value && this.appendTo.appendChild(this.$el);
    }
  },
  activated() {
    if (this.appendTo || !isInDocument(this.$el)) {
      this.value && this.appendTo.appendChild(this.$el);
    }
  },
  beforeDestroy() {
    this._hidePopupBox();
  },
  deactivated() {
    this._hidePopupBox();
  },
  methods: {
    _showPopupBox() {
      this.isPopupShow = true;
      this.isAnimation = true;
      //popup box show after popup show
      this.isPopupBoxShow = true;
    },
    _hidePopupBox() {
      this.isAnimation = true;
      this.isPopupBoxShow = false;
    },
    _onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit("close");
      } else {
        this.$emit("open");
      }
    },
    _onPopupTransitionEnd() {
      if (!this.isAnimation) return;
      if (!this.isPopupBoxShow) {
        this.isPopupShow = false;
        this.$emit("closed");
      } else {
        this.$emit("opened");
      }
      this.isAnimation = false;
    },
    _onPopupMaskClick() {
      if (this.maskClosable) {
        this._hidePopupBox();
        this.$emit("clickMask");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.m-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: $popup_index;
  &.m-popup-center {
    align-items: center;
    justify-content: center;
  }
  &.m-popup-top {
    flex-direction: column;
    justify-content: flex-start;
    .m-popup-box {
      width: 100%;
    }
  }
  &.m-popup-bottom {
    flex-direction: column;
    justify-content: flex-end;
    .m-popup-box {
      width: 100%;
    }
  }
  &.m-popup-left {
    justify-content: flex-start;
    .m-popup-box {
      height: 100%;
    }
  }
  &.m-popup-right {
    justify-content: flex-end;
    .m-popup-box {
      height: 100%;
    }
  }
}
.m-popup-box {
  position: relative;
  pointer-events: auto;
  z-index: $overlay_index + 1;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}
.m-popup-fade {
  &-enter,
  &-leave-to {
    opacity: 0.01;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 250ms;
  }
}
.m-popup-slide-top {
  &-enter,
  &-leave-to {
    transform: translate3d(0, -100%, 0);
  }
  &-enter-active {
    transition: 0.3s ease-out;
  }
  &-leave-active {
    transition: 0.3s ease-out;
  }
}
.m-popup-slide-bottom {
  &-enter,
  &-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  &-enter-active {
    transition: 0.3s ease-out;
  }
  &-leave-active {
    transition: 0.3s ease-out;
  }
}
.m-popup-slide-left {
  &-enter,
  &-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  &-enter-active {
    transition: 0.3s ease-out;
  }
  &-leave-active {
    transition: 0.3s ease-out;
  }
}
.m-popup-slide-right {
  &-enter,
  &-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &-enter-active {
    transition: 0.3s ease-out;
  }
  &-leave-active {
    transition: 0.3s ease-out;
  }
}
</style>
