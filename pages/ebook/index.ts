import ZTable from '@/components/base/table/';
import TitleBar from '@/components/kit/title-bar/';
import EbookSarch from '@/components/page/ebook/ebook-search.vue';
import EbookMenu from '@/components/page/ebook/ebook-menu.vue';
import EbookPoster from '@/components/page/ebook/ebook-poster.vue';

interface ctxProps {
  store: any;
  app: any;
}

export default {
  name: 'EbookHome',
  components: {
    EbookSarch,
    EbookMenu,
    TitleBar,
    ZTable,
    EbookPoster,
  },
  // async asyncData({ app }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getHomeData();
  //   return { ebookHomeData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      ebookHomeData: {},
      rankColumns: [
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
      columnsLastUpdate: [
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
      columnsLastRecord: [
        {
          title: '序号',
          width: '45px',
          // class: ['hidden-xs'],
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
    this.getEbookHomeData();
  },
  methods: {
    /**
     * @desc 获取首页数据
     */
    getEbookHomeData() {
      this.isLoading = true;
      this.$myApi.ebooks
        .getHomeData()
        .then((res: any) => {
          this.isLoading = false;
          this.ebookHomeData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
