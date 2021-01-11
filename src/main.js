import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedin, faOrcid, faSoundcloud, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { routes } from './assets/routes.js'

library.add(faCaretDown, faFacebook, faLinkedin, faOrcid, faSoundcloud, faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routes,
    mode: 'history',
  }),
}).$mount('#app')
