<template>
  <div class="m-indicator-carousel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="carousel-svg"
      :viewBox="viewBox"
      :fill="fill"
      :style="{width: `${svgWidth}px`, height: `${size}px`}"
    >
      <m-carousel-item
        v-for="(value, index) in circleAnimateValues"
        :key="index"
        :data-carousel="value"
        :size="size"
        :index="index"
        :animate-values="value"
      ></m-carousel-item>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
import MCarouselItem from "./carousel-item";
export default {
  name: "MCarousel",
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
      default: 30
    }
  },
  data() {
    return {
      circleAnimateValues: [
        [1, 0.8, 0.6, 0.6, 0.6, 0.8, 1],
        [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6],
        [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6]
      ]
    };
  },
  computed:{
    svgWidth(){
      const size = this.size;
      const length = this.circleAnimateValues.length;
      return length * size  + (length - 1) * size / 2;
    },
    viewBox() {
      return `0 0 ${this.svgWidth} ${this.size}`
    }
  },
  components: {
    MCarouselItem
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-indicator-carousel {
  @include clearfix();
  .carousel-svg {
    float: left;
    overflow: visible;
  }
}
</style>
