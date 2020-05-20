import Vuex from 'vuex';
import Modal from '@/components/base/modal/';
import Btn from '@/components/base/btn/';

const { mapGetters } = Vuex;

export default {
  components: {
    Modal,
    Btn,
  },
  name: 'SignIn',
  data() {
    return {
      formData: {
        account: '',
        password: '',
      },
      isLoginLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      isShowSignInModal: 'getIsShowSignInModal',
    }),
  },
  methods: {
    /**
     * @desc 请求 登录
     */
    requestLogin() {
      const params = {
        userName: this.formData.account,
        password: this.formData.password,
      };
      this.isLoginLoading = true;
      this.$myApi.users
        .PostUserLogin(params)
        .then((res: any) => {
          this.$store.dispatch('common/changeUserInfo', res.result);
          this.$store.dispatch('common/changeToken', res.result.token);
          this.isLoginLoading = false;
          this.$toast.success('登录成功');
          this.handleCloseModel();
        })
        .catch(() => {
          this.isLoginLoading = false;
        });
    },

    /**
     * @desc 按钮点击事件 登录
     */
    login() {
      this.validateFormData().then((isvalid: boolean) => {
        if (isvalid) {
          this.requestLogin();
        }
      });
    },

    /**
     * @desc 按钮点击事件 忘记密码
     */
    handleForgetPwd() {
      this.$router.push('/forget-password');
      this.$store.dispatch('common/toggleSignInModal', false);
      this.$store.dispatch('common/toggleSignUpModal', false);
    },

    /**
     * @desc 按钮点击事件 去注册
     */
    goToRegister() {
      this.$store.dispatch('common/toggleSignInModal', false);
      this.$store.dispatch('common/toggleSignUpModal', true);
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      return new Promise(resolve => {
        if (!this.formData.account) {
          this.$toast.error('请输入昵称');
          return resolve(false);
        }
        if (!this.formData.password) {
          this.$toast.error('请输入密码');
          return resolve(false);
        }
        return resolve(true);
      });
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.$store.dispatch('common/toggleSignInModal', false);
    },
  },
};
