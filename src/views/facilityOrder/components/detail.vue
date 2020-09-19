<template>
  <div class="mains">
    <!-- 内容区域 -->
    <div class="content-1">
      <!-- 头部 -->
      <div class="content-2">
        <div class="mycontent" v-if="statusParams == 1">待接单</div>
        <div class="mycontent" v-if="statusParams == 2">待付款</div>
        <div class="mycontent" v-if="statusParams == 3">已付款</div>
        <div class="mycontent" v-if="statusParams == 4">已使用</div>
        <div class="mycontent" v-if="statusParams == 5">已取消</div>
        <div class="content-3">
          <!-- {{item.RoomNumber}} -->
          <div class="item-content1">
            房号:<span>{{ listParams.RoomNumber }}</span>
          </div>
          <div class="item-content2">{{ listParams.CreateDate }}</div>
        </div>
        <div class="content-4">
          <div class="item-content1">
            {{ listParams.UserName }}<span v-if="listParams.UserName && listParams.UserTel">/</span
            >{{ listParams.UserTel }}
          </div>
        </div>
      </div>
      <!-- 商品区域 -->
      <div class="contentshop">
        <div class="zInfo">设施预定信息</div>
        <div class="zInfo-1">
          <div class="zInfo-left">
            <img :src="listParams.CoverImgUrl" alt="" />
            <!-- 图片位置 -->
          </div>
          <div class="zInfo-right">
            <div class="zInfo-right1">
              <span class="zInfo-span">{{ listParams.GoodsName }}</span>
            </div>
            <div class="zInfo-right2">
              <span class="zInfo-right3">￥</span>
              <span class="zInfo-right4"
                ><span>{{ listParams.Price }}</span
                >/天</span
              >
            </div>
          </div>
        </div>
        <div class="order-1">
          <div class="order-4">
            <span>预定时间: </span>
            <span>{{ listParams.BookDate }}</span>
          </div>
          <div class="order-5">
            <span>合计金额: </span>
            <span>
              <span class="order-7">￥</span><span class="order-6">{{ listParams.TotalPrice }}</span></span
            >
          </div>
          <div class="order-2">
            <span>订单编号: </span>
            <span>{{ listParams.OrderSerialNo }}</span>
          </div>
          <div class="order-3">
            <span>备注: </span>
            <span>{{ listParams.remark }}</span>
          </div>
          <div class="order-4" v-if="statusParams === '5'">
            <span>取消备注: </span>
            <span>{{ listParams.remark }}</span>
          </div>
        </div>
        <div class="comitTime">
          <div class="comitTime-t"></div>
          <div class="comitTime-1">提交时间</div>
          <div class="comitTime-2">{{ listParams.CreateDate }}</div>
          <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">
            接单时间
          </div>
          <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">
            {{ listParams.UpdateDate }}
          </div>
          <div class="comitTime-1" v-if="statusParams === '3' || statusParams === '4'">
            付款时间
          </div>
          <div class="comitTime-2" v-if="statusParams === '3' || statusParams === '4'">
            {{ listParams.UpdateDate }}
          </div>
          <div class="comitTime-1" v-if="statusParams === '5'">取消时间</div>
          <div class="comitTime-2" v-if="statusParams === '5'">{{ listParams.CancelDate }}</div>
          <div
            class="comitTime-1"
            v-if="statusParams === '2' || statusParams === '3' || statusParams === '4' || statusParams === '5'"
          >
            操作人
          </div>
          <div
            class="comitTime-2"
            v-if="statusParams === '2' || statusParams === '3' || statusParams === '4' || statusParams === '5'"
          >
            {{ listParams.OperatorName }}
          </div>
          <div class="comitTime-b"></div>
        </div>
        <div class="foot-btn">
          <div class="foot-le" @click="isSorry" v-if="statusParams === '1'">
            拒绝
          </div>
          <div class="foot-ri" @click="getOrders" v-if="statusParams === '1'">
            接单
          </div>
          <div class="foot-le" @click="isSorryWc" v-if="statusParams === '2'">
            取消
          </div>
          <div class="foot-ri" @click="getOrderss" v-if="statusParams === '2'">
            付款
          </div>
          <div class="foot-le" @click="isSorryWc" v-if="statusParams === '3'">
            取消
          </div>
          <div class="foot-ri" @click="getOrderGh" v-if="statusParams === '3'">
            已使用
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <van-popup v-model="isPopup" class="popup-noprize">
      <div class="popup-1">确定要拒绝接单吗？</div>
      <van-form class="popup-2">
        <van-field
          class="popup-3"
          v-model="textInfo"
          name="validator"
          border
          clearable
          rows="2"
          type="textarea"
          placeholder="请输入拒绝理由"
          :rules="[{ validator, message: '请输入拒绝理由，不能输入表情' }]"
        />
      </van-form>
      <div class="foot-btn">
        <div class="btn-le" @click="isPopup = false">取消</div>
        <div class="btn-ri" @click="commitOrders(statusParams)">确定</div>
        <div style="clear:both"></div>
      </div>
    </van-popup>
    <!-- 接单弹窗 -->
    <van-popup v-model="isPopups" class="popup-noprize">
      <div class="popup-1" v-if="statusParams === '1'">确定要接单吗？</div>
      <div class="popup-1" v-if="statusParams === '2'">确定已付款吗？</div>
      <div class="popup-1" v-if="statusParams === '3'">订单确定已归还？</div>
      <div class="foot-btn">
        <div class="btn-le" @click="isPopups = false">取消</div>
        <div class="btn-ri" @click="commitOrderOk(statusParams)">确定</div>
        <div style="clear:both"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getFacilityShow,
  SupermarketComplete,
  SupermarketOrder,
  SupermarketCancel,
  SupermarketReceive,
  getRentOrderCancel,
  getRentPay,
  getRentPayOperate,
  getRentOrderOperate
} from '@/api/supermarket.js'
export default {
  data() {
    return {
      orderIDParamss: '',
      isPopups: false,
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
        OrderStatus: '',
        ActuallyPay: '',
        GoodsName: '',
        GoodsCoverUrl: '',
        GoodsCount: '',
        Price: '',
        remark: '',
        paramsName: '',
      },
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
    console.log('this.$route.query.BelongModule', this.$route.query.OrderID)
  },
  created() {
    this.getList()
    this.orderID = this.$route.query.OrderID
    this.BelongModule = this.$route.query.BelongModule
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      console.log('val', val)
      console.log(
        '/^([a-zA-Z]|[u4e00-u9fa5]|_)([a-zA-Z0-9]|[u4e00-u9fa5]|_)*$/',
        /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(
          val
        )
      )
      if (
        /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(
          val
        ) == false
      ) {
        return true
      } else {
        return false
      }
    },
    async getList() {
      this.orderID = this.$route.query.OrderID
      this.BelongModule = this.$route.query.BelongModule
      this.noShow = this.$route.query.BelongModule
      this.paramsName = this.$route.query.paramsName
      const getConven = await getFacilityShow({
        OrderID: this.orderID,
        mStatus: this.paramsName,
      })
      console.log('getConven', getConven)
      if (getConven.code == 0) {
        const res = getConven.data
        this.listParams.RoomNumber = res.RoomNumber
        this.listParams.UserName = res.UserName
        this.listParams.UserTel = res.Tel
        this.listParams.remark = res.Remark
        this.listParams.OrderSerialNo = res.SerialNumber
        this.listParams.ActuallyPay = res.ActuallyPay

        this.listParams.RentTotalPrice = res.RentTotalPrice //合计金额
        this.listParams.RentEndDate = res.RentEndDate //归还时间
        this.listParams.GoodsName = res.FacilityName //租车名称
        this.listParams.RentPrice = res.RentPrice //租车价格
        this.listParams.RentBeginDate = res.RentBeginDate //租车日期
        this.listParams.CoverImgUrl = res.CoverUrl //租车图片



        this.listParams.BookDate = res.BookDate 
        this.listParams.TotalPrice = res.TotalPrice 
        this.listParams.Price = res.Price 
        
        


        

        // 时间
        this.listParams.CreateDate = res.CreateDate //提交时间
        this.listParams.UpdateDate = res.UpdateDate //接单时间
        this.listParams.SendDate = res.SendDate //发货时间
        this.listParams.CompleteDate = res.CompleteDate //完成时间
        this.listParams.CancelDate = res.CancelDate //取消时间
        this.listParams.OperatorName = res.OperatorName //操作人

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
      this.isPopups = true
      this.orderIDParamss = params
    },
    // 归还
    getOrderGh() {
       this.isPopups = true
    },
    // 付款
    getOrderss(params) {
      console.log('租赁', params)
      this.isPopups = true
      this.orderIDParamss = params
    },
    // 付款状态修改
    getCompletes(params) {
      this.isPopups = true
      this.orderIDParamss = params
    },
    // 接单提交
    async commitOrderOk(params) {
      console.log(params,111);
      this.orderID = this.$route.query.OrderID
      if (params == 1) {
        const getConven = await getRentPay({
          OrderID: this.orderID,
          ReceiveOrderStatus: 2,
        })
        if (getConven.code == 0) {
          this.$toast('接单成功')
          this.isPopups = false
          this.getList(0)
        }
      } else if (params == 2) {
        const getConven = await getRentOrderOperate({
          OrderID: this.orderID,
          OperatePayStatus: 2,
        })
        if (getConven.code == 0) {
          this.isPopups = false
          this.$toast('订单已付款')
          this.getList(10)
        }
      } else if (params == 3) {
        const getConven = await getRentPayOperate({
          OrderID: this.orderID,
          OperateOrderStatus: 1,
        })
        if (getConven.code == 0) {
          this.isPopups = false
          this.$toast('订单已使用')
          this.getList(20)
        }
      }
    },
    // 点击拒绝
    async isSorry() {
      this.isPopup = true
    },
    // 点击取消
    isSorryWc(params) {
      this.isPopup = true
    },
    // 拒绝确认按钮
    async commitOrders(params) {
      console.log(params,222);
      this.orderID = this.$route.query.OrderID
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
          OrderID: this.orderID,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo,
        })
        console.log('getConven', getConven)
        if (getConven.code == 0) {
          this.$toast('订单已拒绝')
          this.isPopup = false
          this.textInfo = ''
          this.getList(0)
        }
      } else if (params == 2) {
        const getConven = await getRentOrderCancel({
          OrderID: this.orderID,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo,
        })
        console.log('getConven', getConven)
        if (getConven.code == 0) {
          this.$toast('订单已取消')
          this.isPopup = false
          this.textInfo = ''
          this.getList(10)
        }
      } else if (params == 3) {
        const getConven = await getRentOrderCancel({
          OrderID: this.orderID,
          CancelOrderStatus: -1,
          CancelRemark: this.textInfo,
        })
        console.log('getConven', getConven)
        if (getConven.code == 0) {
          this.$toast('订单已取消')
          this.isPopup = false
          this.textInfo = ''
          this.getList(20)
        }
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
    },
  },
}
</script>

