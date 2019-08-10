import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from './api/api'
import Axios from "axios";
import UtilTool from "@/util/UtilTool";
import 'element-ui/lib/theme-chalk/index.css'
// import './mock/mock'
import './registerServiceWorker'

Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.prototype.$axios = Axios;
Vue.prototype.$util = UtilTool;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
