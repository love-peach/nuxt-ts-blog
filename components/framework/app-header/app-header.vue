<template>
  <header :class="['app-header-wrap', menuTheme]">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" active-class="current" exact class="app-header-brand">
          <!-- <Icon type="logo" :size="136" /> -->
          <span style="font-size: 16px;font-weight: bold;">技术文档</span>
        </router-link>
        <AppMenu :theme="menuTheme" />
      </div>
    </div>
  </header>
</template>

<script>
// import Icon from '@/components/base/icon/';
import AppMenu from '@/components/framework/app-menu/';

export default {
  name: 'AppHeader',
  components: {
    // Icon,
    AppMenu,
  },
  data() {
    return {
      scrollTop: 0,
      menuTheme: 'black',
    };
  },
};
</script>

<style lang="less" scoped>
.app-header-wrap {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background ease 0.3s;
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-header-brand {
    margin-right: 30px;
    overflow: hidden;
    .iconfont {
      line-height: @heightHeader;
      &:before {
        display: block;
      }
    }
  }
}
.app-header-wrap.white {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  .app-header-brand {
    color: @colorTextContent;
  }
}
.app-header-wrap.black {
  .app-header-brand {
    color: @colorTextSilver;
  }
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
