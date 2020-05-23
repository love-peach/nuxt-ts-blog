import Vue from 'vue';
import Vuex from 'vuex';
import Btn from '@/components/base/btn/index.js';
import Tag from '@/components/base/tag/index.js';
import Card from '@/components/base/card/index.js';
import Billboard from '@/components/kit/billboard/index.js';
import MdPreview from '@/components/kit/md-preview/index.js';

import CardBriefBlog from '@/components/kit/card-brief-blog/index.js';
import CardMdNav from '@/components/kit/card-md-nav/index.js';
import CardNoData from '@/components/kit/card-no-data/index.js';
import CommentsForm from '@/components/kit/comments-form/index.js';
import CommentsList from '@/components/kit/comments-list/index.js';
import Pagenation from '@/components/base/pagenation/index.js';

import { throttle } from '@/assets/js/tools';

const { mapGetters, mapActions } = Vuex;

interface ctxProps {
  store: any;
  app: any;
  params: any;
}

export default Vue.extend({
  name: 'BlogDetail',
  components: {
    Btn,
    Tag,
    Card,
    Billboard,
    MdPreview,
    CardBriefBlog,
    CardMdNav,
    CardNoData,
    CommentsForm,
    CommentsList,
    Pagenation,
  },
  async asyncData({ app, params }: ctxProps) {
    const sendParams = {
      id: params.articleId,
    };
    const res = await app.$myApi.blogs.show(sendParams);
    return {
      blogResult: res.result || {},
    };
  },
  data() {
    return {
      isLikeLoading: false,
      isLoading: false,
      isCommentsListLoading: false,
      blogResult: {},
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
    authorObj() {
      return this.blogResult.authorObj || {};
    },
    isLiked() {
      const likes = this.blogResult.likes;
      if (likes && likes.length > 0 && this.userInfo && this.userInfo._id) {
        return likes.includes(this.userInfo._id);
      }
      return false;
    },
  },
  created() {
    this.requestBlogDetail();
    this.requestCommentsList();
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 20);
    window.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      const jsCardMdNav = document.getElementById('jsCardMdNav') || document.createElement('div');
      const jsBriefWrap = document.getElementById('briefWrap') || document.createElement('div');

      if (t >= jsBriefWrap.clientHeight + 20) {
        jsCardMdNav.classList.add('fixed-side-card');
      } else {
        jsCardMdNav.classList.remove('fixed-side-card');
      }
    },

    /**
     * @desc 评论发表成功 回调
     */
    handleCommentsSuccess() {
      this.$toast.info('添加评论成功，需要通过审核！')
      this.requestCommentsList();
    },

    /**
     * @desc 分页点击
     */
    changePage(page: number) {
      this.page = page;
      this.requestCommentsList();
    },

    /**
     * @desc 请求 文章详情
     */
    requestBlogDetail() {
      this.isLoading = true;
      const params = {
        id: this.$route.params.articleId,
      };
      this.$myApi.blogs
        .show(params)
        .then((res: any) => {
          this.isLoading = false;
          this.blogResult = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentsList() {
      this.isCommentsListLoading = true;
      const params = {
        blogId: this.$route.params.articleId,
        page: this.page,
        limit: this.limit,
      };
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
    },

    /**
     * @desc 请求 点赞
     */
    requestLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id,
      };
      this.isLikeLoading = true;

      this.$myApi.blogs
        .PostBlogLike(params)
        .then((res: any) => {
          // this.$toast.success('已赞！');
          this.blogResult.likes = res.result.likes;
          this.isLikeLoading = false;
        })
        .catch(() => {
          this.isLikeLoading = false;
        });
    },

    /**
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id,
      };
      this.isLikeLoading = true;

      this.$myApi.blogs
        .PostBlogUnLike(params)
        .then((res: any) => {
          // this.$toast.error('已取消赞！');
          this.blogResult.likes = res.result.likes;
          this.isLikeLoading = false;
        })
        .catch(() => {
          this.isLikeLoading = false;
        });
    },

    /**
     * @desc 点击事件 点赞
     */
    handleLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestLike();
      } else {
        this.toggleSignInModal(true);
      }
    },

    /**
     * @desc 点击事件 取消点赞
     */
    handleUnLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestUnLike();
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },
  },
  head() {
    return {
      title: `${this.blogResult.title} 详情页`,
      meta: [{ hid: 'article-detail referrer', name: 'referrer', content: 'never' }],
    };
  },
});
