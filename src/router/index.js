import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'

//注册路由的插件,把路由关联到vue .固定要加的
Vue.use(VueRouter)

const routes = [
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
    component: () => import('@/views/Personal')
  },
  //编辑资料 
  {
    path: '/editprofile',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Editprofile')
  },

  //我的关注 
  {
    path: '/follow',
    //除了首页之外的都可以懒加载
    component: () => import('@/views/Follow')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//暴露路由
export default router
