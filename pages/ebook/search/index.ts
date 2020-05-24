import qs from 'qs';

import ZBtn from '@/components/base/btn/';
import ZTable from '@/components/base/table/';

export default {
  name: 'EbookSearch',
  components: {
    ZBtn,
    ZTable,
  },
  data() {
    return {
      searchDataHtml: '',
      wd: '',
      isLoading: false,
      searchData: [],
      columns: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-sm'],
          render: (h: any, params: any) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index'],
              },
              params.index + 1
            );
          },
        },
        // {
        //   title: '作品分类',
        //   key: 'category',
        //   align: 'left',
        //   class: ['hidden-xs'],
        // },
        {
          title: '作品名称',
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
        // {
        //   title: '更新时间',
        //   key: 'updateTime',
        //   align: 'center',
        //   class: ['hidden-xs'],
        //   render: (h: any, params: any) => {
        //     return h('span', params.row.updateTime.split(' ')[0]);
        //   },
        // },
        // {
        //   title: '状态',
        //   key: 'status',
        //   align: 'center',
        //   minWidth: '45px',
        //   class: ['hidden-xs'],
        // },
      ],
    };
  },
  mounted() {
    if (this.$route.query.wd) {
      // this.$nuxt.$loading.start();
      this.getBookByWd();
    }
  },
  methods: {
    /**
     * @desc 查询按钮点击
     */
    handleSearch() {
      this.getBookByWd();
    },

    /**
     * @desc 关键字查询书籍
     */
    getBookByWd() {
      this.isLoading = true;
      // this.$myApi.ebooks
      //   .getBookByWd({ wd: this.$route.query.wd })
      //   .then((res: any) => {
      //     this.isLoading = false;
      //     this.searchData = res.result;
      //     this.$nuxt.$loading.finish();
      //   })
      //   .catch(() => {
      //     this.isLoading = false;
      //   });

      const params = qs.stringify({
        searchkey: this.$route.query.wd,
        s: '6445266503022880974',
      });

      this.$myApi.ebooks
        .postSearch(params)
        .then((res: any) => {
          this.isLoading = false;
          this.searchDataHtml = res;

          this.$nextTick(() => {
            const element = this.$refs.searchEle;
            const books = [...element.querySelectorAll('.bookbox')];

            const searchData = books.map(ele => {
              const categoryEle = ele.querySelector('.cat');
              const bookEle = ele.querySelector('.bookname a');
              const chapterEle = ele.querySelector('.update a');
              const authorEle = ele.querySelector('.author');

              const bookA = bookEle.href.split('.');
              const bookAA = bookA[bookA.length - 2];
              const bookAAA = bookAA.split('/');
              const bookAAAA = bookAAA[bookAAA.length - 2];

              const chapterA = chapterEle.href.split('.');
              const chapterAA = chapterA[chapterA.length - 2];
              const chapterAAA = chapterAA.split('/');
              const chapterAAAA = chapterAAA[chapterAAA.length - 1];

              return {
                category: categoryEle.textContent,
                author: authorEle.textContent,
                name: bookEle.textContent,
                bookId: bookAAAA,
                lastChapter: chapterEle.textContent,
                chapterId: chapterAAAA,
              };
            });
            this.searchData = searchData;
          });

          // this.searchData = res.result;
          // this.$nuxt.$loading.finish();
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
