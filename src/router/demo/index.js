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
  },
  {
    path: "/cell",
    name: "cell",
    component: resolve => {
      require.ensure(
        ["@/views/demo/cell.vue"],
        () => {
          resolve(require("@/views/demo/cell.vue"));
        },
        "cell"
      );
    },
    meta: {
      docTitle: "单元格",
      keepAlive: false
    }
  }
];
