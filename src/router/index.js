import Vue from 'vue'
import Router from 'vue-router'
import right from '@/components/right'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'right',
      component: right
    }
  ]
})
