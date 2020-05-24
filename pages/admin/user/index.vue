<template>
  <div>
    <ZPanel title="文章用户管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddUser">新增用户</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-show="isShowUserModal" @close="handleHideUserModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改用户' : '添加用户' }}</h3>
      <div slot="body">
        <input v-model="formData.userName" class="common-input" type="text" placeholder="昵称" />
        <input v-model="formData.phone" class="common-input" type="text" placeholder="手机号" />
        <input v-model="formData.email" class="common-input" type="text" placeholder="邮箱" />
        <input v-model="formData.password" class="common-input" type="password" :placeholder="editMode === 'edit' ? '新密码' : '密码'" />
        <input v-if="editMode === 'add'" v-model="formData.confirmPassword" class="common-input" type="password" placeholder="确认密码" />
      </div>
      <div slot="footer">
        <Btn theme="primary" long :loading="isAddLoading || isEditLoading" @click="handleSubmitUser">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.userName }} 的用户吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteUser">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.ts"></script>
