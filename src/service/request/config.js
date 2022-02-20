// 开发环境和生产环境 的一些config配置（url，time_out等）

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

// url地址
let BASE_URL = ''
// 延时时间   常量
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 配置开发环境的url  --->   这里先用http://123.207.32.32:8000/代替
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  // 配置生产环境的url  --->   这里先用http://www.baidu.com代替
  BASE_URL = 'http://www.baidu.com'
} else {
  // 其他环境下
  BASE_URL = 'http://www.baidu.com'
}

export { BASE_URL, TIME_OUT }
