<template>
  <div>
    <ul class="comments-list">
      <li v-for="comments in commentsList" :key="comments.id" class="comments-list-item">
        <div class="comments-body">
          <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
            <img class="comments-user-avatar" :src="comments.from ? comments.from.avatar : ''" alt="" />
          </div>
          <div class="comments-main">
            <div class="comments-mate">
              <span class="comments-mate-username">{{ comments.from ? comments.from.userName : '未知' }}</span>
              <span class="comments-mate-time">{{ comments.updatedAt | dateFormatFilter }}</span>
              <span v-if="commentId && commentId === comments.id" class="comments-mate-unrepay" @click="handleUnRepay(comments)">取消回复</span>
              <span v-else class="comments-mate-repay" @click="handleRepay(comments)">回复</span>
              <div class="comments-mate-order">#{{ comments.orderIndex }}</div>
            </div>
            <div class="comments-content">{{ comments.content }}</div>
            <ul v-if="comments.reply && comments.reply.length > 0" class="repay-list">
              <li v-for="repay in comments.reply" :key="repay.id" class="repay-list-item">
                <div class="comments-mate">
                  <span class="comments-mate-username">{{ repay.from ? repay.from.userName : '未知' }}</span>
                  <span class="comments-mate-time">{{ repay.updatedAt | dateFormatFilter }}</span>
                </div>
                <div class="comments-content">{{ repay.content }}</div>
              </li>
            </ul>
            <div v-if="commentId && commentId === comments.id" style="margin-top: 10px;">
              <CommentsForm :comment-id="commentId" :to-user-id="toUserId" @on-success="handleCommentsSuccess"></CommentsForm>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./comments-list.js"></script>

<style lang="less" scoped>
.comments-list {
  position: relative;
  .comments-list-item {
    list-style: none;
    padding: 15px;
  }
  .comments-list-item + .comments-list-item {
    border-top: 1px solid @colorBorderLight;
  }
  .comments-list-item:hover .comments-mate-repay {
    display: inline;
  }

  .repay-list {
    margin: 10px 0 15px;
    background: @colorBg;
    padding: 10px;
    border-radius: 5px;
  }
  .repay-list-item {
    padding: 5px;
    list-style: none;
  }
  .repay-list-item + .repay-list-item {
    border-top: 1px solid @colorBorder;
  }

  .comments-body {
    display: flex;
    align-items: flex-start;
  }
  .comments-user {
    height: 50px;
    width: 50px;
    margin-right: 15px;
  }
  .comments-user-avatar {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .comments-main {
    flex: 1;
  }
  .comments-content {
    text-align: justify;
    line-height: 1.75;
  }
  .comments-mate {
    margin-bottom: 5px;
    font-size: 12px;
  }
  .comments-mate-username {
    margin-right: 10px;
    color: @colorInfo;
  }
  .comments-mate-time {
    color: @colorTextLight;
    margin-right: 10px;
  }
  .comments-mate-repay {
    color: @colorError;
    cursor: pointer;
    display: none;
  }
  .comments-mate-unrepay {
    color: @colorError;
    cursor: pointer;
  }
  .comments-mate-order {
    float: right;
    font-size: 12px;
    color: @colorTextLight;
  }
}
</style>
