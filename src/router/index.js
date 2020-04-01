import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'

//注册路由的插件,把路由关联到vue .固定要加的
Vue.use(VueRouter)

const routes = [
  //路由重定向
  {
    path: "/",
    // 如果匹配到斜杠/，重定向到/user
    redirect: "/index"
  },
  //首页
  {
    path: "/index",
    component: () => import('@/views/Index')
  },
  //栏目管理
  {
    path: '/column',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Column'),

  },
  //搜索新闻
  {
    path: '/search',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Search'),

  },

  //登录页
  {
    path: '/login',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Login')
  },
  //注册页
  {
    path: '/register',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Register')
  },
  //个人中心页
  {
    path: '/personal',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Personal'),
    // 路由守卫权限
    meta: { guard: true }
  },
  //编辑资料 
  {
    path: '/editprofile',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Editprofile'),
    // 路由守卫权限
    meta: { guard: true }
  },

  //我的关注 
  {
    path: '/follow',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Follow'),
    // 路由守卫权限
    meta: { guard: true }
  },
  //我的跟帖
  {
    path: '/comment',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Comment'),
    // 路由守卫权限
    meta: { guard: true }
  },
  //我的收藏
  {
    path: '/start',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Start'),
    // 路由守卫权限
    meta: { guard: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//暴露路由
export default router
