<template>
  <div class="admin-header-wrap">
    <div></div>
    <AppMenu />
  </div>
</template>

<script>
import AppMenu from '@/components/framework/app-menu/';

export default {
  name: 'AdminHeader',
  components: {
    AppMenu,
  },
};
</script>

<style lang="less" scoped>
.admin-header-wrap {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
}
</style>
