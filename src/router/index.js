import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: require('../components/Main').default
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: require('../components/PortfolioValue').default
    },
    {
      path: '/personal',
      component: require('../components/Personal').default
    },
    {
      path: '/coinvalue',
      name: 'CoinValue',
      component: require('../components/CoinValue').default
    },
    {
      path: '/qr',
      name: 'QRcode',
      component: require('../components/QRcode').default
    }
  ]
})
