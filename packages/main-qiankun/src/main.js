import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vue-app2', // app name registered
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/vue-app2',
  },
  {
    name: 'vue-app3', // app name registered
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/vue-app3',
  },
]);

start();