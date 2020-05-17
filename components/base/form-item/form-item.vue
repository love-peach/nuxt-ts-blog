<template>
  <div class="form-item">
    <label v-if="labelWidth" class="form-item-label" :style="labelStyle">{{ label }} <small v-if="required">*</small></label>
    <div class="form-item-content">
      <slot></slot>
      <span v-if="tip" class="tip">{{ tip }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: [Number, String],
      default: '120px',
    },
    tip: {
      type: String,
      default: '',
    },
    required: Boolean,
  },
  computed: {
    labelStyle() {
      return {
        width: typeof this.labelWidth === 'number' ? `${this.labelWidth}px` : this.labelWidth,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.form-item {
  position: relative;
  margin: 10px 0;
  display: flex;
  align-items: center;
  .form-item-label {
    font-size: 14px;
    display: inline-block;
    text-align: right;
    margin-right: 20px;
    vertical-align: middle;
    color: @colorTextSub;
  }
  .form-item-content {
    flex: 1;
  }
  .tip {
    font-size: 12px;
    margin: auto 10px;
    color: @colorTextLight;
  }
}
</style>
