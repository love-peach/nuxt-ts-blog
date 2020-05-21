<template>
  <div class="login-control-wrap">
    <div v-if="userInfo" class="dropdown-menu-wrap">
      <Zbtn theme="success" size="small" shape="circle" icon="user" :to="{ path: '/user' }">{{ userInfo.nicName || userInfo.userName }}</Zbtn>
      <div :class="['dropdown-menu', `dropdown-menu-${theme}`]">
        <ConcaveRadiusBox :size="15" :theme="theme">
          <Zbtn :theme="theme === 'white' ? 'text' : 'white'" icon="signout" shape="rect" long :to="{ path: '/user/write' }">发布文章</Zbtn>
          <Zbtn :theme="theme === 'white' ? 'text' : 'white'" icon="signout" shape="rect" long :to="{ path: '/user/avatar' }">修改头像</Zbtn>
          <Zbtn :theme="theme === 'white' ? 'text' : 'white'" icon="signout" shape="rect" long :to="{ path: '/user/profile' }">编辑资料</Zbtn>
          <Zbtn :theme="theme === 'white' ? 'text' : 'white'" icon="signout" shape="rect" long @click="handleSignOut">退出账号</Zbtn>
        </ConcaveRadiusBox>
      </div>
    </div>
    <ZbtnGroup v-else>
      <Zbtn theme="success" size="small" shape="circle" icon="signin" @click="handleSignIn">登录</Zbtn>
      <Zbtn theme="primary" size="small" shape="circle" icon="signup" @click="handleSignUp">注册</Zbtn>
    </ZbtnGroup>
  </div>
</template>

<script>
// import Icon from '@/components/base/icon/';
import Vuex from 'vuex';

import Zbtn from '@/components/base/btn/';
import ZbtnGroup from '@/components/base/btn-group/';
import ConcaveRadiusBox from '@/components/kit/concave-radius-box/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'LoginControl',
  components: {
    Zbtn,
    ZbtnGroup,
    ConcaveRadiusBox,
  },
  props: {
    theme: String,
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'common/toggleSignUpModal',
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 登录
     */
    handleSignIn() {
      this.toggleSignInModal(true);
      this.toggleSignUpModal(false);
    },

    /**
     * @desc 注册
     */
    handleSignUp() {
      this.toggleSignInModal(false);
      this.toggleSignUpModal(true);
    },

    /**
     * @desc 退出登录
     */
    handleSignOut() {
      sessionStorage.clear();
      this.$store.dispatch('common/changeUserInfo', null);
      this.$store.dispatch('common/changeToken', '');
    },
  },
};
</script>

<style lang="less" scoped>
.login-control-wrap {
  height: @heightHeader;
}
.dropdown-menu-wrap {
  position: relative;
  .dropdown-menu {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
    display: none;
    color: #fff;
    line-height: initial;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .dropdown-menu-white {
    background-color: #fff;
  }
  .dropdown-menu-black {
    background-color: rgba(0, 0, 0, 0.8);
  }
  &:hover .dropdown-menu {
    display: block;
  }
}
</style>
