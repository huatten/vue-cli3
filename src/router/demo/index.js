/**
 * demo 相关路由
 */
export default [
  {
    path: "/transition",
    name: "transition",
    component: resolve => {
      require.ensure(
        ["@/views/demo/transition.vue"],
        () => {
          resolve(require("@/views/demo/transition.vue"));
        },
        "transition"
      );
    },
    meta: {
      docTitle: "动画组件",
      keepAlive: false
    }
  }
];
