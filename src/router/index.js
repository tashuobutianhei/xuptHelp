import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home.vue'
import Food from '@/view/Food.vue'
import Mail from '@/view/Mail.vue'
import SecondHand from '@/view/SecondHand.vue'
import Mycenter from  '@/view/Mycenter.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },    {
      path: '/Food',
      name: 'Food',
      component: Food
    }, 
    {
      path: '/Mail',
      name: 'Mail',
      component: Mail
    },    {
      path: '/SecondHand',
      name: 'SecondHand',
      component: SecondHand
    }, 
    {
      path: '/Mycenter',
      name: 'Mycenter',
      component: Mycenter
    }
  ]
})
