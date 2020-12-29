// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 1.reset.css 样式重置
import "./assets/css/reset.css"

// 2.vuex： 安装 目录 引入 挂到根实例
import store from "./store"

// 3.数据交互：安装 配置代理 utils/http.js 基本架子

// 4.过滤器
import "./filters"

// 5.公共组件
import "./components"

// 6.pages 路由组件

// 7.element-ui:安装 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
