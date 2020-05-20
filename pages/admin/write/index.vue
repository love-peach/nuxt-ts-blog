<template>
  <div class="admin-write-wrap">
    <div>
      <input v-model="formData.title" class="title z-input" type="text" placeholder="标题: 月光下的奔跑" />
      <div class="z-row">
        <div class="z-col-xl-15 z-col-lg-30">
          <ZSelect v-model="formData.category" placeholder="请选择文章分类" :options="categoryList.slice(1)" label-key="name" value-key="_id"></ZSelect>
        </div>
        <div class="z-col-xl-15 z-col-lg-30">
          <ZSelect v-model="formData.tag" placeholder="请填写文章标签" :options="tagList" multiple label-key="name" value-key="_id"></ZSelect>
        </div>
        <div class="z-col-xl-30">
          <div class="z-row">
            <div class="z-col-45">
              <input v-model="formData.poster" class="poster z-input" type="text" placeholder="粘贴图片URL" />
            </div>
            <div class="z-col-15">
              <Upload
                action="/api/upload"
                accept="image/*"
                :format="['png', 'jpeg', 'jpg']"
                :data="uploadParams"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleUploadSuccess"
              >
                <Btn style="margin:5px 0;height: 38px;" long>选择文件</Btn>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MdEditor v-model="formData.content">
      <div>
        <span>是否上架：</span>
        <ZSwitch v-model="formData.status" title="是否公开" style="margin-right: 20px;" />
        <Btn theme="success" title="预览模式" :loading="isPostBlogLoading" @click="handleSubmit">确认发布</Btn>
      </div>
    </MdEditor>
  </div>
</template>

<script src="./index.ts"></script>

<style lang="less" scoped>
.admin-write-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .title {
    width: 100%;
    font-size: 18px;
  }
  .poster {
    width: 100%;
  }

  .z-input {
    outline: none;
    margin: 5px 0;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    border: 1px solid @colorBorderLight;
    border-radius: 5px;
    background-color: #fff;
  }

  .z-input:focus {
    border-color: @colorInfo;
  }
}
</style>
