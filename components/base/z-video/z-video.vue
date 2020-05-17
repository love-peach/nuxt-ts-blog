<template>
  <div ref="ZVideo" v-loading="!isReadyPlay" class="z-video" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="z-video-box">
      <video id="videoPlayer" class="z-video-box-player" :src="src" :poster="poster" type="video/webm" preload="metadata" @click="handleClickVideo" @dblclick="handleDbClickVideo">
        Your browser does not support the video tag.
      </video>
      <div v-show="!isPlaying" class="z-video-box-mask" @click="handleTogglePlay">
        <Icon class="z-video-box-mask-icon" type="play-circle" :size="50" color="fff" />
      </div>
    </div>
    <div :class="`z-video-control-wrap ${isShowControl || !isPlaying ? 'z-video-control-show' : 'z-video-control-hide'}`">
      <div class="z-video-control">
        <div class="z-video-control-play">
          <Icon :type="isPlaying ? 'pause' : 'play'" :size="28" @click="handleTogglePlay" />
        </div>
        <div class="z-video-control-progress">
          <ZProgress :value="progressValue" height="100%" @on-click="handleChangeProgress" />
        </div>
        <div class="z-video-control-time">
          {{ videoCurrentTime | formatTime }}
        </div>
        <div class="z-video-control-duration">
          {{ videoDuration | formatTime }}
        </div>
        <div class="z-video-control-sound">
          <Icon :type="isMute || !videoVolume ? 'mute' : 'sound'" :size="20" @click="handleToggleMute" />
        </div>
        <div class="z-video-control-volume">
          <ZProgress :value="videoVolume" height="10px" @on-click="handleChangeVolume" />
        </div>
        <div class="z-video-control-screen">
          <Icon :type="isFullScreen ? 'exit-full-screen' : 'full-screen'" :size="20" @click="handleToggleScreen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./z-video.js"></script>
<style src="./z-video.less" lang="less" scoped></style>
