/**
 * 列表相关路由
 */
export default [
  {
    path: "/list",
    name: "list",
    component: resolve => {
      require.ensure(
        ["@/views/list/index.vue"],
        () => {
          resolve(require("@/views/list/index.vue"));
        },
        "list"
      );
    },
    meta: {
      docTitle: "列表",
      keepAlive: true
    }
  }
];
