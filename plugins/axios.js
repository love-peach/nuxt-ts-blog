import qs from 'qs';

export default function({ $axios }) {
  $axios.transformRequest = [
    (data, header) => {
      if (header['Content-Type'] && header['Content-Type'].includes('json')) {
        return JSON.stringify(data);
      }
      return qs.stringify(data, { arrayFormat: 'repeat' });
    },
  ];

  $axios.onRequest(config => {
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

  // $axios.onResponse(res => {
  //   console.log('onResponse', res);
  //   return res.data;
  // });

  // $axios.onResponseError(config => {
  //   console.log('onResponseError', config);
  // });

  // $axios.onError(error => {
  //   console.log('onError', error);
  // });
}
