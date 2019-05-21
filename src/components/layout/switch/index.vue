<template>
  <div
    class="m-switch"
    :class="[open && 'open', disabled && 'disabled']"
    :style="`font-size:${size}px`"
    @click="_change($event)"
  >
    <div class="m-switch-node">
      <div class="m-switch-loading" v-if="loading">
        <m-indicator fill="rgb(201, 201, 201)" :size="loadingSize"></m-indicator>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 75
    },
    loadingSize:{
      type: [Number, String],
      default: 40
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: this.value
    };
  },
  watch: {
    open(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    _change(e) {
      if (this.disabled || this.loading) return;
      this.open = !this.open;
      this.$emit("change", e);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-switch {
  box-sizing: content-box;
  position: relative;
  display: inline-block;
  width: 2.02em;
  height: 1.02em;
  border-radius: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: $switch-background-color;
  transition: background-color 0.3s;
  &-node {
    position: absolute;
    top: 0em;
    left: 0.02em;
    border-radius: 100%;
    width: 1em;
    height: 1em;
    z-index: 1;
    background-color: $switch-node-background-color;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
      0 3px 3px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
  }
  &-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.open {
    background-color: $switch-active-background-color;
    .m-switch-node {
      transform: translateX(0.98em);
    }
  }
  &.disabled {
    opacity: 0.4;
  }
}
</style>