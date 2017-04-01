import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

import './common/stylus/index.styl'

// 声明使用vue的扩展插件
Vue.use(VueRouter)
Vue.use(vueResource)  //所有的组件对象都多了一个属性: $http

// 创建路由器对象
let router = new VueRouter({
  linkActiveClass: 'active'
})

// 映射路由
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

// 启动路由
router.start(App, '#app')

// 请求默认路由
router.go('/goods')
