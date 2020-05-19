import Vue from 'vue';
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import Btn from '@/components/base/btn/';

const { mapGetters, mapActions } = Vuex;

export default Vue.extend({
  name: 'CardCommentsForm',
  components: {
    Btn,
    Card,
  },
  props: {
    commentId: String,
    toUserId: String,
  },
  data() {
    return {
      isAddCommentLoading: false,
      formData: {
        content: '',
      },
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    handleLogin() {
      this.toggleSignInModal(true);
    },

    handleComment() {
      if (this.userInfo && this.userInfo._id) {
        if (this.commentId) {
          this.requestRepay();
        } else {
          this.requestComments();
        }
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },

    /**
     * @desc 请求 发表评论
     */
    requestComments() {
      const params = {
        blogId: this.$route.params.blogId,
        from: this.userInfo._id,
        content: this.formData.content,
      };
      this.isAddCommentLoading = true;
      this.$myApi.comments
        .create(params)
        .then(() => {
          this.formData.content = '';
          this.$emit('on-success');
          this.isAddCommentLoading = false;
        })
        .catch(() => {
          this.isAddCommentLoading = false;
        });
    },

    /**
     * @desc 请求 发表回复
     */
    requestRepay() {
      const params = {
        commentId: this.commentId,
        from: this.userInfo._id,
        to: this.toUserId,
        content: this.formData.content,
      };
      this.isAddCommentLoading = true;
      this.$myApi.replys
        .create(params)
        .then(() => {
          this.formData.content = '';
          this.$emit('on-success');
          this.isAddCommentLoading = false;
        })
        .catch(() => {
          this.isAddCommentLoading = false;
        });
    },
  },
});
