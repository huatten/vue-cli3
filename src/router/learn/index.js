/**
 * learn 相关路由
 */
export default [
  {
    path: "/learntrans",
    name: "learntrans",
    component: resolve => {
      require.ensure(
        ["@/views/learn/transition.vue"],
        () => {
          resolve(require("@/views/learn/transition.vue"));
        },
        "learntrans"
      );
    },
    meta: {
      docTitle: "过渡动画",
      keepAlive: false
    }
  }
];
