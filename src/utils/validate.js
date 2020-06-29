import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)
const validate = {
  idCard(idCard) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
  },
  mobile(mobile) {
    if (mobile.length < 11 || mobile.length > 11) {
      this.showToast('请输入11位手机号')
      return false
    } else if (!/^1\d{10}$/.test(mobile)) {
      this.showToast('您输入的手机号不正确')
      return false
    }
    /*
     * if (!/^1\d{10}$/.test(mobile)) {
     *   this.showToast("您输入的手机号不正确");
     *   return false;
     * }
     */
    return /^1\d{10}$/.test(mobile)
  },
  password(password) {
    if (!/[^\u4E00-\u9FA5]{6,20}$/.test(password)) {
      this.showToast('您输入的密码需在6-20位')
      return false
    }
    return /[^\u4E00-\u9FA5]{6,20}$/.test(password)
  },
  email(email, istip = true) {
    if (!/^[_a-z0-9-\]+@([-a-z0-9]+\)+[a-z]{2,}$/i.test(email) && istip) {
      this.showToast('您输入的邮箱格式不正确')
      return false
    }
    return /^[_a-z0-9-\]+@([-a-z0-9]+\)+[a-z]{2,}$/i.test(email)
  },
  code(code) {
    if (!/^(\d{4}|\d{6})$/.test(code)) {
      this.showToast('验证码格式不正确')
      return false
    }
    return /^(\d{4}|\d{6})$/.test(code)
  },
  name(name, retunType) {
    if (!name && !retunType) {
      this.showToast('姓名不能为空')
      return
    }
    let nameReg = /^[0-9\u4e00-\u9fa5a-zA-Z]+$/
    // let nameRegReplace = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g
    if (retunType == 1) {
      if (!nameReg.test(name)) {
        return name.substr(0, name.length - 1)
      }
      return name
    }
    if (!nameReg.test(name)) {
      this.showToast('姓名格式不正确,请检查是否有非法字符')
      return false
    }
    return nameReg.test(name)
  },
  numberFormatter(value) {
    return value.replace(/\D/g, '')
  },
  showToast(title, callback, mask) {
    Toast({
      message: title,
      position: 'bottom',
      forbidClick: mask || false,
      onOpened: () => {
        if (typeof callback == 'function') {
          setTimeout(() => {
            callback()
          }, 1500)
        }
      }
    })
  }
}
export default validate
