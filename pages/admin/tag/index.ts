import Vuex from 'vuex';
import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'AdminTag',
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
      isShowTagModal: false,
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
    this.requestTagList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
      handleGetTagList: 'common/requestTagList',
    }),

    /**
     * @desc 请求 获取标签列表
     */
    requestTagList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      this.$myApi.tags
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
     * @desc 请求 新增标签
     */
    requestAddTag() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      this.$myApi.tags
        .create(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideTagModal();
          this.requestTagList();
          this.handleGetTagList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditTag() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        tagId: this.currentRow._id,
      };
      this.isEditLoading = true;
      this.$myApi.tags
        .update(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideTagModal();
          this.requestTagList();
          this.handleGetTagList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteTag() {
      this.isDeleteLoading = true;
      this.$myApi.tags
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestTagList();
          this.handleGetTagList();
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
      this.requestTagList();
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
     * @desc 新增标签
     */
    handleAddTag() {
      this.editMode = 'add';
      this.handleShowTagModal();
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row: any) {
      this.editMode = 'edit';
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row);
        this.handleShowTagModal();
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
        this.$toast.error('请填写标签名称');
        return false;
      } else if (!this.formData.value) {
        this.$toast.error('请填写标签属性值');
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
          this.$toast.warning('非admin，无权限！');
        }
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
      return isUserAuth;
    },

    /**
     * @desc 提交标签表单
     */
    handleSubmitTag() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (!this.handleValidateUserAuth()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditTag();
      } else {
        this.requestAddTag();
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowTagModal() {
      this.isShowTagModal = true;
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideTagModal() {
      this.isShowTagModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除标签弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除标签弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
