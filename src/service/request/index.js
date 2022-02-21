// 封装 MzRequest 类，里面包含get/post等方法

/* 本文件说明：
1. 类的封装：可以创建多个axios实例，例如：const mzRequest1 = new MzRequest(config1) / const mzRequest2 = new MzRequest(config2)
2. 实例的拦截器封装：可以对不同的axios实例，创建该实例特有的拦截器。例如：mzRequest1的config1里有拦截器，mzRequest2的config2里没有拦截器
3. 类的拦截器封装：所有实例都会有的拦截器。例如 mzRequest1 和 mzRequest2 都会共有的拦截器
4. 实例方法单独的拦截器：某个实例的某一个方法的拦截器。例如 mzRequest1实例的get请求中，进行请求拦截和响应拦截
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
    // 实例的拦截器封装：可以对不同的axios实例，创建该实例特有的拦截器。
    this.interceptors = config?.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    // 类的拦截器封装：所有实例都会有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都会有的拦截器--请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有实例都会有的拦截器--请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都会有的拦截器--响应成功拦截')
        return res
      },
      (err) => {
        console.log('所有实例都会有的拦截器--响应失败拦截')
        return err
      }
    )
  }

  request(config) {
    // 实例方法单独的拦截器：某个实例的某一个方法的拦截器
    if (config.interceptors?.requestInterceptors) {
      // 请求成功拦截器的本质，其实是一个函数，并且返回值是config。所以在这里可以直接调用这个函数
      config = config.interceptors.requestInterceptors(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.requestInterceptors(res)
      }
      console.log(res)
    })
  }
}

export default MzRequest
