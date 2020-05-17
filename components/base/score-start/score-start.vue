<template>
  <div class="score-start-wrap">
    <div class="score-start">
      <div class="score-start-active" :style="style">
        <Icon v-for="i in 5" :key="i" type="biaoxingfill" />
      </div>
      <div class="score-start-default">
        <Icon v-for="i in 5" :key="i" type="biaoxing" />
      </div>
    </div>
    <span class="score-start-num">{{ value }}</span>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';

export default {
  name: 'ScoreStart',
  components: {
    Icon,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    style() {
      return {
        width: `${(this.value / this.total) * 100}%`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.score-start {
  position: relative;
  display: inline-block;
  width: 5em;
  &-wrap {
    display: inline-block;
    // width: 7em;
  }
  &-active {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    color: @colorWarning;
    white-space: nowrap;
    .iconfont {
      vertical-align: inherit;
    }
  }
  &-default {
    display: inline-block;
    color: @colorTextSub;
    .iconfont {
      vertical-align: inherit;
    }
  }
  &-num {
    // margin-left: 5px;
    color: @colorWarning;
  }
}
</style>
