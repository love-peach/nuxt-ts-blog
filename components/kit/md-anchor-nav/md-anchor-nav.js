import Vuex from 'vuex';
const { mapGetters } = Vuex;

let vm = null;
export default {
  name: 'mdAnchorNav',
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    offsetTopList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    vm = this;
    return {
      idPrefix: 'titleAnchor-',
    };
  },
  filters: {
    anchor(value) {
      return `#${vm.idPrefix}${value}`;
    },
  },
  computed: {
    ...mapGetters({
      highLightIndex: 'common/getHighLightIndex',
    }),
  },
  methods: {
    scrollToEle(eleIndex) {
      const targetOffsetTop = this.offsetTopList[eleIndex];
      // window.scrollTo(0, targetOffsetTop - 100);
      this.scrollMove(targetOffsetTop - 100, 200);
    },
    scrollMove(scrollTo, time) {
      const scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let count = 0;
      const every = 10;
      scrollTo = parseInt(scrollTo);
      time /= every;

      const interval = setInterval(function() {
        count++;
        document.documentElement.scrollTop = document.body.scrollTop = ((scrollTo - scrollFrom) / time) * count + scrollFrom;
        if (count >= time) {
          clearInterval(interval);
        }
      }, every);
    },
  },
};
