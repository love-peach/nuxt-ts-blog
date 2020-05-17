<template>
  <div :class="prefixCls">
    <transition :name="mergedOption.transition">
      <div v-show="showing" :id="mergedOption.id" :class="clazz" :transition="mergedOption.transition">
        <Icon v-if="option.icon" :type="option.icon" style="margin-right: 5px;" />
        <span :class="`${prefixCls}-content`" v-html="mergedOption.message"></span>
        <a v-if="mergedOption.closeable" :class="`${prefixCls}-close`" @click="close()">&times;</a>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';

const DEFAULT_OPT = {
  id: 'my-toast',
  horizontalPosition: 'center',
  verticalPosition: 'top',
  parent: 'body',
  transition: 'slide-down',
  duration: 3000,
  size: '',
  type: 'info',
  icon: '',
  message: '',
  closeable: false,
};

const prefixCls = 'z-toast';

export default {
  DEFAULT_OPT,
  components: {
    Icon,
  },
  data() {
    return {
      prefixCls: 'z-toast',
      queue: [],
      option: {},
      showing: false,
    };
  },
  computed: {
    mergedOption() {
      return Object.assign({}, DEFAULT_OPT, this.option);
    },
    clazz() {
      const { type, size, horizontalPosition, verticalPosition, closeable } = this.mergedOption;
      return [
        `${prefixCls}`,
        `${prefixCls}-wrapper`,
        `${prefixCls}-${type}`,
        {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-${horizontalPosition}`]: horizontalPosition,
          [`${prefixCls}-${verticalPosition}`]: verticalPosition,
          [`${prefixCls}-closeable`]: closeable,
        },
      ];
    },
  },
  watch: {
    queue() {
      const pending = this.queue.length;
      if (pending === 0) {
        return;
      }
      this.showing = true;
      this.option = this.queue[0];
      if ((!this.option.mode || this.option.mode === 'override') && pending > 1) {
        clearTimeout(this.timeoutId);
        this.showing = false;
        this.timeoutId = null;
        this.timeoutId = setTimeout(() => this.queue.shift());
      } else {
        this.timeoutId = setTimeout(() => {
          this.showing = false;
          this.timeoutId = null;
          setTimeout(() => this.queue.shift());
        }, this.mergedOption.duration);
      }
    },
  },
  methods: {
    close() {
      this.showing = false;
      this.queue.shift();
    },
  },
};
</script>

<style lang="less" src="./toast.less" scoped></style>
