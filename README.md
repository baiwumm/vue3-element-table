基于 `Vue3` + `Element-plus` 封装的 `Table` 组件，欢迎大家交流学习，持续开发中
### 预览地址：[vue3-xmw-table](https://ele-plus-table.baiwumm.com/)

# Vue3-xmw-table

基于 `Vue3` + `Element-plus` 封装的 `table` 组件，支持所有 `elementUI table` 组件配置项 [文档](https://element-plus.gitee.io/zh-CN/component/table.html)，另外多选功能做了跨分页多选

### 使用方法
* 根目录下执行 `npm i vue3-xmw-table` 命令
```POWERSHELL
npm i vue3-xmw-table
```

* 全局挂载组件
```JAVASCRIPT
import { createApp } from 'vue'
import App from './App.vue'
import Xmwtable from 'vue3-xmw-table'

createApp(App).use(Xmwtable).mount('#app')

```

* 在页面上使用
```HTML
<!-- template -->
<vue3-xmw-table
    stripe
    border
    show-summary
    :summary-method="getSummaries"
    :tableData="state.tableData"
    :loading="state.loading"
    :columns="state.tableColumns"
    :tableConfig="tableConfig"
    :showPagination="false"
  >
  <template v-slot:handler="{ scope }">
    <el-button
      size="small"
      type="primary"
      >编辑</el-button
    >
    <el-button
      type="danger"
      size="small"
      >删除</el-button
    >
  </template>
</vue3-xmw-table>
```
### Table 属性

除此之外支持所有 `el-table` 属性

| 参数       | 说明                                                    |  类型   | 默认值 |
| :--------- | :------------------------------------------------------ | :-----: | :----: |
| tableData       | 表格数据                                                |  Array  |   -    |
| columns    | 列配置,详情见下方 Column 属性                           |  Array  |   -    |
| loading    | 加载状态                                                | Boolean | false  |
| tableConfig     | 表格配置项，详情见下方 Config 属性                      | Object  |   -    |
| showPagination       | 是否显示分页 | Boolean  |  true  |
| paginationConfig | 分页器配置项，详情见下方 paginationConfig 属性                | Object  |   -    |

### Column 属性 

除此之外支持所有 `el-table-column` 属性

| 参数 | 说明                         |  类型   | 默认值 |
| :--- | :--------------------------- | :-----: | :----: |
| slotName | 开启 slot 支持，用于自定义列 | Boolean | false  |

### tableConfig 配置项

除此之外支持所有 el-table attributes

| 参数              | 说明                                                                                                                                                                                     |         类型         |                    默认值                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------: | :------------------------------------------: |
| rowKey            | 行数据的 Key，用来优化 Table 的渲染；在使用 多选 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 | Function(row)/String |                      --                      |
| showSeletion | 是否支持多选                                                                                                                                                                             |       Boolean        |                    false                     |
| showIndexColumn   | 是否显示序号列                                                                                                                                                                           |       Boolean        |                    false                     |
| indexLabel   | 自定义索引名                                                                                                                                                                           |       String        |                    序号                     |
| isCheckMemory   | 是否需要跨页勾选                                                                                                                                                                           |       Boolean        |                    false                     |
| showHandler       | 是否显示操作列                                                                                                                                                                           |       Boolean        |                    false                     |
| showExpand       | 是否是展开行                                                                                                                                                                           |       Boolean        |                    false                     |
| showAppend       | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上                                                                                                                                                                           |       Boolean        |                    false                     |
| appendLabel   | 自定义默认内容                                                                                                                                                                           |       String        |                    自定义                     |
| handlerConfig     | 操作列配置，showHandler 为 true 时有效                                                                                                                                                   |        Object        | { label: "操作", minWidth: 80, fixed: "right" } |




### Page 配置项

除此之外支持所有 `el-pagination` 配置项

| 参数            | 说明                   |  类型  | 默认值 |
| :-------------- | :--------------------- | :----: | :----: |
| total | 条目数 | number |   0    |
| current | 当前页数 | number |   1   |
| pageSize | 每页显示条目个数 | number |   10    |
| pageSizes | 每页显示个数选择器的选项设置 | Array |   [10, 20, 30, 50]    |
| layout | 组件布局，子组件名用逗号分隔 | String |   "total, sizes, prev, pager, next, jumper"    |

### Slot 插槽

| name                     | 说明                                                                 |           参数           |
| :----------------------- | :------------------------------------------------------------------- | :----------------------: |
| multiSelectMenu                  | 多选显示顶部操作栏                                                   | { row, column, \$index } |
| handler                  | 自定义操作栏的内容                                                   | { row, column, \$index } |
| expand                  | 自定义展开行内容（必须先指定showExpand为true）                                                   | { row, column, \$index } |
| append                  | 自定义默认内容（必须先指定showAppend为true）                                                   | { row, column, \$index } |

### Events 事件

除此之外支持所有 `el-table` 事件

注： 因为添加了跨分页多选的功能，`selection-change` 会在切换分页设置勾选状态时调用多次

| 事件名称            | 说明                     |   参数   |
| :------------------ | :----------------------- | :------: |
| current-page-change | currentPage 改变时会触发 |  当前页  |
| page-size-change    | pageSize 改变时会触发    | 每页条数 |
