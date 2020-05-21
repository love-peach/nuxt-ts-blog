<template>
  <div>
    <div class="z-container">
      <EbookMenu />
      <div v-loading="isLoading" class="z-row">
        <div v-for="item in categoryData.hotList" :key="item.bookId" class=" z-col-xs-30 z-col-sm-20 z-col-md-10">
          <div class="hotlist-item">
            <EbookPoster :data-source="item" />
            <h2 class="hotlist-item-name" :title="item.name">{{ item.name }}</h2>
            <p class="hotlist-item-author">
              <router-link :to="{ path: `/ebook/author/${item.authorId}` }">{{ item.author }}</router-link>
            </p>
            <p class="hotlist-item-brief">{{ item.brief.replace(/\s+/g, '') }}</p>
          </div>
        </div>
        <br />
        <div class="z-col-md-40">
          <TitleBar :title="categoryData.newListTitle"></TitleBar>
          <ZTable :columns="columnsNewList" :data="categoryData.newList" size="small" :show-header="false" :border="false" />
        </div>
        <div class="z-col-md-20">
          <TitleBar :title="categoryData.clickRankTitle"></TitleBar>
          <ZTable :columns="columnsClickRank" :data="categoryData.clickRank" size="small" :show-header="false" :border="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./_categoryName.ts"></script>

<style lang="less" scoped>
.hotlist-item {
  margin-top: 15px;
  &-name {
    margin-top: 15px;
    text-align: center;
    color: @colorTextTitle;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-author {
    margin-top: 3px;
    text-align: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-brief {
    font-size: 12px;
    text-indent: 2em;
    margin-top: 5px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}
</style>
