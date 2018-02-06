import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import firebase from 'firebase'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  }
});

Vue.use(VueResource, VueLodash, lodash);

Vue.config.productionTip = false

let config = {
    apiKey: "AIzaSyDydVeWMCGC9fyhe_7CwMc0ByL2U8h3SNQ",
    authDomain: "cryptocoin-app.firebaseapp.com",
    databaseURL: "https://cryptocoin-app.firebaseio.com",
    projectId: "cryptocoin-app",
    storageBucket: "",
    messagingSenderId: "188274586910"
  };

firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
