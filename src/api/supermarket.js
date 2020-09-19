import request from '@/utils/request'

export function getHotelRoom(data) {
    return request({
        url: '/hotel_room/hotel_room_list',
        method: 'get',
        data
    })
}
// 便利店订单列表
export function getSupermarket(params) {
    return request({
        url: '/supermarket_order/show',
        method: 'get',
        params
    })
}

// 情趣用品订单列表
export function getSexOrder(params) {
    return request({
        url: '/sex_toy_order/index',
        method: 'get',
        params
    })
}

// 土特产订单列表
export function getlocalSpecialty(params) {
    return request({
        url: '/local_specialty_order/index',
        method: 'get',
        params
    })
}

// 客房服务订单列表
export function getlocalServer(params) {
    return request({
        url: '/service_orders/index',
        method: 'get',
        params
    })
}


// 叫醒订单列表
export function getlocalWack(params) {
    return request({
        url: '/wake_order/index',
        method: 'get',
        params
    })
}

// 叫醒订单列表
export function getlocalShow(params) {
    return request({
        url: '/wake_order/show',
        method: 'get',
        params
    })
}

// 清扫订单列表
export function getCleanShow(params) {
    return request({
        url: '/clean_orders/index',
        method: 'get',
        params
    })
}

// 清扫订单列表
export function getInvoice(params) {
    return request({
        url: '/invoice_orders/index',
        method: 'get',
        params
    })
}

// 开票订单接单
export function cleanOrdeInvoice(data) {
    return request({
        url: '/invoice_orders/receive',
        method: 'post',
        data
    })
}


// 开票订单取消
export function cleanInvoice(data) {
    return request({
        url: '/invoice_orders/cancel',
        method: 'post',
        data
    })
}


// 开票订单完成
export function cleanoPerateInvoice(data) {
    return request({
        url: '/invoice_orders/operate',
        method: 'post',
        data
    })
}

// 开票订单详情
export function getCleanInvoice(params) {
    return request({
        url: '/invoice_orders/show',
        method: 'get',
        params
    })
}

// 清扫订单详情
export function getClean(params) {
    return request({
        url: '/clean_orders/show',
        method: 'get',
        params
    })
}

// 清扫订单接单
export function cleanOrdeReceive(data) {
    return request({
        url: '/clean_orders/receive',
        method: 'post',
        data
    })
}

// 清扫订单处理
export function cleanOrdeorPerate(data) {
    return request({
        url: '/clean_orders/operate',
        method: 'post',
        data
    })
}

// 清扫订单取消  拒绝
export function cleanOrder(data) {
    return request({
        url: '/clean_orders/cancel',
        method: 'post',
        data
    })
}

// 叫醒服务订单取消  拒绝
export function wackOrder(data) {
    return request({
        url: '/wake_order/cancel',
        method: 'post',
        data
    })
}

// 叫醒服务订单接单
export function wackOrdeReceive(data) {
    return request({
        url: '/wake_order/receive',
        method: 'post',
        data
    })
}

// 叫醒服务订单接单
export function wackOrderPerate(data) {
    return request({
        url: '/wake_order/operate',
        method: 'post',
        data
    })
}


// 维修订单列表
export function getRepair(params) {
    return request({
        url: '/repair_orders/index',
        method: 'get',
        params
    })
}

// 维修订单取消  拒绝
export function getRepairOrder(data) {
    return request({
        url: '/repair_orders/cancel',
        method: 'post',
        data
    })
}

// 维修订单接单
export function getRepairOrderReceive(data) {
    return request({
        url: '/repair_orders/receive',
        method: 'post',
        data
    })
}
// 维修订单详情
export function getRepairOrderShow(params) {
    return request({
        url: '/repair_orders/show',
        method: 'get',
        params
    })
}

// 维修订单处理
export function getRepairOrderOperate(data) {
    return request({
        url: '/repair_orders/operate',
        method: 'post',
        data
    })
}

// 退款订单列表
export function getRefund(params) {
    return request({
        url: '/refund/list',
        method: 'get',
        params
    })
}
// 退款订单详情
export function getRefundDetail(params) {
    return request({
        url: '/refund/detail',
        method: 'get',
        params
    })
}

// 退款订单驳回
export function getRefReject(data) {
    return request({
        url: '/refund_order/reject',
        method: 'post',
        data
    })
}

// 退款审核通过
export function getRefPass(data) {
    return request({
        url: '/refund_order/pass',
        method: 'post',
        data
    })
}


// 订单详情
export function SupermarketDetail(params) {
    return request({
        url: '/order/detail',
        method: 'get',
        params
    })
}

// 便利店订单接单
export function SupermarketReceive(data) {
    return request({
        url: '/supermarket_order/receive',
        method: 'post',
        data
    })
}

// 情趣用品订单接单
export function SupermarketOrder(data) {
    return request({
        url: '/sex_toy_order/receive',
        method: 'post',
        data
    })
}

