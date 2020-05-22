<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList && blogList.length > 0">
          <Card v-for="(blog, index) in blogList" :key="index">
            <TopicItem :topic="blog"></TopicItem>
          </Card>
        </template>
        <CardNoData v-else style="height: 300px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <Card class="search-wrap">
          <SearchBlog @on-search="handleSearch"></SearchBlog>
        </Card>
        <CardCategory :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import TopicItem from '@/components/kit/topic-item/index.js';
import Card from '@/components/base/card/';
import CardNoData from '@/components/kit/card-no-data/';
import CardCategory from '@/components/kit/card-category/';
import SearchBlog from '@/components/kit/search-blog/';

const { mapGetters } = Vuex;

interface ctxProps {
  store: any;
  app: any;
}

export default Vue.extend({
  name: 'BlogList',
  components: {
    Card,
    TopicItem,
    CardNoData,
    CardCategory,
    SearchBlog,
  },
  async fetch({ store }: ctxProps) {
    await store.dispatch('common/requestCategoryList');
  },
  async asyncData({ app }: ctxProps) {
    const params = {
      page: 1,
      limit: 10,
      category: '',
    };
    const res = await app.$myApi.blogs.index(params);
    return {
      blogList: res.result.list,
    };
  },
  data() {
    return {
      page: 1,
      limit: 10,
      blogList: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', ['getCategoryIdByValue']),
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
  methods: {
    /**
     * @desc 搜索
     */
    handleSearch(keyword: string): void {
      this.$router.push({ path: '/article/search', query: { keyword } });
    },
  },
  head() {
    return {
      title: '前端文章',
    };
  },
});
</script>

<style lang="less">
.list-side {
  position: sticky;
  top: @heightHeader + 20;
}
.z-card.search-wrap {
  background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
}
</style>
