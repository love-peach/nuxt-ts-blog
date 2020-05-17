export default {
  name: 'switch-bar',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
      type: String,
      default: '',
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
  },
  mounted() {
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor();
    }
  },
  methods: {
    switchValue() {
      !this.disabled && this.handleChange();
    },
    handleChange() {
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue);
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue);
    },
    setBackgroundColor() {
      const newColor = this.checked ? this.activeColor : this.inactiveColor;
      this.$refs.core.style.backgroundColor = newColor;
    },
  },
  watch: {
    checked() {
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
    },
  },
};
