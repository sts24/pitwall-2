import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Error from './views/Error.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:year',
      name: 'season',
      component: Home,
      props: true
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      props: true
    }
  ]
})
