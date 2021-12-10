import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api';

import { PaginationPlugin } from 'bootstrap-vue'
Vue.use(PaginationPlugin)

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));

import { AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns';

Vue.use(AutoCompletePlugin);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
