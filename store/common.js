// import api from '@/api/';

const state = () => ({
  categoryList: [],
  tagList: [],
  blogResult: {},
  showSignInModal: false,
  showSignUpModal: false,
  userInfo: null,
  token: '',
  highLightIndex: 0, // markdown 目录高亮索引
  categoryIndex: 0,
  cacheArticleData: null,
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
  getTagList: state => state.tagList,
  getIsShowSignInModal: state => state.showSignInModal,
  getIsShowSignUpModal: state => state.showSignUpModal,
  getUserInfo: state => state.userInfo,
  getToken: state => state.token,
  getHighLightIndex: state => state.highLightIndex,
  getCategoryIndex: state => state.categoryIndex,
  getCacheArticleData: state => state.cacheArticleData,
};

const mutations = {
  setCatgoryList(state, data) {
    state.categoryList = data;
  },
  setTagList(state, data) {
    state.tagList = data;
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
  setToken(state, data) {
    state.token = data;
  },
  setHighLightIndex(state, { index }) {
    state.highLightIndex = index;
  },
  setCatgoryIndex(state, data) {
    state.categoryIndex = data;
  },
  setCacheArticleData(state, data) {
    state.cacheArticleData = data;
  },
};

const actions = {
  async requestCategoryList({ commit }) {
    const res = await this.$myApi.categories.index();
    commit('setCatgoryList', res && res.result ? res.result : []);
  },
  async requestTagList({ commit }) {
    const res = await this.$myApi.tags.index();
    commit('setTagList', res && res.result ? res.result : []);
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
  changeToken({ commit }, data) {
    commit('setToken', data);
  },
  changeHighLightIndex({ commit }, data) {
    commit('setHighLightIndex', data);
  },
  changeCategoryIndex({ commit }, data) {
    commit('setCatgoryIndex', data);
  },
  cacheArticleData({ commit }, data) {
    commit('setCacheArticleData', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
