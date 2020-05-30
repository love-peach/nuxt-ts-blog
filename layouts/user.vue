<template>
  <AppLayout>
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
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '@/components/framework/app-layout/index.js';

import Card from '@/components/base/card/';
import UserMenu from '@/components/framework/user-menu.vue';
import UserBrief from '@/components/framework/user-brief.vue';

export default {
  name: 'AppLayoutUser',
  components: {
    AppLayout,
    Card,
    UserMenu,
    UserBrief,
  },
  head() {
    return {
      title: '用户中心',
    };
  },
};
</script>

<style lang="less" scoped>
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
