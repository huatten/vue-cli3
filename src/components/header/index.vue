<template>
  <header class="m-header">
    <div class="m-header-cont">
      <span class="m-back"></span>
      <h5 class="m-text">首页</h5>
      <span class="m-icon"></span>
    </div>
  </header>
</template>
<script type="text/ecmascript-6">
export default {
  name: "m-header",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.m-header {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}
.m-header-cont {
  position: relative;
  width: 100%;
  height: 92px;
  text-align: center;
  line-height: 92px;
  color: $color_333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  .m-back {
    width: 90px;
    height: 92px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: url("./imgage/head_back.png") no-repeat center center;
    background-size: 56px auto;
  }
  .m-text {
    font-weight: normal;
    font-size: 32px;
  }
  .m-icon {
    width: 90px;
    height: 92px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
