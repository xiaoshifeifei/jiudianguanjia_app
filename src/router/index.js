import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const constantRoutes = [{
        path: '/',
        component: () =>
            import ('@/views/index.vue'),
        name: 'login'
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/login.vue'),
        name: 'login'
    },
    {
        path: '/index',
        component: () =>
            import ('@/views/index.vue'),
        name: 'index'
    },
    {
        path: '/noWeixin',
        component: () =>
            import ('@/views/noWeixin/index.vue'),
        name: 'noWeixin'
    },
    {
        path: '/clean',
        component: () =>
            import ('@/views/clean/index.vue'),
        name: 'clean'
    },
    {
        path: '/invoice',
        component: () =>
            import ('@/views/invoice/index.vue'),
        name: 'invoice'
    },
    {
        path: '/checkout',
        component: () =>
            import ('@/views/checkout/index.vue'),
        name: 'checkout'
    },
    {
        path: '/stay',
        component: () =>
            import ('@/views/stay/index.vue'),
        name: 'stay'
    },
    {
        path: '/booking',
        component: () =>
            import ('@/views/facilitiesBooking/index.vue'),
        name: 'booking'
    },
    {
        path: '/repairs',
        component: () =>
            import ('@/views/repairs/index.vue'),
        name: 'repairs'
    },
    {
        path: '/car',
        component: () =>
            import ('@/views/car/index.vue'),
        name: 'car'
    },
    {
        path: '/wakeup',
        component: () =>
            import ('@/views/wakeup/index.vue'),
        name: 'wakeup'
    },
    {
        path: '/room',
        component: () =>
            import ('@/views/room/index.vue'),
        name: 'room'
    },
    {
        path: '/appointment',
        component: () =>
            import ('@/views/appointment/index.vue'),
        name: 'appointment'
    },
    {
        path: '/guestroom',
        component: () =>
            import ('@/views/guestroom/index.vue'),
        name: 'guestroom'
    },
    {
        path: '/convenienceStore',
        component: () =>
            import ('@/views/convenienceStore/index.vue'),
        name: 'convenienceStore'
    },
    {
        path: '/convenienceStoreDetail',
        component: () =>
            import ('@/views/convenienceStore/components/detail.vue'),
        name: 'convenienceStoreDetail'
    },
    {
        path: '/detail',
        component: () =>
            import ('@/views/detail/index.vue'),
        name: 'detail'
    },
    {
        path: '/sexOrder',
        component: () =>
            import ('@/views/sexOrder/index.vue'),
        name: 'sexOrder'
    }, {
        path: '/sexOrderDateil',
        component: () =>
            import ('@/views/sexOrder/components/detail.vue'),
        name: 'sexOrderDateil'
    },
    {
        path: '/localSpecialty',
        component: () =>
            import ('@/views/localSpecialty/index.vue'),
        name: 'localSpecialty'
    }, {
        path: '/localSpecialtyDetail',
        component: () =>
            import ('@/views/localSpecialty/components/detail.vue'),
        name: 'localSpecialtyDetail'
    },
    {
        path: '/orderServer',
        component: () =>
            import ('@/views/orderServer/index.vue'),
        name: 'orderServer'
    },
    {
        path: '/orderServerDetail',
        component: () =>
            import ('@/views/orderServer/components/detail.vue'),
        name: 'orderServerDetail'
    },
    {
        path: '/wakeorder',
        component: () =>
            import ('@/views/wakeorder/index.vue'),
        name: 'wakeorder'
    },
    {
        path: '/wakeorderDetail',
        component: () =>
            import ('@/views/wakeorder/components/detail.vue'),
        name: 'wakeorderDetail'
    },
    {
        path: '/refund',
        component: () =>
            import ('@/views/refund/index.vue'),
        name: 'refund'
    },
    {
        path: '/refundDetail',
        component: () =>
            import ('@/views/refund/components/detail.vue'),
        name: 'refundDetail'
    },
    {
        path: '/cleanOrders',
        component: () =>
            import ('@/views/cleanOrders/index.vue'),
        name: 'cleanOrders'
    },
    {
        path: '/cleanOrdersDetail',
        component: () =>
            import ('@/views/cleanOrders/components/detail.vue'),
        name: 'cleanOrdersDetail'
    },
    {
        path: '/invoiceOrders',
        component: () =>
            import ('@/views/invoiceOrders/index.vue'),
        name: 'invoiceOrders'
    },
    {
        path: '/invoiceOrdersDetail',
        component: () =>
            import ('@/views/invoiceOrders/components/detail.vue'),
        name: 'invoiceOrdersDetail'
    },
    {
        path: '/repairOrder',
        component: () =>
            import ('@/views/repairOrder/index.vue'),
        name: 'repairOrder'
    },
    {
        path: '/repairOrderDetail',
        component: () =>
            import ('@/views/repairOrder/components/detail.vue'),
        name: 'repairOrderDetail'
    },
    {
        path: '/rentCarOrder',
        component: () =>
            import ('@/views/rentCarOrder/index.vue'),
        name: 'rentCarOrder'
    },
    {
        path: '/rentCarOrderDetail',
        component: () =>
            import ('@/views/rentCarOrder/components/detail.vue'),
        name: 'rentCarOrderDetail'
    },
    {
        path: '/facilityOrder',
        component: () =>
            import ('@/views/facilityOrder/index.vue'),
        name: 'facilityOrder'
    },
    {
        path: '/facilityOrderDetail',
        component: () =>
            import ('@/views/facilityOrder/components/detail.vue'),
        name: 'facilityOrderDetail'
    },
    {
        path: '/continueLiveOrder',
        component: () =>
            import ('@/views/continueLiveOrder/index.vue'),
        name: 'continueLiveOrder'
    },
    {
        path: '/continueLiveOrderDetail',
        component: () =>
            import ('@/views/continueLiveOrder/components/detail.vue'),
        name: 'continueLiveOrderDetail'
    },
    {
        path: '/checkOutOrder',
        component: () =>
            import ('@/views/checkOutOrder/index.vue'),
        name: 'checkOutOrder'
    },
    {
        path: '/checkOutOrderDetail',
        component: () =>
            import ('@/views/checkOutOrder/components/detail.vue'),
        name: 'checkOutOrderDetail'
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