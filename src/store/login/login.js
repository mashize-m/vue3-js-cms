// 登录模块
// 登录模块包含所有在登录过程中的异步请求，请求的数据保存

// 引入登录相关的网络请求
import { accountLoginRequest } from '@/service/login/accountLoginRequest'

const loginModule = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      loginId: '',
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    changeLoginId(state, loginId) {
      state.loginId = loginId
    },
    changeToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      console.log('执行账号登录的accountLoginAction')
      // console.log(commit)
      // console.log(payload)
      // 1.发送网络请求
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult.data)
      const { id, token } = loginResult.data.data
      commit('changeToken', token)
      commit('changeLoginId', id)
    }
  }
}

export default loginModule
