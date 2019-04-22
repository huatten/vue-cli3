import oToast from "./index.vue";
import { isInDocument } from "assets/js/utils/dom";
const Toast = {
  install(Vue, options = {}) {
    const ToastTpl = Vue.extend(oToast); //创建vue构造器
    const oCache = {};
    Vue.prototype.$toast = Vue.toast = (options = {}) => {
      const $vm = oCache[options.id] || (oCache[options.id] = new ToastTpl());
      if (!$vm.$el || !isInDocument($vm.$el)) {
        //防止连续多次重复创建
        document
          .querySelector(options.parent || "body")
          .appendChild($vm.$mount().$el);
      }
      typeof options === "string" && ($vm.text = options); // 传入props
      typeof options === "object" && Object.assign($vm, options); // 合并参数与实例
      clearTimeout(this.time);
      clearTimeout(this.timer);
      $vm.bShow = true;
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
          this.time = setTimeout(() => {
            data.callback();
          }, 220);
        }
      });
    };
  }
};

export default Toast;
