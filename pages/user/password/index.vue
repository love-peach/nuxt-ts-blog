<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle title="修改密码" title-sub="提示：密码强度为中等以上才能进行保存修改操作。"></UserPageTitle>
    <FormItem required label="当前密码">
      <input v-model.trim="formData.passwordOld" class="form-item-input" type="password" />
      <Btn theme="text" :to="{ path: '/forget_pwd' }">忘记密码？</Btn>
    </FormItem>
    <FormItem required label="新密码">
      <input v-model.trim="formData.password" class="form-item-input" type="password" />
    </FormItem>
    <FormItem required label="确认密码">
      <input v-model.trim="formData.passwordConfirm" class="form-item-input" type="password" />
    </FormItem>
    <FormItem label="强度评估">
      <BtnGroup>
        <Btn v-for="item in passwordLevalList" :key="item.value" :theme="passwordLeval === item.value ? item.theme : 'default'" :disabled="passwordLeval !== item.value">{{ item.label }}</Btn>
      </BtnGroup>
    </FormItem>
    <FormItem>
      <Btn theme="info" :loading="isEditLoading" @click="handleUpdate">保存修改</Btn>
    </FormItem>
  </Card>
</template>

<script lang="ts">
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import UserPageTitle from '@/components/page/user/user-page-title.vue';
import FormItem from '@/components/base/form-item/';
import BtnGroup from '@/components/base/btn-group/';
import Btn from '@/components/base/btn/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserProfile',
  layout: 'user',
  components: {
    Card,
    Btn,
    BtnGroup,
    FormItem,
    UserPageTitle,
  },
  data() {
    return {
      isEditLoading: false,
      formData: {},
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
    passwordLevalList() {
      return [
        {
          label: '弱',
          value: 1,
          theme: 'error',
        },
        {
          label: '中等',
          value: 2,
          theme: 'warning',
        },
        {
          label: '强',
          value: 3,
          theme: 'info',
        },
        {
          label: '很强',
          value: 4,
          theme: 'success',
        },
      ];
    },
    passwordLeval() {
      const value = this.formData.password;
      let modes = 0;
      if (!value || value.length < 6) {
        // 最初级别
        return modes;
      }
      if (/\d/.test(value)) {
        // 如果用户输入的密码 包含了数字
        modes++;
      }
      if (/[a-z]/.test(value)) {
        // 如果用户输入的密码 包含了小写的a到z
        modes++;
      }
      if (/[A-Z]/.test(value)) {
        // 如果用户输入的密码 包含了大写的A到Z
        modes++;
      }
      if (/\W/.test(value)) {
        // 如果是非数字 字母 下划线
        modes++;
      }
      return modes;
    },
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 请求 保存密码
     */
    requestUpdatePassword() {
      const params = {
        ...this.userInfo,
      };
      this.isEditLoading = true;
      this.$myApi.users
        .PostChangePwd(params)
        .then((res: any) => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.$store.dispatch('common/changeUserInfo', res.result);
          this.$store.dispatch('common/changeToken', res.result.token);
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 点击保存修改
     */
    handleUpdate() {
      this.validateFormData().then((isvalid: boolean) => {
        if (isvalid) {
          this.requestUpdatePassword();
        }
      });
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      const { passwordOld, password, passwordConfirm } = this.formData;
      return new Promise(resolve => {
        if (!this.userInfo || !this.userInfo._id) {
          this.$toast.error('请登录');
          this.toggleSignInModal(true);
          return resolve(false);
        }
        if (!passwordOld) {
          this.$toast.error('请填写当前密码！');
          return resolve(false);
        }
        if (!password) {
          this.$toast.error('请填写新密码！');
          return resolve(false);
        }
        if (password.length < 6) {
          this.$toast.error('新密码至少为 6 位');
          return resolve(false);
        }
        if (this.passwordLeval < 2) {
          this.$toast.error('新密码强度不够');
          return resolve(false);
        }
        if (!passwordConfirm) {
          this.$toast.error('请再次确认密码');
          return resolve(false);
        }
        if (password !== passwordConfirm) {
          this.$toast.error('密码不一致');
          return resolve(false);
        }
        return resolve(true);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.form-item-input {
  padding: 8px 10px;
  width: 250px;
  font-size: 12px;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
