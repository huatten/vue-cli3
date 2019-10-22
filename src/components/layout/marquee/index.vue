<template>
  <div class="m-marquee" :style="{height: `${height}px`}">
    <div class="m-marquee-cont" :style="transition" :class="`m-marquee-align--${align}`">
      <div class="m-marquee-item" v-html="lastItem" v-if="total>1"></div>
      <slot></slot>
      <div class="m-marquee-item" v-html="firstItem"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MMarquee",
  props: {
    height: {
      type: [String, Number],
      default: 100
    },
    align: {
      type: String,
      default: "left"
    },
    speed: {
      type: [String, Number],
      default: 500
    },
    duration: {
      type: [String, Number],
      default: 2500
    },
    direction: {
      type: String,
      default: "up"
    }
  },
  data() {
    return {
      timer: null,
      index: 1,
      total: 0,
      firstItem: "",
      lastItem: "",
      transition: {
        transform: 0,
        transitionDuration: 0
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.$_init();
      });
    }, 100);
  },
  beforeDestroy() {
    this._destroy();
  },
  methods: {
    $_init() {
      this._destroy();
      this.items = this.$children.filter(
        item => item.$options.name === "MMarqueeItem"
      );
      this.total = this.items.length;
      if (this.total <= 1) return; //list小于1条时不滚动
      this.firstItem = this.items[0].$el.innerHTML;
      this.lastItem = this.items[this.total - 1].$el.innerHTML;
      this._setTranslate(0, -this.height);
      this._onScroll();
    },
    _onScroll() {
      this.timer = setInterval(() => {
        if (this.direction === "up") {
          this.index++;
          this._setTranslate(this.speed, -(this.index * this.height));
          if (this.index >= this.total) {
            this.index = 0;
            setTimeout(() => {
              this._setTranslate(0, 0);
            }, this.speed);
          }
        } else {
          this.index--;
          this._setTranslate(this.speed, -(this.index * this.height));
          if (this.index <= 0) {
            this.index = this.total;
            setTimeout(() => {
              this._setTranslate(0, -this.total * this.height);
            }, this.speed);
          }
        }
      }, this.duration);
    },
    _setTranslate(speed, translate) {
      this.transition.transitionDuration = `${speed}ms`;
      this.transition.transform = `translate3d(0, ${translate}px, 0)`;
    },
    _destroy() {
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-marquee {
  width: 100%;
  overflow: hidden;
  background: #fff;
  &-cont {
    height: inherit;
  }
  &-align--left {
    justify-content: flex-start;
  }
  &-align--center {
    justify-content: center;
  }
  &-align--right {
    justify-content: flex-end;
  }
  &-item {
    display: flex;
    align-items: center;
    height: inherit;
    justify-content: inherit;
    color: inherit;
    font-size: 30px;
    padding: 0 20px;
  }
}
</style>
