import EbookPoster from '@/components/page/ebook/ebook-poster.vue';

interface ctxProps {
  store: any;
  app: any;
  params: any;
}

export default {
  name: 'EbookArthorWorks',
  components: {
    EbookPoster,
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getAuthorWorks({ authorId: params.authorId });
  //   return { authorWorks: res.result };
  // },
  data() {
    return {
      isLoading: false,
      authorWorks: [
        {
          poster: '',
          bookId: 'xxx',
          name: '书名',
          author: '作者',
          brief: '作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。',
        },
      ],
    };
  },
  mounted() {
    this.getAuthorWorksList();
  },
  methods: {
    /**
     * @desc 关键字查询书籍
     */
    getAuthorWorksList() {
      this.isLoading = true;
      this.$myApi.ebooks
        .getAuthorWorks({ authorId: this.$route.params.authorId })
        .then((res: any) => {
          this.isLoading = false;
          this.authorWorks = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
