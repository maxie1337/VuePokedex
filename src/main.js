import { createApp } from 'vue'
import App from './App.vue'
import { router } from './Router'

const app = createApp(App)
app.config.globalProperties.$filters = {
  capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
}

app.use(router).mount('#app')