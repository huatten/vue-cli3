<template>
  <div>
    <m-header></m-header>
    <m-content>
      <svg-icon name="user"></svg-icon>
    </m-content>
  </div>
</template>
<script type="text/ecmascript-6">
import MHeader from "components/header/index";
export default {
  name: "indexPage",
  data() {
    return {
      index: "indexPage"
    };
  },
  components: { MHeader },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.h1 {
  font-size: 32px;
  color: #f90;
}
</style>
