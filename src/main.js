// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 引入字体图标css (字体图标的使用：iconfont icon-**）
import '@/assets/fonts/iconfont.css'
// 引入重置样式表
import '@/assets/styles/elrest.css'
// 引入样式表
import '@/assets/styles/styles.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})