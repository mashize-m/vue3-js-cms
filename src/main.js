import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入normalize.css
import 'normalize.css'
// 引入自定义样式
import '@/assets/css/index.less'

// 测试axiosdemo
// import './service/axios_demo'
// 封装axios测试
// import mzRequest from '@/service'

// 全局引用element-plus样式
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// 封装axios测试
/*
mzRequest
  .get({
    url: '/home/multidata',
    interceptors: {
      requestInterceptors: (config) => {
        console.log('实例方法单独的拦截器--get方法的请求成功拦截器')
        return config
      },
      responseInterceptors: (res) => {
        console.log('实例方法单独的拦截器--get方法的响应成功拦截器')
        return res
      }
    }
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.data.data)
    console.log(res.data.returnCode)
  })
*/
