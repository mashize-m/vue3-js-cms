// 封装本地缓存的工具，包含设置（加密），读取（解密），删除，清空

class LocalCache {
  // 设置
  setCache(key, value) {
    window.localStorage.setItem(
      key,
      // // 未加密
      // JSON.stringify(value)
      // 用中文 记得加encodeURIComponent()!
      // 加密：window.btoa(window.encodeURIComponent(JSON.stringify(obj)));
      window.btoa(window.encodeURIComponent(JSON.stringify(value)))
    )
  }
  // 读取
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // 未解密
      // return JSON.parse(value)
      // 解密：decodeURIComponent(window.atob(value))
      return JSON.parse(decodeURIComponent(window.atob(value)))
    }
  }
  // 删除
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  // 清空
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
