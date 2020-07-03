import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    name: 'login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    name: 'login'
  },
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
    name: 'index'
  },
  {
    path: '/noWeixin',
    component: () => import('@/views/noWeixin/index.vue'),
    name: 'noWeixin'
  },
  {
    path: '/clean',
    component: () => import('@/views/clean/index.vue'),
    name: 'clean'
  },
  {
    path: '/invoice',
    component: () => import('@/views/invoice/index.vue'),
    name: 'invoice'
  },
  {
    path: '/checkout',
    component: () => import('@/views/checkout/index.vue'),
    name: 'checkout'
  },
  {
    path: '/stay',
    component: () => import('@/views/stay/index.vue'),
    name: 'stay'
  },
  {
    path: '/booking',
    component: () => import('@/views/facilitiesBooking/index.vue'),
    name: 'booking'
  },
  {
    path: '/repairs',
    component: () => import('@/views/repairs/index.vue'),
    name: 'repairs'
  },
  {
    path: '/car',
    component: () => import('@/views/car/index.vue'),
    name: 'car'
  },
  {
    path: '/wakeup',
    component: () => import('@/views/wakeup/index.vue'),
    name: 'wakeup'
  },
  {
    path: '/room',
    component: () => import('@/views/room/index.vue'),
    name: 'room'
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
