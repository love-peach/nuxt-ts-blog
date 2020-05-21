import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';
import ZPanel from '@/components/base/panel/';
import EbookPoster from '@/components/page/ebook/ebook-poster.vue';

interface ctxProps {
  store: any;
  app: any;
  params: any;
}

export default {
  name: 'EbookCatalog',
  components: {
    EbookPoster,
    ZPanel,
    TitleBar,
    ZTable,
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getBookInfo({ bookId: params.bookId });
  //   return { bookInfoData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      bookInfoData: {},
    };
  },
  mounted() {
    this.getBookInfo();
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/ebook') > -1) {
  //     this.getBookInfo(to.params.bookId);
  //   }
  //   next();
  // },
  methods: {
    /**
     * @desc 获取书籍信息
     */
    getBookInfo(bookId = this.$route.params.bookId) {
      this.isLoading = true;
      this.$myApi.ebooks
        .getBookInfo({ bookId })
        .then((res: any) => {
          this.isLoading = false;
          this.bookInfoData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
