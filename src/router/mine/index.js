/**
 * 个人中心相关路由
 */
export default [
  {
    path: "/mine",
    name: "mine",
    component: resolve => {
      require.ensure(
        ["@/views/mine/mine.vue"],
        () => {
          resolve(require("@/views/mine/mine.vue"));
        },
        "mine"
      );
    },
    meta: {
      docTitle: "我的",
      keepAlive: false
    }
  }
];
