<template>
  <div v-loading="isLoading" style="min-height: 300px;">
    <div class="z-container">
      <EbookMenu />
      <div class="z-row">
        <div v-for="part in rankData" :key="`${part.title}-${$route.params.rankType}`" class="z-col-xl-15 z-col-lg-20 z-col-sm-30">
          <EbookRankPart :data-source="part"></EbookRankPart>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.ts"></script>
