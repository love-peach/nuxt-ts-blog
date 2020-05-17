<template>
  <Card title="目录" padding="10px 0 0">
    <div v-if="articleTitles && articleTitles.nav && articleTitles.nav.length > 0" class="md-anchor-nav-wrap">
      <div id="mdAnchorFloatBar" class="md-anchor-float-bar"></div>
      <MdAnchorNav :list="articleTitles.nav" :offset-top-list="offsetTopList" />
    </div>
    <NoData v-else style="height: 260px;" />
  </Card>
</template>

<script src="./card-md-nav.js"></script>

<style lang="less" scoped>
.md-anchor-nav-wrap {
  position: relative;
  max-height: 90vh;
  overflow: auto;
  // padding-top: 10px;
}
.md-anchor-float-bar {
  position: absolute;
  z-index: 1;
  top: 0;
  height: 28px;
  width: 100%;
  border-right: 4px solid @colorSuccess;
  background-color: @colorBg;
  transition: top 0.25s ease;
}
</style>
