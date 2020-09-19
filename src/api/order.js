import request from '@/utils/request'
// 清扫
export function cleanOrder(params) {
    return request({
        url: '/clean_orders/show',
        method: 'get',
        params
    })
}
// 完成
export function cleanOperate(data) {
    return request({
        url: '/clean_orders/operate',
        method: 'post',
        data
    })
}
// 取消
export function cleanCancle(data) {
    return request({
        url: '/clean_orders/cancel',
        method: 'post',
        data
    })
}
// 设施预定
export function bookingOrder(params) {
    return request({
        url: '/facility_orders/show',
        method: 'get',
        params
    })
}
// 完成
export function bookingOperate(data) {
    return request({
        url: '/facility_orders/operate',
        method: 'post',
        data
    })
}
// 取消
export function bookingCancle(data) {
    return request({
        url: '/facility_orders/cancel',
        method: 'post',
        data
    })
}
// 维修
export function repairOrder(params) {
    return request({
        url: '/repair_orders/show',
        method: 'get',
        params
    })
}
// 完成
export function repairOperate(data) {
    return request({
        url: '/repair_orders/operate',
        method: 'post',
        data
    })
}
// 取消
export function repairCancle(data) {
    return request({
        url: '/repair_orders/cancel',
        method: 'post',
        data
    })
}
// 发票
export function invoiceOrder(params) {
    return request({
        url: '/invoice_orders/show',
        method: 'get',
        params
    })
}
// 完成
export function invoiceOperate(data) {
    return request({
        url: '/invoice_orders/operate',
        method: 'post',
        data
    })
}
// 取消
export function invoiceCancle(data) {
    return request({
        url: '/invoice_orders/cancel',
        method: 'post',
        data
    })
}
// 客房
export function roomOrder(params) {
    return request({
        url: '/service_orders/show',
        method: 'get',
        params
    })
}
// 完成
export function roomOperate(data) {
    return request({
        url: '/service_orders/operate',
        method: 'post',
        data
    })
}
// 取消
export function roomCancle(data) {
    return request({
        url: '/service_orders/cancel',
        method: 'post',
        data
    })
}
// 退房
export function checkoutOrder(params) {
    return request({
        url: '/check_out_order/show',
        method: 'get',
        params
    })
}
// 完成
export function checkoutOperate(data) {
    return request({
        url: '/check_out_order/complete',
        method: 'post',
        data
    })
}
// 取消
export function checkoutCancle(data) {
    return request({
        url: '/check_out_order/cancle',
        method: 'post',
        data
    })
}
// 租车
export function carOrder(params) {
    return request({
        url: '/rent_car_order/show',
        method: 'get',
        params
    })
}
// 租赁
export function carZl(params) {
    return request({
        url: '/rent_car_order/lease',
        method: 'post',
        params
    })
}
// 完成
export function carOperate(data) {
    return request({
        url: '/rent_car_order/complete',
        method: 'post',
        data
    })
}
// 取消
export function carCancle(data) {
    return request({
        url: '/rent_car_order/cancel',
        method: 'post',
        data
    })
}
// 续住
export function stayOrder(params) {
    return request({
        url: '/continue_live_order/show',
        method: 'get',
        params
    })
}
// 完成
export function stayOperate(data) {
    return request({
        url: '/continue_live_order/operate',
        method: 'post',
        data
    })
}
// 取消
export function stayCancle(data) {
    return request({
        url: '/continue_live_order/cancel',
        method: 'post',
        data
    })
}
// 叫醒
export function wakeupOrder(params) {
    return request({
        url: '/wake_order/show',
        method: 'get',
        params
    })
}
// 完成
export function wakeupOperate(data) {
    return request({
        url: '/wake_order/operate',
        method: 'post',
        data
    })
}
// 取消
export function wakeupCancle(data) {
    return request({
        url: '/wake_order/cancel',
        method: 'post',
        data
    })
}