<template>
  <div>
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7"></span>
          <span v-if="wakeupData.OrderStatus == 0" class="fr c_red">待处理</span>
          <span v-else-if="wakeupData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">叫醒订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">知了酒店</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{wakeupData.UserName}}</span></div>
        <!-- <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">0806-大床房</span></div> -->
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{wakeupData.RoomNumber}}-{{wakeupData.Model}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{wakeupData.OrderSerialNo}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{wakeupData.CreateDate}}</span></div>
        <div class="clearfix pt_15"><span class="fl">叫醒时间：</span><span class="fr">{{wakeupData.WakeDate}}</span></div>
        <div v-if="wakeupData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{wakeupData.UpdateDate}}</span></div>
        <div v-if="wakeupData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{wakeupData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="wakeupData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">完成</div>
    </div>
    <!-- <div class="btnBox">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { wakeupOrder, wakeupOperate, wakeupCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '',
      wakeupData: {}
    }
  },
  created() {
    if (this.$route.query.OrderID) {
      this.orderId = this.$route.query.OrderID
    }
  },
  mounted() {
    this.getWakeup()
  },
  methods: {
    async getWakeup() {
      let res = await wakeupOrder({ OrderID: this.orderId })
      this.wakeupData = res.data
    },
    async cancleHandle() {
      let ids = []
      ids.push(this.orderId)
      await wakeupCancle({ OrderIDs: ids, CancelOrderStatus: -1 })
      this.getWakeup()
    },
    async finishedHandle() {
      let ids = []
      ids.push(this.orderId)
      await wakeupOperate({ OrderIDs: ids, OperateOrderStatus: 1 })
      this.getWakeup()
    }
  }
}
</script>

<style lang="less" scoped>

</style>


