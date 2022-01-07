<template>
  <div class="common-table" v-loading="loading">
    <!--批量操作栏，勾选行时显示-->
    <el-row
      justify="space-between"
      style="align-items: center; margin: 10px 0"
      v-if="_tableConfig.showSeletion && state.selection.length"
    >
      <div class="multi-menu">
        <span style="font-size: 12px"
          >已选中{{ state.selection.length }}项</span
        >
        <el-divider direction="vertical" />
        <slot name="multiSelectMenu" :selection="state.selection" />
      </div>
      <a class="close" @click="clearSelection"></a>
    </el-row>
    <!-- 数据表格 -->
    <el-table
      ref="commonTableRef"
      :data="tableData"
      v-bind="$attrs"
      :rowKey="_tableConfig.rowKey"
      @selection-change="selectionChange"
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
        :index="typeIndex"
        width="60"
      >
        <template v-slot:header>
          <span>序号</span>
        </template>
      </el-table-column>
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
            <slot :name="column.slotName" :scope="scope"></slot>
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
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
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
import { defineProps, computed, defineEmits, reactive, ref } from "vue";
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
const emit = defineEmits([
  "pageSizeChange",
  "currentPageChange",
  "multiSelection",
]); // 声明emit

const state = reactive({
  selection: [],
});
const commonTableRef = ref<HTMLElement | null>(null); // 表格ref

// 合并表格配置项
const _tableConfig = computed(() => {
  let result: any = {};
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
function pageSizeChange(pageSize: number) {
  emit("pageSizeChange", pageSize);
}
function currentPageChange(pageIndex: number) {
  emit("currentPageChange", pageIndex);
}

// 清空多选项
function clearSelection() {
  state.selection = [];
  commonTableRef.value.clearSelection();
}

// 多选赋值
function selectionChange(selection: any) {
  state.selection = selection;
  // 暴露选中事件
  emit("multiSelection", selection);
}

// 自定义排序
function typeIndex(index: number) {
  const tabIndex =
    index +
    (_paginationConfig.value.current - 1) * _paginationConfig.value.pageSize +
    1;
  return tabIndex;
}
</script>
<style scoped>
.pagination {
  text-align: right;
  margin: 10px 0;
}
.close {
  position: relative;
  width: 16px;
  height: 16px;
}
.close:before,
.close:after {
  position: absolute;
  left: 8px;
  content: " ";
  height: 16px;
  width: 2px;
  background-color: #333;
  cursor: pointer;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>