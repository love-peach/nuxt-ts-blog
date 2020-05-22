import Icon from '@/components/base/icon/';
import doubanApi from '@/assets/js/douban/api-douban';

let timer: any = null;

export default {
  name: 'SearchMovie',
  components: {
    Icon,
  },
  data() {
    return {
      searchWord: '',
      suggestList: [],
      isShowOptions: false,
      cursorIndex: 0,
    };
  },
  methods: {
    /**
     * @desc 请求搜索结果
     */
    requestSearchMovie() {
      const params = {
        q: this.searchWord,
      };
      this.isSearchLoading = true;
      doubanApi
        .DoubanMovieSearch(params)
        .then((res: any) => {
          this.isSearchLoading = false;
          this.suggestList = res;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    /**
     * @desc 请求搜索结果 这个接口暂时没找到
     */
    requestSearchMovieFull() {
      const params = {
        q: this.searchWord,
      };
      this.isSearchLoading = true;
      this.$doubanApi
        .DoubanMovieSearchFull(params)
        .then(() => {
          this.isSearchLoading = false;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    /**
     * @desc 选择 option
     */
    handleSelect(option: any) {
      // this.$router.push({ path: `/movie/detail/${option.id}`, target: '_blank' });
      const routeUrl = this.$router.resolve({
        path: `/movie/detail/${option.id}`,
      });
      window.open(routeUrl.href, '_blank');
      this.handleHideOptions();
    },

    /**
     * @desc 点击 select 组件
     */
    handleClick() {
      this.handleShowOptions();
    },

    /**
     * @desc 聚焦事件
     */
    handleFocus() {
      this.handleShowOptions();
    },

    /**
     * @desc 失焦事件
     */
    handleBlur() {
      setTimeout(() => {
        this.handleHideOptions();
      }, 1000);
    },

    /**
     * @desc input 事件
     */
    handleInput() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.requestSearchMovie();
      }, 600);
    },

    /**
     * @desc 回车事件
     */
    handleEnter() {
      if (this.isShowOptions) {
        this.handleSelect(this.suggestList[this.cursorIndex]);
      } else {
        this.handleHideOptions();
      }
    },

    /**
     * @desc 键盘 上 事件
     */
    handleKeyupUp() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = this.suggestList.length - 1;
      } else {
        this.cursorIndex -= 1;
      }
      this.makeOptionItemVisable();
    },

    /**
     * @desc 键盘 下 事件
     */
    handleKeyupDown() {
      if (this.cursorIndex >= this.suggestList.length - 1) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex += 1;
      }
      this.makeOptionItemVisable();
    },

    handleMouseoverOptionItem(index: number) {
      this.cursorIndex = index;
    },

    /**
     * @desc 让选项在固定高度盒子中 可见
     */
    makeOptionItemVisable() {
      const optionsUl = this.$refs.zSearchOptions;
      const optionsUlHeight = optionsUl.clientHeight;
      const optionsUlScrollTop = optionsUl.scrollTop;
      const optionsUlItem = optionsUl.getElementsByTagName('a')[this.cursorIndex];
      const optionsUlItemHeight = optionsUlItem.clientHeight;
      const optionsUlItemOffsetTop = optionsUlItem.offsetTop;

      if (optionsUlScrollTop <= optionsUlItemOffsetTop && optionsUlItemOffsetTop + optionsUlItemHeight <= optionsUlScrollTop + optionsUlHeight) {
        // 在 suggestList 盒子里可见
      } else {
        optionsUl.scrollTop = optionsUlItemOffsetTop;
      }
    },

    /**
     * @desc 显示 suggestList
     */
    handleShowOptions() {
      this.isShowOptions = true;
    },

    /**
     * @desc 隐藏 suggestList
     */
    handleHideOptions() {
      this.isShowOptions = false;
      this.$refs.zSearch.blur();
      this.cursorIndex = 0;
    },
  },
};
