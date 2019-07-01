<template>
  <div class="m-loading-spinner">
    <span class="spinner" :style="spinnerStyle">
      <i v-for="(n, index) in num" :key="index" :style="_setRotate(index)"></i>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MSpinner",
  props: {
    fill: {
      type: String,
      default: "#666"
    },
    size: {
      type: [Number, String],
      default: 30
    },
    num: {
      type: [Number, String],
      default: 12
    }
  },
  data() {
    return {
      spinnerStyle: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: this.fill,
        "animation-timing-function": `steps(${this.num})`
      }
    };
  },
  methods: {
    _setRotate(n) {
      const len = this.num;
      return {
        opacity: 1 - (0.75 / 12) * n,
        transform: `rotate(${(n + 1) * (360 / len)}deg)`
      };
    }
  }
};
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.m-loading-spinner {
  .spinner {
    position: relative;
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    animation: rotate 0.8s linear infinite;
    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &::before {
        display: block;
        content: "";
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
      }
    }
  }
}
/*loading roller rotate*/
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>