<template>
  <modal v-if="isShowSignInModal" @close="handleCloseModel">
    <h3 slot="header">登录</h3>
    <div slot="body" @keyup.enter="login">
      <input v-model="formData.account" class="common-input" type="text" placeholder="用户名" style="width: 100%" @keyup.enter="login" />
      <input v-model="formData.password" class="common-input" type="password" placeholder="密码" style="width: 100%" @keyup.enter="login" />
      <div style="text-align: right;">
        <span style="font-size: 12px;color: #999;cursor: pointer;" @click="handleForgetPwd">忘记密码？</span>
      </div>
    </div>
    <div slot="footer">
      <Btn theme="primary" long :loading="isLoginLoading" @click="login">确定登录</Btn>
      <Btn long style="margin-top: 10px;" @click="goToRegister">我要注册</Btn>
    </div>
  </modal>
</template>

<script src="./sign-in.ts"></script>
