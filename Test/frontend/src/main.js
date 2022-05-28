import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import AOS from 'aos'
import "aos/dist/aos.css"
import Meta from 'vue-meta'
import axios from 'axios'
import { RingBottomNavigation, SwipeBottomNavigation  } from "bottom-navigation-vue";
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.config.productionTip = false

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(Meta);
Vue.prototype.$http = axios
Vue.use(RingBottomNavigation);
Vue.use(SwipeBottomNavigation );
// asyncFunction("select * from USER", hifiveDB);


const options = {
  name: '_blank',
  specs: [
    'titlebar=yes',
    'scrollbars=yes'
  ],
  autoClose: true,
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options);

new Vue({
  created(){
    AOS.init();
  },
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')
