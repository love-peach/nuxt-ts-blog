<template>
  <component :is="tagName" :class="classes" :disabled="disabled" v-bind="tagProps" @click="handleClickLink">
    <Icon v-if="loading" class="z-load-loop" type="loading"></Icon>
    <Icon v-if="icon && !loading && !iconOnRight" :type="icon"></Icon>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
    <Icon v-if="icon && !loading && iconOnRight" :type="icon"></Icon>
  </component>
</template>

<script>
import Icon from '@/components/base/icon/';
import { oneOf } from '@/assets/js/tools';
import mixinsLink from '@/assets/js/mixins/link';

const prefixCls = 'z-btn';

export default {
  name: 'Btn',
  components: {
    Icon,
  },
  mixins: [mixinsLink],
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error', 'dashed', 'text', 'white']);
      },
      default: 'default',
    },
    shape: {
      type: String,
      validator(value) {
        return oneOf(value, ['rect', 'radius', 'circle']);
      },
      default: 'radius',
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default: 'default',
    },
    long: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconOnRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSlot: true,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-ghost`]: this.ghost,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading),
        },
      ];
    },
    isHrefPattern() {
      const { to } = this;
      return !!to;
    },
    tagName() {
      const { isHrefPattern } = this;
      return isHrefPattern ? 'a' : 'button';
    },
    tagProps() {
      const { isHrefPattern } = this;
      if (isHrefPattern) {
        const { linkUrl, target } = this;
        return { href: linkUrl, target };
      } else {
        const { htmlType } = this;
        return { type: htmlType };
      }
    },
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  },
  methods: {
    // Ctrl or CMD and click, open in new window when use `to`
    handleClickLink(event) {
      this.$emit('click', event);
      const openInNewWindow = event.ctrlKey || event.metaKey;
      this.handleCheckClick(event, openInNewWindow);
    },
  },
};
</script>

<style lang="less" src="./btn.less"></style>
