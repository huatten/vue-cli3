<template>
  <div>
    <m-button type="warning" @click="show=!show">动画组件</m-button>
    <m-transition name="m-fade-up">
      <h1 v-if="show">动画组件</h1>
    </m-transition>
    
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>