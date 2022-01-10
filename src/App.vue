<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import XmwTable from "@/components/XmwTable.vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { columns } from "./data";

// 表格配置项
const tableConfig = reactive({
  showSeletion: true,
  showHandler: true,
  showIndexColumn: true,
  isCheckMemory: true,
  handlerConfig: {
    align: "center",
  },
});

const state = reactive<any>({
  data: [],
  loading: false,
  locale: zhCn
});
const pageConfig = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
// 编辑操作
function handlerEdit(row: any) {
  console.log(row);
}

// 删除操作
function handlerDelect(row: any) {
  console.log(row);
}

// 自定义索引
function indexMethod(index: number) {
  return index * 5;
}

// 切换分页
function pageSizeChange(pageSize: number) {
  pageConfig.current = 1;
  pageConfig.pageSize = pageSize;
  initData();
}
function currentPageChange(pageIndex: number) {
  pageConfig.current = pageIndex;
  initData();
}

// 批量删除
function batchDelete(selection: any) {
  console.log(selection);
}
// 批量导出
function batchExport(selection: any) {
  console.log(selection);
}

// 模拟数据
function fetchData() {
  let result = [];
  for (let i = 0; i < 50; i++) {
    result.push({
      id: String(i),
      name: `李白${i + 1}`,
      province: "广东",
      area: "深圳",
      county: "南山",
      amount: i * 100
    });
  }
  return result;
}

// 初始化数据
function initData() {
  state.loading = true;
  setTimeout(() => {
    state.data = fetchData().slice(
      (pageConfig.current - 1) * pageConfig.pageSize,
      pageConfig.current * pageConfig.pageSize
    );
    state.loading = false;
  }, 1000);
}

// 多选选中时触发
function multiSelection(selection: any) {
  console.log(selection);
}

onMounted(() => {
  pageConfig.total = fetchData().length;
  initData();
});

// 行点击事件 测试事件绑定
function rowClick(row: any) {
  console.log(row)
}
</script>

<template>
  <el-config-provider :locale="state.locale">
    <div class="container" style="width: 1200px; margin: 50px auto">
      <XmwTable
        :tableData="state.data"
        :loading="state.loading"
        :columns="columns"
        :tableConfig="tableConfig"
        :paginationConfig="pageConfig"
        @indexMethod="indexMethod"
        @page-size-change="pageSizeChange"
        @current-page-change="currentPageChange"
        @multiSelection="multiSelection"
        stripe
        border
        showSeletion
        max-height="500"
        show-summary
        @row-click="rowClick"
      >
        <template v-slot:multiSelectMenu="{ selection }">
          <el-button type="text" size="small" @click="batchDelete(selection)">批量删除</el-button>
          <el-button type="text" size="small" @click="batchExport(selection)">批量导出</el-button>
        </template>
        <template v-slot:name="{ scope }">
          <el-tag type="success">{{ scope.row.name }}</el-tag>
        </template>
        <template v-slot:handler="{ scope }">
          <el-button type="text" size="small" @click="handlerEdit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="handlerDelect(scope)">删除</el-button>
        </template>
      </XmwTable>
    </div>
  </el-config-provider>
</template>
