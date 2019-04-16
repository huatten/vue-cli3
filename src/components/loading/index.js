import oLoading from "./index.vue";
import { isInDocument } from "assets/js/utils/dom";
export default {
  install(Vue, options) {
    const LoadTpl = Vue.extend(oLoading); // 创建vue构造器
    const oCache = {};
    let loading = (options = {}) => {
      const $vm = oCache[options.id] || (oCache[options.id] = new LoadTpl()); //实例化vue实例
      if (!$vm.$el || !isInDocument($vm.$el)) {
        //防止连续多次重复创建
        document
          .querySelector(options.parent || "body")
          .appendChild($vm.$mount().$el);
      }
      $vm.bShow = true;
      typeof options === "object"
        ? Object.assign({}, $vm, options)
        : ($vm.loadTxt = options);
    };

    Vue.loading = Vue.prototype.$loading = loading;
    Vue.clearLoading = Vue.prototype.$clearLoading = () => {
      Object.keys(oCache).forEach(item => {
        oCache[item].bShow = false;
      });
    };
  }
};
