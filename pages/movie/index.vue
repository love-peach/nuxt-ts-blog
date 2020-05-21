<template>
  <div>
    <div class="z-container">
      <MovieHomeList v-loading="isBeingShownLoading" :title="beingShownData.title" :list="beingShownList">
        <div style="width: 320px;float: right;">
          <SearchMovie></SearchMovie>
        </div>
      </MovieHomeList>
      <MovieHomeList v-loading="isRankingNewLoading" :title="rankingNewData.title" :list="rankingNewList" />
      <MovieHomeList v-loading="isRankingComingLoading" :title="rankingComingData.title" :list="rankingComingList" />
      <MovieHomeList v-loading="isRanking250Loading" :title="ranking250Data.title" :list="ranking250List">
        <Button theme="success" :to="{ path: '/movie/top250' }" icon="danxuanfill">更多</Button>
      </MovieHomeList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchMovie from '@/components/kit/search-movie/';
import Button from '@/components/base/btn/';
import MovieHomeList from '@/components/page/movie/movie-home-list.vue';
import doubanApi from '@/assets/js/douban/api-douban';

export default Vue.extend({
  name: 'MovieHome',
  components: {
    SearchMovie,
    Button,
    MovieHomeList,
  },
  // async asyncData() {
  //   const [res1, res2, res3, res4] = await Promise.all([
  //     doubanApi.DoubanMovieBeingShown({ count: 10 }),
  //     doubanApi.DoubanMovieRankingNew({ count: 10 }),
  //     doubanApi.DoubanMovieRankingComing({ count: 10 }),
  //     doubanApi.DoubanMovieRankingTop250({ count: 10 }),
  //   ]);
  //   return {
  //     beingShownData: res1,
  //     rankingNewData: res2,
  //     rankingComingData: res3,
  //     ranking250Data: res4,
  //   };
  // },
  data() {
    return {
      isBeingShownLoading: false,
      isRankingNewLoading: false,
      isRankingComingLoading: false,
      isRanking250Loading: false,
      beingShownData: {},
      rankingNewData: {},
      rankingComingData: {},
      ranking250Data: {},
    };
  },
  computed: {
    beingShownList() {
      return this.beingShownData.subjects ? this.beingShownData.subjects.slice(0, 10) : [];
    },
    rankingNewList() {
      return this.rankingNewData.subjects ? this.rankingNewData.subjects.slice(0, 10) : [];
    },
    rankingComingList() {
      return this.rankingComingData.subjects ? this.rankingComingData.subjects.slice(0, 10) : [];
    },
    ranking250List() {
      return this.ranking250Data.subjects ? this.ranking250Data.subjects.slice(0, 10) : [];
    },
  },
  async mounted() {
    this.isBeingShownLoading = true;
    this.isRankingNewLoading = true;
    this.isRankingComingLoading = true;
    this.isRanking250Loading = true;

    const [res1, res2, res3, res4] = await Promise.all([
      doubanApi.DoubanMovieBeingShown({ count: 10 }),
      doubanApi.DoubanMovieRankingNew({ count: 10 }),
      doubanApi.DoubanMovieRankingComing({ count: 10 }),
      doubanApi.DoubanMovieRankingTop250({ count: 10 }),
    ]);
    this.beingShownData = res1;
    this.rankingNewData = res2;
    this.rankingComingData = res3;
    this.ranking250Data = res4;

    this.isBeingShownLoading = false;
    this.isRankingNewLoading = false;
    this.isRankingComingLoading = false;
    this.isRanking250Loading = false;
  },
  head() {
    return {
      title: this.title,
      meta: [{ name: 'referrer', content: 'never' }],
    };
  },
});
</script>
