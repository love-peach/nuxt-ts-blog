import EbookMenu from '@/components/page/ebook/ebook-menu.vue';
import EbookPoster from '@/components/page/ebook/ebook-poster.vue';
import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';

interface ctxProps {
  store: any;
  app: any;
  params: any;
}

export default {
  name: 'EbookCategory',
  components: {
    EbookMenu,
    EbookPoster,
    TitleBar,
    ZTable,
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getCategoryBook({ categoryName: params.categoryName });
  //   return { categoryData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      categoryData: {},
      columnsNewList: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h: any, params: any) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : ''],
              },
              params.index + 1
            );
          },
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl'],
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}`,
                  },
                },
                class: 'ebook-catalog-link',
              },
              params.row.name
            );
          },
        },
        {
          title: '最新章节',
          key: 'lastChapter',
          align: 'left',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}/${params.row.chapterId}`,
                  },
                },
                class: 'ebook-chapter-link',
              },
              params.row.lastChapter
            );
          },
        },
        {
          title: '作者',
          key: 'author',
          align: 'right',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/author/${params.row.authorId}`,
                  },
                },
                class: 'ebook-catalog-link',
              },
              params.row.author
            );
          },
        },
        {
          title: '更新日期',
          key: 'updateTime',
          align: 'right',
          class: ['visible-xl'],
        },
      ],
      columnsClickRank: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h: any, params: any) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : ''],
              },
              params.index + 1
            );
          },
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl'],
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}`,
                  },
                },
              },
              params.row.name
            );
          },
        },
        {
          title: '作者',
          key: 'author',
          align: 'right',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/author/${params.row.authorId}`,
                  },
                },
                class: 'ebook-catalog-link',
              },
              params.row.author
            );
          },
        },
      ],
    };
  },
  mounted() {
    this.getCategoryBook();
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/ebook/category') > -1) {
  //     this.getCategoryBook(to.params.categoryName);
  //   }
  //   next();
  // },
  methods: {
    /**
     * @desc 获取分类书籍
     */
    getCategoryBook(categoryName = this.$route.params.categoryName) {
      this.isLoading = true;
      this.$myApi.ebooks
        .getCategoryBook({ categoryName })
        .then((res: any) => {
          this.isLoading = false;
          this.categoryData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
