import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "assets/scss/index";
import "components/index";
import "assets/icons/index";
import "assets/js/filter/index";
import loading from "components/loading";
import toast from "components/toast";
import http from "assets/js/request/index";
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.use(loading);
Vue.use(toast);
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener("resize", function() {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      window.setTimeout(function() {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  });
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
