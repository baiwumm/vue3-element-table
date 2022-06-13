
// 导入组件，组件必须声明 name
import XmwTable from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
XmwTable.install = function (Vue: any) {
    Vue.component(XmwTable.name, XmwTable)
}

export default XmwTable
