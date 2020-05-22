<template>
  <div class="z-container">
    <template v-if="resourceList && resourceList.length > 0">
      <div v-for="resource in resourceList" :key="resource._id">
        <TitleBar :title="resource.name"></TitleBar>
        <div v-if="resource.resource && resource.resource.length > 0" class="z-row">
          <div v-for="resourceItem in resource.resource" :key="resourceItem._id" class="resource-item-wrap z-col-xl-12 z-col-lg-15 z-col-md-20 z-col-sm-30 z-col-xs-30">
            <Card padding="0">
              <a class="resource-item-link no-img-placeholder-colorful no-img-placeholder-horizon" :href="resourceItem.url" target="_blank">
                <img :src="resourceItem.posterUrl" alt="" class="resource-item-poster" />
              </a>
              <div class="resource-info-wrap">
                <h4 class="resource-header">{{ resourceItem.name }}</h4>
                <p :title="resourceItem.desc || resourceItem.metaDesc" class="resource-dis">{{ resourceItem.desc || resourceItem.metaDesc }}</p>
              </div>
            </Card>
          </div>
        </div>
        <NoData v-else style="height: 220px;" />
      </div>
    </template>

    <template v-else>
      <Card>
        <NoData />
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
import TitleBar from '@/components/kit/title-bar/index.js';
import Card from '@/components/base/card/index.js';
import NoData from '@/components/kit/no-data/index.js';

interface ctxProps {
  store: any;
  app: any;
}

export default {
  name: 'Resource',
  components: {
    TitleBar,
    Card,
    NoData,
  },
  async asyncData({ app }: ctxProps) {
    const res = await app.$myApi.resourceTypes.index();
    return {
      resourceList: res.result,
    };
  },
  data() {
    return {
      isLoading: false,
      resourceList: [],
    };
  },
  head() {
    return {
      title: '前端资源',
    };
  },
};
</script>

<style lang="less" scoped>
.resource-item-wrap {
  position: relative;
  .resource-item-link {
    position: relative;
    display: block;
    padding-top: 60%;
  }
  .resource-item-poster {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .resource-info-wrap {
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid @colorBorder;
  }
  .resource-header {
    font-size: 16px;
    font-weight: normal;
  }
  .resource-dis {
    height: 3em;
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.5;
    color: @colorTextSub;
  }
}
</style>
