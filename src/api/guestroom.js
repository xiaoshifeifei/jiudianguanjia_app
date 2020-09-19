import request from '@/utils/request'

export function getHotelRoom(data) {
    return request({
        url: '/hotel_room/hotel_room_list',
        method: 'get',
        data
    })
}