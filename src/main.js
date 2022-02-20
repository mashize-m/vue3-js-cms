import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 测试axiosdemo
// import './service/axios_demo'
// 封装axios测试
import mzRequest from '@/service'

// 全局引用element-plus样式
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// 封装axios测试
mzRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
