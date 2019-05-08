<template>
  <transition name="fade">
    <div class="m-loading" @touchmove.prevent v-show="bShow">
      <div class="loading-wrap">
        <div class="loading-icon">
          <m-indicator size="lg"></m-indicator>
        </div>
        <div class="loading-text">{{ loadTxt }}</div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MLoading",
  data() {
    return {
      bShow: false,
      loadTxt: "加载中..."
    };
  },
  beforeDestroy() {
    this.bShow = false;
  }
};
</script>
<style lang="scss" scoped>
.m-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2018;
  background-color: transparent;
  backface-visibility: hidden;
  .loading-wrap {
    width: 180px;
    padding: 24px;
    height: 170px;
    line-height: 34px;
    background-color: rgba(50, 50, 51, 0.88);
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 2019;
    color: #fff;
    font-size: 28px;
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    flex-direction: column;
    box-sizing: content-box;
    white-space: pre-wrap;
  }
  .loading-icon {
    width: 70px;
    height: 70px;
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
    margin: 16px 0;
  }
  .loading-text {
    padding-top: 8px;
  }
}
</style>
