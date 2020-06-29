import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios';
import 'amfe-flexible'
// 自定义vant 组件样式 （已限定页面 不影响全局）
import './common/css/customer_vant.scss'
import './common/css/base.css'

import './common/js/vant_ui.js'
import '@/permission'

Vue.config.productionTip = false

// 解决手机软键盘影响弹窗按钮
Vue.directive('iosbugscroll', {
  inserted(el, binding, vnode) {
    let ua = navigator.userAgent.toLowerCase()
    if (/micromessenger/.test(ua)) {
      if (/iphone|ipad|ipod/.test(ua)) {
        // input、textarea被组件包装的场景
        const childInput = el.getElementsByTagName('input')
        const childTextarea = el.getElementsByTagName('textarea')
        for (let i = 0; i < childInput.length; i++) {
          childInput[i].onblur = function temporaryRepair() {
            setTimeout(() => {
              // eslint-disable-next-line no-use-before-define
              checkWxScroll()
            }, 200)
          }
        }
        for (let i = 0; i < childTextarea.length; i++) {
          childSelect[i].onblur = function temporaryRepair() {
            setTimeout(() => {
              // eslint-disable-next-line no-use-before-define
              checkWxScroll()
            }, 200)
          }
        }
        // input、textarea中的场景
        el.onblur = function temporaryRepair() {
          setTimeout(() => {
            // eslint-disable-next-line no-use-before-define
            checkWxScroll()
          }, 200)
        }
      }
    }
  }
})

function checkWxScroll() {
  let currentPosition, timer
  let speed = 1
  timer = setInterval(() => {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    currentPosition -= speed
    window.scrollTo(0, currentPosition)
    currentPosition += speed
    window.scrollTo(0, currentPosition)
    clearInterval(timer)
  }, 1)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
