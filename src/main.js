// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
import storeConfig from './store/index.js'
import axios from 'axios'
import Tool from './common/tool.js'

Vue.use(Vuex);
Vue.use(iView);

Vue.config.productionTip = false

let store = new Vuex.Store(storeConfig);


axios.interceptors.request.use(function (config) {
  config.withCredentials = true
  if (Tool.getCookie('token')) {
    config.headers = {
      "Authorization": `Bearer ${Tool.getCookie('token')}`
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
