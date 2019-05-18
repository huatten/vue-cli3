<script type="text/ecmascript-6">
/**
 * https://www.jianshu.com/p/0645bc9033a5
 */
export default {
  name: "MTransition",
  functional: true,
  render(h, context) {
    return h('transition', context.data, context.children)
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
/*fade*/
.m-fade {
  &-enter,
  &-leave-to {
    opacity: 0.01;
  }
  &-enter-active {
    transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave-active {
    transition: opacity 0.25s linear;
  }
}
/*m-fade-up*/
.m-fade-up{
  &-enter,
  &-leave-to{
    opacity: 0.01;
    transform: translate3d(0, 20%, 0)
  }
  &-enter-active{
    transition: all 0.3s cubic-bezier(0.215, 0.610, 0.355, 1);
  }
  &-leave-active{
    transition: all 0.25s linear;
  }
}
/*zoom*/
.m-zoom {
  &-enter,
  &-leave-to {
    opacity: 0.01;
    transform: scale(0.75);
  }
  &-enter-active {
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &-leave-active {
    transition: all 0.25s linear;
  }
}
/*slide-bottom*/
.m-slide-bottom {
  &-enter,
  &-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  &-enter-active {
    transition: transform 0.3s ease-out;
  }
  &-leave-active {
    transition: transform 0.25s ease-out;
  }
}
/*slide-top*/
.m-slide-top {
  &-enter,
  &-leave-to {
    transform: translate3d(0, -100%, 0);
  }
  &-enter-active {
    transition: transform 0.3s ease-out;
  }
  &-leave-active {
    transition: transform 0.25s ease-out;
  }
}
/*slide-left*/
.m-slide-left {
  &-enter,
  &-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  &-enter-active {
    transition: transform 0.3s ease-out;
  }
  &-leave-active {
    transition: transform 0.25s ease-out;
  }
}
/*slide-right*/
.m-slide-right {
  &-enter,
  &-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &-enter-active {
    transition: transform 0.3s ease-out;
  }
  &-leave-active {
    transition: transform 0.25s ease-out;
  }
}
</style>