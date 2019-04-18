<template>
  <svg
    aria-hidden="true"
    :class="[`svg-icon-${name}`, 'svg-icon']"
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
  width: 100%;
  height: 100%;
}
</style>
