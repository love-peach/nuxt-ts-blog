<template>
  <div class="search-movie-wrap">
    <input
      id="searchInput"
      ref="zSearch"
      v-model="searchWord"
      autocomplete="off"
      class="search-movie-input"
      type="text"
      @click="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keyup.enter="handleEnter"
      @keyup.up="handleKeyupUp"
      @keyup.down="handleKeyupDown"
    />
    <button class="search-movie-button" @click="requestSearchMovieFull">
      <Icon class="search-movie-button-icon" type="search" />
      <span class="search-movie-button-text">搜索</span>
    </button>
    <div v-show="isShowOptions" ref="zSearchOptions" class="search-movie-suggest">
      <router-link
        v-for="(item, index) in suggestList"
        :key="index"
        :to="{ path: `/movie/detail/${item.id}`, target: '_blank' }"
        :class="`search-movie-suggest-item ${cursorIndex === index ? 'search-movie-suggest-item-active' : ''}`"
        target="_blank"
        @mouseover="handleMouseoverOptionItem(index)"
      >
        <img class="search-movie-suggest-item-poster" :src="item.img" alt="" />
        <div>
          <p class="search-movie-suggest-item-title">{{ item.title }}（{{ item.year }}）</p>
          <p class="search-movie-suggest-item-desc">{{ item.sub_title }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script src="./search-movie.ts"></script>

<style lang="less" scoped>
.search-movie {
  &-wrap {
    position: relative;
  }
  &-input {
    width: 100%;
    height: 32px;
    padding: 0 75px 0 13px;
    font-size: 12px;
    color: @colorTextContent;
    border-radius: 100px;
    border: 1px solid @colorInfo;
    outline: 0;
    background-color: transparent;
    transition: width 0.3s ease;
  }
  &-button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 65px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    // font-weight: bold;
    background-color: @colorInfo;
    border: 0;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    outline: 0;
    &-icon {
      vertical-align: inherit;
      margin-right: 3px;
    }
    &-text {
    }
  }

  &-suggest {
    position: absolute;
    z-index: 999;
    top: 100%;
    left: 13px;
    right: 65px;
    background-color: #fff;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);

    &-item {
      display: block;
      padding: 6px;
      border: 1px solid @colorBorder;
      border-top: 0;
      overflow: hidden;
      zoom: 1;
      &-active {
        background-color: darken(@colorBg, 2%);
      }
      &:hover {
        background-color: darken(@colorBg, 1%);
      }

      &-poster {
        width: 40px;
        height: 58px;
        margin-right: 5px;
        float: left;
      }
      &-title {
        margin-right: 5px;
        color: @colorTextTitle;
        font-style: normal;
      }
      &-desc {
        display: block;
        margin-top: 3px;
      }
    }
  }
}
</style>
