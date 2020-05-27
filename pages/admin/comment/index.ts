import Vuex from 'vuex';
import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import ZSwitch from '@/components/base/z-switch/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';
import AdminCommentFilter from '@/components/page/admin/admin-comment-filter.vue';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'AdminComment',
  layout: 'admin',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
    AdminCommentFilter,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      tableData: [],
      isLoading: false,
      isDeleteLoading: false,
      currentRow: {},
      currentReplyRow: {},
      filterData: {
        status: 'all',
      },
      isShowDeleteModal: false,
      isShowReplyModal: false,
      columns: [
        {
          title: '头像',
          key: 'poster',
          width: '80px',
          render: (h: any, parama: any) => {
            return h('img', {
              attrs: {
                src: parama.row.from ? parama.row.from.avatar : '',
              },
              style: {
                height: '30px',
              },
            });
          },
        },
        {
          title: '用户名',
          minWidth: '120px',
          render: (h: any, parama: any) => {
            return h('span', parama.row.from ? parama.row.from.userName : '未知');
          },
        },
        {
          title: '内容',
          key: 'content',
          align: 'left',
        },
        {
          title: '回复',
          key: 'content',
          minWidth: '70px',
          render: (h: any, parama: any) => {
            return h(
              Btn,
              {
                props: {
                  theme: 'text',
                },
                on: {
                  click: () => {
                    this.currentRow = parama.row;
                    this.handleShowReplyModal();
                  },
                },
              },
              parama.row.reply.length
            );
          },
        },
        {
          title: '评论文章',
          key: 'title',
          align: 'left',
          minWidth: '200px',
          render: (h: any, parama: any) => {
            if (!parama.row.blogObj) {
              return h('span', '文章已删除！');
            }
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank',
                },
                props: {
                  to: {
                    path: `/article/detail/${parama.row.blogObj.id}`,
                  },
                },
              },
              parama.row.blogObj.title
            );
          },
        },
        {
          title: '时间',
          key: 'createAt',
          minWidth: '170px',
          render: (h: any, parama: any) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        {
          title: '审核通过',
          minWidth: '100px',
          render: (h: any, parama: any) => {
            return h(ZSwitch, {
              props: {
                value: parama.row.status,
              },
              on: {
                change: (value: any) => {
                  if (this.handleValidateUserAuth()) {
                    this.requestToggleCommentStatus(value, parama.row);
                  }
                },
              },
            });
          },
        },
        {
          title: '操作',
          minWidth: '80px',
          render: (h: any, parama: any) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    theme: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.currentRow = parama.row;
                      if (this.handleValidateUserAuth()) {
                        this.handleShowDeleteCommentModal();
                      }
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
      ],
      columnsRepay: [
        {
          title: '头像',
          key: 'poster',
          width: '80px',
          render: (h: any, parama: any) => {
            return h('img', {
              attrs: {
                src: parama.row.from ? parama.row.from.avatar : '',
              },
              style: {
                height: '30px',
              },
            });
          },
        },
        {
          title: '用户名',
          minWidth: '120px',
          render: (h: any, parama: any) => {
            return h('span', parama.row.from ? parama.row.from.userName : '未知');
          },
        },
        {
          title: '内容',
          key: 'content',
          align: 'left',
        },
        {
          title: '时间',
          key: 'createAt',
          minWidth: '170px',
          render: (h: any, parama: any) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        {
          title: '操作',
          minWidth: '80px',
          render: (h: any, parama: any) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    theme: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.currentReplyRow = parama.row;
                      if (this.handleValidateUserAuth()) {
                        this.handleShowDeleteCommentModal();
                      }
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
      ],
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
     * @desc 表单检索
     */
    handleSearch(filterData: any) {
      this.filterData = filterData;
      this.page = 1;
      this.requestCommentList();
    },

    /**
     * @desc 分页点击
     */
    changePage(page: number) {
      this.page = page;
      this.requestCommentList();
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.filterData,
      };
      this.$myApi.comments
        .index(params)
        .then((res: any) => {
          this.tableData = res.result.list;
          this.pageTotal = res.result.pages;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 请求 上下架评论
     */
    requestToggleCommentStatus(value: any, row: any) {
      this.isToggleStatusLoading = true;
      const params = {
        id: row.id,
        commentId: row.id,
        status: value,
      };
      this.$myApi.comments
        .update(params)
        .then(() => {
          this.isToggleStatusLoading = false;
          this.$toast.success('操作成功！');
          row.status = value;
        })
        .catch(() => {
          this.isToggleStatusLoading = false;
        });
    },

    /**
     * @desc 请求 删除评论
     */
    requestDeleteComment() {
      this.isDeleteLoading = true;
      this.$myApi.comments
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.handleHideDeleteCommentModal();
          this.$toast.success('删除成功！');
          this.requestCommentList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
    },

    /**
     * @desc 请求 删除回复
     */
    requestDeleteReply() {
      this.isDeleteLoading = true;
      this.$myApi.replys
        .delete(this.currentReplyRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.handleHideDeleteCommentModal();
          this.handleHideReplyModal();
          this.$toast.success('删除成功！');
          this.requestCommentList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
    },

    /**
     * @desc 确认删除
     */
    handleConfirmDelete() {
      if (this.isShowReplyModal) {
        this.requestDeleteReply();
      } else {
        this.requestDeleteComment();
      }
    },

    /**
     * @desc 验证是否已登录，是否为 admin 用户
     */
    handleValidateUserAuth() {
      let isUserAuth = false;
      if (this.userInfo) {
        if (this.userInfo.userName === 'admin') {
          isUserAuth = true;
        } else {
          this.$toast.error('非admin，无权限！');
        }
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
      return isUserAuth;
    },

    /**
     * @desc 显示删除评论弹框
     */
    handleShowDeleteCommentModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除评论弹框
     */
    handleHideDeleteCommentModal() {
      this.isShowDeleteModal = false;
    },

    /**
     * @desc 显示删除评论弹框
     */
    handleShowReplyModal() {
      this.isShowReplyModal = true;
    },

    /**
     * @desc 隐藏删除评论弹框
     */
    handleHideReplyModal() {
      this.isShowReplyModal = false;
    },
  },
};
