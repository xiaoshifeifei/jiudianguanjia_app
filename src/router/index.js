import Vue from "vue";
import VueRouter from "vue-router";
//组件
import Login from "../views/homepage/Login.vue";
import Home from "../views/homepage/index.vue";
import Workbench from "../views/workbench/index.vue";
import Schedule from "../views/schedule/index.vue";
Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/homepage/Login.vue')
  },
  {
    path: '/noWeixin',
    component: () => import('@/views/noWeixin/index.vue')
  },
  {
    path: "/index",
    component: resolve => require(['@/views/homepage/index.vue'], resolve),
    meta: {
      showTabbar: true
    }
  },
  {
    path: "/workbench",
    component: resolve => require(['@/views/workbench/index.vue'], resolve),
    meta: {
      showTabbar: true
    }
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: resolve => require(['@/views/schedule/index.vue'], resolve),
    meta: {
      showTabbar: true
    }
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
]

// 以下配置动态路由
export const asyncRoutes = [{
  path: "/",
  name: "login",
  component: Login
},
{
  path: "/home",
  name: "Home",
  component: resolve => require(['@/views/homepage/index.vue'], resolve),
  meta: {
    showTabbar: true
  }
},
{
  path: "/workbench",
  name: "Workbench",
  component: Workbench,
  meta: {
    showTabbar: true
  }
},
{
  path: "/schedule",
  name: "Schedule",
  component: Schedule,
  meta: {
    showTabbar: true
  }
}
];
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
export default router;
