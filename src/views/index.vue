<template>
  <div style="background-color: #F8F8F8;">
      <div class="gpv-5 gph-5 gc-fff gfs-15" style="background-color:#424D60">待办事项</div>
      <div class="gph-5 gb-fff">
        <div class="gdf-jc gpv-6">
          <div class="gdf-c gw-80">
            <i class="iconfont icon-yuandianzhong gw-10" style="color:#FF6A6A"></i>
            <div class="gw-90">
              <div class="gfs-15 gt-hide-1">便利店有<span style="color:#FF6A6A">3</span>个订单待处理</div>
              <div class="gfs-10 gc-999">情趣用品</div>
            </div>
          </div>
          <div @click="goHandle" class="gc-fff gw-20 gpv-2 gtc gbr-5" style=" background-color:#1E96FC">
            去处理
          </div>
        </div>
        <div class="gdf-jc gpv-6">
          <div class="gdf-c gw-80">
            <i class="iconfont icon-yuandianzhong gw-10" style="color:#FF6A6A"></i>
            <div class="gw-90">
              <div class="gfs-15 gt-hide-1">清扫服务有<span style="color:#FF6A6A">3</span>个订单待处理</div>
              <div class="gfs-10 gc-999">情趣用品</div>
            </div>
          </div>
          <div @click="goHandle" class="gc-fff gw-20 gpv-2 gtc gbr-5" style=" background-color:#1E96FC">
            去处理
          </div>
        </div>
        <div class="gdf-jc gpv-6">
          <div class="gdf-c gw-80">
            <i class="iconfont icon-yuandianzhong gw-10" style="color:#FF6A6A"></i>
            <div class="gw-90">
              <div class="gfs-15 gt-hide-1">便利店有<span style="color:#FF6A6A">3</span>订单生成</div>
              <div class="gfs-10 gc-999">情趣用品</div>
            </div>
          </div>
          <div @click="goHandle" class="gc-fff gw-20 gpv-2 gtc gbr-5" style=" background-color:#1E96FC">
            去处理
          </div>
        </div>
        <div class="gdf-jc gpv-6">
          <div class="gdf-c gw-80">
            <i class="iconfont icon-yuandianzhong gw-10" style="color:#FF6A6A"></i>
            <div class="gw-90">
              <div class="gfs-15 gt-hide-1">发现新增<span style="color:#FF6A6A">3</span>个用评论</div>
              <div class="gfs-10 gc-999">情趣用品</div>
            </div>
          </div>
          <div @click="goHandle" class="gc-fff gw-20 gpv-2 gtc gbr-5" style=" background-color:#1E96FC">
            去处理
          </div>
        </div>
        <div class="gdf-jc gpv-6">
          <div class="gdf-c gw-80">
            <i class="iconfont icon-yuandianzhong gw-10" style="color:#FF6A6A"></i>
            <div class="gw-90">
              <div class="gfs-15 gt-hide-1">便利店有<span style="color:#FF6A6A">3</span>订单生成</div>
              <div class="gfs-10 gc-999">情趣用品</div>
            </div>
          </div>
          <div @click="goHandle" class="gc-fff gw-20 gpv-2 gtc gbr-5" style=" background-color:#1E96FC">
            去处理
          </div>
        </div>
      </div>
      <div class="gmt-5 gph-5 gb-fff">
        <div class="gdf-jcw">
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first1.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">开票</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first2.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">设施预定</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first3.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">叫醒服务</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first4.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">租车</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first5.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">客房服务</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first6.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">清扫</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first7.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">续住</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first8.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">退房</div>
          </div>
          <div @click="goHandle" class="gtc gw-20 gpv-5">
            <img src="../assets/images/first/first9.png" alt="" class="gw-20p gh-20p" style="">
            <div class="gc-333 gfs-12 gmt-3">报修</div>
          </div>
          <div class="gtc gw-20 gpv-5">

          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {
  createSocket,
  sendWSPush,
  oncloseWS,
  onmessageWS,
  onerrorWS
} from '@/api/webSocket.js'
import { getOrderReminder } from '@/api/indexOrder.js'
import { getToken } from '@/utils/auth.js'
export default {
  data() {
    return {
      messageBoxState: false,
      remindCount: 10,
      remindCountOfClear: 0, // 清扫
      remindCountOfRepair: 0, // 修理
      remindCountOfService: 0, // 客房服务
      remindCountOfCheckOut: 0, // 退房
      CleanOrderIDs: [], // 清扫
      repairOrderIDs: [], // 修理
      serviceOrderIDs: [], // 客房服务
      CheckOutOrderIDs: [] // 退房
    }
  },
  mounted() {
    console.log(getToken())
  },
  methods: {
    goHandle() {
      this.$toast('开发中...')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
