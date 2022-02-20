// service统一出口文件

/* 本文件说明：
1. 导入 MzRequest 类
2. new一个实例：此时会执行类的constructor构造函数，这里面是创建了一个axios实例：axios.create(config)
   此时：const mzRequest = new MzRequest(config) == axios实例（import axios from 'axios'）
3. config可以手写，可以通过外部导入相关配置
4. 将实例导出，
   此时：mzRequest.get() == axios.get()
*/

/* 使用说明：
1. import mzRequest from '@/service'
2. mzRequest.get() 或 mzRequest.post()调用方法
*/

import MzRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const mzRequest = new MzRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default mzRequest
