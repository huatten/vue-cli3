<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="m-404">404</div>
    </m-content>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "M404",
  data() {
    return {
      hasBack: false,
      titleTxt: "页面不见了"
    };
  }
};
</script>
<style lang="scss" scoped></style>
