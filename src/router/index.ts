import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import XmwTable from '@/components/XmwTable.vue'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: XmwTable
    }
]
//创建
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router