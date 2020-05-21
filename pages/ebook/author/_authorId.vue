<template>
  <div class="z-container">
    <div v-for="item in authorWorks" :key="item.bookId" class=" z-col-xs-30">
      <div v-loading="isLoading" class="works-item">
        <div class="works-item-poster">
          <EbookPoster :data-source="item" />
        </div>
        <div class="works-item-info">
          <h2 class="works-item-name" :title="item.name">{{ item.name }}</h2>
          <p class="works-item-author">{{ item.author }}</p>
          <p class="works-item-brief">{{ item.brief }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./_authorId.ts"></script>

<style lang="less" scoped>
.works-item {
  display: flex;
  padding: 10px;
  .works-item-poster {
    width: 24%;
    margin-right: 10px;
  }
  .works-item-info {
    flex: 1;
  }
  .works-item-name {
    color: @colorTextTitle;
    font-size: 20px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .works-item-author {
    margin-top: 6px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .works-item-brief {
    margin-top: 8px;

    font-size: 14px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}
</style>
