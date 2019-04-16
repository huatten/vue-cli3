import oToast from "./index.vue";
import { isInDocument } from "assets/js/utils/dom";
export default {
  install(Vue, options) {
    const ToastTpl = Vue.extend(oToast); //创建vue构造器
    const oCache = {};
    const toast = (bShow = true, options = {}) => {
      const $vm = oCache[options.id] || (oCache[options.id] = new ToastTpl());
      if (!$vm.$el || !isInDocument($vm.$el)) {
        //防止连续多次重复创建
        document
          .querySelector(options.parent || "body")
          .appendChild($vm.$mount().$el);
        clearTimeout(this.timer);
      }
      $vm.bShow = bShow;
      typeof options === "object"
        ? Object.assign({}, $vm, options)
        : ($vm.msg = options);
      const hide = () => {
        return new Promise(resolve => {
          this.timer = setTimeout(() => {
            Object.keys(oCache).forEach(item => {
              oCache[item].bShow = false;
              resolve(oCache[item]);
            });
          }, $vm.time);
        });
      };
      hide().then(data => {
        if (data.callback && typeof data.callback === "function") {
          data.callback();
        }
      });
    };
    Vue.toast = Vue.prototype.$toast = toast;
  }
};
