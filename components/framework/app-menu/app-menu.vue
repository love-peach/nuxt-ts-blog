<template>
  <div :class="classes">
    <Icon class="app-menu-handle" type="liebiao" :size="24" @click="handleToggleMenu" />
    <ul class="app-menu-list">
      <li v-for="(nav, index) in navList" :key="index" class="app-menu-link">
        <router-link active-class="current" :to="nav.path">{{ nav.name }}</router-link>
      </li>
      <li class="app-menu-link app-menu-login">
        <LoginControl :theme="theme" />
      </li>
    </ul>
  </div>
</template>

<script>
import LoginControl from './login-control.vue';
import Icon from '@/components/base/icon/';

const prefixCls = 'app-menu';

export default {
  name: 'AppMenu',
  components: {
    Icon,
    LoginControl,
  },
  props: {
    theme: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {
      isShowMenu: false,
      navList: [
        // {
        //   name: '首页',
        //   path: '/',
        // },
        {
          name: '前端文章',
          path: '/article',
        },
        {
          name: '前端资源',
          path: '/resource',
        },
        {
          name: '豆瓣电影',
          path: '/movie',
        },
        {
          name: '电子书',
          path: '/ebook',
        },
        {
          name: '后台管理',
          path: '/admin',
        },
      ],
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-show`]: this.isShowMenu,
        },
      ];
    },
  },
  methods: {
    /**
     * @desc 小屏下 切换显示
     */
    handleToggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
  },
};
</script>

<style lang="less" scoped>
.app-menu {
  &-handle {
    display: none;
    padding: 12px;
  }
  &-link {
    position: relative;
    display: inline-block;
    padding: 0 15px;
    margin: 0 10px;
    line-height: @heightHeader;
    font-size: 15px;
    cursor: pointer;
    transition: color 0.25s ease;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      height: 2px;
      width: 0;
      border-radius: 2px;
      background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
      transition: all 0.3s ease;
    }
    &:hover {
      &:after {
        width: 100%;
        left: 0;
      }
    }
    &.current {
      &:after {
        width: 100%;
        left: 0;
      }
    }
  }
}

.app-menu-white {
  .app-menu-link {
    &.current {
      color: @colorPrimary;
    }
    &:hover {
      color: @colorPrimary;
    }
  }
}

.app-menu-black {
  color: @colorTextSilver;
  .app-menu-link {
    &.current {
      color: @colorTextWhite;
    }
    &:hover {
      color: @colorTextWhite;
    }
  }
}

@media only screen and (max-width: @breakpoints-lg) {
  .app-menu {
    &-handle {
      display: block;
    }
    &-list {
      height: 0;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      background-color: #323232;
    }
    &-show &-list {
      height: auto;
      overflow: inherit;
      top: @heightHeader;
    }
  }
  .app-menu-black,
  .app-menu-white {
    color: @colorTextLight;
    .app-menu-link {
      display: block;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.05);

      &:after {
        display: none;
      }
      &.current {
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
    }
  }
}
.app-menu-login {
  &:after {
    display: none;
  }
}
</style>
