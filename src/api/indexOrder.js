import request from '@/utils/request'
// 待办事项
export function getOrderReminder(params) {
    return request({
        url: '/clean_orders/show',
        method: 'get',
        params
    })
}

// 首页订单数
export function getOrderNum(params) {
    return request({
        url: '/home/num',
        method: 'get',
        params
    })
}