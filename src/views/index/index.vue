<template>
  <div>
    <m-header></m-header>
    <m-content>
      <m-marquee></m-marquee>
    </m-content>
  </div>
</template>
<script type="text/ecmascript-6">
import MHeader from "components/header/index";
import MMarquee from "components/marquee/index";
export default {
  name: "indexPage",
  data() {
    return {
      index: "indexPage"
    };
  },
  components: { MHeader, MMarquee },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.h1 {
  font-size: 32px;
  color: #f90;
}
</style>