// 便利店订单完成
export function SupermarketComplete(data) {
    return request({
        url: '/supermarket_order/complete',
        method: 'post',
        data
    })
}

// 情趣用品订单完成
export function SuperSexToy(data) {
    return request({
        url: '/sex_toy_order/complete',
        method: 'post',
        data
    })
}

// 便利店订单拒绝
export function SupermarketCancel(data) {
    return request({
        url: '/supermarket_order/cancel',
        method: 'post',
        data
    })
}

// 便利店订单退款
export function SupeRefund(data) {
    return request({
        url: '/supermarket_order/refund',
        method: 'post',
        data
    })
}


// 情趣用品订单拒绝
export function SupermarketNOSex(data) {
    return request({
        url: '/sex_toy_order/cancel',
        method: 'post',
        data
    })
}

// 预定服务待办事项
export function getSupeReminder(params) {
    return request({
        url: '/booking/order_reminder',
        method: 'get',
        params
    })
}


// 客房服务订单详情
export function getServeOrder(params) {
    return request({
        url: '/service_orders/show',
        method: 'get',
        params
    })
}
// 客房服务订单取消
export function serveOrder(data) {
    return request({
        url: '/service_orders/cancel',
        method: 'post',
        data
    })
}

// 客房服务订单接单
export function serveOrdeReceive(data) {
    return request({
        url: '/service_orders/receive',
        method: 'post',
        data
    })
}

// 客房服务订单接单
export function serveOrdeorPerate(data) {
    return request({
        url: '/service_orders/operate',
        method: 'post',
        data
    })
}

// 租车订单列表
export function getRent(params) {
    return request({
        url: '/rent_car_order/index',
        method: 'get',
        params
    })
}
// 租车订单详情
export function getRentShow(params) {
    return request({
        url: '/rent_car_order/show',
        method: 'get',
        params
    })
}


// 租车订单取消
export function getRentOrder(data) {
    return request({
        url: '/rent_car_order/cancel',
        method: 'post',
        data
    })
}

// 租车订单完成
export function getRentComplete(data) {
    return request({
        url: '/rent_car_order/complete',
        method: 'post',
        data
    })
}

// 租车订单接单
export function getRentReceive(data) {
    return request({
        url: '/rent_car_order/receive',
        method: 'post',
        data
    })
}

// 租车订单状态修改
export function getRentLease(data) {
    return request({
        url: '/rent_car_order/lease',
        method: 'post',
        data
    })
}


// 设施订单列表
export function getFacility(params) {
    return request({
        url: '/facility_orders/index',
        method: 'get',
        params
    })
}

// 设施订单查看
export function getFacilityShow(params) {
    return request({
        url: '/facility_orders/show',
        method: 'get',
        params
    })
}



// 设施订单取消
export function getRentOrderCancel(data) {
    return request({
        url: '/facility_orders/cancel',
        method: 'post',
        data
    })
}

// 设施订单支付状态处理
export function getRentOrderOperate(data) {
    return request({
        url: '/facility_orders/pay_status_operate',
        method: 'post',
        data
    })
}

// 设施订单接单
export function getRentPay(data) {
    return request({
        url: '/facility_orders/receive',
        method: 'post',
        data
    })
}

// 设施订单状态处理
export function getRentPayOperate(data) {
    return request({
        url: '/facility_orders/operate',
        method: 'post',
        data
    })
}



// 续住订单列表
export function getContinueLive(params) {
    return request({
        url: '/continue_live_order/index',
        method: 'get',
        params
    })
}


// 续住订单查看
export function getLiveOrder(params) {
    return request({
        url: '/continue_live_order/show',
        method: 'get',
        params
    })
}


// 续住订单取消
export function getContinueCancel(data) {
    return request({
        url: '/continue_live_order/cancel',
        method: 'post',
        data
    })
}

// 续住订单处理
export function getLiveOperate(data) {
    return request({
        url: '/continue_live_order/operate',
        method: 'post',
        data
    })
}

// 续住订单接单
export function getLiveReceive(data) {
    return request({
        url: '/continue_live_order/receive',
        method: 'post',
        data
    })
}


// 退房订单列表
export function getCheckOutList(params) {
    return request({
        url: '/check_out_order/index',
        method: 'get',
        params
    })
}

// 退房订单查看
export function getCheckOutShow(params) {
    return request({
        url: '/check_out_order/show',
        method: 'get',
        params
    })
}



// 退房订单完成
export function getCheckComplete(data) {
    return request({
        url: '/check_out_order/complete',
        method: 'post',
        data
    })
}

// 退房订单取消
export function getCheckCancle(data) {
    return request({
        url: '/check_out_order/cancel',
        method: 'post',
        data
    })
}

// 退房订单接单
export function getCheckReceive(data) {
    return request({
        url: '/check_out_order/receive',
        method: 'post',
        data
    })
}