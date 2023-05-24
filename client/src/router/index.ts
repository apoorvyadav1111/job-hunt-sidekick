import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LandingView from '../views/LandingView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: LandingView
  }
]

const router = new VueRouter({
  routes
})

export default router
