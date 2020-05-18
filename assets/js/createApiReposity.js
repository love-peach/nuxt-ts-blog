export default $axios => resource => ({
  create(payload) {
    return $axios.$post(resource, payload);
  },
  index(payload) {
    return $axios.$get(`${resource}`, {
      params: payload,
    });
  },
  show(id) {
    return $axios.$get(`${resource}/${id}`);
  },
  update() {
    return $axios.$put(resource);
  },
  delete(id) {
    return $axios.$delete(`${resource}/${id}`);
  },
});
