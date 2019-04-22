<template>
  <transition name="fade">
    <div class="m-overlay" v-show="showMask" :style="backgroundColor" @touchmove.stop.prevent @click="tapMask"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { isInDocument } from "assets/js/utils/dom";
export default {
  name: "MOverlay",
  props: {
    showMask: {
      default: true,
      type: Boolean
    },
    opacity: {
      default: 0.7,
      type: Number
    },
    appendTo: {
      default: () => window.document.body //默认挂载到body
    }
  },
  computed: {
    backgroundColor() {
      return `background-color: rgba(0, 0, 0, ${this.opacity})`;
    }
  },
  mounted() {
    if (this.appendTo || !isInDocument(this.$el)) {
      this.appendTo.appendChild(this.$el);
    }
  },
  methods: {
    tapMask() {
      this.$emit("tap");
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
  z-index: 2018;
  -webkit-tap-highlight-color: transparent;
  backface-visibility: hidden;
}
</style>
