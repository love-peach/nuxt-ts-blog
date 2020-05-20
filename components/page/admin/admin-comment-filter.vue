<template>
  <div>
    <div class="z-row">
      <!-- <div class="z-col-15">
        <FormItem label="用户名" :labelWidth="80">
          <input v-model.trim="formData.userName" class="form-item-input" type="text" />
        </FormItem>
      </div> -->
      <div class="z-col-15">
        <FormItem label="评论内容" :labelWidth="80">
          <input v-model.trim="formData.content" class="form-item-input" type="text" />
        </FormItem>
      </div>
      <div class="z-col-15">
        <FormItem label="状态" :labelWidth="80">
          <ZbtnGroup>
            <Zbtn v-for="(item, index) in statusList" :key="index" :theme="formData.status === item.value ? 'success' : 'default'" @click="handleChangeStatus(item.value)">
              {{ item.label }}
            </Zbtn>
          </ZbtnGroup>
        </FormItem>
      </div>
      <!-- <div class="z-col-15">
        <FormItem label="文章标题" :labelWidth="80">
          <input v-model.trim="formData.blogTitle" class="form-item-input" type="text" />
        </FormItem>
      </div> -->
      <div class="z-col-15">
        <FormItem :labelWidth="0">
          <slot v-bind:formData="formData"></slot>
        </FormItem>
      </div>
    </div>
  </div>
</template>

<script>
import FormItem from '@/components/base/form-item/';
import Zbtn from '@/components/base/btn/';
import ZbtnGroup from '@/components/base/btn-group/';

export default {
  name: 'AdminCommentFilter',
  components: {
    FormItem,
    Zbtn,
    ZbtnGroup,
  },
  data() {
    return {
      formData: {
        status: 'all',
      },
    };
  },
  computed: {
    statusList() {
      return [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '审核通过',
          value: true,
        },
        {
          label: '未审核',
          value: false,
        },
      ];
    },
  },
  methods: {
    /**
     * @desc
     */
    handleChangeStatus(value) {
      this.$set(this.formData, 'status', value);
    },
  },
};
</script>

<style lang="less" scoped>
.form-item-input {
  padding: 8px 10px;
  width: 100%;
  font-size: 12px;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
