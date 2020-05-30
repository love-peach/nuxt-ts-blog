import ajax from './ajax';

export default {
  name: 'Upload',
  props: {
    action: {
      type: String,
      // required: true,
    },
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
    name: {
      type: String,
      default: 'file',
    },
    format: {
      type: Array,
      default() {
        return [];
      },
    },
    accept: {
      type: String,
    },
    maxSize: {
      type: Number,
    },
    beforeUpload: Function,
    onProgress: {
      type: Function,
      default() {
        return {};
      },
    },
    onSuccess: {
      type: Function,
      default() {
        return {};
      },
    },
    onError: {
      type: Function,
      default() {
        return {};
      },
    },
    onExceededSize: {
      type: Function,
      default() {
        return {};
      },
    },
    onFormatError: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      file: '',
    };
  },
  methods: {
    /**
     * @desc 点击事件
     */
    handleClick() {
      if (this.disabled) return;
      this.$refs.input.click();
    },

    handleChange(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) {
        return;
      }
      postFiles.forEach(file => {
        this.upload(file);
      });
    },

    upload(file) {
      // 如果 不传递了 beforeUpload 则 默认自动上传
      if (!this.beforeUpload) {
        return this.post(file);
      }
      // 如果 传递了 beforeUpload 则 调用 beforeUpload
      const before = this.beforeUpload(file);

      // 如果 beforeUpload 返回一个 promise
      if (before && before.then) {
        before.then(
          processedFile => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              this.post(processedFile);
            } else {
              this.post(file);
            }
          },
          () => {
            // this.$emit('cancel', file);
          }
        );
      } else if (before !== false) {
        this.post(file);
      } else {
        // this.$emit('cancel', file);
      }
    },

    async post(file) {
      // check action
      if (!this.action) {
        this.$toast.error('请传 action 或者 beforeUpload');
        return false;
      }

      // check format
      if (this.format.length) {
        const fileFormat = file.name
          .split('.')
          .pop()
          .toLocaleLowerCase();
        const checked = this.format.some(item => item.toLocaleLowerCase() === fileFormat);
        if (!checked) {
          this.onFormatError(file);
          return false;
        }
      }
      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file);
          return false;
        }
      }

      const compressFileBase64 = await this.createImage(file);

      const compressFileBlob = this.dataURItoBlob(compressFileBase64);
      // compressFileBlob.lastModifiedDate = new Date();
      // compressFileBlob.name = file.name;

      // const formData = new FormData();
      // formData.append(this.name, compressFileBlob);
      // return;

      ajax({
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: compressFileBlob,
        data: { ...this.data, fileItemName: file.name },
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, file);
        },
        onSuccess: res => {
          this.onSuccess(res, file);
        },
        onError: (err, response) => {
          this.onError(err, response, file);
        },
      });
    },

    // 图片上传
    createImage(file) {
      const reader = new FileReader();
      const self = this;
      return new Promise(resolve => {
        reader.onload = e => {
          const result = e.target.result;
          const img = new Image();
          img.src = result;
          console.log('********未压缩前的图片大小********');
          console.log(result.length / 1024);
          if (result.length / 1024 > 50) {
            img.onload = function() {
              // 0.6为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
              resolve(self.compress(img, 0.6));
            };
          } else {
            console.log('********图片不大于 50kb 无需压缩 ********');
            resolve(result);
          }
        };
        // 读取图像
        reader.readAsDataURL(file);
      });
    },

    compress(img, size) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      // 进行最小压缩
      const ndata = canvas.toDataURL('image/jpeg', size);
      console.log('*******压缩后的图片大小*******');
      console.log(ndata.length / 1024);
      return ndata;
    },

    // base64转二进制
    dataURItoBlob(dataURI) {
      // base64 解码
      // const byteString = window.atob(dataURI.split(',')[1]);
      // const mimeString = dataURI
      //   .split(',')[0]
      //   .split(':')[1]
      //   .split(';')[0];
      // const ab = new ArrayBuffer(byteString.length);
      // const ia = new Uint8Array(ab);
      // for (let i = 0; i < byteString.length; i++) {
      //   ia[i] = byteString.charCodeAt(i);
      // }
      // return new Blob([ab], { type: mimeString });

      const arr = dataURI.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const mime = arr[0].match(/:(.*?);/)[1];
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
  },
};
