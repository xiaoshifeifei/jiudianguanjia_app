<template>
  <div class="mains">
    <!-- 内容区域 -->
    <div class="content-1">
      <!-- 头部 -->
      <div class="content-2">
        <div class="mycontent" v-if="statusParams == 1">待接单</div>
        <div class="mycontent" v-if="statusParams == 2">待配送</div>
        <div class="mycontent" v-if="statusParams == 3">已完成</div>
        <div class="mycontent" v-if="statusParams == 4">已取消</div>
        <div class="mycontent" v-if="statusParams == 5">已退款</div>
        <div class="content-3">
          <!-- {{item.RoomNumber}} -->
          <div class="item-content1">房号:<span>{{listParams.RoomNumber}}</span></div>
          <div class="item-content2">{{listParams.CreateDate}}</div>
        </div>
        <div class="content-4">
          <div class="item-content1"><span v-if="listParams.UserName">{{listParams.UserName}}/</span><span>{{listParams.UserTel}}</span></div>
        </div>
      </div>
      <!-- 商品区域 -->
      <div class="contentshop">
        <div class="contentshop-he" :class="{actionShow : isactionShow}">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
            <van-cell v-for="(item,index) in list" :key="index">
              <div class="contentshopAll">
                <div class="contentshop-l">
                  <!-- <img :src="item.url" alt=""> -->
                  <img style="width:100%" class="img-goods" :src="item.GoodsCoverUrl" alt="">
                </div>
                <div class="contentshop-z">
                  <!-- {{item.textContent}} -->
                  <div class="contentshop-1">
                      <span class="contentshoptext">{{item.GoodsName}}</span>
                  </div>
                  <div class="contentshop-2">
                    ￥{{item.Price}}
                  </div>
                  <div class="contentshop-r">
                    * {{item.GoodsCount}}
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
        <div class="genx" @click="editAll">
          <span>查看更多 </span>
          <van-icon name="arrow-down" v-if="isshow" />
          <van-icon name="arrow-up" v-if="!isshow"/>
        </div>
        <div class="order-1">
          <div class="order-2">
            <span>订单编号: </span>
            <span>{{listParams.OrderSerialNo}}</span>
          </div>
          <div class="order-3">
            <span>备注: </span>
            <span>{{listParams.CreateDate}}</span>
          </div>
        </div>
        <div class="payment">
          <span class="span-men">共 <span class="span-men0">{{this.list.length}}</span> 件 </span>
          <span class="span-men1"> 实付 </span>
          <span class="span-men2">￥</span>
          <span class="span-men3">{{listParams.ActuallyPay}}</span>
        </div>
        <div class="comitTime">
          <div class="comitTime-t"></div>
          <div class="comitTime-1">提交时间</div>
          <div class="comitTime-2">2020-08-31  15:15</div>
          <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3'">接单时间</div>
          <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3'">2020-08-31  15:15</div>
          <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3'">完成时间</div>
          <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3'">2020-08-31  15:15</div>
          <div class="comitTime-1" v-if="statusParams === '4'">取消时间</div>
          <div class="comitTime-2" v-if="statusParams === '4'">2020-08-31  15:15</div>
          <div class="comitTime-1" v-if="statusParams === '5'">退款时间</div>
          <div class="comitTime-2" v-if="statusParams === '5'">2020-08-31  15:15</div>
          <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4' || statusParams === '5'">操作人</div>
          <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4' || statusParams === '5'">张五</div>
          <div class="comitTime-b"></div>
        </div>
        <div class="foot-btn">
          <div class="foot-le" @click="isSorry" v-if="statusParams === '1' && noShow != 4">
            拒绝
          </div>
          <div class="foot-ri" @click="getOrders" v-if="statusParams === '1' && noShow != 4">
            接单
          </div>
          <div class="foot-le" @click="isSorryWc('2')" v-if="statusParams === '2' && noShow != 4">
            完成
          </div>
          <!-- 退款未完成 -->
          <div class="foot-ri" @click="getOrderss('2')" v-if="statusParams === '2' && noShow != 4">
            退款
          </div>
          <div class="foot-rit" @click="getOrdersss('3')" v-if="statusParams === '3' && noShow != 4">
            退款
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <van-popup v-model="isPopup" class="popup-noprize">
      <div class="popup-1" >确定要拒绝接单吗？</div>
      <van-form class="popup-2">
        <van-field class="popup-3"  v-model="textInfo" name="validator" border clearable rows="2" type="textarea" placeholder="请输入拒绝理由" :rules="[{ validator, message: '请输入拒绝理由，不能输入表情' }]" />
      </van-form>
      <div class="foot-btn">
        <div class="btn-le" @click="isPopup = false">取消</div>
        <div class="btn-ri" @click="commitOrders()">确定</div>
        <div style="clear:both"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { 
  SupermarketDetail,
  SupermarketComplete,
  SupermarketOrder } from '@/api/supermarket.js'
