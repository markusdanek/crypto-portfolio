import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import PortfolioValue from '../components/PortfolioValue'
import Difference from '../components/Difference'

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
      path: '/diff',
      name: 'Difference',
      component: Difference
    }
  ]
})
