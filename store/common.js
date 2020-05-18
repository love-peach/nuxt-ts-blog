// import api from '@/api/';

const state = () => ({
  categoryList: [],
  blogResult: {},
  showSignInModal: false,
  showSignUpModal: false,
  userInfo: null,
  highLightIndex: 0, // markdown 目录高亮索引
  categoryIndex: 0,
});

const getters = {
  getBlogResult: state => state.blogResult,
  getCategoryList: state => state.categoryList,
  getCategoryIdByValue: state => value => {
    let categoryId = '';
    if (value) {
      const categoryIdFilter = state.categoryList.filter(item => item.value === value);
      if (categoryIdFilter.length) {
        categoryId = categoryIdFilter[0]._id;
      } else {
        categoryId = '';
      }
    } else {
      categoryId = '';
    }
    return categoryId;
  },
  getIsShowSignInModal: state => state.showSignInModal,
  getIsShowSignUpModal: state => state.showSignUpModal,
  getUserInfo: state => state.userInfo,
  getHighLightIndex: state => state.highLightIndex,
  getCategoryIndex: state => state.categoryIndex,
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
  setCatgoryIndex(state, data) {
    state.categoryIndex = data;
  },
};

const actions = {
  async getCategoryList({ commit }) {
    const res = await this.$myApi.categories.index();
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
  changeCategoryIndex({ commit }, data) {
    commit('setCatgoryIndex', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
