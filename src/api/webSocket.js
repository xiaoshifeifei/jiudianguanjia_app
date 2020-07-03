/*
 * @Author: CZTXXL
 * @Date: 2020-05-28 11:17:27
 * @LastEditTime: 2020-07-01 15:53:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\api\websocket.js
 */
import { getToken } from '@/utils/auth.js'
const WS_URL = process.env.VUE_APP_WEBSOCKET_BASE_2_API
let Socket = ''
let setIntervalWebsocketPush = null
let stateOfReconnect = false
let channel = 'clean_order'
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9qZGdqLnFtd2x4Y3guY29tIiwiYXVkIjoiaHR0cDpcL1wvamRnai5xbXdseGN4LmNvbSIsImlhdCI6MTU5MTE3NDQ3NywibmJmIjoxNTkxMTc0NDc3LCJzY29wZSI6ImFjY2VzcyIsImV4cCI6MTU5MTE4MTY3NywiZGF0YSI6eyJ1aWQiOjF9fQ.dGDcgeZ8cC3F3EVWCNO71cHIsXLukbsMbqYLi_S_6DE'

/* 建立连接 */
export function createSocket() {
  if (!Socket) {
    console.log('创建websocket连接')
    Socket = new WebSocket(WS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
export function sendPing() {
  /*
   * Socket.send(JSON.stringify({
   *   channel: channel,
   *   type: 'ping',
   *   token: token
   * }))
   * setIntervalWebsocketPush = setInterval(() => {
   *   Socket.send(JSON.stringify({
   *     channel: channel,
   *     type: 'ping',
   *     token: token
   *   }))
   * }, 5000)
   */
}
// 发送心跳
export function onopenWS() {
  console.log('连接成功')
  sendPing()
}
/* 链接失败重连 */
export function onerrorWS() {
  if (stateOfReconnect) return
  console.log('执行重连ing..')
  stateOfReconnect = true
  clearInterval(setIntervalWebsocketPush)
  Socket.close()
  reconnect && clearTimeout(reconnect)
  let reconnect = setTimeout(() => {
    createSocket()
    stateOfReconnect = false
    sendWSPush({
      channel,
      type: 'auth',
      token
    })
  }, 5000)
}
/* 接收数据 */
export function onmessageWS(e) {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e
    }
  }))
  // console.log(e)
}
/* 发送数据 */
export function sendWSPush(obj) {
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket()
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
/* 关闭 */
export function oncloseWS(e) {
  clearInterval(setIntervalWebsocketPush)
  Socket.onclose = function () { }
  Socket.close()
  Socket = ''
  console.log('websocket已断开')
  createSocket()
}


