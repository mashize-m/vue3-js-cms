// 登录模块
// 登录模块包含所有在登录过程中的异步请求，请求的数据保存

const loginModule = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction({ commit }, payload) {
      console.log('执行账号登录的accountLoginAction')
      console.log(commit)
      console.log(payload)
    }
  }
}

export default loginModule
