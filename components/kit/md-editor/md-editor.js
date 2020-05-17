import Btn from '@/components/base/btn/';
import MdPreview from '@/components/kit/md-preview/';
let timer = null;

export default {
  name: 'MdEditor',
  props: ['value'],
  components: {
    Btn,
    MdPreview,
  },
  data() {
    return {
      mdText: this.value || '',
      editorMode: 'liveMode',
    };
  },
  watch: {
    value(value, oldValue) {
      if (!oldValue) {
        this.mdText = value;
      }
    },
  },
  methods: {
    setEditorMode(mode) {
      this.editorMode = mode;
    },
    handleInput(e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.$emit('input', e.target.value);
      }, 300);
    },
  },
};
