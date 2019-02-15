<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="router-animate"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive" class="router-animate"></router-view>
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
@media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  @supports (bottom: constant(safe-area-inset-bottom)) {
    #app {
      padding-bottom: 34px;
    }
  }
}
</style>
