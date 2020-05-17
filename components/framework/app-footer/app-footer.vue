<template>
  <footer class="app-footer">
    <div class="z-container">
      <div style="color: #ccc;text-align: center;line-height: 80px;">
        <img src="@/assets/img/icon-police.png" alt="备案图标" style="margin-right: 10px;" />
        <a href="http://www.beian.miit.gov.cn" rel="noopener noreferrer" target="_blank">
          豫ICP备18010752号-1
        </a>
      </div>
    </div>
  </footer>
</template>

<script src="./app-footer.js"></script>
<style lang="less" scoped>
.app-footer {
  height: @heightFooter;
  margin-top: -@heightFooter;
  background-color: #222;
}
</style>
