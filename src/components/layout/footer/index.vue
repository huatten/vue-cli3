<template>
  <footer class="m-footer">
    <div class="nav-bar">
      <router-link title="首页" :to="{ path: 'index' }" exact>
        <i class="icon-index"></i>
        <span>首页</span>
      </router-link>
      <router-link title="项目" :to="{ path: 'list' }">
        <i class="icon-list"></i>
        <span>项目</span>
      </router-link>
      <router-link title="我的" :to="{ path: 'mine' }">
        <i class="icon-mine"></i>
        <span>我的</span>
      </router-link>
    </div>
  </footer>
</template>
<script type="text/ecmascript-6">
export default {
  name: "MFooter",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.m-footer {
  background-color: #f9f9f9;
  .nav-bar {
    display: flex;
    align-items: center;
    position: relative;
    text-align: center;
    height: 90px;
    padding-top: 4px;
    padding-bottom: 8px;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.08);
    a {
      flex: 1;
      i {
        display: block;
        @include wh(60px, 60px);
        margin: 0 auto -4px;
        background-size: 60px auto;
        &.icon-index {
          @include bg-image("tabbar_index_before");
        }
        &.icon-list {
          @include bg-image("tabbar_list_before");
        }
        &.icon-mine {
          @include bg-image("tabbar_mine_before");
        }
      }
      span {
        font-size: 24px;
        color: $color_666;
      }
      &.active {
        i {
          &.icon-index {
            @include bg-image("tabbar_index_after");
          }
          &.icon-list {
            @include bg-image("tabbar_list_after");
          }
          &.icon-mine {
            @include bg-image("tabbar_mine_after");
          }
        }
        span {
          color: #f90;
        }
      }
    }
  }
}
</style>
