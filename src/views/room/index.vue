<template>
  <div >
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{roomData.HotelName}}</span>
          <span v-if="roomData.OrderStatus ==0" class="fr c_red">待处理</span>
          <span v-else-if="roomData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">客房服务订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{roomData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{roomData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">{{roomData.FloorNumber}}层</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{roomData.RoomNumber}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">客房服务物品：</span></div>
        <div v-for="item in roomData.serviceOrderDetails" :key="item.GoodsID" class="clearfix pt_15">
          <img class="fl mr_15 goods" :src="item.GoodsCoverUrl">
          <ul class="fl">
            <li class="">{{item.GoodsName}}</li>
            <li class="c_99 mt_5 mb_5">退房时归还</li>
            <li class="c_99">x{{item.GoodsCount}}</li>
          </ul>
          <div class="fr fz_15">免费</div>
        </div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{roomData.SerialNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{roomData.CreateDate}}</span></div>
        <div v-if="roomData.OrderStatus ==1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{roomData.UpdateDate}}</span></div>
        <div v-if="roomData.OrderStatus ==-1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{roomData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="roomData.OrderStatus ==0" class="btnBox btnBox1">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">接受</div>
    </div>
    <!-- <div class="btnBox btnBox1">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { roomOrder } from '@/api/order'
export default {
  data() {
    return {
      orderId: '2',
      roomData: {}
    }
  },
  created() {
    // this.orderId = this.$route.path.split('?')[1].split('=')[1]
  },
  mounted() {
    this.getRoom()
  },
  methods: {
    async getRoom() {
      let res = await roomOrder({ OrderID: this.orderId })
      this.roomData = res.data
      console.log(this.roomData, 11)
    },
    cancleHandle() {
      this.roomData.OrderStatus = -1
    },
    finishedHandle() {
      this.roomData.OrderStatus = 1
    }
  }
}
</script>

<style lang="less" scoped>
  .goods{
    width:60px;
    height: 60px;
  }
  .btnBox1{
    bottom:10px
  }
</style>


