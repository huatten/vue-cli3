<template>
  <div class="m-cell" :class="{'disabled' : disabled}" @click="_onClick">
    <div class="m-cell-body" :class="[!noBorder && 'm-hairline-bottom', abstract && 'multirow' ]">
      <div class="m-cell-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="m-cell-cont">
        <h3 class="m-cell-title" v-if="title" v-text="title"></h3>
        <p class="m-cell-abstract" v-if="abstract" v-text="abstract"></p>
        <slot></slot>
      </div>
      <div class="m-cell-right" v-if="rightText || $slots.right">
        <slot name="right">{{rightText}}</slot>
        <m-icon v-if="arrow" name="next" type="font" fill="#c5cad5"></m-icon>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MCell",
  props: {
    title: {
      type: String,
      default: ""
    },
    abstract: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    arrow: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    _onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-cell {
  position: relative;
  &.disabled {
    .m-cell-cont,
    .m-cell-title {
      color: $cell-disabled-color;
    }
  }
  &-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100px;
    padding: 30px 0;
    box-sizing: border-box;
    &.multirow {
      padding: 34px 0;
    }
  }
  &-cont {
    flex: 1 1 0%;
    line-height: 1.2;
    font-size: $cell-title-font-size;
    color: $cell-title-font-color;
  }
  &-title {
    font-size: $cell-title-font-size;
    font-weight: normal;
    color: $cell-title-font-color;
  }
  &-abstract {
    font-size: $cell-abstract-font-size;
    color: $cell-abstract-font-color;
    margin-top: 10px;
  }
  &-left {
    flex-shrink: 0;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 26px;
  }
  &-right {
    flex-shrink: 0;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    font-size: $cell-right-font-size;
    color: $cell-right-font-color;
    .m-font-icon {
      font-size: 44px !important;
      position: relative;
      right: -12px;
    }
  }
}
</style>