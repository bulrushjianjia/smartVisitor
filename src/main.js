// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import './utils/http.js'
// import './utils/mock.js'
// import weui from 'weui.js'
// import 'weui'
// import './common.less'
// import 'font-awesome/css/font-awesome.css'
import router from './router'

const PrevStep = () => import('./components/PrevStep');
Vue.component('PrevStep', PrevStep)

Vue.config.productionTip = false;


import(/* webpackChunkName: "weui" */ 'weui.js').then(weui => {
  Vue.prototype.$weui = weui;
});


new Vue({
  el: '#app',
  router,
  component: {
    PrevStep
  }
})