// 封装 MzRequest 类，里面包含get/post等方法

/* 本文件说明：
一、拦截器的封装：可以携带添加token，添加loading等
1. 少见：类的封装：可以创建多个axios实例，例如：const mzRequest1 = new MzRequest(config1) / const mzRequest2 = new MzRequest(config2)
2. 实例的拦截器封装：可以对不同的axios实例，创建该实例特有的拦截器。例如：mzRequest1的config1里有拦截器，mzRequest2的config2里没有拦截器
3. 全局（类的）拦截器封装：所有实例都会有的拦截器。例如 mzRequest1 和 mzRequest2 都会共有的拦截器
4. 少见：实例方法单独的拦截器：某个实例的某一个方法的拦截器。例如 mzRequest1实例的get请求中，进行请求拦截和响应拦截
二、响应错误信息的处理：
①数据请求成功，但附带的属性状态码不对，例如：data.returnCode === '-1001'
②数据请求失败，返回的是HttpErrorCode状态码，4XX和5XX 都是请求失败
三、将request方法的结果res，通过resolve返回出去
四、扩展get、post请求方法封装
*/

/* 使用说明：
1. 导入 MzRequest 类
2. 根据导入的类，new一个实例(实例中包含了get/post等方法)  const mzRequest = new MzRequest(config)
3. 调用封装好的方法：mzRequest.get()、mzRequest.post()等
*/

import axios from 'axios'
import { ElLoading } from 'element-plus'

class MzRequest {
  instance
  interceptors
  loadingInstance
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
    // 全局（类的）拦截器封装：所有实例都会有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 全局拦截器-添加loading（还需要在响应拦截器，关闭Loading）
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: '正在请求~',
          background: 'rgba(0,0,0,0.5)'
        })
        // console.log('所有实例都会有的拦截器--请求成功拦截')
        return config
      },
      (err) => {
        // console.log('所有实例都会有的拦截器--请求失败拦截')
        console.log(err.request.status)
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都会有的拦截器--响应成功拦截')
        // 将loading移除
        this.loadingInstance?.close()

        // 例子：根据res.data当中的returnCode属性判断请求数据是否成功。这里的returnCode和'-1001'只是一个例子，具体的可以根据返回的数据判断
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return res
        }
      },
      (err) => {
        // console.log('所有实例都会有的拦截器--响应失败拦截')
        // 将loading移除
        this.loadingInstance?.close()

        // 例子：根据 HttpErrorCode 显示不同的错误信息，通过switch判断所有的状态码即可
        switch (err.response.status) {
          case '404':
            console.log('404')
            break
          case '501':
            console.log('501')
            break
        }
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 1.实例方法单独的拦截器（请求拦截器）：某个实例的某一个方法的拦截器。--先进行拦截处理
      if (config.interceptors?.requestInterceptors) {
        // 请求成功拦截器的本质，其实是一个函数，并且返回值是config。所以在这里可以直接调用这个函数
        config = config.interceptors.requestInterceptors(config)
      }
      // 2.这里才是真正的发送request请求
      this.instance
        .request(config)
        .then((res) => {
          // 3.实例方法单独的拦截器（响应拦截器）：单个请求对响应数据的处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 将结果res，通过resolve返回出去
          resolve(res)
          // console.log(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MzRequest
