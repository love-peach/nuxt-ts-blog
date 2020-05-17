<template>
  <div :class="classes">
    <div class="z-tag-content">
      <Icon v-if="icon" :type="icon"></Icon>
      <slot></slot>
    </div>
    <icon v-if="closeable" type="close" @click.native.stop="handleClose"></icon>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';
import { oneOf } from '@/assets/js/tools';
const prefixCls = 'z-tag';

export default {
  name: 'Tag',
  components: {
    Icon,
  },
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error']);
      },
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
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
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['border', 'dashed', 'default']);
      },
      default: 'default',
    },
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-closeable`]: this.closeable,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.type}`]: this.type !== 'default',
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
        },
      ];
    },
  },
  methods: {
    handleClose(event) {
      this.$emit('on-close', event);
    },
  },
};
</script>

<style lang="less" scoped src="./tag.less"></style>
