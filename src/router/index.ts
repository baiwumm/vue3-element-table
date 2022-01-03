import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HelloWorld from '@/layout/Index.vue'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld
    }
]
//创建
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router