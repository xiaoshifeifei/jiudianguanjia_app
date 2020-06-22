import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      showTabbar: true
    },
    name: 'homepage'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    name: 'login'
  },
  {
    path: '/schedule',
    component: () => import('@/views/schedule/index.vue'),
    meta: {
      showTabbar: true
    },
    name: 'schedule'
  },
  {
    path: '/workbench',
    component: () => import('@/views/workbench/index.vue'),
    meta: {
      showTabbar: true
    },
    name: 'workbench'
  },
  {
    path: '/noWeixin',
    component: () => import('@/views/noWeixin/index.vue'),
    name: 'noWeixin'
  }
]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
