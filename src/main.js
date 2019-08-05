import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css'
import './mock/mock'
import './registerServiceWorker'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
