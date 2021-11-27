import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import("@/views/Resources.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: '/resources/:name',
    name: "Resource",
    component: () => import("@/views/Resource.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/resource/create",
    name: "CreateResource",
    component: () => import("@/views/createResource.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/resources/:name/create",
    name: "CreateResourceInstance",
    component: () => import("@/views/createResourceInstance.vue")
  } 
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters["loggedIn"] === false) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'Login' && store.getters["loggedIn"] === true) {
      next({
        path: '/'
      })
    } else
      next();
  }
})
export default router
