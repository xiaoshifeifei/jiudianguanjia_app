<template>
  <div class="mains">
      <!-- 搜索部分 -->
      <div class="content-1">
        <div class="sous">
          <van-search v-model="value" placeholder="输入房号/楼层搜索" autofocus clearable class="sous-1" background="#F8F8F8"/>
        </div>
        <van-button type="info" class="btn-ss">搜索</van-button>
      </div>
      <!-- <searchClick /> -->
      <!-- 表格部分 -->
      <div class="content-2">
        <div class="label-t">
          <div class="fh">房号</div>
          <div class="lc">楼层</div>
          <div class="wfmc">wifi名称</div>
          <div class="wfmm">wifi密码</div>
        </div>
        <!-- 此处循环 -->
        <div class="class-box">
          <div class="label-b" v-for="(item,index) in list" :Key="index">
            <div class="fhx">{{item.RoomNumber}}</div>
            <div class="lcx">{{item.RoomFloor}}</div>
            <div class="wfmcx">{{item.WiFiName}}</div>
            <div class="wfmmx">{{item.WiFiPwd}}</div>
          </div>
        </div>
        
      </div>
  </div>
</template>

<script>
import  searchClick  from '../../components/search'
import { getHotelRoom } from '@/api/guestroom.js'
export default {
  components:{
    searchClick
  },
  data() {
    return {
      value:"",
      pageList: {
        Page: 1,
        Limit: 100,
        Keys: ''
      },
      list: []
    }
  },
  mounted() {
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let hotelRoom = await getHotelRoom({Page: 1,Limit: 100,m_status:1})
      console.log("hotelRoom",hotelRoom);
      this.list = hotelRoom.data.list
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('./index.less');
</style>
