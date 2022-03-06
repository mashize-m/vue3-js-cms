/*
1.引入登录模块，所有登录相关的请求和数据保存在该模块中
2.将Vuex保存到本地缓存中，避免刷新后数据丢失（登录模块）
*/

import { createStore } from 'vuex'

// 引入登录模块，所有登录相关的请求和数据保存在该模块中
import loginModule from './login/login'

const store = createStore({
  state() {
    return {
      name: 'codermsz'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginModule
  }
})

// 防止页面刷新后，Vuex的数据没有了
export function setupStore() {
  store.dispatch('loginModule/loadLocalCache')
}

export default store
