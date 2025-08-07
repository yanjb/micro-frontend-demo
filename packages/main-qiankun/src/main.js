import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';

// 注册微应用的基础配置信息。
// 当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
registerMicroApps([
  {
    name: 'vue-app2', // 必选，微应用的名称，微应用之间必须确保唯一。
    entry: '//localhost:8081', // 必选，微应用的入口。
    container: '#subapp-container', // 必选，微应用的容器节点的选择器或者 Element 实例。
    activeRule: '/vue-app2', // 必选，微应用的激活规则。
  },
  {
    name: 'vue-app3',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/vue-app3',
  },
], {
  // 微应用加载前触发
  beforeLoad: [
    app => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  // 微应用加载后触发
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  // 微应用加载后触发
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
    },
  ],
  // 微应用卸载前触发
  beforeUnmount: [
    app => {
      console.log('[LifeCycle] before unmount %c%s', 'color: green;', app.name);
    },
  ],
  // 微应用卸载后触发
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
});

// 添加全局错误处理
addGlobalUncaughtErrorHandler((event) => {
  console.error('微应用加载出错:', event);
  
  // 根据错误类型进行不同处理
  if (event && event.message && event.message.includes('Failed to fetch')) {
    console.error('微应用加载失败，请检查网络连接或服务状态');
  }
});

// 启动 qiankun 应用
start({
  prefetch: false, // 可选，是否开启预加载，默认为 true。
  sandbox: true, // 可选，是否开启沙箱，默认为 true。
  singular: true, //  可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
  // 可选，自定义的 fetch 方法。
  fetch(url, ...args) {
    const fetchOptions = { ...args };
    fetchOptions.mode = 'cors';
    fetchOptions.credentials = 'include';
    
    return window.fetch(url, fetchOptions);
  },
  // getPublicPath: (entry) => entry, // 可选，参数是微应用的 entry 值。
  // getTemplate: (tpl) => tpl, // 可选
  // 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理。
  excludeAssetFilter: (assetUrl) => {
    // 静态资源文件不被 qiankun 劫持处理
    return /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(assetUrl);
  },
});