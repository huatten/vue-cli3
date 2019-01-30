<template>
  <div :class="['m-content',className]">
     <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MContent",
  props: {
    className: {
      type: String,
      default: "m-content"
    }
  }
};
</script>
<style lang="scss" scoped>
.m-content {
  position: relative;
  flex: 1;
  box-flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