<style lang="less" scoped>
// @import url('./index.less');
.mains {
  background-color: #faf7fa;
  .content-1 {
    width: 100%;
    // height: 300px;
    background-color: #fff;
    // margin: 20px auto;
    border-radius: 10px;
    // padding: 10px 20px;
    .content-2 {
      width: 100%;
      // height: 100px;
      border-bottom: 1px solid #f8f6f8;
      .content-3 {
        width: 100%;
        // height: 50px;
        padding: 0 20px;
        .item-content1 {
          display: inline-block;
          width: 40%;
          height: 30px;
          line-height: 30px;
          text-align: left;
          font-size: 16px;
          font-weight: 700;
        }
        .item-content2 {
          display: inline-block;
          width: 60%;
          height: 30px;
          line-height: 30px;
          text-align: end;
          font-size: 13px;
        }
      }
      .content-4 {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        .item-content1 {
          display: inline-block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: left;
          font-size: 16px;
          font-weight: 700;
        }
        .item-content2 {
          display: inline-block;
          width: 42%;
          height: 30px;
          line-height: 30px;
          text-align: end;
          font-size: 12px;
        }
      }
      .mycontent {
        width: 100%;
        height: 50px;
        background-color: #f8f8f8;
        padding-left: 20px;
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
      }
    }
    .contentshop {
      width: 100%;
      .zInfo {
        font-size: 14px;
        font-weight: 700;
        padding: 10px 20px 0;
      }
      .zInfo-1 {
        margin-top: 10px;
        width: 100%;
        height: 60px;
        padding: 0 20px;
        .zInfo-left {
          display: inline-block;
          width: 60px;
          height: 100%;
          img {
            width: 100%;
          }
        }
        .zInfo-right {
          display: inline-block;
          width: calc(100% - 60px);
          height: 100%;
          vertical-align: top;
          .zInfo-right1 {
            width: 100%;
            height: 40px;
            padding: 0 6px;
            .zInfo-span {
              font-weight: 700;
              font-size: 14px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
            }
          }
          .zInfo-right2 {
            width: 100%;
            height: 20px;
            padding: 0 6px;
            .zInfo-right3 {
              color: #df4643;
              font-size: 12px;
              font-weight: 700;
            }
            .zInfo-right4 {
              color: #df4643;
              font-size: 14px;
              font-weight: 700;
            }
          }
        }
      }
      // height: 500px;
      .contentshop-he {
        width: 100%;
        height: 200px;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: auto;
        .contentshopAll {
          width: 100%;
          .contentshop-l {
            width: 100px;
            height: 100px;
            display: inline-block;
            vertical-align: bottom;
            padding: 10px;
            .img-goods {
              width: 80px;
              height: 80px;
            }
          }
          .contentshop-z {
            width: calc(100% - 100px);
            // height: 100px;
            display: inline-block;
            .contentshop-1 {
              display: inline-block;
              width: 70%;
              height: 50px;
              .contentshoptext {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .contentshop-2 {
              display: inline-block;
              width: 30%;
              height: 50px;
              vertical-align: top;
            }
          }
          .contentshop-r {
            width: 100%;
            height: 45px;
            vertical-align: top;
          }
        }
      }
      .actionShow {
        height: 100%;
      }
      .genx {
        margin-top: 10px;
        text-align: center;
        height: 30px;
        // background-color: skyblue;
        border-bottom: 1px solid #faf7fa;
        color: #b0adb0;
      }
      .contentshop-he::-webkit-scrollbar {
        display: none;
      }
      .order-1 {
        width: 100%;
        // height: 200px;
        padding: 10px 20px;
        .order-2 {
          font-size: 13px;
          color: #969396;
        }
        .order-3 {
          width: 100%;
          padding: 10px 0;
          color: #969396;
          border-bottom: 1px solid #faf7fa;
        }
        .order-4 {
          font-size: 13px;
          width: 100%;
          color: #969396;
          border-bottom: 1px solid #faf7fa;
        }
        .order-5 {
          font-size: 13px;
          width: 100%;
          padding: 10px 0;
          color: #969396;
          border-bottom: 1px solid #faf7fa;
          .order-7 {
            font-size: 13px;
            font-weight: 700;
            color: #df4643;
          }
          .order-6 {
            color: #df4643;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
      .payment {
        margin: 5px 0;
        font-size: 14px;
        width: 100%;
        height: 30px;
        text-align: end;
        padding: 0 20px;
        .span-men {
          // color: #000;
          .span-men0 {
            color: #e0514f;
          }
        }
        .span-men1 {
          padding-left: 15px;
        }
        .span-men2 {
          font-size: 12px;
          color: #e0514f;
        }
        .span-men3 {
          font-size: 16px;
          color: #e0514f;
          font-weight: 700;
        }
      }
      .foot-btn {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        .foot-le {
          background-color: #fff;
          display: inline-block;
          width: 50%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 15px;
          font-weight: 700;
        }
        .foot-ri {
          display: inline-block;
          width: 50%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #287bfe;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        .foot-rit {
          width: 100%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #287bfe;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
      }
      .comitTime {
        width: 100%;
        .comitTime-t {
          width: 100%;
          height: 10px;
          background-color: #faf7fa;
        }
        .comitTime-b {
          width: 100%;
          height: 20px;
          background-color: #faf7fa;
        }
        .comitTime-1 {
          vertical-align: top;
          height: 45px;
          width: 40%;
          display: inline-block;
          line-height: 45px;
          font-size: 16px;
          font-weight: 700;
          padding-left: 20px;
        }
        .comitTime-2 {
          height: 45px;
          width: 60%;
          display: inline-block;
          text-align: end;
          line-height: 45px;
          font-size: 14px;
          color: #b1afb1;
          padding-right: 20px;
        }
      }
    }
  }
  .popup-noprize {
    width: 80%;
    // height: 200px;
    border-radius: 10px;
    .popup-1 {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-weight: 700;
      font-size: 15px;
    }
    .popup-2 {
      width: 90%;
      margin: auto;
      background-color: #ccc;
      margin-bottom: 20px;
      border-radius: 10px;
      overflow: hidden;
      .popup-3 {
        padding: 10px;
      }
    }
    .foot-btn {
      width: 100%;
      border-top: 1px solid #f6f3f6;
      .btn-le {
        box-sizing: border-box;
        display: inline-block;
        width: 50%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
        color: #a3a1a4;
        border-right: 1px solid #f6f3f6;
      }
      .btn-ri {
        display: inline-block;
        width: 50%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
        color: #4c8df2;
      }
    }
  }
}
// .van-cell {
//   padding: 0 10px;
// }
</style>
