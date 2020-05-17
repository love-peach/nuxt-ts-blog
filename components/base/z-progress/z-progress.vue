<template>
  <div class="z-progress" :style="stylesWrap">
    <div class="z-progress-bar-top" @click="handleClick"></div>
    <div class="z-progress-bar" :style="stylesBar"></div>
  </div>
</template>

<script src="./z-progress.js"></script>

<style lang="less" scoped>
.z-progress {
  position: relative;
  &-bar-top {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.3);
  }
  &-bar {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-right: 1px solid #cdcdcd;
    transition: width 0.3s ease;
  }
}
</style>
