<template>
  <div class="z-image-wrap">
    <img class="z-image" :src="src" :alt="alt" onerror="imgError(this)" ondragstart="return false;" />
  </div>
</template>

<script>
export default {
  name: 'ZImage',
  props: {
    src: String,
    alt: String,
  },
};
</script>

<style lang="less" scoped>
.z-image-wrap {
  display: inline-block;
  width: 100%;
  font-size: 0;
  vertical-align: middle;
  background-image: url('/movie-gray.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  background-color: #333;
  .z-image {
    width: 100%;
  }
}
</style>
