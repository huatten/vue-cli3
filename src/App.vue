<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view class="router-animate" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view class="router-animate" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "myApp"
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
.router-animate {
  width: 100%;
  height: 100%;
  display: flex;
  display: box;
  flex-direction: column;
}
</style>
