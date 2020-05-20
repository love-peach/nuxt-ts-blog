<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle title="个人资料" title-sub="请如实填写以下内容，让大家更好的交流互动。"></UserPageTitle>
    <FormItem required label="用户名" tip="用户名不可更改">
      <input v-model.trim="formData.userName" class="form-item-input form-item-input-readonly" type="text" readonly />
    </FormItem>
    <FormItem label="昵称">
      <input v-model.trim="formData.nicName" class="form-item-input" type="text" placeholder="请填写昵称" />
    </FormItem>
    <FormItem required label="邮箱">
      <input v-model.trim="formData.email" class="form-item-input" type="text" placeholder="请填写邮箱" />
    </FormItem>
    <FormItem label="手机号">
      <input v-model.trim="formData.phone" class="form-item-input" type="text" placeholder="请输入手机号" />
    </FormItem>
    <FormItem label="个人说明">
      <textarea v-model.trim="formData.briefDesc" class="form-item-textarea" cols="60" rows="5" placeholder="介绍下自己吧"></textarea>
      <div style="color: #999;">{{ formData.briefDesc ? formData.briefDesc.length : 0 }} / 100</div>
    </FormItem>
    <FormItem>
      <Btn theme="info" :loading="isEditLoading" @click="handleUpdate">更新个人资料</Btn>
    </FormItem>
  </Card>
</template>

<script lang="ts">
import Vuex from 'vuex';
import Card from '@/components/base/card/';
import UserPageTitle from '@/components/page/user/user-page-title.vue';
import FormItem from '@/components/base/form-item/';
import Btn from '@/components/base/btn/';
import { validatorsExp } from '@/assets/js/validate';

const { mapGetters } = Vuex;

export default {
  name: 'UserProfile',
  layout: 'user',
  components: {
    Card,
    Btn,
    FormItem,
    UserPageTitle,
  },
  data() {
    return {
      formData: {},
      isEditLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  mounted() {
    const { userInfo = {} } = this;
    if (userInfo && userInfo.userName) {
      this.$set(this.formData, 'userName', userInfo.userName);
    }
    if (userInfo && userInfo.nicName) {
      this.$set(this.formData, 'nicName', userInfo.nicName);
    }
    if (userInfo && userInfo.phone) {
      this.$set(this.formData, 'phone', userInfo.phone);
    }
    if (userInfo && userInfo.email) {
      this.$set(this.formData, 'email', userInfo.email);
    }
    if (userInfo && userInfo.briefDesc) {
      this.$set(this.formData, 'briefDesc', userInfo.briefDesc);
    }
  },
  methods: {
    /**
     * @desc 更新个人资料
     */
    handleUpdate() {
      if (!this.handleValidete()) {
        return;
      }
      this.requestUpdateUserInfo();
    },

    /**
     * @desc 校验参数
     */
    handleValidete() {
      const { userName, phone, email, briefDesc } = this.formData;
      if (!userName) {
        this.$toast.error('请填写用户名！');
        return false;
      }
      if (phone && !validatorsExp.phone.test(phone)) {
        this.$toast.error('请正确填写手机号！');
        return false;
      }
      if (!email) {
        this.$toast.error('请填写邮箱！');
        return false;
      }
      if (!validatorsExp.email.test(email)) {
        this.$toast.error('请正确填写邮箱！');
        return false;
      }
      if (briefDesc && briefDesc.length > 100) {
        this.$toast.error('请用不超过100个字介绍自己');
        return false;
      }
      return true;
    },

    /**
     * @desc 请求 更新个人信息
     */
    requestUpdateUserInfo() {
      const params = {
        ...this.formData,
        id: this.userInfo._id,
        userId: this.userInfo._id,
      };
      this.isEditLoading = true;
      this.$myApi.users
        .update(params)
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
.form-item-input-readonly {
  background-color: @colorTextSilver;
  color: @colorTextLight;
}
.form-item-textarea {
  padding: 8px 10px;
  font-size: 14px;
  line-height: 1.5;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
