<template>
  <div class="common-table" v-loading="loading">
    <el-table
      ref="commonTable"
      :data="tableData"
      v-bind="$attrs"
      :rowKey="_tableConfig.rowkey"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="_tableConfig.showSeletion"
        type="selection"
        width="60"
        :reserve-selection="_tableConfig.isCheckMemory"
        align="center"
      >
      </el-table-column>
      <!-- 显示自定义索引 -->
      <el-table-column
        v-if="_tableConfig.showIndexColumn"
        type="index"
        width="50"
      />
      <!-- 递归渲染多级表头 -->
      <template v-for="column in columns">
        <multistage-column
          v-if="column.children && column.children.length"
          :key="column.prop"
          :column="column"
        ></multistage-column>
        <el-table-column
          v-else
          :key="column.prop"
          v-bind="column"
          show-overflow-tooltip
        >
          <template v-if="column.slotName" v-slot="scope">
            <slot :name="column.slotName" :data="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <!-- 操作栏 -->
      <el-table-column
        v-if="_tableConfig.showHandler"
        v-bind="_tableConfig.handlerConfig"
      >
        <template v-slot="scope">
          <slot name="handler" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页配置 -->
    <div class="pagination">
      <el-pagination
        v-if="showPagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="_paginationConfig.total"
        :current-page="_paginationConfig.current"
        :page-size="_paginationConfig.pageSize"
        :page-sizes="_paginationConfig.pageSizes"
        :layout="_paginationConfig.layout"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed, defineEmits } from "vue";
import MultistageColumn from "./MultistageColumn.vue";
// 定义组件接收的prop属性
const prop = defineProps({
  // 表格源数据
  tableData: {
    type: Array,
    default: () => [],
  },
  //   表格配置项
  tableConfig: {
    type: Object,
    default: () => {},
  },
  //   表格列配置
  columns: {
    type: Array,
    default: () => [],
  },
  //   加载loading
  loading: {
    type: Boolean,
    default: false,
  },
  //   是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 分页配置
  paginationConfig: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["sizeChange", "currentChange", "indexMethod"]); // 声明emit

// 合并表格配置项
const _tableConfig = computed(() => {
  let result = {};
  const _tableConfig = { label: "操作", minWidth: 80, fixed: "right" };
  prop.tableConfig.handlerConfig &&
    Object.assign(_tableConfig, prop.tableConfig.handlerConfig);
  const config = {
    rowKey: "id", //   行数据的 Key，用来优化 Table 的渲染
    showSeletion: false, // 是否多选
    showIndexColumn: false, // 是否显示自定义索引
    isCheckMemory: false, // 是否需要跨页勾选
    showHandler: false, // 是否需要显示操作栏
  };
  result = Object.assign(config, prop.tableConfig);
  result.handlerConfig = _tableConfig;
  return result;
});

// 合并分页配置
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
    layout: "total, sizes, prev, pager, next, jumper",
  };
  return Object.assign(config, prop.paginationConfig);
});

// 切换分页
function sizeChange(pageSize: number) {
  emit("sizeChange", pageSize);
}
function currentChange(pageIndex: number) {
  emit("currentChange", pageIndex);
}
</script>
<style scoped>
.pagination {
  text-align: right;
  margin: 10px 0;
}
</style>