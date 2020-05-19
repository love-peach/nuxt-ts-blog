export default $axios => resource => {
  const api = {
    create(payload) {
      return $axios.$post(resource, payload);
    },
    index(payload) {
      return $axios.$get(`${resource}`, {
        params: payload,
      });
    },
    show(payload) {
      return $axios.$get(`${resource}/${payload.id}`);
    },
    update() {
      return $axios.$put(resource);
    },
    delete(id) {
      return $axios.$delete(`${resource}/${id}`);
    },
  };
  if (resource.indexOf('blogs') > 0) {
    api.PostBlogLike = payload => $axios.$post(`${resource}/like`, payload);
    api.PostBlogUnLike = payload => $axios.$post(`${resource}/unlike`, payload);
  }
  if (resource.indexOf('users') > 0) {
    api.PostUserLogin = payload => $axios.$post(`${resource}/signin`, payload);
    api.PostUserSignout = payload => $axios.$post(`${resource}/signout`, payload);
    api.PostForgetPwd = payload => $axios.$post(`${resource}/forgetPwd`, payload);
    api.PostChangePwd = payload => $axios.$post(`${resource}/changePwd`, payload);
  }
  return api;
};
