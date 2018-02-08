import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import firebase from 'firebase';
import WebFont from 'webfontloader';

Vue.use(VueResource, VueLodash, lodash);

Vue.config.productionTip = false;

WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  }
});

let firebaseConfig = {
  apiKey: "AIzaSyDydVeWMCGC9fyhe_7CwMc0ByL2U8h3SNQ",
  authDomain: "cryptocoin-app.firebaseapp.com",
  databaseURL: "https://cryptocoin-app.firebaseio.com",
  projectId: "cryptocoin-app",
  storageBucket: "",
  messagingSenderId: "188274586910"
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
