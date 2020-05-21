<template>
  <div>
    <div class="z-container">
      <ZTable :columns="columns" :data="searchData" size="small" :border="false" :loading="isLoading" />
    </div>
  </div>
</template>

<script src="./index.ts"></script>
