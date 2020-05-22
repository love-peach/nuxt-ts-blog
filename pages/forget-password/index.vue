<template>
  <div class="z-container">
    <div class="content-wrap">
      <div style="text-align: center;">
        <Icon type="logo" :size="170" style="line-height: 100px;" />
      </div>
      <Card>请输入您的用户名或电子邮箱地址。您会收到一封包含新密码的电子邮件。</Card>
      <Card>
        <div>用户名或电子邮件地址</div>
        <input v-model="nameOrmail" class="form-item-input" type="text" />
        <Btn theme="info" long :loading="isForgetLoading" style="margin-top: 15px;" @click="handleForgetPwd">找回密码</Btn>
        <Btn long style="margin-top: 15px;" :to="{ path: '/' }">返回主页面</Btn>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from '@/components/base/btn/index.js';
import Icon from '@/components/base/icon/index.js';
import Card from '@/components/base/card/index.js';

export default {
  name: 'ForgetPassword',
  components: {
    Btn,
    Icon,
    Card,
  },
  data() {
    return {
      nameOrmail: '',
      isForgetLoading: false,
    };
  },
  methods: {
    /**
     * @desc 请求 忘记密码
     */
    requestForgetPasswrod() {
      const params = {
        nameOrmail: this.nameOrmail,
      };
      this.isForgetLoading = true;
      this.$myApi.users
        .PostForgetPwd(params)
        .then(() => {
          this.isForgetLoading = false;
          sessionStorage.clear();
          this.$store.dispatch('common/toggleSignInModal', true);
          this.$store.dispatch('common/changeUserInfo', null);
          this.$toast.info('请查收邮件，重新登录');
          this.$router.push('/');
        })
        .catch(() => {
          this.isForgetLoading = false;
        });
    },

    /**
     * @desc 点击 忘记密码
     */
    handleForgetPwd() {
      if (this.nameOrmail) {
        this.requestForgetPasswrod();
      } else {
        this.$toast.error('请填写用户名或者邮箱');
      }
    },
  },
  head() {
    return {
      title: '忘记密码',
    };
  },
};
</script>

<style lang="less" scoped>
.content-wrap {
  max-width: 360px;
  margin: 0 auto;
  padding-top: 8%;
}
.form-item-input {
  margin-top: 5px;
  padding: 8px 10px;
  width: 100%;
  font-size: 14px;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
