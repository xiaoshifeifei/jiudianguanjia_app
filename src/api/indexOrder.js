import request from '@/utils/request'
// 待办事项
export function getOrderReminder(params) {
  return request({
    url: '/clean_orders/show',
    method: 'get',
    params
  })
}
