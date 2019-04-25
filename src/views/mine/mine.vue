<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="mine">
        <div class="demo">
          <m-tabbar :options="options" @callback="callback"></m-tabbar>
        </div>
        <div class="demo">
          <m-noticebar>我是默认的通知栏，什么都不传。</m-noticebar>
        </div>
        <div class="demo">
          <m-noticebar leftIcon="history" iconType="font" mode="close" @close="toast('点击了关闭')">我是带有图标的的通知栏，可关闭。</m-noticebar>
        </div>

        <div class="demo">
          <m-noticebar leftIcon="notice" mode="close" time="5000">我是带有图标的的通知栏，5s以后消失。</m-noticebar>
        </div>

        <div class="demo">
          <m-noticebar leftIcon="notice" mode="link">我是带有图标的的通知栏，文字太长了，我现在要滚动才行，同时可点击查看详情。</m-noticebar>
        </div>

        <div class="demo">
          <m-noticebar :scrollable="false" wrapable>我是带有图标的的通知栏，文字太长了文字太长了，需要开启文本换行展示。</m-noticebar>
        </div>
        <div class="demo">
          <m-noticebar
            leftIcon="problem"
            iconType="font"
            mode="close"
            background="rgba(89,158,248,.08)"
            color="#2f86f6"
            speed="120"
          >我是带图标、可改变外观、可滚动、可关闭的的通知栏，1秒以后开始滚了，滚得还快！</m-noticebar>
        </div>
        <div class="demo">
          <m-noticebar background="rgba(89,158,248,.08)" color="#2f86f6" speed="200">
            <span slot="left"><m-icon name="problem" type="font"></m-icon></span>
            我是使用插槽自定义的带图标的通知栏，多来点文字滚滚
            <span slot="right" class="right-svg"><m-icon name="close" type="svg"></m-icon></span>
          </m-noticebar>
        </div>
      </div>
      <m-popup v-model="bShows" position="left">
        <div class="popup">popup-left</div>
      </m-popup>
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
      bShows: false,
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
    setTimeout(() => {
      this.bShows = true;
    }, 3200);
  },
  methods: {
    callback(event, index, val, id) {
      this.$notify({
        text: `当前选择${val}`,
        type: "failed",
        time: 2500,
        callback: () => {
          this.$toast(`${val}通知消失了`);
        }
      });
    },
    toast(msg) {
      this.$toast(msg);
    },
    getRes() {
      this.$http({
        url: "openAccountResult",
        method: "POST",
        callback: e => {
          this.$notify({
            text: `${e.url} 报错`,
            type: "failed"
          });
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
  .demo {
    margin: 20px 0;
  }
}
.popup {
  width: 375px;
  height: 100%;
  background: #fff;
}
.right-svg{
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>
