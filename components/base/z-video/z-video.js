import Icon from '@/components/base/icon/';
import ZProgress from '@/components/base/z-progress';

let timer = null;
let timerClick = null;

export default {
  name: 'ZVideo',
  components: {
    Icon,
    ZProgress,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    poster: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isReadyPlay: false,
      isPlaying: false,
      isMute: false,
      isFullScreen: false,
      isShowControl: true,
      videoVolume: 0,
      videoVolumeOld: 0,
      videoCurrentTime: 0,
      videoDuration: 1,
      currentTimeFormat: '00:00',
      durationFormat: '00:00',
    };
  },
  computed: {
    progressValue() {
      return this.videoCurrentTime / this.videoDuration;
    },
  },
  filters: {
    formatTime(seconds) {
      const h = parseInt(seconds / 3600);
      const m = parseInt((seconds % 3600) / 60);
      const s = parseInt(seconds % 60);
      if (h) {
        return formatZero(h) + ':' + formatZero(m) + ':' + formatZero(s);
      } else {
        return formatZero(m) + ':' + formatZero(s);
      }
      function formatZero(num) {
        return num < 10 ? '0' + num : num;
      }
    },
  },
  mounted() {
    const that = this;
    this.videoPlayer = document.getElementById('videoPlayer');
    this.videoPlayer.onloadedmetadata = function() {
      that.videoDuration = this.duration;
      this.volume = that.videoVolume;
      that.isReadyPlay = true;
    };
    this.videoPlayer.ontimeupdate = function() {
      const videoCurrentTime = this.currentTime;
      that.videoCurrentTime = videoCurrentTime;
      if (videoCurrentTime === that.videoDuration) {
        that.isPlaying = false;
      }
    };
  },
  watch: {
    isPlaying(value) {
      if (value) {
        this.videoPlayer.play();
      } else {
        this.videoPlayer.pause();
      }
    },
    isMute(value) {
      if (value) {
        this.videoPlayer.volume = 0;
        this.videoVolume = 0;
      } else {
        this.videoPlayer.volume = this.videoVolumeOld;
        this.videoVolume = this.videoVolumeOld;
      }
    },
    isFullScreen(value) {
      if (value) {
        this.launchFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
  },
  methods: {
    /**
     * @desc 单击 video
     */
    handleClickVideo() {
      clearTimeout(timerClick);
      timerClick = setTimeout(() => {
        this.handleTogglePlay();
      }, 300);
    },

    /**
     * @desc 双击 video
     */
    handleDbClickVideo() {
      clearTimeout(timerClick);
      this.handleToggleScreen();
    },

    /**
     * @desc mousemove
     */
    handleMouseMove() {
      this.isShowControl = true;
      if (this.isFullScreen) {
        this.handleDebounceIsShowControl();
      }
    },

    /**
     * @desc mousemove 防抖事件
     */
    handleDebounceIsShowControl() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.isShowControl = false;
      }, 2000);
    },

    /**
     * @desc mouseleave
     */
    handleMouseLeave() {
      this.isShowControl = false;
    },

    /**
     * @desc 进度条点击事件
     */
    handleChangeProgress(value) {
      this.videoPlayer.currentTime = this.videoDuration * value;
    },

    /**
     * @desc 音量条点击事件
     */
    handleChangeVolume(value) {
      this.videoVolume = value;
      this.videoVolumeOld = value;
      this.videoPlayer.volume = value;
      this.isMute = value <= 0;
    },
    /**
     * @desc 切换播放
     */
    handleTogglePlay() {
      this.isPlaying = !this.isPlaying;
    },

    /**
     * @desc 切换静音
     */
    handleToggleMute() {
      this.isMute = !this.isMute;
    },

    /**
     * @desc 切换全屏
     */
    handleToggleScreen() {
      this.isFullScreen = !this.isFullScreen;
    },

    /**
     * @desc 进入全屏
     */
    launchFullscreen() {
      const element = this.$refs.ZVideo;
      // 此方法不可以在異步任務中執行，否則火狐無法全屏
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      } else {
        const cssText = 'width:100%;height:100%;overflow:hidden;';
        const docHtml = document.documentElement;
        const docBody = document.body;
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
      }
      element.style.cssText = 'margin:0px;padding:0px;position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: 999;';
    },

    /**
     * @desc 退出全屏
     */
    exitFullscreen() {
      const element = this.$refs.ZVideo;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        const docHtml = document.documentElement;
        const docBody = document.body;
        docHtml.style.cssText = '';
        docBody.style.cssText = '';
      }
      element.style.cssText = '';
    },
  },
};