export default {
  data() {
    return {
      textInfo: '',
      isPopup: false, //弹窗状态
      statusParams: '1',
      isactionShow: false,
      isshow: true, // 查看显示状态
      list: [],
      loading: false,
      finished: false,
      orderID: '',
      BelongModule: '',
      noShow: '', // 详情里面特特产不显示任何按钮
      listParams: {
        RoomNumber: '',
        OrderSerialNo: '',
        CreateDate: '',
        UserName: '',
        UserTel: '',
        OrderStatus: '',
        ActuallyPay: '',
        GoodsName: '',
        GoodsCoverUrl: '',
        GoodsCount: '',
        Price: '',
        remark: '',
      }
    }
  },
  mounted() {
    // 此处获取状态
    if (this.$route.query.paramsName == 1) {
      this.statusParams = '1'
    } else if (this.$route.query.paramsName == 2) {
      this.statusParams = '2'
    } else if (this.$route.query.paramsName == 3) {
      this.statusParams = '3'
    } else if (this.$route.query.paramsName == 4) {
      this.statusParams = '4'
    } else if (this.$route.query.paramsName == 5) {
      this.statusParams = '5'
    }
    console.log('this.$route.query.BelongModule', this.$route.query.BelongModule)
    
  },
  created(){
    this.getList()
    this.orderID = this.$route.query.OrderID
    this.BelongModule = this.$route.query.BelongModule
  },
  methods: {
     // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      console.log('val', val)
      console.log('/^([a-zA-Z]|[u4e00-u9fa5]|_)([a-zA-Z0-9]|[u4e00-u9fa5]|_)*$/', /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(val))
      if (/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(val) == false) {
        return true
      } else {
        return false
      }
    },
     async getList() {
      this.orderID = this.$route.query.OrderID
      this.BelongModule = this.$route.query.BelongModule
      this.noShow = this.$route.query.BelongModule
      const getConven = await SupermarketDetail({
       OrderID: this.orderID,
       BelongModule: this.BelongModule
      })
      console.log('getConven',getConven);
      if(getConven.code == 0) {
        const res = getConven.data
        this.listParams.RoomNumber = res.RoomNumber
        this.listParams.UserName = res.UserName
        this.listParams.UserTel = res.UserTel
        this.listParams.CreateDate = res.CreateDate
        this.listParams.remark = res.remark
        this.listParams.OrderSerialNo = res.OrderSerialNo
        this.listParams.ActuallyPay = res.ActuallyPay
        this.listParams.RoomNumber = res.RoomNumber
        this.list = res.order_detail
      }
    },
    // 点击查看全部
    editAll() {
      this.isshow = !this.isshow
      if (!this.isshow) {
        this.isactionShow = true
      } else {
        this.isactionShow = false
      }
    },
    // 点击接单
    async getOrders(params) {
      console.log('接单', this.orderID)
      const getConven = await SupermarketOrder({
        OrderID: this.orderID,
        ReceiveOrderStatus: 5
      })
      console.log("getConven",getConven);
      if (getConven.code == 0) {
        this.$toast("接单成功")
        this.getList()
      }
    },
    // 点击拒绝
    isSorry(params) {
      console.log('拒绝', params)
      this.isPopup = true
    },
    // 拒绝确认按钮
    async commitOrders(params) {
      if (this.textInfo.trim() === '') {
        this.$toast('请输入拒绝理由')
        return
      }
      if (this.validator(this.textInfo) == false) {
        return
      }

      const getConven = await SupermarketCancel({
        OrderID: this.orderID,
        CancelOrderStatus: -1,
        CancelRemark: this.textInfo
      })
      console.log("getConven",getConven);
      if (getConven.code == 0) {
        this.$toast("订单已拒绝")
        this.isPopup = false
        this.textInfo = ''
        this.getList(1)
      }
    },
    // 待配送详情点击完成操作
    async isSorryWc() {
      this.orderID = this.$route.query.OrderID
      console.log('params',this.orderID);
      const getConven = await SupermarketComplete({
        OrderID: this.orderID,
      })
      if (getConven.code == 0) {
        this.$toast("订单已完成")
        this.getList()
      }
    },
    onLoad() {
      this.loading = false
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 10) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('./index.less');
</style>

