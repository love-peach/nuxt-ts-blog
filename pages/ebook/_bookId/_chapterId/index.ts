import ZBtn from '@/components/base/btn';
import { throttle } from '@/assets/js/tools';

interface ctxProps {
  store: any;
  app: any;
  params: any;
}

export default {
  name: 'EbookChapter',
  components: {
    ZBtn,
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getChapter({ bookId: params.bookId, chapterId: params.chapterId });
  //   return { chapterData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      chapterData: {
        content: '',
      },
    };
  },
  mounted() {
    this.getChapter();

    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 0);
    window.addEventListener('scroll', this.throttleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/chapter/') > -1) {
  //     this.getChapter(to.params.bookId, to.params.chapterId);
  //   }
  //   next();
  // },
  methods: {
    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      const chapterSideBar = document.getElementById('chapterSideBar') || document.createElement('div');
      const ebookPageWrap = document.getElementById('ebookPageWrap') || document.createElement('div');

      if (t >= ebookPageWrap.offsetTop) {
        chapterSideBar.style.top = t - ebookPageWrap.offsetTop + 'px';
      } else {
        chapterSideBar.style.top = '0';
      }
    },

    /**
     * @desc 获取分类书籍
     */
    getChapter(bookId = this.$route.params.bookId, chapterId = this.$route.params.chapterId) {
      this.isLoading = true;
      this.$myApi.ebooks
        .getChapter({ bookId, chapterId })
        .then((res: any) => {
          this.isLoading = false;
          this.chapterData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
