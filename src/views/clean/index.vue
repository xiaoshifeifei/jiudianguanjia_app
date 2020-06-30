<template>
  <div >
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{cleanData.HotelName}}</span>
          <span v-if="cleanData.OrderStatus == 0" class="fr c_red">待清扫</span>
          <span v-else-if="cleanData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">清扫订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{cleanData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{cleanData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{cleanData.FloorNumber}}层</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{cleanData.RoomNumber}}-{{cleanData.Model}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{cleanData.SerialNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{cleanData.CreateDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">清扫时间：</span><span class="fr">{{cleanData.BookDate}}</span></div>
        <div v-if="cleanData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{cleanData.UpdateDate}}</span></div>
        <div v-if="cleanData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{cleanData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="cleanData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">完成</div>
    </div>
    <!-- <div  class="btnBox btnBox1">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { cleanOrder, cleanOperate, cleanCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '1',
      cleanData: {}
    }
  },
  created() {
    /*
     * let url = 'http://bweb.capasky.com/bookingService/clean?orderId=1'
     * this.orderId = url.split('?')[1].split('=')[1]
     */
    if (this.$route.path && this.$route.path.indexOf('?') == 1) {
      this.orderId = this.$route.path.split('?')[1].split('=')[1]
    }
  },
  mounted() {
    this.getClean()
  },
  methods: {
    async getClean() {
      let res = await cleanOrder({ OrderID: this.orderId })
      this.cleanData = res.data
    },
    async cancleHandle() {
      await cleanCancle({ OrderID: this.orderId, CancelOrderStatus: -1 })
      this.getClean()
    },
    async finishedHandle() {
      await cleanOperate({ OrderID: this.orderId, OperateOrderStatus: 1 })
      this.getClean()
    }
  }
}
</script>

<style lang="less" scoped></style>


