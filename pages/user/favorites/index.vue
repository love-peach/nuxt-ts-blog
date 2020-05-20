<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle :title="`您已送出${totalEle}个爱心`" title-sub="提示：赞美别人就是肯定自己。"></UserPageTitle>
    <div class="z-row">
      <div v-for="(item, index) in blogList" :key="index" class="z-col-15">
        <UserFavoritesCard :blog-data="item">
          <Btn icon="liked" theme="error" shape="rect" long @click="handleUnLike(item)">取消</Btn>
        </UserFavoritesCard>
      </div>
    </div>
    <Pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 30px;" />
    <Modal v-if="isShowUnlikeModal" @close="handleHideUnlikeModal">
      <h3 slot="header">确认取消喜欢?</h3>
      <div slot="footer">
        <Btn theme="error" long :loading="isUnLikeLoading" @click="requestUnLike">确认取消</Btn>
      </div>
    </Modal>
  </Card>
</template>

<script lang="ts">
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import UserPageTitle from '@/components/page/user/user-page-title.vue';
import Pagenation from '@/components/base/pagenation/';
import Btn from '@/components/base/btn/';
import UserFavoritesCard from '@/components/page/user/user-favorites-card.vue';
import Modal from '@/components/base/modal/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserFavorites',
  layout: 'user',
  components: {
    Card,
    UserPageTitle,
    Pagenation,
    Btn,
    UserFavoritesCard,
    Modal,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0,
      blogList: [],
      isLoading: false,
      isShowUnlikeModal: false,
      isUnLikeLoading: false,
      currentRow: {},
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  mounted() {
    this.requestblogList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
      handleChangeUserInfo: 'common/changeUserInfo',
    }),

    /**
     * @desc 分页点击
     */
    changePage(page: number) {
      this.page = page;
      this.requestblogList();
    },

    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      const storeCacheStr = sessionStorage.getItem('storeCache') || '{}';
      const storeCache = JSON.parse(storeCacheStr);
      const cacheId = storeCache && storeCache.common && storeCache.common.userInfo && storeCache.common.userInfo._id ? storeCache.common.userInfo._id : '';

      if ((this.userInfo && this.userInfo._id) || cacheId) {
        const params = {
          page: this.page,
          limit: this.limit,
          likes: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId,
        };
        this.isLoading = true;
        this.$myApi.blogs
          .index(params)
          .then((res: any) => {
            this.blogList = res.result.list;
            this.pageTotal = res.result.pages;
            this.totalEle = res.result.total;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },

    /**
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.currentRow.id,
        userId: this.userInfo._id,
      };
      this.isUnLikeLoading = true;
      this.$myApi.blogs
        .PostBlogUnLike(params)
        .then(() => {
          this.$toast.warning('已取消赞！');
          this.requestblogList();
          this.isUnLikeLoading = false;
          this.handleHideUnlikeModal();
        })
        .catch(() => {
          this.isUnLikeLoading = false;
        });
    },

    handleUnLike(row: any) {
      this.currentRow = row;
      this.handleShowUnlikeModal();
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowUnlikeModal() {
      this.isShowUnlikeModal = true;
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideUnlikeModal() {
      this.isShowUnlikeModal = false;
    },
  },
};
</script>
