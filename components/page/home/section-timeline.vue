<template>
  <div class="timeline-wrap">
    <ul class="timeline">
      <li v-for="(item, index) in times" :key="index" class="timeline-item">
        <h3 class="timeline-item-title">{{ item.title }}</h3>
        <span class="timeline-item-datearea">{{ item.datearea }}</span>
        <p class="timeline-item-desc">{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SectionTimeline',
  props: {
    times: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.timeline {
  &-wrap {
    padding-left: 140px;
  }
  position: relative;
  border-left: 4px solid lighten(@colorTextDisable, 11%);
  padding-top: 40px;
  max-width: 720px;
  margin: 0 auto;

  &-item {
    position: relative;
    padding-left: 30px;
    list-style: none;
    &::after {
      content: '';
      position: absolute;
      left: -11px;
      top: 0;
      height: 10px;
      width: 10px;
      border-radius: 10px;
      border: 4px solid lighten(@colorTextDisable, 11%);
      background-color: @colorBgBody;
    }
  }
  &-item + &-item {
    margin-top: 30px;
  }
  &-item-datearea {
    position: absolute;
    top: 0;
    width: 110px;
    margin-left: -180px;
    text-align: right;
    font-size: 14px;
    color: @colorTextLight;
    white-space: nowrap;
  }
  &-item-title {
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
    color: @colorTextTitle;
  }
  &-item-desc {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.4;
    color: @colorTextContent;
  }
}
@media screen and (max-width: @breakpoints-sm) {
  .timeline {
    &-wrap {
      padding-left: 0;
    }
    &-item-datearea {
      position: relative;
      display: inline-block;
      margin-left: 0;
      text-align: left;
      margin-top: 5px;
    }
  }
}
</style>
