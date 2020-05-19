import Card from '@/components/base/card/';
import Icon from '@/components/base/icon/';
import MdPreview from '@/components/kit/md-preview/';

export default {
  name: 'TopicItem',
  components: {
    Card,
    Icon,
    MdPreview,
  },
  props: {
    topic: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  computed: {
    parentPath() {
      return this.$route.path.split('/')[1];
    },
    firstParagraphIndex() {
      return this.topic.content.search(/\n/);
    },
    firstParagraph() {
      return this.topic.content.substring(0, this.firstParagraphIndex);
    },
  },
};
