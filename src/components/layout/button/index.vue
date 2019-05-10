<template>
  <button
    class="m-button"
    :class="[
      `m-button-${type}`, 
      (invalid || disabled) ? 'm-button-disabled' : 'active',
      inline ? 'm-button-inline' : 'm-button-block',
      plain && 'm-button-plain',
      round && 'm-button-round',
      `m-button-${size}`
    ]"
    :type="nativeType"
    :disabled="invalid || disabled"
    v-on="$listeners"
  >
    <template v-if="ripple">
      <canvas class="ripple" @click="_ripple"></canvas>
    </template>
    <div class="m-button-cont">
      <template v-if="iconName">
        <div class="m-button-icon">
          <m-icon :name="iconName" :type="iconType"></m-icon>
        </div>
      </template>
      <template v-if="loading">
        <div class="m-button-icon">
          <m-indicator :type="loadingType" :size="loadingSize"></m-indicator>
        </div>
      </template>
      <p class="m-button-text">
        <slot></slot>
      </p>
    </div>
  </button>
</template>

<script type="text/ecmascript-6">
import { getStyle, getStyleNumber } from "assets/js/utils/dom";
export default {
  name: "MButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    inline: {
      type: Boolean,
      default: true
    },
    plain: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal"
    },
    round: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: "button"
    },
    invalid: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: ""
    },
    iconType: {
      type: String,
      default: "svg" //svg、font
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingType: {
      type: String,
      default: "roller"
    },
    loadingSize: {
      type: [Number, String],
      default: 70
    },
    ripple: {
      type: Boolean,
      default: true
    },
    speed: {
      type: [Number, String],
      default: 11
    },
    opacity: {
      type: [Number, String],
      default: 0.3
    }
  },
  data() {
    return {
      color: "",
      radius: 0,
      oCanvas: null,
      context: null,
      initialized: false,
      speedOpacity: 0,
      timer: null,
      origin: {
        x: "",
        y: ""
      }
    };
  },
  methods: {
    $_init(el) {
      const oBtn = el.parentElement;
      // 透明度的速度
      const w = getStyleNumber(oBtn, "width");
      this.speedOpacity = (this.speed / w) * this.opacity;
      this.color = getStyle(el.parentElement, "color");

      // 透明度的速度
      this.speedOpacity = (this.speed / w) * this.opacity;
      // canvas 宽和高
      el.width = w;
      el.height = getStyleNumber(oBtn, "height");
      this.context = el.getContext("2d");
    },
    _ripple(event) {
      // 清除上次没有执行的动画
      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
      }
      this.el = event.target;
      // 执行初始化
      if (!this.initialized) {
        this.initialized = true;
        this.$_init(this.el);
      }
      this.radius = 0;
      // 点击坐标原点
      this.origin.x = event.offsetX;
      this.origin.y = event.offsetY;
      this.context.clearRect(0, 0, this.el.width, this.el.height);
      this.el.style.opacity = this.opacity;
      this._draw();
    },
    _draw() {
      this.context.beginPath();
      // 绘制波纹
      this.context.arc(
        this.origin.x,
        this.origin.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      this.context.fillStyle = this.color;
      this.context.fill();
      // 定义下次的绘制半径和透明度
      this.radius += this.speed;
      this.el.style.opacity -= this.speedOpacity;
      // 通过判断半径小于元素宽度或者还有透明度，不断绘制圆形
      if (this.radius < this.el.width || this.el.style.opacity > 0) {
        this.timer = window.requestAnimationFrame(this._draw);
      } else {
        // 清除画布
        this.context.clearRect(0, 0, this.el.width, this.el.height);
        this.el.style.opacity = 0;
      }
    }
  },
  destroyed() {
    // 清除上次没有执行的动画
    if (this.timer) {
      window.cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-button {
  position: relative;
  display: inline-block;
  padding: 0;
  height: $button-default-height;
  line-height: $button-default-line-height;
  border-radius: $button-default-border-radius;
  font-size: $button-default-font-size;
  text-align: center;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  &::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: $color_000;
    background-color: $color_000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  &:active {
    &::before {
      opacity: 0.1;
    }
  }
  &-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
    white-space: nowrap;
    .m-button-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .m-button-text {
      text-align: center;
      font-size: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    }
  }
  &-disabled {
    opacity: $button-disabled-opacity;
  }
  &-loading,
  &-disabled {
    &::before {
      display: none;
    }
    .ripple{
      display: none;
    }
  }
  &-block {
    display: block;
    width: 100%;
  }
  //type
  &-default {
    color: $button-default-color;
    background-color: $button-default-background-color;
    border: 1px solid $button-default-border-color;
  }
  &-primary {
    color: $button-primary-color;
    background-color: $button-primary-background-color;
    border: 1px solid $button-primary-border-color;
  }
  &-info {
    color: $button-info-color;
    background-color: $button-info-background-color;
    border: 1px solid $button-info-border-color;
  }
  &-danger {
    color: $button-danger-color;
    background-color: $button-danger-background-color;
    border: 1px solid $button-danger-border-color;
  }
  &-warning {
    color: $button-warning-color;
    background-color: $button-warning-background-color;
    border: 1px solid $button-warning-border-color;
  }
  //plain
  &-plain {
    background: $button-plain-background-color;
    &.m-button-primary {
      color: $button-primary-background-color;
    }
    &.m-button-info {
      color: $button-info-background-color;
    }
    &.m-button-danger {
      color: $button-danger-background-color;
    }
    &.m-button-warning {
      color: $button-warning-background-color;
    }
  }
  //round
  &-round {
    border-radius: $button-round-border-radius;
  }
  //size
  &-small {
    min-width: $button-small-min-width;
    height: $button-small-height;
    line-height: $button-small-height;
    padding: 0 10px;
    font-size: $button-small-font-size;
  }
  &-normal {
    padding: 0 25px;
    font-size: 28px;
  }
  &-large {
    width: 100%;
    height: $button-large-height;
    line-height: $button-large-height;
    font-size: $button-large-font-size;
  }
}
//ripple
.ripple {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>