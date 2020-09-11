import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';

Vue.use(VueRouter);

export default store => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/shelters',
        name: 'Shelters',
        component: () => import(/* webpackChunkName: "about" */ '../views/shelters.vue')
      },
      {
        path: '/animals',
        name: 'Animals',
        props: true,
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/animals.vue')
      },
      {
        path: '/shelters/:id',
        name: 'DetailedShelter',
        component: () => import(/* webpackChunkName: "about" */ '../views/detailed-shelter.vue')
      },
      {
        path: '/animals/:id',
        name: 'DetailedAnimal',
        component: () => import(/* webpackChunkName: "about" */ '../views/detailed-animal.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.account) return next('/');
          return next();
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.account) return next('/');
          return next();
        }
      }
    ]
  });
};
