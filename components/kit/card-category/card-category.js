import Vuex from 'vuex';
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

const { mapGetters } = Vuex;

export default {
  name: 'card-category',
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
  computed: {
    caseLimitType() {
      return this.getSelectOptionsByKey('case_limit_type');
    },
    parentPath() {
      return this.$route.path.split('/')[1];
    },
    ...mapGetters('common', {
      topIndex: 'getCategoryIndex',
    }),
  },
  mounted() {
    this.checkPathname();
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
            this.changeTop(index);
          }
        });
      } else {
        this.categoryList.forEach((item, index) => {
          if (item.value === '/') {
            this.changeTop(index);
          }
        });
      }
    },

    /**
     * @desc 改变当前聚焦的分类
     */
    changeTop(index) {
      this.$store.dispatch('common/changeCategoryIndex', index);
    },
  },
};
