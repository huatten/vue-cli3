<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content></m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "minePage",
  data() {
    return {
      hasBack: false,
      titleTxt: "我的"
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.mine {
}
</style>
