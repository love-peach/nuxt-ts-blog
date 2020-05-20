<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle :title="`您已发表 ${totalEle} 条评论。`" title-sub="提示：认真填写的点评会帮助到别人哦。"></UserPageTitle>
    <template v-if="commentsList && commentsList.length">
      <UserCommentItem v-for="(item, index) in commentsList" :key="index" :comment="item"></UserCommentItem>
      <Pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    </template>

    <template v-else>
      <NoData style="height: 300px;"></NoData>
    </template>
  </Card>
</template>

<script lang="ts">
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';
import UserPageTitle from '@/components/page/user/user-page-title.vue';
import UserCommentItem from '@/components/page/user/user-comment-item.vue';
import Pagenation from '@/components/base/pagenation/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserComment',
  layout: 'user',
  components: {
    Card,
    NoData,
    UserPageTitle,
    UserCommentItem,
    Pagenation,
  },
  data() {
    return {
      commentsList: [],
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0,
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  mounted() {
    this.requestCommentList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 分页点击
     */
    changePage(page: number) {
      this.page = page;
      this.requestCommentsList();
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentList() {
      const storeCacheStr = sessionStorage.getItem('storeCache') || '{}';
      const storeCache = JSON.parse(storeCacheStr);
      const cacheId = storeCache && storeCache.common && storeCache.common.userInfo && storeCache.common.userInfo._id ? storeCache.common.userInfo._id : '';

      if ((this.userInfo && this.userInfo._id) || cacheId) {
        const params = {
          from: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId,
          page: this.page,
          limit: this.limit,
        };
        this.isCommentsListLoading = true;
        this.$myApi.comments
          .index(params)
          .then((res: any) => {
            this.isCommentsListLoading = false;
            this.commentsList = res.result.list;
            this.pageTotal = res.result.pages;
            this.totalEle = res.result.total;
          })
          .catch(() => {
            this.isCommentsListLoading = false;
          });
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },
  },
};
</script>
