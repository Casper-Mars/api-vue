import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/views/IndexPage";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index
        },
        {
            path: '/interface/:id',
            name: 'interface',
            component: () => import('@/views/InterfaceView')
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/views/SettingView')
        },

    ]
})
