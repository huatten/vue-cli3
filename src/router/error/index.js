/**
 * 404、500等相关路由
 */
export default [
  {
    path: "/500",
    name: "500",
    component: resolve => {
      require.ensure(
        ["@/views/error/500.vue"],
        () => {
          resolve(require("@/views/error/500.vue"));
        },
        "500"
      );
    },
    meta: {
      docTitle: "500",
      keepAlive: false
    }
  },
  {
    path: "*",
    name: "404",
    component: resolve => {
      require.ensure(
        ["@/views/error/404.vue"],
        () => {
          resolve(require("@/views/error/404.vue"));
        },
        "404"
      );
    },
    meta: {
      docTitle: "页面未找到"
    }
  }
];
