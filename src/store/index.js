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

export default store
