<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="m-field">
        <m-cell title="姓名" @click="cellClick">
          <div slot="left" class="left"><m-icon name="safe"></m-icon></div>
        </m-cell>
        <m-cell title="性别" arrow right-text="女" abstract="描述摘要" @click="cellClick">
          <div slot="left" class="left"><m-icon name="safe"></m-icon></div>
        </m-cell>
        <m-cell title="年龄" arrow disabled no-border @click="cellClick"></m-cell>
      </div>
    </m-content>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      hasBack: false,
      titleTxt: "cell单元格",
    };
  },
  methods:{
    cellClick(){
      this.$toast('点击了单元格');
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-field {
  padding: 30px;
  background: #fff;
  margin: 30px;
}
.left{
  width: 48px;
  height: 48px;
}
</style>