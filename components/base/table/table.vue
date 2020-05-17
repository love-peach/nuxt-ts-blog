<template>
  <table v-loading="loading" :class="[prefixCls, border ? `${prefixCls}-border` : '', stripe ? `${prefixCls}-stripe` : '', `${prefixCls}-size-${size}`]">
    <tbody>
      <tr v-if="showHeader">
        <th v-for="(col, colIndex) in columns" :key="colIndex" :style="col | stylesTh" :class="col.class">
          {{ col.title }}
        </th>
      </tr>
      <template v-if="data && data.length > 0">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="`${prefixCls}-tr`">
          <td v-for="(col, colIndex) in columns" :key="colIndex" :style="col | stylesTd" :class="col.class">
            <render-td v-if="typeof col.render === 'function'" :index="rowIndex" :render="col.render" :row="row" :column="col"></render-td>
            <span v-else-if="col.type === 'index'">{{ rowIndex + 1 }}</span>
            <span v-else :title="row[col.key]">{{ row[col.key] }}</span>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td :colSpan="columns.length">
          <NoData style="height: 130px;" size="100px" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import RenderTd from './render-td';
import NoData from '@/components/kit/no-data/';

const prefixCls = 'z-table';

export default {
  name: 'ZTable',
  components: {
    NoData,
    RenderTd,
  },
  filters: {
    stylesTh(col) {
      return {
        width: col.width,
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        textAlign: col.align,
      };
    },
    stylesTd(col) {
      return {
        width: col.width,
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        textAlign: col.align,
      };
    },
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'default',
    },
    height: Number,
    loading: Boolean,
  },
  data() {
    return {
      prefixCls,
    };
  },
};
</script>

<style lang="less" scoped>
.z-table {
  width: 100%;

  background-color: #fff;
  th,
  td {
    text-align: center;
    border-top: 1px solid @colorBorder;
  }
  th {
    padding: 12px;
    background-color: @colorBg;
  }
  td {
    padding: 8px 12px;
  }
  &-tr:hover {
    background-color: #ebf7ff !important;
  }
  &-border {
    border-right: 1px solid @colorBorder;
    border-bottom: 1px solid @colorBorder;
    th,
    td {
      border-left: 1px solid @colorBorder;
    }
  }
  &-size-small {
    td {
      font-size: 12px;
      padding: 8px 8px;
    }
    th {
      padding: 8px 8px;
    }
  }
  &-stripe {
    tr:nth-child(even) {
      background-color: @colorBg;
    }
  }
}
</style>
