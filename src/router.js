import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/index",
      name: "index",
      component: resolve => {
        require.ensure(
          ["./views/index/index.vue"],
          () => {
            resolve(require("./views/index/index.vue"));
          },
          "index"
        );
      },
      meta: {
        docTitle: "首页",
        keepAlive: true
      }
    },
    {
      path: "/mine",
      name: "mine",
      component: resolve => {
        require.ensure(
          ["./views/mine/mine.vue"],
          () => {
            resolve(require("./views/mine/mine.vue"));
          },
          "mine"
        );
      },
      meta: {
        docTitle: "我的",
        keepAlive: false
      }
    }
  ]
});
