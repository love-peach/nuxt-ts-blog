<template>
  <ul class="md-anchor-nav">
    <li v-for="(nav, index) in list" :key="index">
      <a :id="nav.index | anchor" href="javascript:;" :class="{ active: highLightIndex === nav.index }" @click="scrollToEle(nav.index)">{{ nav.title }}</a>
      <mdAnchorNav v-if="nav.children.length > 0" :list="nav.children" :offset-top-list="offsetTopList" />
    </li>
  </ul>
</template>

<style lang="less" scoped src="./md-anchor-nav.less"></style>
<script src="./md-anchor-nav.js"></script>
