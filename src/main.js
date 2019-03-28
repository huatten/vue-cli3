import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "assets/scss/index";
import "components/index";
import "assets/icons/index";
import "assets/js/filter/index";
import http from "assets/js/request/index";
Vue.config.productionTip = false;

Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
