<template>
  <div
    class="m-step"
    :class="[
      direction == 'horizontal' && 'horizontal',
      direction == 'vertical' && 'vertical'
    ]"
  >
    <template v-for="(step, index) of steps">
      <div class="m-step-wrap" :key="`step-${index}`">
        <div class="icon-wrap">
          <template v-if="index == currentLength">
            <template v-if="$scopedSlots.icon">
              <slot name="icon" :index="index" :current-index="currentLength"></slot>
            </template>
            <div class="icon" v-else>
              <m-icon name="done"></m-icon>
            </div>
          </template>
          <template v-else>
            <div class="step-node">
              <div class="step-node-icon"></div>
            </div>
          </template>
        </div>
        <div class="text-wrap">
          <div class="name">{{step.name}}</div>
        </div>
      </div>
      <div class="m-step-bar" :class="[`${direction}-bar`]" :key="`bar-${index}`"></div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MStep",
  props: {
    steps: {
      type: Array,
      default() {
        return [];
      }
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    current: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0;
      }
    }
  },
  data() {
    return {
      currentLength: 0
    };
  },
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-step {
  display: flex;
  justify-content: space-around;
  &.horizontal {
    align-items: center;
    padding: 40px 80px 80px;
    .m-step-wrap {
      margin: 0 5px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .text-wrap {
        top: 100%;
        text-align: center;
        padding-top: 20px;
      }
    }
    .m-step-bar {
      flex: 1;
      height: 1px;
    }
  }
  &-wrap {
    display: flex;
    position: relative;
    .icon-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 36px;
      min-height: 36px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon {
        width: 36px;
        height: 36px;
      }
      .step-node {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ccc;
      }
    }
    .text-wrap {
      position: absolute;
      .name {
        white-space: nowrap;
      }
    }
  }
  &-bar {
    position: relative;
    background: #ccc;
    overflow: hidden;
    &:last-of-type.horizontal-bar {
      display: none;
    }
  }
}
</style>