<template>
  <div class="topic-content">
    <div class="topic-head">
      <div class="topic-head-title">
        <router-link class="head-title" tag="h1" :to="{ path: `/blog/detail/${topic._id}` }">{{ topic.title }}</router-link>
        <div class="topic-article-info">
          <div class="info-author">
            <Icon type="user" title="作者" />:
            <router-link v-if="topic.authorObj" class="topic-info-link" :to="{ path: `/blog/search/?author=${topic.authorObj._id}` }">
              {{ topic.authorObj.userName }}
            </router-link>
          </div>
          <div class="info-category">
            <Icon type="category" title="分类" />:
            <router-link class="topic-info-link" :to="{ path: `/${parentPath}/${topic.categoryObj.value}` }">
              {{ topic.categoryObj.name }}
            </router-link>
          </div>
          <div class="info-tag ">
            <Icon type="tag" title="标签" />:
            <router-link v-for="(item, index) in topic.tagArray" :key="index" class="topic-info-link" :to="{ path: `/blog/search/?tag=${item._id}` }">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="topic-head-time">
        <div class="time-day">{{ topic.createdAt | dateFormatFilter('DD') }}</div>
        <div class="time-month-year">
          <div class="time-month">{{ topic.createdAt | dateFormatFilter('MM') }}月</div>
          <div class="time-year">{{ topic.createdAt | dateFormatFilter('YYYY') }}</div>
        </div>
      </div>
    </div>

    <div class="topic-body clearfix">
      <div class="topic-img-wrap">
        <router-link class="topic-img-link no-img-placeholder-colorful no-img-placeholder-horizon" :to="{ path: `/blog/detail/${topic._id}` }">
          <img class="topic-img" :src="topic.poster" alt="" />
        </router-link>
      </div>
      <MdPreview :content="firstParagraph" :padding="0" />
    </div>
  </div>
</template>

<script src="./topic-item.js"></script>
<style lang="less" scoped src="./topic-item.less"></style>
