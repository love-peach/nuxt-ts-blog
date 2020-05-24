function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
export default {
  name: 'rotatingText',
  props: {
    words: {
      type: Array,
      default() {
        return [];
      },
    },
    interval: {
      type: Number,
      default: 4000,
    },
    width: {
      type: String,
      default: '2em',
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      id: guid(),
      currentWordIndex: 0,
    };
  },
  mounted() {
    const _this = this;
    this.maxWordIndex = this.words.length - 1;
    this.wordsDom = document.getElementById(_this.id).querySelectorAll('.rotating-text-word');
    this.start();
    this.rotateText();
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },

  methods: {
    start() {
      const _this = this;
      this.timer = setTimeout(function() {
        _this.rotateText();
        _this.start();
      }, this.interval);
    },
    rotateText() {
      const currentWord = this.wordsDom[this.currentWordIndex];
      const nextWord = this.currentWordIndex === this.maxWordIndex ? this.wordsDom[0] : this.wordsDom[this.currentWordIndex + 1];
      // rotate out letters of current word
      Array.from(currentWord.children).forEach(function(letter, i) {
        setTimeout(function() {
          letter.className = 'rotating-text-letter out';
        }, i * 80);
      });
      // reveal and rotate in letters of next word
      nextWord.style.opacity = '1';
      Array.from(nextWord.children).forEach(function(letter, i) {
        letter.className = 'rotating-text-letter behind';
        setTimeout(function() {
          letter.className = 'rotating-text-letter in';
        }, 340 + i * 80);
      });
      this.currentWordIndex = this.currentWordIndex === this.maxWordIndex ? 0 : this.currentWordIndex + 1;
    },
  },
};
