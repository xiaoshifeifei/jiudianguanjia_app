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
        <span class="span-1" :class="{ actions : isActions}">待发货</span>
        <span class="span-2" :class="{ actions1 : isActions}">{{orderCounts.confirm}}</span>
      </div>
      <div class="div-2" @click="clickDps">
        <span class="span-1" :class="{ actions : isActionsDps}">待收货</span>
        <span class="span-2" :class="{ actions1 : isActionsDps}">{{orderCounts.reveive}}</span>
      </div>
      <div class="div-3" @click="clickYwc">
        <span class="span-1" :class="{ actions : isActionsYwc}">已完成</span>
        <span class="span-2" :class="{ actions1 : isActionsYwc}">{{orderCounts.over}}</span>
      </div>
      <div class="div-4" @click="clickYqx">
        <span class="span-1" :class="{ actions : isActionsYqx}">已取消</span>
        <span class="span-2" :class="{ actions1 : isActionsYqx}">{{orderCounts.cancel}}</span>
      </div>
      <div class="div-5" @click="clickYtk">
        <span class="span-1" :class="{ actions : isActionsYtk}">已退款</span>
        <span class="span-2" :class="{ actions1 : isActionsYtk}">{{orderCounts.refund}}</span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-1"  v-for="(item,index) in list" :key="index">
      <!-- 头部 -->
      <div class="content-2" @click.stop="clickDetails(item.OrderID)" >
        <div class="content-3">
          <div class="item-content1">房号:<span>{{item.RoomNumber}}</span></div>
          <div class="item-content2" v-if="myStatus === '1'">待发货</div>
          <div class="item-content2" v-if="myStatus === '2'">待收货</div>
          <div class="item-content2" v-if="myStatus === '3'">已完成</div>
          <div class="item-content2" v-if="myStatus === '4'">已取消</div>
          <div class="item-content2" v-if="myStatus === '5'">已退款</div>
        </div>
        <div class="content-4">
          <div class="item-content1"><span v-if="item.NickName">{{item.NickName}}/</span><span>1325413</span></div>
          <div class="item-content2">{{item.CreateDate}}</div>
        </div>
      </div>
      <!-- 商品区域 -->
      <div class="contentshop">
        <div class="contentshop-he" :class="{actionShow : isactionShow}" >
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          
          >
            <van-cell>
              <div v-for="(item1,index1) in item.order_detail" :key="index1" class="contentshopAll">
                <div class="contentshop-l">
                  <!-- <img :src="item.url" alt=""> -->
                  <img style="width:100%" class="img-goods" :src="item1.GoodsCoverUrl" alt="">
                </div>
                <div class="contentshop-z">
                  <!-- {{item.textContent}} -->
                  <div class="contentshop-1">
                      <span class="contentshoptext">{{item1.GoodsName}}</span>
                  </div>
                  <div class="contentshop-2">
                    ￥{{item1.Price}}
                  </div>
                  <div class="contentshop-r">
                    * {{item1.GoodsCount}}
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
            <span>{{item.OrderSerialNo}}</span>
          </div>
          <div class="order-3">
            <span>备注: </span>
            <span>{{item.remark}}</span>
          </div>
        </div>
        <div class="payment">
          <span class="span-men">共 <span class="span-men0">{{item.order_detail.length}}</span> 件 </span>
          <span class="span-men1"> 实付 </span>
          <span class="span-men2">￥</span>
          <span class="span-men3">{{item.ActuallyPay}}</span>
        </div>
        <div class="foot-btn">
          <!-- 待结单状态 item.OrderID-->
          <!-- <div class="foot-ri" @click="getOrders(item.OrderID)" v-if="myStatus === '1'">
            接单
          </div>
          <div class="foot-le" @click="isSorry(item.OrderID)" v-if="myStatus === '1'">
            拒绝
          </div> -->
          <!-- 带配送状态
          <div class="foot-ri" @click="getComplete(item.OrderID)" v-if="myStatus === '2'">
            完成
          </div>
          <div class="foot-le" @click="isSorry('2')" v-if="myStatus === '2'">
            退款
          </div>
          已完成状态
          <div class="foot-ri" @click="isSorry('3')" v-if="myStatus === '3'">
            退款
          </div> -->
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <!-- 二维码 -->
    <van-popup v-model="isPopup" class="popup-noprize">
      <div class="popup-1" v-if="myStatus === '1'">确定要拒绝接单吗？</div>
      <div class="popup-1" v-if="myStatus === '2' || myStatus === '3'">确定要退款吗？</div>
      <van-form class="popup-2">
        <van-field class="popup-3" v-model="textInfo" name="validator" border clearable rows="2" type="textarea" placeholder="请输入拒绝理由" :rules="[{ validator, message: '请输入拒绝理由，不能输入表情' }]" />
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
// import searchClick from './components/search'
import { 
  getlocalSpecialty,
  SupermarketDetail,
  SupermarketOrder,
  SuperSexToy,
  SupermarketNOSex } from '@/api/supermarket.js'
