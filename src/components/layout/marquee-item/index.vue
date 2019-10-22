<template>
  <div class="m-marquee-item" @click="itemClick">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MMarqueeItem",
  methods: {
    itemClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
