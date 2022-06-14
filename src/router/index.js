import Vue from 'vue'
import VueRouter from 'vue-router'
import TestMain from '../components/TestMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/calendar'
  },
  /*
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  */
  {
    path: '/calendar',
    name: 'calendar',
    component: TestMain,
    props: {theme: "calendar"}
  },
  {
    path: '/telegram',
    name: 'telegram',
    component: TestMain,
    props: {theme: "telegram"}
  },
  {
    path: '/triangle',
    name: 'triangle',
    component: TestMain,
    props: {theme: "triangle"}
  },
  {
    path: '/seller',
    name: 'seller',
    component: TestMain,
    props: {theme: "seller"}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
