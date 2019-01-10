<template>
  <div class="page">
    <h1>This is a {{index}}</h1>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "indexPage",
  data() {
    return {
      index: "indexPage"
    };
  }
};
</script>
<style lang="scss" scoped>
.h1 {
  font-size: 32px;
  color: #f90;
}
</style>
