// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'

//1. 導入組件
import Goods from "./components/Goods/Goods.vue"
import Ratings from "./components/Ratings/Ratings.vue"
import Seller from "./components/Seller/Seller.vue"

Vue.config.productionTip = false

// 安裝vue-router插件
Vue.use(VueRouter)

//  如果在其他組件中使用axios命令，需要改寫為Vue原型屬性
Vue.prototype.$axios =Axios;


//2. 定義路由
const routes = [
  {
    path: '/',
    //重新導向
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/Ratings',
    component: Ratings
  },
  {
    path: '/Seller',
    component: Seller
  },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' //選中後的類名(默認值:router-link-active) (ref:https://router.vuejs.org/zh-cn/api/options.html)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  //4. 创建和挂载根实例。
  router
})
