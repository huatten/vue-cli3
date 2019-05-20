<template>
  <svg
    v-if="type === 'svg'"
    aria-hidden="true"
    class="m-icon m-svg-icon"
    :class="[`m-icon-${name}`]"
    :style="`fill:${fill}`"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`"></use>
  </svg>
  <i
    v-else-if="type === 'font'"
    class="m-icon m-font-icon"
    :style="`color:${fill}`"
    :class="[`m-icon-${name}`, name]"
    @click="$emit('click', $event)"
  ></i>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MIcon",
  props: {
    type: {
      type: String,
      default: "svg" //svg font
    },
    name: {
      type: String,
      required: true,
      default: ""
    },
    fill: {
      type: String,
      default: "currentColor"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.m-icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  fill: currentColor;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
  overflow: hidden;
  &.m-font-icon {
    font-family: "iconfont" !important;
    font-size: 46px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    letter-spacing: 0;
    speak: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:before {
      position: relative;
      z-index: 2;
    }
  }
  //font name
  &-addto {
    &:before {
      content: "\e698";
    }
  }
  &-cancel {
    &:before {
      content: "\e699";
    }
  }
  &-down {
    &:before {
      content: "\e69b";
    }
  }
  &-guarantee {
    &:before {
      content: "\e69c";
    }
  }
  &-prevent {
    &:before {
      content: "\e69d";
    }
  }
  &-close {
    &:before {
      content: "\e69e";
    }
  }
  &-history {
    &:before {
      content: "\e69f";
    }
  }
  &-restore {
    &:before {
      content: "\e6a0";
    }
  }
  &-next {
    &:before {
      content: "\e6a2";
    }
  }
  &-return {
    &:before {
      content: "\e6a4";
    }
  }
  &-problem {
    &:before {
      content: "\e6a5";
    }
  }
}
@font-face {
  font-family: "iconfont";
  src: url("iconfont.eot?t=1556174521880"); /* IE9 */
  src: url("iconfont.eot?t=1556174521880#iefix") format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,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")
      format("woff2"),
    url("iconfont.woff?t=1556174521880") format("woff"),
    url("iconfont.ttf?t=1556174521880") format("truetype"); /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
}
</style>
