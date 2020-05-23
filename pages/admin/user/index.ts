import Vuex from 'vuex';
import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';
import { validatorsExp } from '@/assets/js/validate';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'AdminUser',
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
      isShowUserModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
        },
        {
          title: '头像',
          key: 'poster',
          width: '80px',
          render: (h: any, parama: any) => {
            return h('img', {
              attrs: {
                src: parama.row.avatarUrl,
              },
              style: {
                width: '80px',
              },
            });
          },
        },
        {
          title: '姓名',
          key: 'userName',
          align: 'left',
        },
        {
          title: '手机号',
          key: 'phone',
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'left',
        },
        {
          title: '创建时间',
          render: (h: any, parama: any) => {
            return h('div', this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm'));
          },
        },
        {
          title: '修改时间',
          render: (h: any, parama: any) => {
            return h('div', this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm'));
          },
        },
        {
          name: '操作',
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
    this.requestUserList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 请求 获取用户列表
     */
    requestUserList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      this.$myApi.users
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
    requestAddUser() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      this.$myApi.users
        .create(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideUserModal();
          this.requestUserList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditUser() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        userId: this.currentRow._id,
      };
      this.isEditLoading = true;
      this.$myApi.users
        .update(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideUserModal();
          this.requestUserList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteUser() {
      this.isDeleteLoading = true;
      this.$myApi.users
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestUserList();
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
      this.requestUserList();
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
        userName: data.userName,
        phone: data.phone,
        email: data.email,
      };
    },

    /**
     * @desc 新增标签
     */
    handleAddUser() {
      this.editMode = 'add';
      this.handleShowUserModal();
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row: any) {
      this.editMode = 'edit';
      this.currentRow = row;
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row);
        this.handleShowUserModal();
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
      const { userName, phone, email, password, confirmPassword } = this.formData;
      const isAddMode = this.editMode === 'add';
      if (!userName) {
        this.$toast.error('请填写昵称！');
        return false;
      }
      if (!validatorsExp.phone.test(phone)) {
        this.$toast.error('请正确填写手机号！');
        return false;
      }
      if (!validatorsExp.email.test(email)) {
        this.$toast.error('请正确填写邮箱！');
        return false;
      }
      if (!password) {
        this.$toast.error('请填写密码！');
        return false;
      }
      if (password.length < 6) {
        this.$toast.error('密码至少为 6 位');
        return false;
      }
      if (isAddMode && !confirmPassword) {
        this.$toast.error('请再次确认密码');
        return false;
      }
      if (isAddMode && password !== confirmPassword) {
        this.$toast.error('密码不一致');
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
     * @desc 提交标签表单
     */
    handleSubmitUser() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (!this.handleValidateUserAuth()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditUser();
      } else {
        this.requestAddUser();
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowUserModal() {
      this.isShowUserModal = true;
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideUserModal() {
      this.isShowUserModal = false;
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
