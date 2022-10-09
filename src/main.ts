import { createApp } from 'vue'
import { globalRegister } from '@/global/index'

import 'normalize.css'
import './assets/css/index.less'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { setUpStore } from './store'

const app = createApp(App)

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(globalRegister)

setUpStore()

// app.config.globalProperties.$filters = {
//   formatTime(value:string) {

//   }
// }

app.use(store).use(router).mount('#app')
