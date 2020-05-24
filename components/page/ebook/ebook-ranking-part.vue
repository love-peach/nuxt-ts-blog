<template>
  <div style="margin-bottom: 15px;">
    <TitleBar :title="dataSource.title">
      <!-- <template slot="titleRight">
        <ZBtn v-for="item in rankTableArr" :key="item.value" size="small" :theme="item.value === rankTableKey ? 'dashed' : 'text'" @click="handleChangeRankTableKey(item)">{{ item.label }}</ZBtn>
      </template> -->
    </TitleBar>
    <ZTable :columns="columns" :data="dataSource.list" size="small" :show-header="false" :border="false" />
  </div>
</template>

<script lang="ts">
import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';
// import ZBtn from '@/components/base/btn/';

export default {
  name: 'EbookRankingPart',
  components: {
    TitleBar,
    ZTable,
    // ZBtn,
  },
  props: {
    dataSource: {
      type: Object,
      default() {
        return {
          title: '',
          rankFinal: [],
        };
      },
    },
  },
  data() {
    return {
      rankTableKey: 'rankFinal',
      rankTableArr: [
        {
          label: '总',
          value: 'rankFinal',
        },
        {
          label: '月',
          value: 'rankMonth',
        },
        {
          label: '周',
          value: 'rankWeek',
        },
        // {
        //   label: '日',
        //   value: 'rankDay',
        // },
      ],
      columns: [
        {
          title: '序号',
          width: '45px',
          render: (h: any, params: any) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : ''],
              },
              params.index + 1
            );
          },
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h: any, params: any) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}`,
                  },
                },
                class: 'ebook-catalog-link',
              },
              params.row.name
            );
          },
        },
        {
          title: '更新日期',
          key: 'date',
          align: 'right',
        },
      ],
    };
  },
  methods: {
    handleChangeRankTableKey(item: any) {
      this.rankTableKey = item.value;
    },
  },
};
</script>
