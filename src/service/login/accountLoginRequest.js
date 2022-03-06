// 账号登录模块中，封装网络请求

/*
使用说明：

引入登录相关的网络请求
import { accountLoginRequest } from '@/service/login/accountLoginRequest'

使用异步函数发送请求
async accountLoginAction({ commit }, payload) {
  // 1.发送网络请求
  const loginResult = await accountLoginRequest(payload)
  console.log(loginResult.data)
}

*/

import mzRequest from '../index'

const LoginAPI = {
  AccountLogin: '/login'
}

export function accountLoginRequest(account) {
  return mzRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
