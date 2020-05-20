<template>
  <div>
    <ZPanel title="文章资源类别管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddResourceType">新增资源类别</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowResourceTypeModal" @close="handleHideResourceTypeModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改资源类别' : '添加资源类别' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="资源类别名称" />
      </div>
      <div slot="footer">
        <Btn theme="primary" long @click="handleSubmitResourceType">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的资源类别吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteResourceType">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.ts"></script>
