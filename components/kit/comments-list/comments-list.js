import CommentsForm from '@/components/kit/comments-form/';

export default {
  name: 'CommentsList',
  components: {
    CommentsForm,
  },
  props: {
    commentsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      commentId: '',
      toUserId: '',
    };
  },
  methods: {
    handleRepay(data) {
      this.commentId = data.id;
      this.toUserId = data.from.id;
    },
    handleUnRepay() {
      this.commentId = '';
      this.toUserId = '';
    },

    handleCommentsSuccess() {
      this.commentId = '';
      this.toUserId = '';
      this.$emit('on-fresh');
      this.$toast.info('回复成功');
    },
  },
};
