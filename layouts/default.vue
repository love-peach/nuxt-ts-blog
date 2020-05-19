<template>
  <div class="app-layout-wrap">
    <AppHeader />
    <div class="app-content">
      <nuxt />
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

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,

    SignIn,
    SignUp,
  },
  data() {
    return {};
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
</style>
