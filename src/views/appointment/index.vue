<template>
  <div class="mains">
      <div class="card">
        <div class="card-tb"> 
          <img src="../../assets/images/index/qs.png" alt="">
          <span>清扫服务</span>
        </div>
        <div class="content-1">
          <div class="content-2">
            <span class="span-1">累计服务次数</span>
            <span class="span-2">23</span>
          </div>
          <div class="content-2">
            <span class="span-1">已取消数</span>
            <span class="span-2">4</span>
          </div>
          <div class="content-2">
            <span class="span-1">接单超时数</span>
            <span class="span-2">2</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均接单时长(分钟)</span>
            <span class="span-2">5</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均服务时长(分钟)</span>
            <span class="span-2">13</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-tb"> 
          <img src="../../assets/images/index/qs.png" alt="">
          <span>客服服务</span>
        </div>
        <div class="content-1">
          <div class="content-2">
            <span class="span-1">累计服务次数</span>
            <span class="span-2">23</span>
          </div>
          <div class="content-2">
            <span class="span-1">已取消数</span>
            <span class="span-2">4</span>
          </div>
          <div class="content-2">
            <span class="span-1">接单超时数</span>
            <span class="span-2">2</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均接单时长(分钟)</span>
            <span class="span-2">5</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均服务时长(分钟)</span>
            <span class="span-2">13</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-tb"> 
          <img src="../../assets/images/index/qs.png" alt="">
          <span>叫醒服务</span>
        </div>
        <div class="content-1">
          <div class="content-2">
            <span class="span-1">累计服务次数</span>
            <span class="span-2">23</span>
          </div>
          <div class="content-2">
            <span class="span-1">已取消数</span>
            <span class="span-2">4</span>
          </div>
          <div class="content-2">
            <span class="span-1">接单超时数</span>
            <span class="span-2">2</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均接单时长(分钟)</span>
            <span class="span-2">5</span>
          </div>
          <div class="content-2">
            <span class="span-1">平均服务时长(分钟)</span>
            <span class="span-2">13</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import { getSupeReminder } from '@/api/supermarket.js'
import { getOrderReminder } from '@/api/indexOrder.js'
import { getToken } from '@/utils/auth.js'
export default {
  data() {
    return {
      objParams: {},
    }
  },
  mounted() {
    console.log(this.$route.query.params);
    if (this.$route.query.params === '1') {
      this.getAppointmentList()
    } else if (this.$route.query.params === '2') {
       this.getSuperList()
    }
  },
  created() {
    
  },
  methods: {
    // 获取预约列表数据
    async getAppointmentList() {
      // let myList = await getSupeReminder()
      // console.log("myList",myList);
      // if (myList.code == 0) {
      //   this.objParams = myList.data
      // }
    },
    // 获取商超列表数据
    // async getSuperList() {
    //   let myList = await getSupeReminder()
    //   console.log("myList",myList);
    //   if (myList.code == 0) {
    //     this.objParams = myList.data
    //   }
    // },
  }
}
</script>

<style lang="less" scoped>
  @import url('./index.less');
</style>
