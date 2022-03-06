/*账号登录模块中，封装网络请求
1.账号登录的网络请求
2.用户信息的网络请求

*/
/*
使用说明：
1.引入登录相关的网络请求
import { accountLoginRequest } from '@/service/login/accountLoginRequest'
2.使用异步函数发送请求
async accountLoginAction({ commit }, payload) {
  // 1.发送网络请求
  const loginResult = await accountLoginRequest(payload)
  console.log(loginResult.data)
}
*/

import mzRequest from '../index'

const LoginAPI = {
  AccountLogin: '/login',
  UserInfo: '/users/', //API：/users/id
  UserMenus: '/role/' //API：/role/id/menu
}

export function accountLoginRequest(account) {
  return mzRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function userInfoRequest(id) {
  return mzRequest.get({
    url: LoginAPI.UserInfo + id
  })
}

export function userMenusRequest(id) {
  return mzRequest.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
