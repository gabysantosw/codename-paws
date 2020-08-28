import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/animals',
    name: 'Animals',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/animals.vue')
  },
  {
    path: '/users/:id',
    name: 'DetailedShelter',
    component: () => import(/* webpackChunkName: "about" */ '../views/detailed-shelter.vue')
  },
  {
    path: '/animals/:id',
    name: 'DetailedAnimal',
    component: () => import(/* webpackChunkName: "about" */ '../views/detailed-animal.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
