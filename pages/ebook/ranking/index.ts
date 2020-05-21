import EbookMenu from '@/components/page/ebook/ebook-menu.vue';
import EbookRankPart from '@/components/page/ebook/ebook-ranking-part.vue';

interface ctxProps {
  store: any;
  app: any;
}

export default {
  name: 'EbookRanking',
  components: {
    EbookMenu,
    EbookRankPart,
  },
  async asyncData({ app }: ctxProps) {
    const res = await app.$myApi.ebooks.getRankingBook({ rankType: 'all' });
    return { rankData: res.result };
  },
  data() {
    return {
      isLoading: false,
      rankData: [],
    };
  },
  mounted() {
    // this.getRankingBook();
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/ebook/ranking') > -1) {
  //     this.getRankingBook(to.params.rankType);
  //   }
  //   next();
  // },
  methods: {
    /**
     * @desc 获取排行榜书籍
     */
    getRankingBook() {
      this.isLoading = true;
      this.$myApi.ebooks
        .getRankingBook({ rankType: 'all' })
        .then((res: any) => {
          this.isLoading = false;
          this.rankData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
