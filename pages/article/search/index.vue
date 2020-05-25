<template>
  <div class="z-container">
    <div class="filter-bar">
      <div class="z-row">
        <div class="z-col-sm-10">
          <FilterSelect v-model="formData.category" :options="categoryListFormat" placeholder="不限分类" label-key="name" value-key="_id" @on-change="handleChangeCategory"></FilterSelect>
        </div>
        <div class="z-col-sm-10">
          <FilterSelect v-model="formData.tag" :options="tagList" multiple placeholder="不限标签" label-key="name" value-key="_id" @on-change="handleChangeTag"></FilterSelect>
        </div>
      </div>
    </div>

    <div class="z-row">
      <div class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList.length > 0">
          <Card v-for="(blog, index) in blogList" :key="index">
            <TopicItem :topic="blog"></TopicItem>
          </Card>
        </template>
        <CardNoData v-else style="height: 300px;" />
        <Pagenation v-if="blogList && blogList.length > 0 && itemTotal > 10" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <Card class="search-wrap">
          <SearchBlog @on-search="handleSearch"></SearchBlog>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import TopicItem from '@/components/kit/topic-item/index.js';
import CardNoData from '@/components/kit/card-no-data/';
import SearchBlog from '@/components/kit/search-blog/';
import FilterSelect from '@/components/kit/filter-select/index.js';
import Pagenation from '@/components/base/pagenation/';

const { mapGetters } = Vuex;

interface ctxProps {
  store: any;
  app: any;
  params: any;
  query: any;
}

export default Vue.extend({
  name: 'BlogSearch',
  components: {
    Card,
    TopicItem,
    CardNoData,
    SearchBlog,
    FilterSelect,
    Pagenation,
  },
  async fetch({ store }: ctxProps) {
    await store.dispatch('common/requestTagList');
  },
  async asyncData({ app, query }: ctxProps) {
    const params = {
      page: 1,
      limit: 10,
      ...query,
    };
    const res = await app.$myApi.blogs.index(params);
    return {
      blogList: res.result.list,
      pageTotal: res.result.pages,
      itemTotal: res.result.total,
    };
  },
  data() {
    return {
      formData: {},
      page: 1,
      limit: 10,
      pageTotal: 0,
      itemTotal: 0,
      blogList: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      tagList: 'getTagList',
      categoryList: 'getCategoryList',
    }),
    categoryListFormat() {
      return this.categoryList.filter((item: any) => item.value !== '/');
    },
  },
  mounted() {
    const { keyword, tag } = this.$route.query;
    if (keyword) {
      this.formData.keyword = keyword;
    }
    if (tag) {
      this.$set(this.formData, 'tag', [this.$route.query.tag]);
    }
  },
  methods: {
    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.formData,
      };

      this.$myApi.blogs
        .index(params)
        .then((res: any) => {
          this.blogList = res.result.list;
          this.pageTotal = res.result.pages;
          this.itemTotal = res.result.total;
          this.isLoading = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    handleChangeCategory() {
      this.page = 1;
      this.requestblogList();
    },

    handleChangeTag() {
      this.page = 1;
      this.requestblogList();
    },

    /**
     * @desc 搜索
     */
    handleSearch(keyword: string) {
      this.page = 1;
      this.formData.keyword = keyword;
      this.requestblogList();
    },
    /**
     * @desc 分页点击
     */
    changePage(page: number) {
      this.page = page;
      this.requestblogList();
    },
  },
  head() {
    return {
      title: '前端文章搜索结果',
    };
  },
});
</script>

<style lang="less">
.filter-bar {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid darken(@colorBorder, 5%);
  background-color: @colorBgBody;
}
.list-side {
  position: sticky;
  top: @heightHeader + 20;
  z-index: 10;
}
.z-card.search-wrap {
  margin: 5px 0;
  // background-color: transparent;
  background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
}
</style>
