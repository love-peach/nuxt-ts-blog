<template>
  <div v-highlight class="sspai" :style="styles" v-html="articleHtml"></div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js';

// import 'github-markdown-css/github-markdown.css';
import '@/assets/css/sspai.less'
import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  headerPrefix: 'header-nav',
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

export default {
  name: 'MdPreview',
  directives: {
    highlight(el) {
      const blocks = el.querySelectorAll('pre code');
      blocks.forEach(block => {
        highlight.highlightBlock(block);
      });
    },
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    padding: {
      type: [String, Number],
      default: '10px',
    },
  },
  computed: {
    articleHtml() {
      const renderer = new marked.Renderer();
      let index = 0;
      renderer.heading = function(text, level) {
        return `<h${level} id="titleAnchor-${index++}">${text}</h${level}>`;
      };
      return marked(this.content || '', { renderer });
    },
    styles() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding,
      };
    },
  },
};
</script>

<style lang="less">
.markdown-body p {
  text-align: justify;
}
</style>
