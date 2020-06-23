 import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Axios from 'axios';
import 'amfe-flexible'
// 自定义vant 组件样式 （已限定页面 不影响全局）
import "./common/css/customer_vant.scss";

import "./common/js/vant_ui.js";
// import '@/permission'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts

import '@/styles/mumu/gast.css'
import '@/styles/mumu/global.css'
import '@/styles/mumu/fonts/iconfont.css'
import '@/styles/public/bgColor.css'
import '@/styles/public/border.css'
import '@/styles/public/color.css'
import '@/styles/public/flex.css'
import '@/styles/public/font-size.css'
import '@/styles/public/frame.css'
import '@/styles/public/iconfont.css'
import '@/styles/public/mouse.css'
import '@/styles/public/position.css'
import '@/styles/public/size.css'

Vue.config.productionTip = false;

//解决手机软键盘影响弹窗按钮
Vue.directive("iosbugscroll", {
  inserted: function(el, binding, vnode) {
    var ua = navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
      if (/iphone|ipad|ipod/.test(ua)) {
        // input、textarea被组件包装的场景
        const childInput = el.getElementsByTagName("input");
        const childTextarea = el.getElementsByTagName("textarea");
        for (let i = 0; i < childInput.length; i++) {
          childInput[i].onblur = function temporaryRepair() {
            setTimeout(function() {
              checkWxScroll();
            }, 200);
          };
        }
        for (let i = 0; i < childTextarea.length; i++) {
          childSelect[i].onblur = function temporaryRepair() {
            setTimeout(function() {
              checkWxScroll();
            }, 200);
          };
        }
        // input、textarea中的场景
        el.onblur = function temporaryRepair() {
          setTimeout(function() {
            checkWxScroll();
          }, 200);
        };
      }
    }
  }
});

function checkWxScroll() {
  var currentPosition, timer;
  var speed = 1;
  timer = setInterval(function() {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition);
    currentPosition += speed;
    window.scrollTo(0, currentPosition);
    clearInterval(timer);
  }, 1);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
