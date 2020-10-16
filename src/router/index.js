import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Landing from '../views/Landing.vue';
import Profile from '../views/Profile';
import ContactUs from '../views/ContactUs';
import TraineeDashboard from '../views/TraineeDashboard';
import PharmacyProfile from '../views/PharmacyProfile';
import TraineeInfo from '../views/TraineeInfo';
import PharmacyDashboard from '../views/PharmacyDashboard';
import * as firebase from 'firebase/app';
import  'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: TraineeDashboard
  },
  {
    path: '/pharmacy/:id',
    name: 'Pharmacy Profile',
    component: PharmacyProfile,
  },
  {
    path: '/trainee/:id',
    name: 'Trainee Profile',
    component: TraineeInfo
  },
  {
    path: '/pharmacydashboard',
    name: 'Pharmacy Dashboard',
    component: PharmacyDashboard
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth =  to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated =  firebase.auth().currentUser;
  if  (requiresAuth && !isAuthenticated) {
    next('/landing');
  } else {
    next();
  }
})

export default router;
