<template>
  <div class="contain_box">
    <div class="main">
      <div class="bor"></div>
      <div class="box clearfix mb_30">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">知了酒店</span>
          <span v-if="carData.Status == 0" class="fr c_red">待处理</span>
          <span v-else-if="carData.Status == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">租车订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">知了酒店</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{carData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">手机号：</span><span class="fr">{{carData.Tel}}</span></div>
        <div class="clearfix pt_15"><span class="fl">楼层：</span><span class="fr">0806-大床房</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{carData.RoomNumber}}-{{carData.Model}}</span></div>
        <div class="bor_b"></div>
        <div class="clearfix pt_15"><span class="fl">租赁物品：</span><span class="fr">{{carData.GoodsName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">租赁车牌：</span><span class="fr">{{carData.CarNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">租金：</span><span class="fr">0806-大床房</span></div>
        <div class="clearfix pt_15"><span class="fl">租车图片：</span></div>
        <div>
          <img class="cars" :src="carData.CoverImgUrl">
        </div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{carData.OrderSerialNo}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">2020-06-07 16:58:06</span></div>
        <div class="clearfix pt_15"><span class="fl">预约租赁时间：</span><span class="fr">{{carData.RentBeginDate}}</span></div>
        <div v-if="carData.Status == 0" class="clearfix pt_15"><span class="fl">租赁时间：</span><span class="fr">{{carData.RentBeginDate}}</span></div>
        <div v-if="carData.Status == 1" class="clearfix pt_15"><span class="fl">归还时间：</span><span class="fr">{{carData.RentEndDate}}</span></div>
        <div v-if="carData.Status == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">2020-06-07 16:58:06</span></div>
      </div>
    </div>
    <div v-if="carData.Status == 0" class="btnBox mt_50 mb_5">
      <div class="btn cancle" @click="cancleHandle()">取消</div>
      <div class="btn confirm" @click="finishedHandle()">接受</div>
    </div>
    <div v-else class="btnBox mt_50 mb_5">
      <!-- <div class="btn finished">完成</div> -->
    </div>
  </div>
</template>

<script>
import { carOrder, carOperate, carCancle } from '@/api/order'
export default {
  data() {
    return {
      orderId: '1',
      carData: {}
    }
  },
  created() {
    // this.orderId = this.$route.path.split('?')[1].split('=')[1]
  },
  mounted() {
    this.getCar()
  },
  methods: {
    async getCar() {
      let res = await carOrder({ OrderID: this.orderId })
      this.carData = res.data
      console.log(this.carData, 99)
    },
    async cancleHandle() {
      await carCancle({ OrderID: this.orderId, CancelOrderStatus: -1 })
      this.getCar()
    },
    async finishedHandle() {
      await carOperate({ OrderID: this.orderId, CompleteOrderStatus: 1 })
      this.getCar()
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    width:100%;
    height: 100%;
  }
  .cars{
    width:100%
  }
  .btnBox2{
    position: absolute;
  }
</style>


