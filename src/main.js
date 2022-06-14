import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost:8081';//后端开发环境地址
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头信息。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
