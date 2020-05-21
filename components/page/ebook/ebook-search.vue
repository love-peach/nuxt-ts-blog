<template>
  <div class="ebook-search-wrap">
    <div class="ebook-search">
      <div class="ebook-search-input-box">
        <input v-model="wd" class="ebook-search-input" type="text" placeholder="搜索书名或作者" />
      </div>
      <div class="ebook-search-btn-box">
        <ZBtn theme="error" shape="rect" icon="search" @click="handleSearch"></ZBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ZBtn from '@/components/base/btn/';

export default {
  name: 'EbookSearchComponent',
  components: {
    ZBtn,
  },
  data() {
    return {
      wd: '',
    };
  },
  methods: {
    /**
     * @desc 查询按钮点击
     */
    handleSearch() {
      this.$router.push({ path: `/ebook/search?wd=${this.wd}` });
    },
  },
};
</script>

<style lang="less" scoped>
.ebook-search {
  display: flex;
  width: 40%;
  margin: 0 auto;
  min-width: 250px;
  &-wrap {
    margin-top: -20px;
    padding: 6% 0;
    min-height: 100px;
    max-height: 220px;
    background-color: #222;
    background-image: url('//qidian.qpic.cn/qidian_common/349573/7f689b6db8ad99e6093bae7db9a7d130/0');
  }
  &-input-box {
    flex: 1;
  }

  &-input {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    padding: 5px;
    font-size: 14px;
  }
}
</style>
