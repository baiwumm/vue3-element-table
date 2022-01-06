<script setup lang="ts">
import { reactive } from "vue";
import XmwTable from "@/components/XmwTable.vue";
import { tableData, columns } from "./data";

// 表格配置项
const tableConfig = reactive({
  showHandler: true,
  handlerConfig: {
    align: "center",
  },
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
function sizeChange(pageSize: number) {
  console.log(pageSize);
}
function currentChange(pageIndex: number) {
  console.log(pageIndex);
}
</script>

<template>
  <div class="container" style="width: 800px; margin: 50px auto">
    <XmwTable
      :tableData="tableData"
      :columns="columns"
      :tableConfig="tableConfig"
      @indexMethod="indexMethod"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      stripe
      border
      showSeletion
    >
      <template v-slot:handler="{ scope }">
        <el-button type="text" size="small" @click="handlerEdit(scope)"
          >编辑</el-button
        >
        <el-button type="text" size="small" @click="handlerDelect(scope)"
          >删除</el-button
        >
      </template>
    </XmwTable>
  </div>
</template>
