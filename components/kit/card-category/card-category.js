import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

export default {
  name: 'card-search',
  components: {
    Card,
    NoData,
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      topIndex: 0,
    };
  },
  computed: {
    caseLimitType() {
      return this.getSelectOptionsByKey('case_limit_type');
    },
    parentPath() {
      return this.$route.path.split('/')[1];
    },
  },
  watch: {
    $route: {
      handler() {
        this.checkPathname();
      },
      deep: true,
    },
  },
  methods: {
    /**
     * @desc 获取当前路径
     */
    checkPathname() {
      const currentPath = this.$route.path;
      const categoryPath = currentPath.split('/')[2];
      if (categoryPath) {
        this.categoryList.forEach((item, index) => {
          if (`/${this.parentPath}/${item.value}` === currentPath) {
            this.topIndex = index;
          }
        });
      } else {
        this.categoryList.forEach((item, index) => {
          if (item.value === '/') {
            this.topIndex = index;
          }
        });
      }
    },

    /**
     * @desc 改变当前聚焦的分类
     */
    changeTop(index) {
      this.topIndex = index;
    },
  },
};
