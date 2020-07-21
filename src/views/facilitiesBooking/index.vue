<template>
  <div >
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix padd30">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{bookingData.HotelName}}</span>
          <span v-if="bookingData.OrderStatus == 0" class="fr c_red">待付款</span>
          <span v-else-if="bookingData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">设施预定订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{bookingData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{bookingData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">手机号：</span><span class="fr">{{bookingData.Tel}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{bookingData.FloorNumber}}层</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{bookingData.RoomNumber}}-{{bookingData.Model}}</span></div>
        <div class="clearfix pt_15"><span class="fl">服务项目：</span><span class="fr">{{bookingData.FacilityName}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{bookingData.SerialNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{bookingData.CreateDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">预定时间：</span><span class="fr">{{bookingData.UseBeginDate}}</span></div>
        <div v-if="bookingData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">使用时间：</span><span class="fr">{{bookingData.UseEndDate}}</span></div>
        <div v-if="bookingData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{bookingData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="bookingData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">完成</div>
    </div>
    <!-- <div class="btnBox">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { bookingOrder, bookingOperate, bookingCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '',
      bookingData: {}
    }
  },
  created() {
    if (this.$route.query.OrderID) {
      this.orderId = this.$route.query.OrderID
    }
  },
  mounted() {
    this.getBooking()
  },
  methods: {
    async getBooking() {
      let res = await bookingOrder({ OrderID: this.orderId })
      this.bookingData = res.data
    },
    async cancleHandle() {
      await bookingCancle({ OrderID: this.orderId, CancelOrderStatus: -1 })
      this.getBooking()
    },
    // 。。。?
    async finishedHandle() {
      await bookingOperate({ OrderID: this.orderId, OperateOrderStatus: 1 })
      this.getBooking()
    }
  }
}
</script>

<style lang="less" scoped>

</style>


