// 登录模块
// 登录模块包含所有在登录过程中的异步请求，请求的数据保存

// 引入登录相关的网络请求
import {
  accountLoginRequest,
  userInfoRequest,
  userMenusRequest
} from '@/service/login/accountLoginRequest'

import LocalCache from '@/utils/localcache'

const loginModule = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      loginId: '',
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeLoginId(state, loginId) {
      state.loginId = loginId
    },
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      console.log('执行账号登录的accountLoginAction')
      // console.log(commit)
      // console.log(payload)
      // 1.发送网络请求-实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult.data)
      const { id, token } = loginResult.data.data
      commit('changeToken', token)
      commit('changeLoginId', id)
      // 将token添加到本地缓存中
      LocalCache.setCache('token', token)

      // 2.获取用户信息
      const userInfoResult = await userInfoRequest(id)
      console.log(userInfoResult.data)
      const userInfo = userInfoResult.data.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.获取用户菜单(基于角色)
      const userMenusResult = await userMenusRequest(userInfo.role.id)
      console.log(userMenusResult.data)
      const userMenus = userMenusResult.data.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
    }
  }
}

export default loginModule
