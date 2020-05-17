<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" :style="modalContainerStyle" @click.stop="">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>

          <a class="mode-close" href="javascript:;" @click="$emit('close')">
            <i class="iconfont icon-Close"></i>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    width: {
      type: [Number, String],
      default: '300px',
    },
  },
  computed: {
    modalContainerStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
      };
    },
  },
};
</script>

<style lang="less" scoped src="./modal.less"></style>
