<template>
  <div class="login">
    <div class="loginBg">
      <div class="login_form">
        <div class="text">绑定管理账号</div>
        <div class="lineBor"></div>
        <div class="account ipt mt_15">
          <label for="account">账号</label>
          <input id="account"
            name="AdminName"
            v-model="loginForm.AdminName"
            @blur="checkAdminName"
            @input="inputName"
            ref="AdminName" type="text" placeholder="请输入账号">
        </div>
        <div class="err" v-if="isCheckAdminName">请输入正确的账号</div>
        <div v-else class="err"></div>
        <div class="account ipt">
          <label for="pswd">密码</label>
          <input id="pswd"
            name="AdminPassword"
            v-model="loginForm.AdminPassword"
            ref="AdminPassword"
            @blur="checkAdminPassword"
            @input="inputPassword"
            type="password" placeholder="请输入密码">
        </div>
        <div class="err" v-if="isCheckAdminPassword">请输入正确的密码</div>
        <div v-else class="err"></div>
      </div>
      <!-- <div class="login_form">
        <div class="account">
          <div>输入账号</div>
          <div class="ipt">
            <input
              type="text"
              name="AdminName"
              v-model="loginForm.AdminName"
              ref="AdminName"
              placeholder="请输入你的账号"
              @blur="checkAdminName"
              @input="inputName"
            />
          </div>
          <div class="err" v-if="isCheckAdminName">请输入正确的账号</div>
          <div v-else class="err"></div>
          <div class="bor"></div>
        </div>
        <div class="psw">
          <div>输入密码</div>
          <div class="ipt">
            <input
              type="password"
              name="AdminPassword"
              v-model="loginForm.AdminPassword"
              ref="AdminPassword"
              placeholder="请输入你的密码"
              @blur="checkAdminPassword"
              @input="inputPassword"
            />
          </div>
          <div class="err" v-if="isCheckAdminPassword">请输入正确的密码</div>
          <div v-else class="err"></div>
          <div class="bor"></div>
        </div>
      </div> -->
      <div
        class="btn"
        :class="[isLogin && userStatus==1 ? 'bc_146eeb' : 'bc_c3c3c3']"
        @click="handleLogin"
      >绑定</div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import { getUserStatus } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        AdminName: '',
        AdminPassword: ''
      },
      isCheckAdminName: false,
      isCheckAdminPassword: false,
      loading: false,
      isLogin: false,
      userStatus: 1
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    let hasUserStatus = getUserStatus()
    if (hasUserStatus) {
      if (hasUserStatus === 0) {
        Dialog.alert({
          message: '账户被禁用'
        })
      }
      this.userStatus = hasUserStatus
    }
  },
  mounted() {
    if (this.loginForm.AdminName === '') {
      this.$refs.AdminName.focus()
    } else if (this.loginForm.AdminPassword === '') {
      this.$refs.AdminPassword.focus()
    }
  },
  methods: {
    checkAdminName() {
      if (this.loginForm.AdminName == '') {
        this.isCheckAdminName = true
      } else {
        this.isCheckAdminName = false
      }
    },
    inputName() {
      if (this.loginForm.AdminName != '' && this.loginForm.AdminPassword != '') {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    inputPassword() {
      this.inputName()
    },
    checkAdminPassword() {
      if (this.loginForm.AdminPassword == '') {
        this.isCheckAdminPassword = true
      } else {
        this.isCheckAdminPassword = false
      }
    },
    handleLogin() {
      this.loading = true
      if (this.userStatus === 0) {
        Dialog.alert({
          message: '账户被禁用'
        })
        return
      }
      if (this.loginForm.AdminName == '') {
        return
      }
      if (this.loginForm.AdminPassword == '') {
        return
      }
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push('/index')
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.loginBg{
  width:100%;
  // height: 667px;
  background: url('../../assets/images/login/bg.png') no-repeat;
  background-size: 100%;
}
.login_form {
  width:285px;
  margin: 0 auto;
  padding-top:230px
}
.text{
  color: #1e96fc;
  font-size:30px;
  text-align: center;
}
.lineBor{
  width:40px;
  height: 3px;
  background:#1e96fc;
  margin: 5px auto;
}
.btn {
  width: 345px;
  height: 40px;
  margin: 90px auto 0;
  background: linear-gradient(#51aefe, #37a2fd 62%, #1e96fc);
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 700;
}
.bc_146eeb {
  background: #146eeb;
}
.bc_c3c3c3 {
  background: #c3c3c3;
}
.btn.active {
  background: #146eeb;
}
label{
  color:#1e96fc;
  font-size:15px;
  padding: 0 10px 0 15px;
}
.ipt {
  width:285px;
  font-size: 13px;
  height: 35px;
  color: #999;
  line-height: 35px;
  background:#fff;
  border-radius: 5px;
  box-shadow: 2px 3px 5px 0px rgba(0,8,20,0.05);
}
.err {
  height: 25px;
  color: #e81818;
  font-size: 10px;
}
</style>
