import Vue from 'vue'
import VueRouter from 'vue-router'
import UserData from '../components/UserData'
import UserRegister from '../components/UserRegister'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user-register',
    name: 'user-register',
    component: UserRegister,
    props: true
  },
  {
    path: '/user-data',
    name: 'user-data',
    component: UserData,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router
