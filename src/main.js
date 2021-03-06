//vue 构造函数
import Vue from 'vue';
//vant 组件库
import Vant, { Toast } from 'vant';
//App组件(以.vue结尾的文件都是组件)
import App from './App.vue';
//路由对象
import router from './router';
//导入axios
import axios from "axios";
//记录根实例
let app;
// 绑定到原型,加上以后可以在组件中通过this.$axios来调用
Vue.prototype.$axios = axios;
//基础路径
// axios.defaults.baseURL = "http://localhost:3000"
//线上路径
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"
Vue.use(Vant);
//上线环境是否提示信息(忽略)
Vue.config.productionTip = false;

// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.meta.guard) {
    //获取本地数据 判断是否非法进入
    const userJson = JSON.parse(localStorage.getItem("userInfor")) || {};
    if (userJson.token) {
      next()
    } else {
      // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
      next('/login')
    }
  } else {
    next()
  }

})

//axios拦截器
axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  console.log(error.response);
  const { statusCode, message } = error.response.data
  if (statusCode === 400) {
    Toast.fail(message);
  }
  //如果状态码是403 表示token是错的或者没传token
  //app 是根实例,身上有this的所有方法
  //query为问号后面的参数,可传对象
  if (statusCode === 403) {
    Toast.fail(message);
    app.$router.push({
      path: "/login",
      query: {
        return_url: app.$route.path
      }
    })
  }

  return Promise.reject(error);
});

//创建根实例
//.$mount('#app')相当于el配置,指定id为app的元素作为模板
app = new Vue({
  //路由对象
  router,
  //加载第一个组件,最底层的组件,写法是固定的
  render: h => h(App)
}).$mount('#app');
