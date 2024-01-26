import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ArcoDesign from '@arco-design/web-vue'
import ArcoDesignIcon from '@arco-design/web-vue/es/icon'
import '@lcdp-js/web/es/style.css'
import './assets/style/main.css'
import '@arco-design/web-vue/dist/arco.css'

createApp(App).use(router).use(ArcoDesign).use(ArcoDesignIcon).mount('#app')
