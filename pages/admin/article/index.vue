<template>
  <div>
    <ZPanel title="文章管理">
      <template v-slot:headerRight>
        <Btn theme="primary" :to="{ path: '/admin/write' }">新增</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteBlogModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.title }} 的文章吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteBlog">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.ts"></script>
