import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Account from '../views/account.vue';

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
        path: '/posts/:id',
        name: 'DetailedPost',
        component: () => import(/* webpackChunkName: "about" */ '../views/detailed-post.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.account) return next('/');
          return next();
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.account) return next('/');
          return next();
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: Account
      },
      {
        path: '/account/edit-shelter',
        name: 'EditShelter',
        component: () => import(/* webpackChunkName: "about" */ '../views/edit-shelter.vue'),
      },
      {
        path: '/account/add-animal',
        name: 'AddAnimal',
        component: () => import(/* webpackChunkName: "about" */ '../views/add-animal.vue')
      },
      {
        path: '/account/edit-animal',
        name: 'EditAnimal',
        component: () => import(/* webpackChunkName: "about" */ '../views/edit-animal.vue')
      },
      {
        path: '/account/view-animals',
        name: 'ViewAnimals',
        component: () => import(/* webpackChunkName: "about" */ '../views/view-animals.vue')
      },
      {
        path: '/account/add-post',
        name: 'AddPost',
        component: () => import(/* webpackChunkName: "about" */ '../views/add-post.vue')
      },
      {
        path: '/account/edit-post',
        name: 'EditPost',
        component: () => import(/* webpackChunkName: "about" */ '../views/edit-post.vue')
      },
      {
        path: '/account/view-posts',
        name: 'ViewPosts',
        component: () => import(/* webpackChunkName: "about" */ '../views/view-posts.vue')
      }
    ]
  });
};
