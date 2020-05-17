<template>
  <div class="no-data-wrap">
    <Icon type="no-data" class="no-data-icon" :size="size" :color="color" />
  </div>
</template>
<script>
import Icon from '@/components/base/icon/';

export default {
  name: 'NoData',
  components: {
    Icon,
  },
  props: {
    size: {
      type: [Number, String],
      default: 150,
    },
    color: {
      type: String,
      default: '#ccc',
    },
  },
};
</script>

<style lang="less" scoped>
.no-data-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
