// 封装 MzRequest 类，里面包含get/post等方法

/* 本文件说明：
1. 类的封装：可以创建多个axios实例，例如：const mzRequest1 = new MzRequest(config1) / const mzRequest2 = new MzRequest(config2)
2. 类的拦截器封装：可以对不同的axios实例，创建不同的拦截器。例如：mzRequest1的config1里有拦截器，mzRequest2的config2里没有拦截器
*/

/* 使用说明：
1. 导入 MzRequest 类
2. 根据导入的类，new一个实例(实例中包含了get/post等方法)  const mzRequest = new MzRequest(config)
3. 调用封装好的方法：mzRequest.get()、mzRequest.post()等
*/

import axios from 'axios'

class MzRequest {
  instance
  interceptors
  // constructor 是一种用于创建和初始化class创建的对象的特殊方法
  constructor(config) {
    // 类的封装：通过传入不同的config对象，可以创建多个mzRequest（axios）实例，
    this.instance = axios.create(config)
    // 类的拦截器封装：可以对于不同的axios实例，创建不同的拦截器
    this.interceptors = config?.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
  }

  request(config) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default MzRequest
