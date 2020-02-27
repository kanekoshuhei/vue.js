import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import 'firebase/firestore';

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAEOQgGZTDqF4pj4dv7YzkkhgvA6c7hOWE",
  authDomain: "tsukkomi-de7ed.firebaseapp.com",
  databaseURL: "https://tsukkomi-de7ed.firebaseio.com",
  projectId: "tsukkomi-de7ed",
  storageBucket: "tsukkomi-de7ed.appspot.com",
  messagingSenderId: "443187951792",
  appId: "1:443187951792:web:e93e3051447ef6083fe375",
  measurementId: "G-R8SB8RH48K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
