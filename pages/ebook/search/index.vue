<template>
  <div>
    <div class="z-container">
      <ZTable :columns="columns" :data="searchData" size="small" :border="false" :loading="isLoading" />
    </div>
    <div v-show="false" ref="searchEle" v-html="searchDataHtml"></div>
  </div>
</template>

<script src="./index.ts"></script>
