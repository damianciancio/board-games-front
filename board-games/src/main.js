import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Notifications from 'vue-notification'
import UtilsMixin from './mixins/utils'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(Notifications);
Vue.mixin(UtilsMixin);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
