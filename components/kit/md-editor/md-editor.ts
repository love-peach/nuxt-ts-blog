import Btn from '@/components/base/btn/';
import MdPreview from '@/components/kit/md-preview/';
import Upload from '@/components/base/upload/';

let timer: any = '';

export default {
  name: 'MdEditor',
  props: ['value'],
  components: {
    Btn,
    MdPreview,
    Upload,
  },
  data() {
    return {
      mdText: this.value || '',
      editorMode: 'liveMode',
      uploadParams: {
        usedFor: 'article',
      },
      imgUrl: '',
    };
  },
  watch: {
    value(value: any, oldValue: any) {
      if (!oldValue) {
        this.mdText = value;
      }
    },
  },
  methods: {
    setEditorMode(mode: string) {
      this.editorMode = mode;
    },
    handleInput(e: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.$emit('input', e.target.value);
      }, 300);
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file: any) {
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 jpg or png.`, { duration: 4000 });
    },

    /**
     * @desc 上传 大小限制
     */
    handleMaxSize(file: any) {
      this.$toast.error(`文件 ${file.name} 太大, 不可超过2M`);
    },

    /**
     * @desc 上传 成功
     */
    handleUploadSuccess(res: any) {
      this.imgUrl = res.result.path;
    },
  },
};
