<template>
  <div class="admin-side-wrap">
    <router-link to="/" active-class="current" class="admin-side-brand">
      <!-- <Icon type="logo" :size="166" /> -->
      <div style="font-size: 16px;font-weight: bold;text-align: center;line-height: 50px;">技术文档</div>
    </router-link>
    <div class="admin-side-menu">
      <router-link v-for="(nav, index) in sideMenu" :key="index" active-class="current" class="menu-link" :to="nav.path">{{ nav.name }}</router-link>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';

export default {
  name: 'AdminSide',
  components: {
    Icon,
  },
  data() {
    return {
      sideMenu: [
        {
          name: '写文章',
          path: '/admin/write',
        },
        {
          name: '文章管理',
          path: '/admin/article',
        },
        {
          name: '文章分类管理',
          path: '/admin/category',
        },
        {
          name: '文章标签管理',
          path: '/admin/tag',
        },
        {
          name: '前端资源类别管理',
          path: '/admin/resource-type',
        },
        {
          name: '前端资源管理',
          path: '/admin/resource',
        },
        {
          name: '评论管理',
          path: '/admin/comment',
        },
        {
          name: '用户管理',
          path: '/admin/user',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.admin-side-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .admin-side-brand {
    display: block;
    background-color: @colorPrimary;
    color: #fff;
    & > .iconfont {
      display: block;
      line-height: @heightHeader;
      text-align: center;
      &:before {
        display: block;
      }
    }
  }
  .admin-side-menu {
    background-color: @colorBgSideMenu;
    flex: 1;
  }
  .menu-link {
    display: block;
    padding: 15px 24px;
    color: @colorTextSilver;
    background-color: @colorBgSideMenuItem;
    transition: background-color 0.2s ease;
    &:hover {
      color: #fff;
      background-color: darken(@colorBgSideMenuItem, 5%);
    }
    &.current {
      color: #fff;
      background-color: @colorBgSideMenuItemActive;
    }
  }
}
</style>
