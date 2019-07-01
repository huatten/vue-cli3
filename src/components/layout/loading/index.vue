<template>
  <div
    :class="[
      'm-loading', 
      `m-loading--${type}`, 
      vertical && 'm-loading--vertical', 
      fullScreen && 'm-loading--fullScreen'
    ]"
  >
    <m-overlay opacity="0.5" v-if="fullScreen && hasMask"></m-overlay>
    <div class="m-loading__cont">
      <div class="m-loading__icon">
        <template v-if="type === 'roller'">
          <m-roller :size="size" :fill="fill" :width="width"></m-roller>
        </template>
        <template v-if="type === 'carousel'">
          <m-carousel :size="size" :fill="fill"></m-carousel>
        </template>
        <template v-if="type === 'spinner'">
          <m-spinner :size="size" :fill="fill"></m-spinner>
        </template>
      </div>
      <div class="m-loading__text" v-if="text" :style="`color:${color}`">{{text}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MRoller from "./roller";
import MCarousel from "./carousel";
import MSpinner from "./spinner";
export default {
  name: "MLoading",
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
      type: [Number, String],
      default: 3
    },
    size: {
      type: [Number, String],
      default: 30
    },
    color: {
      type: String,
      default: "#666f83"
    },
    vertical: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    hasMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  components: {
    [MRoller.name]: MRoller,
    [MCarousel.name]: MCarousel,
    [MSpinner.name]: MSpinner
  }
};
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.mw-loading {
  &__cont {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__icon {
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
  }
  &__text {
    display: inline-block;
    font-size: 14px;
    margin-left: 12px;
  }
  &--vertical {
    .mw-loading__cont {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .mw-loading__text {
      margin: 8px 0 0;
    }
  }
  &--fullScreen {
    .mw-loading__cont {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2019;
      padding: 22px 30px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
