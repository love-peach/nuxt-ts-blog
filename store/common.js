// import api from '@/api/';

const state = () => ({
  categoryList: [],
  blogResult: {},
  showSignInModal: false,
  showSignUpModal: false,
  userInfo: null,
  highLightIndex: 0, // markdown 目录高亮索引
});

const getters = {
  getBlogResult: state => state.blogResult,
  getCategoryList: state => state.categoryList,
  getCategoryIdByValue: state => value => {
    return value ? state.categoryList.filter(item => item.value === value)[0]._id : '';
  },
  getIsShowSignInModal: state => state.showSignInModal,
  getIsShowSignUpModal: state => state.showSignUpModal,
  getUserInfo: state => state.userInfo,
  getHighLightIndex: state => state.highLightIndex,
};

const mutations = {
  setCatgoryList(state, data) {
    state.categoryList = data;
  },
  setBlogResult(state, data) {
    state.blogResult = data;
  },
  setSignInModal(state, isShow) {
    state.showSignInModal = isShow;
  },
  setSignUpModal(state, isShow) {
    state.showSignUpModal = isShow;
  },
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  setHighLightIndex(state, { index }) {
    state.highLightIndex = index;
  },
};

const actions = {
  // async getCategoryList({ commit }) {
  //   const res = await api.GetCategory();
  //   commit('setCatgoryList', res && res.result ? res.result : []);
  // },

  getCategoryList({ commit }) {
    const res = [];
    commit('setCatgoryList', res && res.result ? res.result : []);
  },
  toggleSignInModal({ commit }, isShow) {
    commit('setSignInModal', isShow);
  },
  toggleSignUpModal({ commit }, isShow) {
    commit('setSignUpModal', isShow);
  },
  changeUserInfo({ commit }, data) {
    commit('setUserInfo', data);
  },
  changeHighLightIndex({ commit }, data) {
    commit('setHighLightIndex', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
