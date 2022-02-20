import axios from 'axios'

// import axios 本身就是 axios实例（实例对象）
// axios的请求都是异步操作
// axios.get(url: string, config?): Promise

// 1.模拟get请求
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })

// 2.get请求,并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'codermsz',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//     console.log(res.data)
//   })

// 3.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'msz',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4.全局配置

// baseURL和url关系：http://httpbin.org/user  baseURL：'http://httpbin.org'。url：'/user'

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
axios.defaults.baseURL = 'http://httpbin.org'
// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 1000
// `headers` 是即将被发送的自定义请求头
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }

// axios
//   .get('/get', {
//     params: {
//       name: 'codermsz',
//       age: 18
//     },
//     // 单独某个方法的局部配置
//     timeout: 5000,
//     // headers: {},
//     // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
//     // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
//     auth: {
//       username: 'janedoe',
//       password: 's00pers3cret'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     data: {
//       name: 'msz',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5.拦截器：在请求或响应被 then 或 catch 处理前拦截它们。
// axios.interceptors.request.use(函数1，函数2)  函数1：在发送请求之前做些什么，函数2：对请求错误做些什么
// axios.interceptors.response.use(函数1，函数2)  函数1：对响应数据做点什么，函数2：对响应错误做点什么
axios.interceptors.request.use(
  (config) => {
    // 1.在发送请求之前做些什么
    // 携带token
    // loading动画
    console.log('在发送请求之前做些什么')

    // 2.再把config返回出去
    return config
  },
  (err) => {
    console.log('对请求错误做些什么')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('对响应数据做点什么')
    return res
  },
  (err) => {
    console.log('对响应错误做点什么')
    return err
  }
)

// 6.axios.all
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'codermsz',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'msz',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
