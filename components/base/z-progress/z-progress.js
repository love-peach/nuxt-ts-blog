export default {
  name: 'ZProgress',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    height: {
      type: [Number, String],
      default: '15px',
    },
  },
  data() {
    return {
      percent: '',
    };
  },
  computed: {
    stylesWrap() {
      return {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
      };
    },
    stylesBar() {
      return {
        width: `${this.percent * 100}%`,
      };
    },
  },
  mounted() {
    this.percent = this.value;
  },
  watch: {
    value(value) {
      this.percent = value;
    },
  },
  methods: {
    /**
     * @desc 点击进度条
     */
    handleClick(e) {
      const currentLen = e.offsetX;
      const progressWidth = e.target.clientWidth;
      const percent = this.formatPercent(currentLen, progressWidth, true);
      this.percent = percent;
      this.$emit('on-click', percent);
    },

    // 计算百分比 返回浮点数值 或者 百分比字符串
    formatPercent(num, total, isNum) {
      const percent = Math.round((num / total) * 10000) / 100.0;
      return isNum ? percent / 100 : percent + '%';
    },
  },
};
