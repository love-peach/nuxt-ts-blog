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
  return api;
};
