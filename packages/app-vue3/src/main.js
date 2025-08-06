import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 动态设置 webpack publicPath，确保资源正确加载
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

let instance = null

function render(props = {}) {
  const { container } = props
  const domElement = container ? container.querySelector('#app') : document.querySelector('#app')
  
  if (!domElement) {
    console.error('[vue3-app] Target element #app not found!')
    return
  }
  
  instance = createApp(App)
  instance.use(router)
  instance.mount(domElement)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue3] vue3 app bootstraped')
}

export async function mount(props) {
  console.log('[vue3] props from main framework', props)
  render(props)
}

export async function unmount() {
  if (instance) {
    instance.unmount()
    instance = null
  }
}
