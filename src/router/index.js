import { createRouter, createWebHashHistory } from 'vue-router'

import localcache from '@/utils/localcache'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
/*
路由跳转钱，判断是否是跳转到login页面
如果不是，就判断缓存中是否有token，
如果没有token，就直接导向登录页面
*/
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localcache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
