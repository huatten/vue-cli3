<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="mine">
        <m-tabbar :options="options"></m-tabbar>
      </div>
    </m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "minePage",
  data() {
    return {
      hasBack: false,
      titleTxt: "我的",
      options: {
        container: "mine-tab",
        slideData: [
          "热卖",
          "水果",
          "乳品",
          "零食",
          "肉蛋",
          "蔬菜",
          "熟食",
          "水产",
          "粮油",
          "火锅",
          "酒饮"
        ],
        slideId: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        width: "120px",
        index: 1
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.mine {
}
</style>
