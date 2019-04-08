<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :class="[`svg-icon-${name}`, size]"
    :style="`fill:${fill}`"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>
<script type="text/ecmascript-6">
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    fill: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
  &.xs {
    width: 20px;
    height: 20px;
  }
  &.sm {
    width: 24px;
    height: 24px;
  }
  &.md {
    width: 32px;
    height: 32px;
  }
  &.lg {
    width: 42px;
    height: 42px;
  }
}
</style>
