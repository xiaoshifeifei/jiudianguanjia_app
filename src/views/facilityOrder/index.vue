<template>
  <div class="mains">
    <!-- <search-click></search-click> -->
    <div class="content-5">
        <div class="sous">
          <van-search v-model="value" placeholder="输入房号/楼层搜索" autofocus clearable class="sous-1" background="#F8F8F8"/>
        </div>
        <van-button type="info" class="btn-ss">搜索</van-button>
      </div>
    <!-- tab栏 -->
    <div class="tabs">
      <div class="div-1" @click="clickDjd">
        <span class="span-1" :class="{ actions : isActions}">待接单</span>
        <span class="span-2" :class="{ actions1 : isActions}">{{orderCounts.wait || 0}}</span>
      </div>
      <div class="div-2" @click="clickDps">
        <span class="span-1" :class="{ actions : isActionsDps}">待付款</span>
        <span class="span-2" :class="{ actions1 : isActionsDps}">{{orderCounts.paying || 0}}</span>
      </div>
      <div class="div-3" @click="clickYwc">
        <span class="span-1" :class="{ actions : isActionsYwc}">已付款</span>
        <span class="span-2" :class="{ actions1 : isActionsYwc}">{{orderCounts.payover || 0}}</span>
      </div>
      <div class="div-4" @click="clickYqx">
        <span class="span-1" :class="{ actions : isActionsYqx}">已使用</span>
        <span class="span-2" :class="{ actions1 : isActionsYqx}">{{orderCounts.done || 0}}</span>
      </div>
      <div class="div-5" @click="clickYtk">
        <span class="span-1" :class="{ actions : isActionsYtk}">已取消</span>
        <span class="span-2" :class="{ actions1 : isActionsYtk}">{{orderCounts.cancel || 0}}</span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-1"  v-for="(item,index) in list" :key="index">
      <!-- 头部 -->
      <div class="content-2" @click.stop="clickDetails(item.OrderID)" >
        <div class="content-3">
          <div class="item-content1">房号:<span>{{item.RoomNumber}}</span></div>
          <div class="item-content2" v-if="myStatus === '1'">待接单</div>
          <div class="item-content2" v-if="myStatus === '2'">待付款</div>
          <div class="item-content2" v-if="myStatus === '3'">已付款</div>
          <div class="item-content2" v-if="myStatus === '4'">已使用</div>
          <div class="item-content2" v-if="myStatus === '5'">已取消</div>
        </div>
        <div class="content-4">
          <div class="item-content1">{{item.UserName}}<span v-if="item.UserName && item.Tel">/</span>{{item.Tel}}</div>
          <div class="item-content2">{{item.CreateDate}}</div>
        </div>
      </div>
      <!-- 商品区域 -->
      <div class="contentshop">
        <div class="zInfo">设施预定信息</div>
        <div class="zInfo-1">
          <div class="zInfo-left">
            <img :src="item.CoverUrl" alt="">
            <!-- 图片位置 -->
          </div>
          <div class="zInfo-right">
            <div class="zInfo-right1">
              <span class="zInfo-span">{{item.FacilityName}}</span>
            </div>
            <div class="zInfo-right2">
              <span class="zInfo-right3">￥</span>
              <span class="zInfo-right4"><span>{{item.Price}}</span>/天</span>
            </div>
          </div>
        </div>
          
        <div class="order-1">
          <div class="order-4">
            <span>预定时间: </span>
            <span>{{item.BookDate}}</span>
          </div>
          <div class="order-5">
            <span>合计金额: </span>
            <span> <span class="order-7">￥</span><span class="order-6">{{item.TotalPrice}}</span></span>
          </div>
          <div class="order-2">
            <span>订单编号: </span>
            <span>{{item.SerialNumber}}</span>
          </div>
          <div class="order-3">
            <span>备注: </span>
            <span>{{item.RemaRemarkrk}}</span>
          </div>
          <div class="order-4">
            <span>取消备注: </span>
            <span>{{item.RemaRemarkrk}}没有字段</span>
          </div>
        </div>
        
        <div class="foot-btn">
          <!-- 待接单状态 item.OrderID-->
          <div class="foot-ri" @click="getOrders(item.OrderID)" v-if="myStatus === '1'">
            接单
          </div>
          <div class="foot-le" @click="isSorry(item.OrderID)" v-if="myStatus === '1'">
            拒绝
          </div>
          <!-- 带配送状态 -->
          <div class="foot-ri" @click="getComplete(item.OrderID)" v-if="myStatus === '2'">
            付款
          </div>
          <div class="foot-le" @click="isSorrySe(item.OrderID)" v-if="myStatus === '2'">
            取消
          </div>
          <!-- 已租赁 -->
          <div class="foot-ri" @click="getCompletes(item.OrderID)" v-if="myStatus === '3'">
            已使用
          </div>
          <div class="foot-le" @click="isSorrySe(item.OrderID)" v-if="myStatus === '3'">
            取消
          </div>
          <!-- 已完成状态 -->
          <div class="foot-ri" @click="isSorrys(item.OrderID)" v-if="myStatus === '3' && item.IsAllowRefund == 1">
            退款
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <!-- 二维码 -->
    <van-popup v-model="isPopup" class="popup-noprize">
      <div class="popup-1" v-if="myStatus === '1'">确定要拒绝接单吗？</div>
      <div class="popup-1" v-if="myStatus === '2' || myStatus === '3'">确定要取消吗？</div>
      <van-form class="popup-2">
        <van-field class="popup-3" v-if="myStatus === '1'" v-model="textInfo" name="validator" border clearable rows="2" type="textarea" placeholder="请输入拒绝理由" :rules="[{ validator, message: '请输入拒绝理由，不能输入表情' }]" />
        <van-field class="popup-3" v-model="textInfo" v-if="myStatus === '2' || myStatus === '3'" name="validator" border clearable rows="2" type="textarea" placeholder="请输入退款理由" :rules="[{ validator, message: '请输入退款理由，不能输入表情' }]" />
      </van-form>
      <div class="foot-btn">
        <div class="btn-le" @click="isPopup = false">取消</div>
        <div class="btn-ri" @click="commitOrders(myStatus)">确定</div>
        <div style="clear:both"></div>
      </div>
    </van-popup>
    <!-- 接单弹窗 -->
    <van-popup v-model="isPopups" class="popup-noprize">
      <div class="popup-1" v-if="myStatus === '1'">确定要接单吗？</div>
      <div class="popup-1" v-if="myStatus === '2'">确定已租赁吗？</div>
      <div class="popup-1" v-if="myStatus === '3'">订单确定已归还？</div>
      <div class="foot-btn">
        <div class="btn-le" @click="isPopups = false">取消</div>
        <div class="btn-ri" @click="commitOrderOk(myStatus)">确定</div>
        <div style="clear:both"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import searchClick from './components/search'
