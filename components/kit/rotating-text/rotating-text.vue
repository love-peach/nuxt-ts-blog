<template>
  <div :id="id" class="rotating-text" :style="{ width: width || '' }">
    <p v-for="(word, i) in words" :key="`${word}-${i}`" class="rotating-text-word">
      <span v-for="(letter, j) in word.label || word" :key="`${letter}-${j}`" class="rotating-text-letter" :style="{ color: word.color || '' }">{{ letter }}</span>
    </p>
  </div>
</template>

<script src="./rotating-text.js"></script>

<style lang="less">
.rotating-text {
  display: inline-flex;
  margin: 0;
  vertical-align: top;
  justify-content: center;
  &-word {
    position: absolute;
    display: flex;
    opacity: 0;
  }
  &-letter {
    // transform-origin: center center 25px;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
  &-letter.out {
    transform: rotateX(90deg);
    transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
  }
  &-letter.in {
    transition: 0.38s ease;
  }
  &-letter.behind {
    transform: rotateX(-90deg);
  }
}
</style>
