<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="m-field">
        <p>开启状态</p>
        <m-switch v-model="isOpen" @change="handel(isOpen)"></m-switch>
      </div>
      <div class="m-field">
        <p>关闭状态</p>
        <m-switch v-model="isClose"></m-switch>
      </div>
      <div class="m-field">
        <p>开启&&禁用状态</p>
        <m-switch v-model="isOpen" disabled></m-switch>
      </div>
      <div class="m-field">
        <p>关闭&&禁用状态</p>
        <m-switch v-model="isClose" disabled></m-switch>
      </div>
      <div class="m-field">
        <p>loading状态</p>
        <m-switch v-model="isOpen" loading></m-switch>
      </div>
      <div class="m-field">
        <p>自定义大小 && loading状态</p>
        <m-switch v-model="isOpen" size="88" loading-size="50" loading></m-switch>
      </div>
    </m-content>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      hasBack: false,
      titleTxt: "switch开关",
      isOpen: true,
      isClose: false
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