<template>
  <div
    class="m-step"
    :class="[
      direction == 'horizontal' && 'horizontal',
      direction == 'vertical' && 'vertical'
    ]"
  >
    <template v-for="(step, index) of steps">
      <div class="m-step-wrap" :class="[_getStatusClass(index)]" :key="`step-${index}`">
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
      <div class="m-step-bar" :class="[`${direction}-bar`]" :key="`bar-${index}`">
        <i class="bar-line" v-if="progress[index]" :style="_barStyle(index)"></i>
      </div>
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
    },
    transition: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentLength: 0,
      progress: [],
      duration: 0.4,
      timer: null
    };
  },
  watch: {
    current(val, oldVal) {
      const currentStep = this._formatValue(val);
      const newProgress = this._sliceProgress(currentStep);
      if (this.transition) {
        const isAdd = currentStep >= oldVal;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this._doTransition(newProgress, isAdd, len => {
            console.log(newProgress, isAdd, len);
            if (
              (isAdd && len > this.currentLength) ||
              (!isAdd && len < this.currentLength)
            ) {
              this.currentLength = len;
            }
          });
        }, 100);
      } else {
        this.progress = newProgress;
        this.currentLength = currentStep;
      }
    }
  },
  computed: {
    _barStyle(index) {
      return index => {
        const transform =
          this.direction === "horizontal"
            ? `(${(this.progress[index]["len"] - 1) * 100}%, 0, 0)`
            : `(0, ${(this.progress[index]["len"] - 1) * 100}%, 0)`;
        return {
          transform: `translate3d${transform}`,
          transition: `all ${this.progress[index]["time"]}s linear`
        };
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      const currentStep = this._formatValue(this.current);
      this.currentLength = currentStep;
      this.progress = this._sliceProgress(currentStep);
    });
  },
  methods: {
    _formatValue(val) {
      if (val < 0) {
        return 0;
      } else if (val > this.steps.length - 1) {
        return this.steps.length - 1;
      } else {
        return val;
      }
    },
    _getStatusClass(index) {
      const currentLength = this.currentLength;
      let status = [];
      index < currentLength && status.push("arrived");
      index === Math.floor(currentLength) && status.push("current");
      return status.join(" ");
    },
    _sliceProgress(current) {
      return this.steps.slice(0, this.steps.length - 1).map((step, index) => {
        const offset = current - index;
        const progress = this.progress[index];
        const isNewProgress = progress === undefined;
        let len, time;
        if (offset <= 0) {
          len = 0;
        } else if (offset >= 1) {
          len = 1;
        } else {
          len = offset;
        }
        time =
          (isNewProgress ? len : Math.abs(progress.len - len)) * this.duration;
        return { len, time };
      });
    },
    _doTransition(progress, isAdd, step) {
      let currentLength = isAdd ? 0 : this.currentLength;
      const walk = index => {
        if ((index < progress.length) & (index > -1) && progress[index]) {
          if (isAdd) {
            currentLength += progress[index].len;
          } else {
            currentLength -= this.progress[index].len - progress[index].len;
          }
          setTimeout(() => {
            index += isAdd ? 1 : -1;
            step(currentLength);
            walk(index);
          }, progress[index].time * 1000);
        }
        this.$set(this.progress, index, progress[index]);
      };
      walk(isAdd ? 0 : progress.length - 1);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-step {
  display: flex;
  justify-content: space-around;
  &.horizontal {
    align-items: center;
    padding: 40px 70px 70px;
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
      .bar-line {
        width: 100%;
        height: 100%;
        background-color: #ff8200;
      }
    }
  }
  &-wrap {
    display: flex;
    position: relative;
    &.current {
      color: #ff8200;
    }
    &.arrived {
      .icon-wrap {
        color: #ff8200;
        .step-node {
          background-color: #ff8200;
        }
      }
    }
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
        line-height: 26px;
        font-size: 26px;
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
    .bar-line {
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 1s linear;
    }
  }
}
</style>