<template>
  <transition name="fade">
    <div
      :class="['m-noticebar', circular && 'm-noticebar-circular']"
      :style="barStyle"
      @click="_onClickBar"
      v-if="bShow"
    >
      <div :class="['noticebar-left', (!leftIcon && !leftSolt) && 'noticebar-left-empty']">
        <!-- left solt -->
        <span class="noticebar-left-icon" v-if="leftSolt">
          <slot name="left"></slot>
        </span>
        <template v-else-if="leftIcon">
          <span class="noticebar-left-icon">
            <svg-icon :name="leftIcon" :fill="color"></svg-icon>
          </span>
        </template>
      </div>
      <div class="noticebar-cont" ref="wrapper">
        <div
          :class="[(!scrollable && wrapable) && 'noticebar-cont-ellipsis', (overflow && scrollable) && 'noticebar-cont-scroll', (overflow && scrollable && !firstRound) && 'noticebar-cont-scroll-infinite']"
          :style="contentStyle"
          @animationend="_onAnimationEnd"
          @webkitAnimationEnd="_onAnimationEnd"
          ref="content"
        >
          <slot></slot>
        </div>
      </div>
      <div class="noticebar-right">
        <!-- right solt -->
        <span class="noticebar-right-icon" v-if="rightSolt">
          <slot name="right"></slot>
        </span>
        <template v-else-if="mode || closable">
          <span
            :class="['noticebar-right-icon', `right-icon-${rightIcon}`]"
            @click.stop="_onClickIcon"
          >
            <svg-icon :name="rightIcon" :fill="fill"></svg-icon>
          </span>
        </template>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MNoticebar",
  props: {
    //右边提示类型
    mode: {
      type: String,
      default: "" //close, link
    },
    //背景色
    background: {
      type: String,
      default: "#fffbe8"
    },
    //文字颜色
    color: {
      type: String,
      default: "#ff8200"
    },
    //显示时长
    time: {
      type: [String, Number],
      default: 0
    },
    //圆角展示
    circular: {
      type: Boolean,
      default: false
    },
    //是否开启文本换行，只在禁用滚动时生效
    wrapable: {
      type: Boolean,
      default: false
    },
    //内容超出滚动展示
    scrollable: {
      type: Boolean,
      default: true
    },
    //动画延迟时间 (s)
    delay: {
      type: [String, Number],
      default: 1
    },
    //动画滚动速度 (px/s)
    speed: {
      type: [String, Number],
      default: 80
    },
    //左侧 icon
    leftIcon: {
      type: String,
      default: ""
    },
    //svg-icon 填充色 暂定
    fill: {
      type: String,
      default: ""
    },
    //是否可关闭
    closable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstRound: true,
      wrapWidth: 0,
      contentWidth: 0,
      duration: 0,
      bShow: true,
      overflow: false
    };
  },
  computed: {
    rightIcon() {
      return this.mode === "link" ? "link" : "close";
    },
    barStyle() {
      return {
        color: this.color,
        background: this.background
      };
    },
    contentStyle() {
      return {
        paddingLeft: this.firstRound ? 0 : this.wrapWidth + "px",
        animationDelay: (this.firstRound ? this.delay : 0) + "s",
        animationDuration: this.duration + "s"
      };
    },
    leftSolt() {
      return !!this.$slots.left;
    },
    rightSolt() {
      return !!this.$slots.right;
    }
  },
  updated() {
    this._checkOverflow();
  },
  mounted() {
    this.time && this._hide(this.time);
    this._checkOverflow();
  },
  methods: {
    _hide(time) {
      setTimeout(() => {
        this.bShow = false;
      }, time);
    },
    _onClickBar() {
      this.$emit("click");
    },
    _onClickIcon() {
      if (this.mode === "close" || this.closable) {
        this.bShow = false;
      }
      this.$emit("close");
    },
    _checkOverflow() {
      if (!this.scrollable) return;
      const { wrapper, content } = this.$refs;
      if (!wrapper || !content) return;
      const wrapWidth = wrapper.clientWidth;
      const contentWidth = content.scrollWidth;

      if (this.scrollable && wrapWidth < contentWidth) {
        //可滚动
        this.overflow = true;
        this.wrapWidth = wrapWidth;
        this.contentWidth = contentWidth;
        this.duration = contentWidth / this.speed;
      }
    },
    _onAnimationEnd() {
      this.firstRound = false;
      this.$nextTick(() => {
        this.duration = (this.contentWidth + this.wrapWidth) / this.speed;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.m-noticebar {
  display: flex;
  box-sizing: border-box;
  min-height: 70px;
  position: relative;
  font-size: 28px;
  padding: 0 30px;
  &.m-noticebar-circular {
    border-radius: 30px;
  }
  .noticebar-left {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-right: 12px;
    &.noticebar-left-empty {
      padding-right: 0;
    }
    .noticebar-left-icon {
      display: inline-block;
      width: 34px;
      height: 34px;
    }
  }
  .noticebar-cont {
    flex: 1;
    width: fit-content;
    margin: auto;
    white-space: nowrap;
    overflow: hidden;
    line-height: 70px;
    .noticebar-cont-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .noticebar-cont-scroll {
      display: inline-block; /*important*/
      animation: noticebar-animation linear both;
      &.noticebar-cont-scroll-infinite {
        animation: noticebar-animation-infinite linear infinite both;
      }
    }
  }
  .noticebar-right {
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    .noticebar-right-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      &.right-icon-close {
        width: 24px;
        height: 24px;
      }
      &.right-icon-link {
        width: 38px;
        height: 38px;
      }
    }
  }
}

/*
 Declare two same keyframes
*/
@keyframes noticebar-animation {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes noticebar-animation-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
