import qs from 'qs';

export default function(ctx) {
  const { $axios, store, app } = ctx;

  $axios.transformRequest = [
    (data, header) => {
      if (header['Content-Type'] && header['Content-Type'].includes('json')) {
        return JSON.stringify(data);
      }
      return qs.stringify(data, { arrayFormat: 'repeat' });
    },
  ];

  $axios.onRequest(config => {
    const token = store.getters['common/getToken'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 如果是 get 请求，参数序列化
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' }); // params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      };
    }
    return config;
  });

  // $axios.onRequestError(error => {
  //   console.log('onRequestError', error);
  // });

  $axios.onResponse(res => {
    // 如果 后端返回的码正常 则 将 res.data 返回
    if (res && res.data) {
      if (res.data.code === 'success') {
        return res;
      } else {
        return Promise.reject(res.data);
      }
    }
  });

  $axios.onResponseError(response => {
    if (response && response.status === 401) {
      app.$toast.error('登录过期了');
      sessionStorage.clear();
      store.dispatch('common/changeUserInfo', null);
      store.dispatch('common/changeToken', '');

      // store.dispatch('common/toggleSignInModal', true);
    }
  });

  $axios.onError(error => {
    app.$toast.show(error.message);
  });
}
