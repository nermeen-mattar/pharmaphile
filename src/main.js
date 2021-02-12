import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VModal from 'vue-js-modal';
import rate from 'vue-rate';
import 'vue-rate/dist/vue-rate.css';
import VueAgile from 'vue-agile';
import axios from 'axios';
import { auth } from './http/firebase/firebase'
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';
/* eslint-disable */ 

window.EventBus = new Vue();

Vue.use(VueToast, {
  // One of the options
  position: 'top'
});
// let instance = Vue.$toast.open('You did it!');
//Vue.$toast.open({/* options */});

// Force close specific toast
// instance.close();
// Close all opened toast immediately
Vue.$toast.clear();

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// firebase.analytics();

Vue.use(VueAgile);

Vue.use(VModal);
Vue.use(rate);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

let app;

auth
  .onAuthStateChanged(user => {
    console.log('koko', user);
    if (!app) {
      app = new Vue({
        router,
        store,
        render: (h) => h(App),
        created() {
          // Prevent blank screen in Electron builds
          // this.$router.push('/')
        }
      }).$mount('#app');
    }
    if(user?.email === "guesttrainee@pharmaphile.net") { // guest@test.com
      app.$el.className += ' guest'
    } else {
      app.$el.className = app.$el.className.replace(' guest', '');
    }
  });


