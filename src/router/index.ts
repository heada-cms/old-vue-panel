import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: "/resources",
    name: "resources",
    component: () => import(/* webpackChunkName: "resources" */ '../views/resources.vue')
  },
  {
    path: "/resource/add",
    name: "add-resource",
    component: () => import(/* webpackChunkName: "add-resource" */ '../views/addResource.vue' )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
