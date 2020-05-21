<template>
  <div v-loading="isLoading" style="background-color: #fafafa;">
    <div class="z-container">
      <div class="book-baseinfo">
        <div class="book-baseinfo-poster">
          <img :src="bookInfoData.poster" alt="" />
        </div>
        <div class="book-baseinfo-main">
          <h2 class="book-baseinfo-main-name">{{ bookInfoData.name }}</h2>
          <span class="book-baseinfo-main-author">
            作者：
            <router-link :to="{ path: `/ebook/author/${bookInfoData.authorId}` }">{{ bookInfoData.author }}</router-link>
          </span>
          <p class="book-baseinfo-main-update">最后更新：{{ bookInfoData.updateTime }}</p>
          <p class="book-baseinfo-main-brief">{{ bookInfoData.brief }}</p>
        </div>
      </div>

      <div v-for="part in bookInfoData.chaptersList" :key="part.category" class="z-row ebook-catalog-part">
        <div class="z-col-60">
          <TitleBar :title="part.category"></TitleBar>
        </div>
        <div v-for="item in part.list" :key="`${item.bookId}-${item.chapterId}`" class="z-col-md-20 z-col-sm-30 ebook-catalog-link-wrap">
          <router-link class="ebook-catalog-link" :to="{ path: `/ebook/${item.bookId}/${item.chapterId}` }" :title="item.title">{{ item.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.ts"></script>

<style lang="less" scoped>
.book-baseinfo {
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
  .book-baseinfo-poster {
    float: left;
    // padding: 10px;
    margin-right: 10px;
    img {
      height: 150px;
    }
  }
  .book-baseinfo-main {
    // padding: 10px;
  }
  .book-baseinfo-main-name {
    font-size: 26px;
    color: @colorTextTitle;
  }
  .book-baseinfo-main-brief {
    color: @colorTextSub;
    text-align: justify;
  }
}

.ebook-catalog-part {
  margin-bottom: 15px;
}
.ebook-catalog-link-wrap {
  border-bottom: 1px solid @colorBorder;
}
.ebook-catalog-link {
  display: block;
  padding: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
