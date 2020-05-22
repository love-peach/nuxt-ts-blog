<template>
  <div class="app-layout-wrap">
    <AppHeader />
    <div class="app-content">
      <div class="z-container">
        <div class="user-page-wrap">
          <div class="user-page-side">
            <div class="hidden-xs">
              <UserBrief />
            </div>
            <Card :padding="0" style="margin-bottom: 0;">
              <UserMenu></UserMenu>
            </Card>
          </div>
          <div class="user-page-main">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <AppFooter />

    <SignIn />
    <SignUp />
  </div>
</template>

<script>
import AppHeader from '@/components/framework/app-header/index.js';
import AppFooter from '@/components/framework/app-footer/index.js';

import SignIn from '@/components/kit/sign-in/index.js';
import SignUp from '@/components/kit/sign-up/index.js';

import Card from '@/components/base/card/';
import UserMenu from '@/components/framework/user-menu.vue';
import UserBrief from '@/components/framework/user-brief.vue';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,

    SignIn,
    SignUp,

    Card,
    UserMenu,
    UserBrief,
  },
  data() {
    return {};
  },
  head() {
    return {
      title: '用户中心',
    };
  },
};
</script>

<style lang="less" scoped>
.app-layout-wrap {
  height: 100%;
  .app-content {
    padding-top: @heightHeader + 20;
    min-height: 100%;
    padding-bottom: @heightFooter + 20;
  }
}

.user-page-wrap {
  display: flex;
}
.user-page-side {
  width: 240px;
  margin-right: 20px;
}
.user-page-main {
  flex: 1;
}
</style>
