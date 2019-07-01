<template>
  <div :class="['m-loading-roller', size]" :style="`color:${fill}`">
    <svg
      viewBox="25 25 50 50"
      :style="{width: `${size}px`, height: `${size}px`}"
      class="roller-svg"
    >
      <circle cx="50" cy="50" r="20" :stroke-width="width" fill="none"></circle>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MRoller",
  props: {
    fill: {
      type: String,
      default: "#fff"
    },
    width: {
      type: Number,
      default: 3
    },
    size: {
      type: [Number, String],
      default: 70
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-loading-roller {
  //roller
  z-index: 1;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  -webkit-animation: rotate 0.8s linear infinite;
  animation: rotate 0.8s linear infinite;
  animation-duration: 2s;
  .roller-svg {
    circle {
      stroke: currentColor;
      stroke-linecap: round;
      -webkit-animation: roller 1.5s ease-in-out infinite;
      animation: roller 1.5s ease-in-out infinite;
    }
  }
  /* loading roller*/
  @keyframes roller {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
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
}
</style>