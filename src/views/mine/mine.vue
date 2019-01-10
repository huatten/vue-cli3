<template>
  <div class="page">
    <h1>This is a {{mine}}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "minePage",
  data() {
    return {
      mine: "minePage"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";
.home {
  font-size: 32px;
  transform: translateX(30px);
  border: 1px solid $color_border;
}
</style>
