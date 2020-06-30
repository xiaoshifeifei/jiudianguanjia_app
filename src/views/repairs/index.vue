<template>
  <div class="contain_box">
    <div class="main">
      <div class="bor"></div>
      <div class="box clearfix mb_30">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{repairData.HotelName}}</span>
          <span v-if="repairData.OrderStatus == 0" class="fr c_red">待处理</span>
          <span v-else-if="repairData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">维修订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{repairData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{repairData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{repairData.FloorNumber}}层</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{repairData.RoomNumber}}-{{repairData.Model}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">报修图片：</span></div>
        <div class="imgBox pt_15">
          <img v-for="item in repairData.ImgUrls" :key="item" class="cars" :src="item">
        </div>
        <!-- <div class="clearfix pt_15"><span class="fl">维修原因：</span><span class="fr">0806-大床房</span></div> -->
        <div class="clearfix pt_15"><span class="fl">维修详情：</span></div>
        <div>{{repairData.Remark}}</div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{repairData.SerialNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{repairData.CreateDate}}</span></div>
        <div v-if="repairData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{repairData.UpdateDate}}</span></div>
        <div v-if="repairData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{repairData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="repairData.OrderStatus == 0" class="btnBox mt_50 mb_5">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle() ">完成</div>
    </div>
    <div v-else class="btnBox mt_50 mb_5">
      <!-- <div class="btn finished">完成</div> -->
    </div>
  </div>
</template>

<script>
import { repairOrder, repairOperate, repairCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '1',
      repairData: {}
    }
  },
  created() {
    if (this.$route.path && this.$route.path.indexOf('?') == 1) {
      this.orderId = this.$route.path.split('?')[1].split('=')[1]
    }
  },
  mounted() {
    this.getRepair()
  },
  methods: {
    async getRepair() {
      let res = await repairOrder({ OrderID: this.orderId })
      this.repairData = res.data
    },
    async cancleHandle() {
      await repairCancle({ OrderID: this.orderId, CancelOrderStatus: -1 })
      this.getRepair()
    },
    async finishedHandle() {
      await repairOperate({ OrderID: this.orderId, OperateOrderStatus: 1 })
      this.getRepair()
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    width: 100%;
    height: 100%;
  }
  .cars{
    width:30%;
    margin-right:10px;
  }
  .cars:last-child{
    margin-right:0
  }
  .imgBox{
    display: flex;
    justify-content: space-between;
    overflow: auto;
  }
  .btnBox2{
    position: absolute;
  }
</style>


