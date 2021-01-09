import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/js/all.js';
import App from './App.vue'
import { routes } from './assets/routes.js'

Vue.use(VueRouter)
Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultContainerElement: '#content',
})

Vue.config.productionTip = false

export const eventBus = new Vue();

const router = new VueRouter({
  routes: routes,
  mode: 'history',
})

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
