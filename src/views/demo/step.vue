<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="m-field">
        <p>基础</p>
        <m-step :steps="steps"></m-step>
      </div>
      <div class="m-field">
        <p>自定义</p>
        <m-step :steps="steps">
          <div slot="icon"><m-icon name="history" type="font"></m-icon></div>
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
      steps:[{name: '第一步'},{name: '第二步'},{name: '第三步'}]
    };
  },
  methods:{
    handel(e){
      console.log(e)
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.m-field {
  padding: 30px;
  background: #fff;
  margin: 30px;
  p{
    margin-bottom: 20px;
  }
}
</style>