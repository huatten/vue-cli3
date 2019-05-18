<template>
  <m-transition name="m-fade">
    <div
      class="m-overlay"
      v-show="showMask"
      :style="backgroundColor"
      @touchmove.stop.prevent
      @click="tapMask"
    ></div>
  </m-transition>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MOverlay",
  props: {
    showMask: {
      default: true,
      type: Boolean
    },
    opacity: {
      default: 0.65,
      type: Number
    }
  },
  computed: {
    backgroundColor() {
      return `background-color: rgba(0, 0, 0, ${this.opacity})`;
    }
  },
  methods: {
    tapMask() {
      this.$emit("taps");
    }
  }
};
</script>
<style lang="scss" scoped>
.m-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: $overlay_index;
  -webkit-tap-highlight-color: transparent;
  backface-visibility: hidden;
}
</style>
