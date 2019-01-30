import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "assets/scss/index.scss";
import "components/index";
import "assets/icons/index";
import "assets/js/filter/index";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
