import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:year',
      name: 'season',
      component: Home,
      props: true,
      beforeEnter: function(to, from, next){
        console.log([
          'season, beforeRoute: ',to, from
        ]);

        next();
      }
    }
    
  ]
})
