<template>
  <div class="m-indicator-spinner" :style="{width: `${size}px`, height: `${size}px`}">
    <m-icon
      name="spinner"
      class="spinner-svg"
      :style="{width: `${svgSize}px`, height: `${svgSize}px`}"
    ></m-icon>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MSpinner",
  props: {
    size: {
      type: [Number, String],
      default: 100
    }
  },
  computed: {
    svgSize() {
      return this.size + 60;
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-indicator-spinner {
  position: relative;
  overflow: hidden;
  .spinner-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
