<template>
  <div class="switch-wrap" :class="{ 'is-disabled': disabled, 'is-checked': checked }" @click="switchValue">
    <span ref="core" class="switch-bar">
      <span class="switch-point"></span>
    </span>
  </div>
</template>

<style lang="less" scoped src="./z-switch.less"></style>
<script src="./z-switch.js"></script>
