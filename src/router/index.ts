import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import("@/views/Resources.vue")
  },
  {
    path: '/resources/:name',
    name: "Resource",
    component: () => import("@/views/Resource.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