export default {
  // components: {
  //   searchClick
  // },
  data() {
    return {
      value: '',
      activeName: 'a',
      isActions: true, // 待接单状态
      isActionsDps: false, // 待配送状态
      isActionsYwc: false, // 已完成状态
      isActionsYqx: false, // 已取消状态
      isActionsYtk: false, // 已退款状态
      isshow: true, // 查看显示状态
      isactionShow: false,
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
        confirm: '0',
        reveive: '0',
        cancel: '0',
        over: '0',
        refund: '0'
      },
      OrderIDParams: '', // 拒绝订单ID
    }
  },
  mounted() {
    console.log('页面已加载')
  },
  created() {
    this.getList("")
  },
  methods: {
    async getList(params) {
      if (params == "" ) {
        params = 1
      }
      console.log('2222222',params);
      const getConven = await getlocalSpecialty({
        Page: 1,
        Limit: 100,
        m_status: params,
        Search: ''
      })
      console.log('getConven22',getConven);
      if(getConven.code == 0) {
        const resData = getConven.data.orderCount
        this.list = getConven.data.list
        // 各类单子状态的数量
        this.orderCounts.confirm = resData.confirm
        this.orderCounts.reveive = resData.reveive
        this.orderCounts.cancel = resData.cancel
        this.orderCounts.over = resData.over
        this.orderCounts.refund = resData.refund
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
      this.getList(1)
    },
    // 待配送
    clickDps() {
      console.log('待配送')
      this.isActions = false
      this.isActionsDps = true
      this.isActionsYwc = false
      this.isActionsYqx = false
      this.isActionsYtk = false
      this.myStatus = '2'
      this.getList(5)
    },
    // 已完成
    clickYwc() {
      console.log('已完成')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = true
      this.isActionsYqx = false
      this.isActionsYtk = false
      this.myStatus = '3'
      this.getList(3)
    },
    // 已取消
    clickYqx() {
      console.log('已取消')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = false
      this.isActionsYqx = true
      this.isActionsYtk = false
      this.myStatus = '4'
      this.getList(-1)
    },
    // 已退款
    clickYtk() {
      console.log('已退款')
      this.isActions = false
      this.isActionsDps = false
      this.isActionsYwc = false
      this.isActionsYqx = false
      this.isActionsYtk = true
      this.myStatus = '5'
      this.getList(4)
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
      console.log('接单', params)
      const getConven = await SupermarketOrder({
        OrderID: params,
        ReceiveOrderStatus: 5
      })
      console.log("getConven",getConven);
      if (getConven.code == 0) {
        this.$toast("接单成功")
        this.getList("")
      }
    },
    // 点击完成
    async getComplete(params) {
      console.log('完成', params)
      const getConven = await SuperSexToy({
        OrderID: params,
      })
      console.log("getConven",getConven);
      if (getConven.code == 0) {
        this.$toast("订单已完成")
        this.getList(5)
      }
    },
    // 点击拒绝
    async isSorry(params) {
      console.log('拒绝', params)
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

      const getConven = await SupermarketNOSex({
        OrderID: this.OrderIDParams,
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
    // 点击进入详情
    clickDetails(params) {
      console.log('详情',this.$route.query.belongParams)
      this.$router.push({
        path: '/localSpecialtyDetail',
        query: {
          paramsName: this.myStatus,
          OrderID: params,
          BelongModule: this.$route.query.belongParams
        }
      })
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
