<template>
  <transition name="fade">
    <div class="m-loading" @touchmove.prevent v-show="bShow">
      <div class="loading-wrap">
        <div class="loading-icon">
          <span class="loading-spinner">
            <svg viewBox="25 25 50 50" class="loading-spinner-circular">
              <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </span>
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
  methods: {}
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
  .loading-spinner {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    -webkit-animation: rotate 0.8s linear infinite;
    animation: rotate 0.8s linear infinite;
    animation-duration: 2s;
  }
  .loading-spinner-circular {
    width: 100%;
    height: 100%;
    circle {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      -webkit-animation: circular 1.5s ease-in-out infinite;
      animation: circular 1.5s ease-in-out infinite;
    }
  }
  .loading-text {
    padding-top: 8px;
  }
}
</style>
