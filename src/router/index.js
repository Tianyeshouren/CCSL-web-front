import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import start from '@/components/start'
import data from '@/components/storeddata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/start',
      name: 'start',
      component: start,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/data',
      name: 'data',
      component: data,
      meta: {
        keepAlive: false
      }
    }
  ]
})