import { 
  getFacility,
  SupermarketDetail,
  SupermarketReceive,
  SupermarketComplete,
  SupermarketCancel,
  getRentOrderCancel,
  getRentPay,
  getRentPayOperate,
  getRentOrderOperate } from '@/api/supermarket.js'
export default {
  components: {
    searchClick
  },
  data() {
    return {
      value: '',
      activeName: 'a',
      isPopups: false,
      isActions: true, // 待接单状态
      isActionsDps: false, // 待配送状态
      isActionsYwc: false, // 已完成状态
      isActionsYqx: false, // 已取消状态
      isActionsYtk: false, // 已退款状态
      isshow: true, // 查看显示状态
      isactionShow: false,
      orderIDParamss: '',
      isPopup: false, // 拒绝订单弹窗
      textInfo: '',
      myStatus: '1', // 订单的状态显示不同的按钮
      list: [],
      loading: false,
      finished: false,
      pageList: {
        Page: 1,
        Limit: 100,
        m_status: "",
        Search: ''
      },
      // 各类订单数量
      orderCounts: {
        cancel: '0',  //取消
        wait: '0',    //待接单
        done: '0',    //已完成
        paying: '0',    //付款中
        payover: '0'  //已付款
      },
      OrderIDParams: '', // 拒绝订单ID
    }
  },
  mounted() {
    console.log('页面已加载')
  },
  created() {
    this.getList(0)
  },
  methods: {
    async getList(params) {
      console.log('params',params);
      const getConven = await getFacility({
        Page: 1,
        Limit: 100,
        mStatus: params,
        Search: ''
      })
      console.log('getConven',getConven);
      if(getConven.code == 0) {
        const resData = getConven.data.count
        this.list = getConven.data.list
        // 各类单子状态的数量
        this.orderCounts.cancel = resData.cancel  //取消
        this.orderCounts.wait = resData.wait  //待接单
        this.orderCounts.done = resData.done  //已租赁
        this.orderCounts.paying = resData.paying  //处理完成
        this.orderCounts.payover = resData.payover  //已结单
      }
    },
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
    // 待接单
    clickDjd() {
      console.log('待结单')
      this.isActions = true
      this.isActionsDps = false
      this.isActionsYwc = false
      this.isActionsYqx = false
      this.isActionsYtk = false
      this.myStatus = '1'
      this.getList(0)
    },
    // 待付款
    clickDps() {
      console.log('待付款')
      this.isActions = false
      this.isActionsDps = true
      this.isActionsYwc = false
      this.isActionsYqx = false
      this.isActionsYtk = false
      this.myStatus = '2'
      this.getList(10)
    },
    // 已付款
    clickYwc() {
      console.log('已付款')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = true
      this.isActionsYqx = false
      this.isActionsYtk = false
      this.myStatus = '3'
      this.getList(20)
    },
    // 已使用
    clickYqx() {
      console.log('已使用')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = false
      this.isActionsYqx = true
      this.isActionsYtk = false
      this.myStatus = '4'
      this.getList(1)
    },
    // 已取消
    clickYtk() {
      console.log('已取消')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = false
      this.isActionsYqx = false
      this.isActionsYtk = true
      this.myStatus = '5'
      this.getList(-1)
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
      this.isPopups = true
      this.orderIDParamss = params
    },
    // 租赁
    async getComplete(params) {
      console.log('租赁', params)
      this.isPopups = true
      this.orderIDParamss = params
      // const getConven = await SupermarketComplete({
      //   OrderID: params,
      // })
      // console.log("getConven",getConven);
      // if (getConven.code == 0) {
      //   this.$toast("订单已完成")
      //   this.getList(5)
      // }
    },
    // 租赁状态修改
    getCompletes(params) {
      this.isPopups = true
      this.orderIDParamss = params
    }, 
      // 接单提交
    async commitOrderOk(params) {
      if (params == 1) {
        const getConven = await getRentPay({
          OrderID: this.orderIDParamss,
          ReceiveOrderStatus: 2
        })
        if (getConven.code == 0) {
          this.$toast("接单成功")
          this.isPopups = false
          this.getList(0)
        }else {
          this.isPopups = false
          this.$toast(getConven.msg)
        }
      } else if (params ==2) {
        const getConven = await getRentOrderOperate({
          OrderID: this.orderIDParamss,
          OperatePayStatus: 2
        })
        if (getConven.code == 0) {
          this.isPopups = false
          this.$toast("订单已付款")
          this.getList(10)
        }else {
          this.isPopups = false
          this.$toast(getConven.msg)
        }
      } else if (params == 3) {
        const getConven = await getRentPayOperate({
          OrderID: this.orderIDParamss,
          OperateOrderStatus: 1
        })
        if (getConven.code == 0) {
          this.isPopups = false
          this.$toast("订单已完成")
          this.getList(20)
        }else {
          this.isPopups = false
          this.$toast(getConven.msg)
        }
      }
    },
    // 点击拒绝
    async isSorry(params) {
      console.log('拒绝', params)
      this.isPopup = true
      this.OrderIDParams = params
    },
    // 点击取消
    isSorrySe(params) {
      this.isPopup = true
      this.OrderIDParams = params
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
      // 参数为2和3时，发送退款请求   为1是发送拒绝请求
      if (params == 1) {
        const getConven = await getRentOrderCancel({
          OrderID: this.OrderIDParams,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo
        })
        console.log("getConven",getConven);
        if (getConven.code == 0) {
          this.$toast("订单已拒绝")
          this.isPopup = false
          this.textInfo = ''
          this.getList(0)
        }
      }else if (params == 2) {
        const getConven = await getRentOrderCancel({
          OrderID: this.OrderIDParams,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo
        })
        console.log("getConven",getConven);
        if (getConven.code == 0) {
          this.$toast("订单已取消")
          this.isPopup = false
          this.textInfo = ''
          this.getList(3)
        }
      }else if (params == 3) {
        const getConven = await getRentOrderCancel({
          OrderID: this.OrderIDParams,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo
        })
        console.log("getConven",getConven);
        if (getConven.code == 0) {
          this.$toast("订单已取消")
          this.isPopup = false
          this.textInfo = ''
          this.getList(1)
        }
      }
    },
    // 点击进入详情
    clickDetails(params) {
      console.log('详情',params,this.$route.query.belongParams)
      this.$router.push({
        path: '/facilityOrderDetail',
        query: {
          paramsName: this.myStatus,
          OrderID: params,
          BelongModule: this.$route.query.belongParams
        }
      })
    },
    // 点击退款
    async isSorrys(params) {
      this.OrderIDParams = params
      console.log("params",params);
      this.isPopup = true
    },
    onLoad() {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
