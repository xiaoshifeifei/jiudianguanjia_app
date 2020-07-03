<template>
  <div>
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{checkoutData.HotelName}}</span>
          <span v-if="checkoutData.OrderStatus == 0" class="fr c_red">待处理</span>
          <span v-else-if="checkoutData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">退房订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{checkoutData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{checkoutData.UserName}}</span></div>
         <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{checkoutData.FloorNumber}}层</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{checkoutData.RoomNumber}}-{{checkoutData.Model}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{checkoutData.OrderSerialNo}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{checkoutData.CreateDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">预计退房时间：</span><span class="fr">{{checkoutData.CheckOutDate}}</span></div>
        <div v-if="checkoutData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{checkoutData.UpdateDate}}</span></div>
        <div v-if="checkoutData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{checkoutData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="checkoutData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">完成</div>
    </div>
    <div v-else class="btnBox">
      <!-- <div class="btn finished">完成</div> -->
    </div>
  </div>
</template>

<script>
import { checkoutOrder, checkoutOperate, checkoutCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '',
      checkoutData: {}
    }
  },
  created() {
    if (this.$route.path && this.$route.path.indexOf('?') == 1) {
      this.orderId = this.$route.path.split('?')[1].split('=')[1]
    }
  },
  mounted() {
    this.getCheckout()
  },
  methods: {
    async getCheckout() {
      let res = await checkoutOrder({ OrderID: this.orderId })
      this.checkoutData = res.data
    },
    async cancleHandle() {
      let ids = []
      ids.push(this.orderId)
      await checkoutCancle({ OrderIDs: ids, CancelOrderStatus: -1 })
      this.getCheckout()
    },
    async finishedHandle() {
      let ids = []
      ids.push(this.orderId)
      await checkoutOperate({ OrderIDs: ids, OperateOrderStatus: 1 })
      this.getCheckout()
    }
  }
}
</script>

<style lang="less" scoped>

</style>


