<template>
  <div>
    <span class="Totop" v-show="totop" onclick="timer = setInterval(() => document.documentElement.scrollTop <= 0 ? clearInterval(timer) : window.scrollTo(0, document.documentElement.scrollTop - 100), 17);">
      <i class="iconfont icon-fanhuidingbu newtotopfont"></i>
    </span>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        totop:false
      }
    },
    mounted(){
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop); 
    },
    methods:{
      scrollToTop(){
      if(document.documentElement.scrollTop>100){
        this.totop=true
      }else{
        this.totop=false
      }
    },
    }
  }
</script>

<style lang="less">
  .Totop{
    position: fixed;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    bottom: 50px;
    right: 50px;
    background: #fff;
    box-shadow: 1px 1px 10px #bbb;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
    i{
        font-size: 20px;
        color: #e2294c;
      }
  }
</style>