<template>
  <Card :padding="0">
    <div class="card-brief-blog-wrap">
      <div class="brief-poster" :style="{ 'background-image': 'url(' + bgSrc + ')' }"></div>
      <div class="author-avatar">
        <div class="author-avatar-box" :style="{ 'background-image': 'url(' + avatarUrl + ')' }"></div>
      </div>
      <h3 class="brief-title">{{ blogResult.title }}</h3>
      <p class="brief-title-sub">{{ blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日') }}</p>
      <div class="brief-interaction">
        <div class="brief-interaction-item">
          <span>{{ blogResult.likes ? blogResult.likes.length : 0 }}</span>
          <p>Like</p>
        </div>
        <div class="brief-interaction-item">
          <span>{{ blogResult.downloadTimes }}</span>
          <p>Download</p>
        </div>
        <div class="brief-interaction-item">
          <span>{{ blogResult.viewed }}</span>
          <p>Viewed</p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/base/card/';
import defaultAvatar from '@/assets/img/no-data-bg-colorful.png';

export default {
  name: 'CardBriefBlog',
  components: {
    Card,
  },
  props: {
    blogResult: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    bgSrc() {
      return this.blogResult.poster ? this.blogResult.poster + '?x-oss-process=image/resize,m_fill,h_180,w_290' : 'https://picsum.photos/290/180?image=' + this.getDate();
    },
    avatarUrl() {
      return this.blogResult.authorObj && this.blogResult.authorObj.avatar ? this.blogResult.authorObj.avatar + '?x-oss-process=image/resize,m_fill,h_110,w_110' : defaultAvatar;
    },
  },
  methods: {
    getDate() {
      const now = new Date();
      return `${now.getMonth()}${now.getDate()}`;
    },
  },
};
</script>

<style lang="less" scoped>
.card-brief-blog-wrap {
  text-align: center;
  .brief-poster {
    padding-top: 61.8%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #d51f45;
  }
  .author-avatar {
    position: relative;
    padding-top: 38.2%;
    width: 38.2%;
    margin: -19% auto 0;
    border-radius: 100%;
    border: 5px solid @colorBorderLight;
    box-sizing: content-box;
  }
  .author-avatar-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .brief-title {
    margin-top: 15px;
    color: @colorTextTitle;
    font-weight: normal;
  }
  .brief-title-sub {
    margin-top: 5px;
    color: @colorTextSub;
  }
  .brief-interaction {
    display: flex;
    margin-top: 20px;
  }
  .brief-interaction-item {
    flex: 1;
    padding-bottom: 20px;
    span {
      font-size: 20px;
      color: @colorTextTitle;
    }
    p {
      color: @colorTextSub;
    }
  }
}
</style>
