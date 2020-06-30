<template>
  <div >
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{stayData.HotelName}}</span>
          <span v-if="stayData.OrderStatus == 0" class="fr c_red">待处理</span>
          <span v-else-if="stayData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">续住订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{stayData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{stayData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">手机号：</span><span class="fr">{{stayData.Tel}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{stayData.Tel}}</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{stayData.RoomNumber}}-{{stayData.Model}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{stayData.OrderSerialNo}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{stayData.CreateDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">入住时间：</span><span class="fr">{{stayData.ContinueLiveDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">离店时间：</span><span class="fr">{{stayData.CheckOutDate}}</span></div>
        <div v-if="stayData.OrderStatus == 1 || stayData.OrderStatus==-1" class="clearfix pt_15"><span class="fl">共计：</span><span class="fr">{{stayData.OrderSerialNo}}</span></div>
      </div>
    </div>
    <div v-if="stayData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">接受</div>
    </div>
    <!-- <div class="btnBox">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { stayOrder, stayOperate, stayCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '6',
      stayData: {}
    }
  },
  created() {
    if (this.$route.path && this.$route.path.indexOf('?') == 1) {
      this.orderId = this.$route.path.split('?')[1].split('=')[1]
    }
  },
  mounted() {
    this.getStay()
  },
  methods: {
    async getStay() {
      let res = await stayOrder({ OrderID: this.orderId })
      this.stayData = res.data
      console.log(this.stayData, 11)
    },
    async cancleHandle() {
      let ids = []
      ids.push(this.orderId)
      await stayCancle({ OrderIDs: ids, CancelOrderStatus: -1 })
      this.getStay()
    },
    async finishedHandle() {
      let ids = []
      ids.push(this.orderId)
      await stayOperate({ OrderIDs: ids, OperateOrderStatus: 1 })
      this.getStay()
    }
  }
}
</script>

<style lang="less" scoped>

</style>


