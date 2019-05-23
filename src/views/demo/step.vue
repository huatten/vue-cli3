<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="m-field">
        <p>基础</p>
        <m-step :steps="steps" :current="1"></m-step>
      </div>
      <div class="m-field">
        <p>进度为小数</p>
        <m-step :steps="steps" :current="1.5"></m-step>
      </div>
      <div class="m-field">
        <p>进度动画</p>
        <m-step :steps="steps" :current="current" :transition="true"></m-step>
      </div>
      <div class="m-field">
        <p>自定义图标</p>
        <m-step :steps="steps" :current="2">
          <div slot="icon">
            <m-icon name="history" type="font"></m-icon>
          </div>
        </m-step>
      </div>
      <div class="m-field vertical">
        <p>纵向进度</p>
        <m-step :steps="steps2" direction="vertical" :current="2"></m-step>
      </div>
    </m-content>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      hasBack: false,
      titleTxt: "step步骤条",
      isOpen: true,
      isClose: false,
      steps: [{ name: "第一步" }, { name: "第二步" }, { name: "第三步" }],
      steps2: [
        {
          name: "您的订单已导入，商家正在通知快递公司取件，请您耐心等待",
          desc: "2019-05-21 11:29:33"
        },
        {
          name: "【温州市】快件离开 【苍南】 已发往 【北京市】",
          desc: "2019-05-21 12:49:26"
        },
        {
          name: "【北京市】 快件离开 【北京】已发往 【北京上地】",
          desc: "2019-05-22 00:29:54"
        },
        {
          name:
            "【北京市】快件已在【北京上地】签收，签收人：同事前台，您的快递已经妥投，请给个五星好评呀！",
          desc: "2019-05-22 12:33:20"
        }
      ],
      current: 0
    };
  },
  created() {
    setTimeout(() => {
      this.current = 2;
    }, 2000);
  },
  methods: {
    handel(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-field {
  padding: 30px;
  background: #fff;
  margin: 30px;
  &.vertical {
    margin-bottom: 100px;
    .m-step {
      height: 700px;
    }
  }
  p {
    margin-bottom: 20px;
  }
}
</style>