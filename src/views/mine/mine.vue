<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <div class="mine">
        <ul class="menu">
          <li 
            v-for="(item, index) in tabs" 
            :key="index" 
            :class="{'cur':nowIndex==index}"
            @click="toggle(index ,item.view)"
          >{{item.name}}</li>
        </ul>
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      </div>
    </m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import VNew from "./tab/new.vue";
import VMore from "./tab/more.vue";
import VHeight from "./tab/height.vue";
export default {
  name: "minePage",
  data() {
    return {
      hasBack: false,
      titleTxt: "我的",
      nowIndex: 0,
      currentView: "VNew",
      tabs: [
        {
          name: "最新入库",
          view: "VNew"
        },
        {
          name: "最多关注",
          view: "VMore"
        },
        {
          name: "最高评分",
          view: "VHeight"
        }
      ]
    };
  },
  components: { VNew, VMore, VHeight },
  mounted() {},
  methods: {
    toggle(i, v) {
      this.nowIndex = i;
      this.currentView = v;
    }
  }
};
</script>
<style lang="scss" scoped>
.mine {
  .menu {
    margin-top: 30px;
    display: flex;
    height: 80px;
    text-align: center;
    li {
      flex: 1;
      margin: 0 20px;
      line-height: 80px;
      border: 1px solid #000;
      border-radius: 80px;
      &.cur {
        border: 1px solid #f90;
        color: #f90;
      }
    }
  }
}
</style>
