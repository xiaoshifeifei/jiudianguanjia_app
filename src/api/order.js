import request from '@/utils/request'
// 清扫
export function cleanOrder(params) {
  return request({
    url: '/clean_orders/show',
    method: 'get',
    params
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
// 维修
export function repairOrder(params) {
  return request({
    url: '/repair_orders/show',
    method: 'get',
    params
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
// 客房
export function roomOrder(params) {
  return request({
    url: '/service_orders/show',
    method: 'get',
    params
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
// 租车
export function carOrder(params) {
  return request({
    url: '/rent_car_order/show',
    method: 'get',
    params
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
// 叫醒
export function wakeupOrder(params) {
  return request({
    url: '/wake_order/show',
    method: 'get',
    params
  })
}
