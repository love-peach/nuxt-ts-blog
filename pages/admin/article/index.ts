import Vuex from 'vuex';
import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import ZSwitch from '@/components/base/z-switch/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

const { mapGetters, mapActions } = Vuex;

interface ctxProps {
  app: any;
}

export default {
  name: 'AdminArticle',
  layout: 'admin',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
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
      isShowDeleteModal: false,
      columns: [
        {
          title: '海报',
          key: 'poster',
          width: '80px',
          render: (h: any, parama: any) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank',
                },
                props: {
                  to: {
                    path: `/blog/detail/${parama.row._id}`,
                  },
                },
              },
              [
                h('img', {
                  attrs: {
                    src: parama.row.poster,
                  },
                  style: {
                    width: '80px',
                  },
                }),
              ]
            );
          },
        },
        {
          title: '标题',
          key: 'title',
          align: 'left',
          render: (h: any, parama: any) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank',
                },
                props: {
                  to: {
                    path: `/blog/detail/${parama.row._id}`,
                  },
                },
              },
              parama.row.title
            );
          },
        },
        {
          title: '作者',
          render: (h: any, parama: any) => {
            return h('span', parama.row.authorObj ? parama.row.authorObj.userName : '未知');
          },
        },
        {
          title: '分类',
          key: 'category',
          align: 'left',
          render: (h: any, parama: any) => {
            return h('span', parama.row.categoryObj.name);
          },
        },
        {
          title: '标签',
          key: 'tagArr',
          width: '',
          align: 'left',
          class: 'hidden-xs',
          type: 'array',
          render: (h: any, parama: any) => {
            return h('span', parama.row.tagArray.map((item: any) => item.name).join(','));
          },
        },
        {
          title: '时间',
          key: 'createAt',
          render: (h: any, parama: any) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        {
          title: '浏览',
          key: 'viewed',
        },
        {
          title: '赞',
          key: 'liked',
          render: (h: any, parama: any) => {
            return h('span', parama.row.likes.length);
          },
        },
        // {
        //   title: '评论',
        //   key: 'comment',
        // },
        {
          title: '状态',
          render: (h: any, parama: any) => {
            return h(ZSwitch, {
              props: {
                value: parama.row.status,
              },
              on: {
                change: (value: any) => {
                  this.handleRowToggleStatus(value, parama.row);
                },
              },
            });
          },
        },
        {
          title: '操作',
          render: (h: any, parama: any) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    theme: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.handleRowEdit(parama.row);
                    },
                  },
                },
                '编辑'
              ),
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
                      this.handleRowDel(parama.row);
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
    this.requestblogList();
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
      this.requestblogList();
    },

    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        status: 'all',
      };
      this.$myApi.blogs
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
     * @desc 请求 上下架文章
     */
    requestToggleBlogStatus(value: any, row: any) {
      this.isToggleStatusLoading = true;
      const params = {
        id: row.id,
        blogId: row.id,
        status: value,
      };
      this.$myApi.blogs
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
     * @desc 请求 删除文章
     */
    requestDeleteBlog() {
      this.isDeleteLoading = true;
      this.$myApi.blogs
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.handleHideDeleteBlogModal();
          this.$toast.success('删除成功！');
          this.requestblogList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
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
     * @desc 表格点击事件 上下架状态
     */
    handleRowToggleStatus(value: any, row: any) {
      if (this.handleValidateUserAuth()) {
        this.requestToggleBlogStatus(value, row);
      }
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row: any) {
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.$router.push(`/admin/write/?articleId=${row._id}`);
      }
    },

    /**
     * @desc 表格点击事件 删除
     */
    handleRowDel(row: any) {
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.handleShowDeleteBlogModal();
      }
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowDeleteBlogModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideDeleteBlogModal() {
      this.isShowDeleteModal = false;
    },
  },
};
