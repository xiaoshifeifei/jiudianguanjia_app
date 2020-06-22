/*
 * @Author: your name
 * @Date: 2020-06-10 20:33:57
 * @LastEditTime: 2020-06-19 10:23:50
 * @LastEdit;ors: Please set LastEditors
 * @Descriptio I");n User Settings Edit;
 * @FilePath: \zhiliao_Supply_M\src\utils\request.js
 */
import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant'
import store from '@/store'
import { toUpperCase } from '@/utils/toUpperCase'
// import { showFullScreenLoading, hideFullScreenLoading } from "./Loading";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/supb_m/v1', // url = base url + request url
  timeout: 5000 // request timeout
})
/*
 * let loadingInstance;
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    // 获取token
    let token = store.getters.token
    // let isTokenOverdue = store.getters.isTokenOverdue
    let tokentype = toUpperCase(store.getters.tokenType ? store.getters.tokenType : '')

    if (token && !config.headers.authorization) {
      config.headers.authorization = tokentype + ' ' + token
    }
    /*
     * loadingInstance = Loading.service();
     * showFullScreenLoading("loadingtext");
     */
    if (config.url != '/goods/upload') {
      if (config.data && !config.data.param) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
const errorMsg = message => {
  return Notify({
    message,
    type: 'danger',
    duration: 1000
  })
}
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
let newToken = ''
let newTokenType = ''
// response interceptor
service.interceptors.response.use(
  response => {
    /*
     * if (loadingInstance) {
     *   loadingInstance.close();
     * }
     */
    // hideFullScreenLoading();
    const res = response.data
    return res
  },
  error => {
    /* 网络连接过程异常处理*/
    /*
     * if (loadingInstance) {
     *   loadingInstance.close();
     * }
     */
    // hideFullScreenLoading();
    let { message, response } = error
    if (response) {
      let { code, msg } = response.data
      if (code == 1001) {
        let config = error.response.config
        if (!isRefreshing) {
          let data = {
            token: store.getters.token
          }
          let tokentype = toUpperCase(store.getters.tokenType ? store.getters.tokenType : '')
          let headers = {
            authorization: tokentype + ' ' + store.getters.refreshToken
          }

          return axios({
            method: 'post',
            url: process.env.VUE_APP_API_URL + '/supb_m/v1/refresh',
            data: qs.stringify(data),
            headers
          })
            .then(res => {
              newTokenType = toUpperCase(res.data.data.token_type ? res.data.data.token_type : '')
              newToken = res.data.data.token
              config.headers.authorization = `${newTokenType} ${newToken}`
              store.dispatch('user/refreshToken', res.data.data)
              return service(config)
            })
            .catch(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
            .finally(() => {
              isRefreshing = false
              requests.forEach(cb => cb(newToken))
              // 重试完了别忘了清空这个队列
              requests = []
            })
        } else {
          // 正在刷新token，返回一个未执行resolve的promise
          return new Promise(resolve => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push(token => {
              config.headers.authorization = `Bearer ${token}`
              resolve(service(config))
            })
          })
        }
      } else {
        errorMsg(msg)
      }
    } else {
      if (message.includes('timeout')) {
        message = '请求超时,请刷新一下'
        errorMsg(message || '请求超时,请刷新一下')
      }
    }
    return Promise.reject(error)
  }
)
export default service
