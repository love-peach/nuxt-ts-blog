<template>
  <Card title="文章分类" :padding="0">
    <ul v-if="categoryList.length > 0" class="card-category-list" @mouseleave="checkPathname">
      <li v-for="(nav, index) in categoryList" :key="index" class="category-item" @mouseover="changeTop(index)">
        <router-link exact :to="`/${parentPath}${nav.value === '/' ? nav.value : '/' + nav.value}`" active-class="current" class="category-item-link">
          {{ nav.name }}
        </router-link>
      </li>
      <li class="category-item-slider" :style="{ top: topIndex * 40 + 'px' }"></li>
    </ul>
    <NoData v-else style="height: 260px;" />
  </Card>
</template>

<script src="./card-category.js"></script>
<style lang="less" scoped src="./card-category.less"></style>
