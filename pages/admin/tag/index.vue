<template>
  <div>
    <ZPanel title="文章标签管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddTag">新增标签</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowTagModal" @close="handleHideTagModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改标签' : '添加标签' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="标签显示名称" />
        <input v-model="formData.value" class="common-input" type="text" placeholder="标签值" />
      </div>
      <div slot="footer">
        <Btn theme="primary" long @click="handleSubmitTag">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的标签吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteTag">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.ts"></script>
