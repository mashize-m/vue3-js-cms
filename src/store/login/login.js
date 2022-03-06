/*
一、登录模块：包含所有在登录过程中的异步请求，请求的数据保存
  1.账号登录的网络请求
  2.用户信息的网络请求
  3.用户菜单的网络请求
  4.跳转首页
二、加载本地缓存中保存的信息，到Vuex中，避免页面刷新造成Vuex数据丢失
*/
// 引入登录相关的网络请求
import {
  accountLoginRequest,
  userInfoRequest,
  userMenusRequest
} from '@/service/login/accountLoginRequest'

import LocalCache from '@/utils/localcache'
import router from '@/router'

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
    // 登录模块：网络请求+数据获取
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
      router.push('/main')
    },
    // 加载本地缓存中保存的信息，到Vuex中，避免页面刷新造成Vuex数据丢失
    loadLocalCache({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
      const loginId = LocalCache.getCache('loginId')
      if (loginId) {
        commit('changeLoginId', loginId)
      }
    }
  }
}

export default loginModule
