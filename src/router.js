import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/MainPage'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/interface/:id',
            name: 'interface',
            component: () => import('@/views/InterfaceView')
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexPage')
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/views/SettingView')
        },

    ]
})
