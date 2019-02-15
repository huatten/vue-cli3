<template>
  <div>
    <m-header :hasBack="hasBack" :titleTxt="titleTxt"></m-header>
    <m-content>
      <input type="text" value="滑到页面底部点击跳转"/>
      <ul class="list" >
        <li v-for="(i,index) in 50" :key="index">{{i}}</li>
      </ul>
      <router-link to="/mine">请点击我</router-link>
    </m-content>
    <m-footer></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  name: "listPage",
  data() {
    return {
      hasBack: false,
      titleTxt: "列表"
    };
  },
  beforeRouteLeave(to, from, next) {
    let scroll = document.querySelector(".m-content").scrollTop;
    window.sessionStorage.setItem("scroll", scroll);
    console.log(scroll);
    next();
  },
  created() {
    //缓存的放在这里
    this.once();
  },
  activated() {
    //需要更新的放在这里
    this.always();
    let scroll = window.sessionStorage.getItem("scroll");
    this.$nextTick(function() {
      document.querySelector(".m-content").scrollTop = parseInt(scroll);
    });
  },
  methods: {
    always() {
      axios
        .get("https://jelly.sina.com/h5/index/indexSyncData?_=1550115423571")
        .then(res => {
          alert(res + "每次进入页面都被请求");
        });
    },
    once() {
      axios
        .get("https://jelly.sina.com/h5/index/indexSyncData?_=1550115423571")
        .then(res => {
          alert(res + "首次进入页面只请求一次");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  font-size: 40px;
  line-height: 100px;
  text-align: center;
}
</style>
