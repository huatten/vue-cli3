import oNotify from "./index.vue";
import { isInDocument } from "assets/js/utils/dom";
export default {
  install(Vue, options) {
    const NotifyTpl = Vue.extend(oNotify);
    const oCache = {};
    Vue.prototype.$notify = Vue.notify = (options = {}) => {
      const $vm = oCache[options.id] || (oCache[options.id] = new NotifyTpl());
      if (!$vm.$el || !isInDocument($vm.$el)) {
        //防止连续多次重复创建
        document
          .querySelector(options.parent || "body")
          .appendChild($vm.$mount().$el);
      }
      typeof options === "string" && ($vm.text = options); // 传入props
      typeof options === "object" && Object.assign($vm, options); // 合并参数与实例
      $vm.bShow = true;
      clearTimeout(this.time);
      clearTimeout(this.timer);
      const hide = () => {
        return new Promise(resolve => {
          if (!$vm.time) return;
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
