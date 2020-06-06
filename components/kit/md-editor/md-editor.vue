<template>
  <div class="md-editor-wrap">
    <div class="md-editor-toolbar">
      <div>
        <Btn :theme="editorMode === 'editMode' ? 'info' : 'text'" :ghost="editorMode === 'editMode'" size="small" title="写作模式" @click="setEditorMode('editMode')">写作</Btn>
        <Btn :theme="editorMode === 'liveMode' ? 'info' : 'text'" :ghost="editorMode === 'liveMode'" size="small" title="实时模式" @click="setEditorMode('liveMode')">实时</Btn>
        <Btn :theme="editorMode === 'previewMode' ? 'info' : 'text'" :ghost="editorMode === 'previewMode'" size="small" title="预览模式" @click="setEditorMode('previewMode')">预览</Btn>
        <Upload
          style="display: inline-block"
          action="/api/upload"
          accept="image/*"
          :format="['png', 'jpeg', 'jpg']"
          :data="uploadParams"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleUploadSuccess"
        >
          <Btn theme="primary" ghost size="small">添加图片</Btn>
        </Upload>
        <span v-if="imgUrl" style="margin-left: 20px;"> ![图片]({{ imgUrl }}) </span>
      </div>
      <slot></slot>
    </div>

    <div :class="`md-editor md-editor-${editorMode}`">
      <div class="md-editor-write">
        <textarea v-model="mdText" @input="handleInput"></textarea>
      </div>
      <div class="md-editor-preview">
        <MdPreview :content="value" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="./md-editor.less"></style>
<script src="./md-editor.ts"></script>
