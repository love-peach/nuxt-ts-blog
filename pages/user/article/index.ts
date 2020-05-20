import Vuex from 'vuex';
import Card from '@/components/base/card/';
import UserPageTitle from '@/components/page/user/user-page-title.vue';
import ZTable from '@/components/base/table/';
import Pagenation from '@/components/base/pagenation/';
import Btn from '@/components/base/btn/';
import ZSwitch from '@/components/base/z-switch/';
import Modal from '@/components/base/modal/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserBlog',
  layout: 'user',
  components: {
    Card,
    UserPageTitle,
    ZTable,
    Pagenation,
    Btn,
    ZSwitch,
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
      isShowDeleteModal: false,
      currentRow: {},
      columns: [
        {
          title: '海报',
          key: 'poster',
          class: 'hidden-xs hidden-sm',
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
                    path: `/article/detail/${parama.row._id}`,
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
                    path: `/article/detail/${parama.row._id}`,
                  },
                },
              },
              parama.row.title
            );
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
          class: 'visible-lg visible-xl',
          render: (h: any, parama: any) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm:ss');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm:ss');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        // {
        //   title: '浏览',
        //   key: 'viewed',
        // },
        // {
        //   title: '赞',
        //   key: 'liked',
        // },
        // {
        //   title: '评论',
        //   key: 'comment',
        // },
        {
          title: '状态',
          class: 'hidden-xs',
          render: (h: any, parama: any) => {
            return h(ZSwitch, {
              props: {
                value: parama.row.status,
              },
              on: {
                change: (value: any) => {
                  this.requestToggleBlogStatus(value, parama.row);
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
                    to: { path: `/user/write/?articleId=${parama.row._id}` },
                    theme: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
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
                      this.currentRow = parama.row;
                      this.handleShowDeleteBlogModal();
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
    this.$nextTick(() => {
      this.requestblogList();
    });
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
      const storeCacheStr = sessionStorage.getItem('storeCache') || '{}';
      const storeCache = JSON.parse(storeCacheStr);
      const cacheId = storeCache && storeCache.common && storeCache.common.userInfo && storeCache.common.userInfo._id ? storeCache.common.userInfo._id : '';

      if ((this.userInfo && this.userInfo._id) || cacheId) {
        const params = {
          page: this.page,
          limit: this.limit,
          status: 'all',
          author: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId,
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
