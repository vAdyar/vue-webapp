import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResoure from 'vue-resource'
import * as firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueResoure);
Vue.use(firestorePlugin);

var firebaseConfig = {
    apiKey: "AIzaSyAVme7qAZtfKKAFQqgtaF2PAzlgbdBEymg",
    authDomain: "vue-quiz-app-9472e.firebaseapp.com",
    databaseURL: "https://vue-quiz-app-9472e.firebaseio.com",
    projectId: "vue-quiz-app-9472e",
    storageBucket: "vue-quiz-app-9472e.appspot.com",
    messagingSenderId: "900562319744",
    appId: "1:900562319744:web:06726f4b6c96b05238a965",
    measurementId: "G-FTYK45PQX2"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
