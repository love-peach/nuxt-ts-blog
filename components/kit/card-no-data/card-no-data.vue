<template>
  <Card :padding="padding">
    <NoData />
  </Card>
</template>

<script>
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

export default {
  name: 'CardNoData',
  components: {
    Card,
    NoData,
  },
  props: {
    padding: {
      type: [String, Number],
      default: 0,
    },
  },
};
</script>
