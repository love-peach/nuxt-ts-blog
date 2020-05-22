import Vue from 'vue';
import Vuex from 'vuex';
import ZSelect from '@/components/base/z-select/';
import Btn from '@/components/base/btn/';
import Upload from '@/components/base/upload/';
import MdEditor from '@/components/kit/md-editor/';
import ZSwitch from '@/components/base/z-switch/';

const { mapGetters, mapActions } = Vuex;

interface ctxProps {
  store: any;
  app: any;
}

export default Vue.extend({
  name: 'AdminWrite',
  layout: 'admin',
  components: {
    ZSelect,
    Btn,
    Upload,
    MdEditor,
    ZSwitch,
  },
  data() {
    return {
      isPostBlogLoading: false,
      isBlogDetailLoading: false,
      formData: {
        poster: '',
        status: true,
      },
      isTagLoading: false,
      articleId: this.$route.query.articleId,
      uploadParams: { usedFor: 'poster' },
    };
  },
  computed: {
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
      userInfo: 'getUserInfo',
      tagList: 'getTagList',
    }),
  },
  mounted() {
    if (!this.tagList || !this.tagList.length) {
      this.$store.dispatch('common/requestTagList');
    }
    if (!this.categoryList || !this.categoryList.length) {
      this.$store.dispatch('common/requestCategoryList');
    }
    if (this.articleId) {
      this.requestBlogDetail();
    }
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 请求 博客详情 编辑
     */
    requestBlogDetail() {
      const params = {
        id: this.articleId,
      };
      this.isBlogDetailLoading = true;
      this.$myApi.blogs
        .show(params)
        .then((res: any) => {
          this.isBlogDetailLoading = false;
          this.handleRecoveryBlogDetail(res.result);
        })
        .catch(() => {
          this.isBlogDetailLoading = false;
        });
    },

    /**
     * @desc 编辑的时候 博客详情回显
     */
    handleRecoveryBlogDetail(data: any) {
      const { title, category, tag, poster, content, status } = data;
      this.formData = {
        title,
        category: [category],
        tag,
        poster,
        content,
        status,
      };
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file: any) {
      this.$toast.warning(`文件 ${file.name} 格式不对, 请选择 jpg or png.`, { duration: 4000 });
    },

    /**
     * @desc 上传 大小限制
     */
    handleMaxSize(file: any) {
      this.$toast.warning(`文件 ${file.name} 太大, 不可超过2M`);
    },

    /**
     * @desc 上传 成功
     */
    handleUploadSuccess(res: any) {
      this.formData.poster = res.result.path;
    },

    /**
     * @desc 检查表单填写是否合格
     */
    checkIsReadyPost() {
      const { title, category, tag, poster, content } = this.formData;
      if (!this.userInfo) {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      } else if (!title) {
        this.$toast.error('请填写文章标题');
      } else if (!category) {
        this.$toast.error('请选择文章分类');
      } else if (!tag) {
        this.$toast.error('请选择文章标签');
      } else if (!poster) {
        this.$toast.error('请选择文章海报');
      } else if (!content) {
        this.$toast.error('请填写文章内容');
      } else {
        return true;
      }
      return false;
    },

    /**
     * @desc 提交
     */
    handleSubmit() {
      if (!this.checkIsReadyPost()) {
        return;
      }
      if (this.articleId) {
        this.requestEditArticle();
      } else {
        this.requestArticle();
      }
    },

    /**
     * @desc 请求 发布文章
     */
    requestArticle() {
      const params = {
        ...this.formData,
        author: this.userInfo._id,
      };
      this.isPostBlogLoading = true;
      this.$myApi.blogs
        .create(params)
        .then((res: any) => {
          this.isPostBlogLoading = false;
          this.$router.push({ path: `/article/detail/${res.result._id}` });
        })
        .catch(() => {
          this.isPostBlogLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章
     */
    requestEditArticle() {
      const params = {
        ...this.formData,
        id: this.articleId,
        blogId: this.articleId,
        author: this.userInfo._id,
      };
      this.isPostBlogLoading = true;
      this.$myApi.blogs
        .update(params)
        .then((res: any) => {
          this.isPostBlogLoading = false;
          this.$router.push({ path: `/article/detail/${res.result._id}` });
        })
        .catch(() => {
          this.isPostBlogLoading = false;
        });
    },
  },
});
