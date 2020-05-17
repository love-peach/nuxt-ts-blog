<template>
  <div class="admin-layout-wrap">
    <div class="admin-layout-left">
      <AdminSide />
    </div>
    <div class="admin-layout-main">
      <AdminContent />
    </div>
  </div>
</template>

<script>
import AdminSide from '@/components/framework/admin-side/';
import AdminContent from '@/components/framework/admin-content/';

export default {
  name: 'AdminLayout',
  components: {
    AdminSide,
    AdminContent,
  },
};
</script>

<style lang="less" scoped>
.admin-layout-wrap {
  height: 100%;
  width: 100%;
  .admin-layout-left {
    float: left;
    position: relative;
    width: 240px;
    height: 100%;
  }
  .admin-layout-main {
    height: 100%;
    overflow: auto;
  }
}
</style>
