<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="mine">
        <m-tabbar :options="options" @callback="callback"></m-tabbar>
        <m-noticebar>我是默认的通知栏，什么都不传。</m-noticebar>

        <m-noticebar leftIcon="notice" mode="close" @close="toast('点击了关闭')">
          我是带有图标的的通知栏，可关闭。
        </m-noticebar>

        <m-noticebar leftIcon="notice" mode="close" time="5000">
          我是带有图标的的通知栏，5s以后消失。
        </m-noticebar>
        
        <m-noticebar leftIcon="notice" mode="link">
         我是带有图标的的通知栏，文字太长了，我现在要滚动才行，同时可点击查看详情。
        </m-noticebar>

        <m-noticebar leftIcon="notice" mode="link" :scrollable="false" wrapable>
         我是带有图标的的通知栏，文字太长了，需要隐藏了才行。
        </m-noticebar>

        <m-noticebar leftIcon="safe" mode="link" background="rgba(89,158,248,.08)" color="#2f86f6" speed="120">
         我是带图标、可改变外观、可滚动、可关闭的的通知栏，1秒以后开始滚了，滚得还快！
        </m-noticebar>
        <m-noticebar background="rgba(89,158,248,.08)" color="#2f86f6" speed="200">
           <svg-icon name="safe" slot="left"></svg-icon>
         我是使用插槽自定义的带图标的通知栏，多来点文字滚滚
          <svg-icon name="close" slot="right"></svg-icon>
        </m-noticebar>

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
        width: "114px",
        index: 0
      }
    };
  },
  mounted() {
    this.getRes();
  },
  methods: {
    callback(event, index, val, id) {
      console.log(val, id);
    },
    toast(msg){
      this.$toast(msg)
    },
    getRes() {
      this.$http({
        url: "openAccountResult",
        method: "POST",
        callback: e => {
          console.log(e);
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mine {
  div {
    margin-top: 10px;
  }
}
</style>
