<template>
  <modal v-if="isShowSignUpModal" @close="handleCloseModel">
    <h3 slot="header">注册</h3>
    <div slot="body">
      <input v-model="formData.userName" class="common-input" type="text" placeholder="用户名" autocomplete="off" />
      <!-- <input class="common-input" v-model="formData.phone" type="text" placeholder="手机号" /> -->
      <input v-model="formData.email" class="common-input" name="userName" type="text" value=" " placeholder="邮箱" autocomplete="off" />
      <input v-model="formData.password" class="common-input" type="password" placeholder="密码" autocomplete="off" />
      <input v-model="formData.confirmPassword" class="common-input" type="password" placeholder="确认密码" autocomplete="off" />
    </div>
    <div slot="footer">
      <Btn theme="success" long :loading="isSignUpLoading" @click="singUp">确定注册</Btn>
      <Btn theme="primary" long style="margin-top: 10px;" @click="goToLogIn">直接登录</Btn>
    </div>
  </modal>
</template>

<script src="./sign-up.ts"></script>
