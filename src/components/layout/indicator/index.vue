<template>
  <div class="m-indicator">
    <div class="m-indicator-cont">
      <div class="m-indicator-icon">
        <div :class="[`m-indicator-${type}`,size]" :style="`color:${fill}`">
          <svg :viewBox="`25 25 50 50`" :class="type">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </div>
      </div>
      <div class="m-indicator-text" v-if="text" :style="`color:${color}`">{{text}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MIndicator",
  props: {
    type: {
      type: String,
      default: "roller"
    },
    text: {
      type: String,
      default: ""
    },
    fill: {
      type: String,
      default: "#fff"
    },
    size: {
      type: String,
      default: "sm"
    },
    color: {
      type: String,
      default: "#666f83"
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-indicator {
  &-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-icon {
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
  }
  &-text {
    font-size: 28px;
    margin-left: 14px;
  }
  &-roller {
    z-index: -1;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    -webkit-animation: rotate 0.8s linear infinite;
    animation: rotate 0.8s linear infinite;
    animation-duration: 2s;
    &.sm {
      width: 48px;
      height: 48px;
    }
    &.md {
      width: 64px;
      height: 64px;
    }
    &.lg {
      width: 72px;
      height: 72px;
    }
    .roller {
      width: 100%;
      height: 100%;
      circle {
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
        -webkit-animation: circular 1.5s ease-in-out infinite;
        animation: circular 1.5s ease-in-out infinite;
      }
    }
  }
}
</style>
