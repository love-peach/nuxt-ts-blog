import Vuex from 'vuex';
import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'AdminCategory',
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
      isAddLoading: false,
      isEditLoading: false,
      isDeleteLoading: false,
      currentRow: {},
      isShowDeleteModal: false,
      isShowCategoryModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
        },
        {
          title: '名称',
          key: 'name',
          align: 'left',
        },
        {
          title: '属性值',
          key: 'value',
          align: 'left',
        },
        {
          title: '创建时间',
          render: (h: any, params: any) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:mm'));
          },
        },
        {
          title: '修改时间',
          render: (h: any, params: any) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:mm'));
          },
        },
        {
          title: '操作',
          render: (h: any, params: any) => {
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
                      this.handleRowEdit(params.row);
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
                      this.handleRowDel(params.row);
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
    this.requestCategoryList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
      handleGetCategoryList: 'common/requestCategoryList',
    }),

    /**
     * @desc 请求 获取文章分类列表
     */
    requestCategoryList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      this.$myApi.categories
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
     * @desc 请求 新增文章分类列表
     */
    requestAddCategory() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      this.$myApi.categories
        .create(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideCategoryModal();
          this.requestCategoryList();
          this.handleGetCategoryList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章分类列表
     */
    requestEditCategory() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        categoryId: this.currentRow._id,
      };
      this.isEditLoading = true;
      this.$myApi.categories
        .update(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideCategoryModal();
          this.requestCategoryList();
          this.handleGetCategoryList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章分类
     */
    requestDeleteCategory() {
      this.isDeleteLoading = true;
      this.$myApi.categories
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestCategoryList();
          this.handleGetCategoryList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
    },

    /**
     * @desc 分页点击
     */
    handleChangePage(page: number) {
      this.page = page;
      this.requestCategoryList();
    },

    /**
     * @desc 清空表单值
     */
    handleClearFormData() {
      this.formData = {};
    },

    /**
     * @desc 回显表单值
     */
    handleRecoveryFormData(data: any) {
      this.formData = {
        name: data.name,
        value: data.value,
      };
    },

    /**
     * @desc 新增文章分类
     */
    handleAddCategory() {
      this.editMode = 'add';
      this.handleShowCategoryModal();
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row: any) {
      this.editMode = 'edit';
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row);
        this.handleShowCategoryModal();
      }
    },

    /**
     * @desc 表格点击事件 删除
     */
    handleRowDel(row: any) {
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.handleShowDeleteModal();
      }
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.name) {
        this.$toast.error('请填写分类名称');
        return false;
      } else if (!this.formData.value) {
        this.$toast.error('请填写分类属性值');
        return false;
      }
      return true;
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
     * @desc 提交文章分类表单
     */
    handleSubmitCategory() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (!this.handleValidateUserAuth()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditCategory();
      } else {
        this.requestAddCategory();
      }
    },

    /**
     * @desc 显示文章分类表单弹框
     */
    handleShowCategoryModal() {
      this.isShowCategoryModal = true;
    },

    /**
     * @desc 隐藏文章分类表单弹框
     */
    handleHideCategoryModal() {
      this.isShowCategoryModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除文章分类弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章分类弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
