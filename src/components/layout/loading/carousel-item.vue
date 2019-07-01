<template>
  <circle :cx="cx" :cy="size/2" :r="size/2">
    <animate
      attributeName="fill-opacity"
      attributeType="XML"
      begin="0s"
      dur="1s"
      :values="opacityValues"
      calcMode="linear"
      repeatCount="indefinite"
    ></animate>
    <animate
      attributeName="r"
      attributeType="XML"
      begin="0s"
      dur="1s"
      :values="sizeValues"
      calcMode="linear"
      repeatCount="indefinite"
    ></animate>
  </circle>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MCarouselItem",
  props: {
    size: {
      type: [Number, String],
      default: 30
    },
    index: {
      type: Number,
      default: 0
    },
    animateValues: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    cx() {
      return this.index * this.size * 1.5 + this.size / 2;
    },
    opacityValues() {
      return this.animateValues.join(";");
    },
    sizeValues() {
      return this.animateValues
        .map(val => {
          return (val * this.size) / 2;
        })
        .join(";");
    }
  }
};
</script>