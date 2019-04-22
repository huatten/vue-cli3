import Vue from "vue";
import App from "./App.vue";
import router from "router";
import store from "store";
import "assets/scss";
import "assets/icons";
import "components/layout";
import "components/plugin";
import "assets/js/filter";
import http from "assets/js/request";
Vue.config.productionTip = false;
Vue.prototype.$http = http;

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
