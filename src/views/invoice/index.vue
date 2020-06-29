<template>
  <div >
    <div class="main clearfix">
      <div class="bor"></div>
      <div class="box clearfix">
        <div class="clearfix">
          <span class="fl fz_15 fw_7">{{invoiceData.HotelName}}</span>
           <span v-if="invoiceData.OrderStatus == 0" class="fr c_red">待处理</span>
          <span v-else-if="invoiceData.OrderStatus == 1" class="fr c_red">已完成</span>
          <span v-else class="fr c_red">已取消</span>
        </div>
        <div class="fz_15 order pt_15">发票订单</div>
        <div class="clearfix pt_15"><span class="fl">酒店：</span><span class="fr">{{invoiceData.HotelName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">房号：</span><span class="fr">{{invoiceData.RoomNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">名字：</span><span class="fr">{{invoiceData.Title}}</span></div>
        <div class="clearfix pt_15"><span class="fl">用户：</span><span class="fr">{{invoiceData.UserName}}</span></div>
        <div class="clearfix pt_15"><span class="fl">电子邮箱：</span><span class="fr">{{invoiceData.Email}}</span></div>
        <div class="dash"></div>
        <div class="clearfix pt_15"><span class="fl">订单编号：</span><span class="fr">{{invoiceData.InvoiceOrderNumber}}</span></div>
        <div class="clearfix pt_15"><span class="fl">提交时间：</span><span class="fr">{{invoiceData.CreateDate}}</span></div>
        <div v-if="invoiceData.OrderStatus == -1" class="clearfix pt_15"><span class="fl">取消时间：</span><span class="fr">{{invoiceData.UpdateDate}}</span></div>
        <div v-if="invoiceData.OrderStatus == 1" class="clearfix pt_15"><span class="fl">完成时间：</span><span class="fr">{{invoiceData.UpdateDate}}</span></div>
      </div>
    </div>
    <div v-if="invoiceData.OrderStatus == 0" class="btnBox btnBox1">
      <div class="btn cancle ">取消</div>
      <div class="btn confirm ">接受</div>
    </div>
    <!-- <div class="btnBox">
      <div class="btn finished">完成</div>
    </div> -->
  </div>
</template>

<script>
import { invoiceOrder } from '@/api/order'
export default {
  data() {
    return {
      orderId: '11',
      invoiceData: {}
    }
  },
  created() {
    // this.orderId = this.$route.path.split('?')[1].split('=')[1]
  },
  mounted() {
    this.getInvoice()
  },
  methods: {
    async getInvoice() {
      let res = await invoiceOrder({ InvoiceOrderID: this.orderId })
      this.invoiceData = res.data
      console.log(this.invoiceData, 99)
    },
    cancleHandle() {
      this.invoiceData.OrderStatus = -1
    },
    finishedHandle() {
      this.invoiceData.OrderStatus = 1
    }
  }
}
</script>

<style lang="less" scoped>

</style>


