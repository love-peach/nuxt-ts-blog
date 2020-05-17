import MyToast from './toast.vue';

export default {
  install(Vue, defaultOptions = {}) {
    const CONSTRUCTOR = Vue.extend(MyToast);
    const CACHE = {};
    Object.assign(MyToast.DEFAULT_OPT, defaultOptions);

    function toast(msg, options = {}) {
      options.message = msg;
      const toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR());
      if (!toast.$el) {
        const vm = toast.$mount();
        document.querySelector(options.parent || 'body').appendChild(vm.$el);
      }
      toast.queue.push(options);
    }
    toast.primary = function(message, otherOptions) {
      return toast(message, {
        type: 'primary',
        ...otherOptions,
      });
    };
    toast.info = function(message, otherOptions) {
      return toast(message, {
        type: 'info',
        icon: 'info',
        ...otherOptions,
      });
    };
    toast.success = function(message, otherOptions) {
      return toast(message, {
        type: 'success',
        icon: 'success',
        ...otherOptions,
      });
    };
    toast.warning = function(message, otherOptions) {
      return toast(message, {
        type: 'warning',
        icon: 'warning',
        ...otherOptions,
      });
    };
    toast.error = function(message, otherOptions) {
      return toast(message, {
        type: 'error',
        icon: 'error',
        ...otherOptions,
      });
    };
    Vue.toast = Vue.prototype.$toast = toast;
  },
};
