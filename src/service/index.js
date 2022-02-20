// service统一出口文件

/* 本文件说明：
1. 导入 MzRequest 类
2. new一个实例：此时会执行类的constructor构造函数，这里面是创建了一个axios实例：axios.create(config)
   此时：const mzRequest = new MzRequest(config) == axios实例（import axios from 'axios' -> import导入的axios就是一个axios实例）
   config可以手写，可以通过外部导入相关配置
3. baseURL的不同代表创建不同的axios实例
   interceptors的有无代表可以对不同的axios实例，创建不同的拦截器

4. 将实例导出，
   此时：mzRequest.get() == axios.get()
*/

/* 使用说明：
1. import mzRequest from '@/service'
2. 调用mzRequest对象的封装方法即可。例如：mzRequest.get() 或 mzRequest.post()方法
*/

import MzRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const mzRequest = new MzRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('mzRequest实例拦截器--请求拦截成功')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('mzRequest实例拦截器--请求拦截失败')
      return err
    },
    responseInterceptors: (res) => {
      console.log('mzRequest实例拦截器--响应拦截成功')
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log('mzRequest实例拦截器--响应拦截失败')
      return err
    }
  }
})

export default mzRequest
