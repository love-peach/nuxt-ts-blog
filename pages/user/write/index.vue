<template>
  <div style="height: 100%;">
    <WriteEditor></WriteEditor>
  </div>
</template>

<script>
import WriteEditor from '@/pages/admin/write/index.vue';

export default {
  name: 'UserWrite',
  layout: 'user',
  components: {
    WriteEditor,
  },
};
</script>
