<template>
  <div class="m-indicator" :class="type">
    <div class="m-indicator-cont">
      <div class="m-indicator-icon">
        <template v-if="type === 'roller'">
          <m-roller :size="size" :fill="fill" :width="width"></m-roller>
        </template>
        <template v-if="type === 'carousel'">
          <m-carousel :size="size" :fill="fill"></m-carousel>
        </template>
        <template v-if="type === 'spinner'">
          <m-spinner :size="size"></m-spinner>
        </template>

      </div>
      <div class="m-indicator-text" v-if="text" :style="`color:${color}`">{{text}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MRoller from "./roller";
import MCarousel from "./carousel";
import MSpinner from "./spinner";
export default {
  name: "MIndicator",
  props: {
    type: {
      type: String,
      default: "roller"
    },
    text: {
      type: String,
      default: ""
    },
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
      default: 70
    },
    color: {
      type: String,
      default: "#666f83"
    }
  },
  data() {
    return {};
  },
  components: {
    MRoller,
    MCarousel,
    MSpinner
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-indicator {
  &-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-icon {
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
  }
  &-text {
    font-size: 28px;
    margin-left: 14px;
  }
}
</style>
