import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XmwTable from '../packages/index'; // 全局挂在table组件
// import XmwTable from '../dist/vue3-xmw-table.es.js'

createApp(App).use(router).use(ElementPlus).use(XmwTable).mount('#app')
