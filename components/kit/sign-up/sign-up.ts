import Vuex from 'vuex';
import Modal from '@/components/base/modal/';
import Btn from '@/components/base/btn/';

import { validatorsExp } from '@/assets/js/validate';

const { mapGetters } = Vuex;

export default {
  components: {
    Modal,
    Btn,
  },
  name: 'SignUp',
  data() {
    return {
      formData: {},
      isSignUpLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      isShowSignUpModal: 'getIsShowSignUpModal',
    }),
  },
  methods: {
    /**
     * @desc 请求 去注册
     */
    requestSingUp() {
      const { userName, email, password } = this.formData;
      const params = {
        userName,
        email,
        password,
      };
      this.isSignUpLoading = true;
      this.$myApi.users
        .PostUserSignup(params)
        .then((res: any) => {
          this.$store.dispatch('common/changeUserInfo', res.result);
          this.$store.dispatch('common/changeToken', res.result.token);
          this.isSignUpLoading = false;
          this.$toast.success('注册成功');
          this.handleCloseModel();
        })
        .catch(() => {
          this.isSignUpLoading = true;
        });
    },

    /**
     * @desc 按钮点击事件 注册
     */
    singUp() {
      this.validateFormData().then((isvalid: boolean) => {
        if (isvalid) {
          this.requestSingUp();
        }
      });
    },

    /**
     * @desc 按钮点击事件 去登陆
     */
    goToLogIn() {
      this.$store.dispatch('common/toggleSignUpModal', false);
      this.$store.dispatch('common/toggleSignInModal', true);
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      const { userName, email, password, confirmPassword } = this.formData;
      return new Promise(resolve => {
        if (!userName) {
          this.$toast.error('请填写昵称！');
          return resolve(false);
        }
        if (!validatorsExp.email.test(email)) {
          this.$toast.error('请正确填写邮箱！');
          return resolve(false);
        }
        if (!password) {
          this.$toast.error('请填写密码！');
          return resolve(false);
        }
        if (password.length < 6) {
          this.$toast.error('密码至少为 6 位');
          return resolve(false);
        }
        if (!confirmPassword) {
          this.$toast.error('请再次确认密码');
          return resolve(false);
        }
        if (password !== confirmPassword) {
          this.$toast.error('密码不一致');
          return resolve(false);
        }
        return resolve(true);
      });
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.$store.dispatch('common/toggleSignUpModal', false);
    },
  },
};
