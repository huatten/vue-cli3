/**
 * 主页相关路由
 */
export default [
  {
    path: "/",
    redirect: "index"
  },
  {
    path: "/index",
    name: "index",
    component: resolve => {
      require.ensure(
        ["@/views/home/index.vue"],
        () => {
          resolve(require("@/views/home/index.vue"));
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
