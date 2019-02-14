/**
 * 主页相关路由
 */
export default [
  {
    path: "/index",
    name: "index",
    component: resolve => {
      require.ensure(
        ["@/views/index/index.vue"],
        () => {
          resolve(require("@/views/index/index.vue"));
        },
        "index"
      );
    },
    meta: {
      docTitle: "首页",
      keepAlive: true
    }
  }
];
