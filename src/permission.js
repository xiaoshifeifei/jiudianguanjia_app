import router from './router'
import store from './store'
import { Notify } from 'vant'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getOpenid, getUserStatus } from '@/utils/auth' // get token from cookie
import { getWxCodeUrl, getQueryVariable, _isWeixin } from '@/utils/authorize'
// eslint-disable-next-line camelcase
import { appid, token_type } from '@/setting'
// import getPageTitle from '@/utils/get-page-title'
const errorMsg = message => {
  return Notify({
    message,
    type: 'danger',
    duration: 1000
  })
}
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  const hasStatus = getUserStatus()
  const hasOpenid = getOpenid()
  const hasToken = getToken()
  if (!_isWeixin) {
    if (to.path === '/noWeixin') {
      next()
    } else {
      next({
        path: '/noWeixin'
      })
    }
    NProgress.done()
  } else {
    if (hasOpenid) {
      if (hasStatus) {
        if (hasToken) {
          if (to.path === '/login') {
          // if is loggin, redirect to the home page
            next({ path: '/' })
            NProgress.done()
          } else {
            const hasUserInfo = store.getters.userInfo
            if (hasUserInfo) {
              next()
            } else {
              try {
                await store.dispatch('user/getInfo')
                next()
                NProgress.done()
              } catch (error) {
                await store.dispatch('user/resetToken')
                errorMsg.error(error || 'Has Error')
                next('/login')
                NProgress.done()
              }
            }
          }
        }
      } else {
        // 没有登录，去跳转登录页
        if (to.path === '/login') {
          next()
        } else {
          next({
            path: '/login'
          })
        }
        NProgress.done()
      }
    } else {
      let url = window.location.search.substring(1)
      if (url.indexOf('openid') != -1 && url.indexOf('status') == -1) {
        let data = {
          openid: getQueryVariable(window.location, 'openid')
        }
        await store.dispatch('user/saveOpenId', data)
        // 没有登录，去跳转登录页
        if (to.path === '/login') {
          next()
        } else {
          next({
            path: '/login'
          })
        }
        NProgress.done()
      }
      else if (url.indexOf('status') != -1) {
        let status = getQueryVariable(window.location, 'status')
        if (status == 1) {
          let data = {
            uid: getQueryVariable(window.location, 'uid'),
            openid: getQueryVariable(window.location, 'openid'),
            token: getQueryVariable(window.location, 'token'),
            status,
            // eslint-disable-next-line camelcase
            token_type,
            // eslint-disable-next-line camelcase
            refresh_token: getQueryVariable(window.location, 'refresh_token')
          }
          await store.dispatch('user/saveTokenOpenId', data)
          next(to.path)
          NProgress.done()
        } else {
          let data = {
            status
          }
          await store.dispatch('user/saveStatus', data)
          // 没有登录，去跳转登录页
          if (to.path === '/login') {
            next()
          } else {
            next({
              path: '/login'
            })
          }
          NProgress.done()
        }
      }
      else {
        window.location.href = getWxCodeUrl(appid)
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
