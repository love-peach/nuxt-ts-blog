<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-lg-42 z-col-xl-45">
        <Card padding="0">
          <Billboard :poster="blogResult.poster" :title="blogResult.title" :title-sub="blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日')">
            <div>
              <Tag size="small" theme="error" icon="user" shape="rect"> {{ blogResult.authorObj ? blogResult.authorObj.userName : '' }}</Tag>
              <Tag v-for="(tag, index) in blogResult.tagArray" :key="index" size="small" theme="info" shape="rect">{{ tag.name }}</Tag>
              <Btn v-if="isLiked" size="small" theme="success" shape="rect" icon="liked" :loading="isLikeLoading" @click="handleUnLike"></Btn>
              <Btn v-else size="small" theme="success" shape="rect" icon="like" :loading="isLikeLoading" @click="handleLike"></Btn>
              <Btn size="small" theme="primary" shape="rect" icon="download"></Btn>
            </div>
          </Billboard>
        </Card>
        <Card padding="0">
          <MdPreview :content="blogResult.content" />
        </Card>
        <Card>
          <CommentsForm @on-success="handleCommentsSuccess"></CommentsForm>
        </Card>

        <Card v-if="commentsList && commentsList.length > 0" v-loading="isCommentsListLoading">
          <CommentsList :comments-list="commentsList" @on-fresh="requestCommentsList"></CommentsList>
          <Pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
        </Card>
      </div>

      <div class="z-col-lg-18 z-col-xl-15 visible-lg visible-xl">
        <div id="briefWrap">
          <CardBriefBlog v-if="blogResult && blogResult.content" :blog-result="blogResult" />
          <CardNoData v-else style="height: 385px;" />
        </div>
        <div id="jsCardMdNav">
          <CardMdNav :blog-result="blogResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./_articleId.ts"></script>
<style lang="less" src="./_articleId.less"></style>
