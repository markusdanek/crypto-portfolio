import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main';
import PortfolioValue from '../components/PortfolioValue';
import Personal from '../components/Personal';
import CoinValue from '../components/CoinValue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: PortfolioValue
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/coinvalue',
      name: 'CoinValue',
      component: CoinValue
    }
  ]
})
