<template>
  <div class="login">
    <div class="bg">
      <img src="../../assets/images/login.png" alt />
    </div>
    <div class="login_form">
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
    </div>
    <div
      class="btn"
      :class="[isLogin && userStatus==1 ? 'bc_146eeb' : 'bc_c3c3c3']"
      @click="handleLogin"
    >登录</div>
  </div>
</template>
<script>
import { getWxCodeUrl } from '@/utils/authorize'
import { Dialog } from 'vant';
import { getUserStatus } from '@/utils/auth'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        AdminName: "",
        AdminPassword: ""
      },
      isCheckAdminName: false,
      isCheckAdminPassword: false,
      loading: false,
      isLogin: false,
      userStatus: 1
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created() {
    let hasUserStatus = getUserStatus()
    if (hasUserStatus) {
      if (hasUserStatus === 0) {
        Dialog.alert({
          message: '账户被禁用',
        })
      }
      this.userStatus = hasUserStatus
    }
  },
  mounted() {
    if (this.loginForm.AdminName === "") {
      this.$refs.AdminName.focus();
    } else if (this.loginForm.AdminPassword === "") {
      this.$refs.AdminPassword.focus();
    }
  },
  methods: {
    checkAdminName() {
      if (this.loginForm.AdminName == "") {
        this.isCheckAdminName = true;
      } else {
        this.isCheckAdminName = false;
      }
    },
    inputName() {
      if (this.loginForm.AdminName != "" && this.loginForm.AdminPassword != "") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    inputPassword() {
      this.inputName()
    },
    checkAdminPassword() {
      if (this.loginForm.AdminPassword == "") {
        this.isCheckAdminPassword = true;
      } else {
        this.isCheckAdminPassword = false;
      }
    },
    handleLogin() {
      this.loading = true;
      if (this.userStatus === 0) {
        Dialog.alert({
          message: '账户被禁用',
        })
        return;
      }
      if(this.loginForm.AdminName == ''){
        return
      }
      if(this.loginForm.AdminPassword == ''){
        return
      }
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push("/");
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
}
.bg {
  width: 100%;
  height: 420px;
}
.bg img {
  width: 100%;
}
.login_form {
  position: absolute;
  top: 235px;
  width: 345px;
  height: 270px;
  left: 15px;
  border-radius: 10px;
  background: #fff;
}
.btn {
  position: absolute;
  top: 480px;
  width: 300px;
  left: 37px;
  height: 57px;
  // background: rgba(195, 195, 195, 1);
  box-shadow: 0px 5px 10px rgba(195, 195, 195, 0.25);
  border-radius: 28px;
  text-align: center;
  line-height: 57px;
  color: #fff;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
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
.account {
  padding: 20px;
}
.psw {
  padding: 0 20px 20px 20px;
}
.ipt {
  font-size: 13px;
  height: 20px;
  margin: 10px 0;
  color: #999;
  line-height: 20px;
}
.err {
  height: 25px;
  color: #e81818;
  font-size: 10px;
}
.bor {
  height: 5px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
