<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle :title="`您已发布${totalEle}篇文章作品`" title-sub="提示：删除后不可恢复，请谨慎操作。"></UserPageTitle>
    <ZTable :columns="columns" :data="blogList" :loading="isLoading" />
    <Pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteBlogModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.title }} 的文章吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteBlog">确认删除</Btn>
      </div>
    </Modal>
  </Card>
</template>

<script src="./index.ts" lang="ts"></script>
