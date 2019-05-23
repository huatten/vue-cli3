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
        <m-step :steps="steps2" :current="2">
          <div slot="icon">
            <m-icon name="history" type="font"></m-icon>
          </div>
        </m-step>
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
        { name: "注册" },
        { name: "开户" },
        { name: "验证" },
        { name: "完成" }
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
  p {
    margin-bottom: 20px;
  }
}
</style>