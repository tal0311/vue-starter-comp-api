import '@/assets/styles/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {svgPlugin}from './plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(svgPlugin)

app.mount('#app')
