<template>
  <div>
    <ZPanel title="文章分类管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddCategory">新增分类</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowCategoryModal" @close="handleHideCategoryModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改分类' : '添加分类' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="分类显示名称" />
        <input v-model="formData.value" class="common-input" type="text" placeholder="分类值" />
      </div>
      <div slot="footer">
        <Btn theme="primary" long :loading="isAddLoading || isEditLoading" @click="handleSubmitCategory">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的分类吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteCategory">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.ts"></script>
