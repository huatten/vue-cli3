import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let routes = [];
const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach(route => {
  if (route.startsWith("./index")) return;
  const routerModule = routerContext(route);
  routes = [...routes, ...(routerModule.default || routerModule)];
  console.log(routes);
});

export default new Router({
  //mode: "history",
  linkActiveClass: "active",
  routes: routes
});
