<template>
  <div class="mains">
    <!-- 内容区域 -->
    <div class="content-1">
      <!-- 头部 -->
      <div class="content-2">
        <div class="mycontent" v-if="statusParams == 1">待审核</div>
        <div class="mycontent" v-if="statusParams == 2">已同意待平台审核</div>
        <div class="mycontent" v-if="statusParams == 3">已退款</div>
        <div class="mycontent" v-if="statusParams == 4">已拒绝</div>
        <!-- <div class="mycontent" v-if="statusParams == 5">已退款</div> -->
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
            <span>{{listParams.remark}}</span>
          </div>
          <!-- <div class="order-4">
            <span>拒绝备注: </span>
            <span>{{listParams.UserRemark}}</span>
          </div> -->
        </div>
        <div class="payment">
          <span class="span-men">共 <span class="span-men0">{{this.list.length}}</span> 件 </span>
          <span class="span-men1"> 退款 </span>
          <span class="span-men2">￥</span>
          <span class="span-men3">{{listParams.ActuallyPay}}</span>
        </div>
        <div class="comitTime">
          <div class="comitTime-t"></div>
          <div class="comitTime-1">提交时间</div>
          <div class="comitTime-2">{{listParams.CreateDate}}</div>
          <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">酒店审核</div>
          <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">{{listParams.RefundDate}}</div>
          <div class="comitTime-1" v-if="statusParams === '2'">完成时间</div>
          <div class="comitTime-2" v-if="statusParams === '2'">{{listParams.CompleteDate}}</div>
          <div class="comitTime-1" v-if="statusParams === '3' || statusParams === '4'">操作人</div>
          <div class="comitTime-2" v-if="statusParams === '3' || statusParams === '4'">{{listParams.UserName}}</div>
            <div class="comitTime-1" v-if="statusParams === '3' || statusParams === '4'">平台审核</div>
            <div class="comitTime-2" v-if="statusParams === '3' || statusParams === '4'">{{OperatorNameParams}}</div>
            <div class="comitTime-1" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">操作人</div>
            <div class="comitTime-2" v-if="statusParams === '2' || statusParams === '3' || statusParams === '4'">{{CreateDateParams}}</div>
          <div class="comitTime-b"></div>
        </div>
        <div class="foot-btn">
          <div class="foot-le" @click="isSorry" v-if="statusParams === '1'">
            拒绝
          </div>
          <div class="foot-ri" @click="getOrders" v-if="statusParams === '1'">
            同意
          </div>
          <!-- <div class="foot-le" @click="isSorryWc('2')" v-if="statusParams === '2' && noShow != 4">
            完成
          </div> -->
          <!-- 退款未完成 -->
          <!-- <div class="foot-ri" @click="getOrderss('2')" v-if="statusParams === '2' && noShow != 4">
            退款
          </div> -->
          <!-- <div class="foot-rit" @click="getOrdersss('3')" v-if="statusParams === '3' && noShow != 4">
            退款
          </div> -->
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
  SupermarketOrder,
  SupermarketCancel,
  SupermarketReceive,
  SuperSexToy,
  SupermarketNOSex,
  getRefundDetail } from '@/api/supermarket.js'
export default {
  data() {
    return {
      CreateDateParams:'',
      OperatorNameParams:'',
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
      const getConven = await getRefundDetail({
       OrderID: this.orderID,
       BelongModule: this.BelongModule
      })
      console.log('getConven',getConven);
      if(getConven.code == 0) {
        const res = getConven.data
        this.listParams.RoomNumber = res.RoomNumber
        this.listParams.RefundDate = res.RefundDate
        this.listParams.UserName = res.UserName
        this.listParams.UserTel = res.UserTel
        this.listParams.remark = res.remark
        this.listParams.OrderSerialNo = res.OrderSerialNo
        this.listParams.ActuallyPay = res.ActuallyPay
        this.listParams.RoomNumber = res.RoomNumber
        // 时间
        this.listParams.CreateDate = res.RefundDate  //提交时间
        this.listParams.ReceiveDate = res.ReceiveDate  //接单时间
        this.listParams.SendDate = res.SendDate  //发货时间
        this.listParams.CompleteDate = res.CompleteDate  //完成时间
        this.listParams.CancelDate = res.CancelDate  //取消时间
        this.listParams.OperatorName = res.OperatorName  //操作人
        this.listParams.UserRemark = res.UserRemark  //拒绝备注
        this.list = res.order_detail
        const daList = getConven.data.refundCheckRecord
        const list1 = daList[daList.length - 1]
        this.OperatorNameParams = list1.OperatorName
        this.CreateDateParams = list1.CreateDate
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

      const getConven = await SupermarketNOSex({
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
      const getConven = await SuperSexToy({
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
  // @import url('./index.less');
  .mains {
  background-color: #FAF7FA;
  height: 100%;
  position: relative;
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
      border-bottom: 1px solid #F8F6F8;
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
        background-color: #F8F8F8;
        padding-left: 20px;
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
      }
    }
    .contentshop {
      width: 100%;
      // height: 500px;
      .contentshop-he {
        width: 100%;
        height: 200px;
        overflow: hidden;
        overflow-x:hidden;
        overflow-y: auto;
        .contentshopAll {
          width: 100%;
          .contentshop-l {
            width: 100px;
            height: 100px;
            display: inline-block;
            vertical-align:bottom;
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
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
                overflow:hidden;
                text-overflow:ellipsis;
              }
            }
            .contentshop-2 {
              display: inline-block;
              width: 30%;
              height: 50px;
              vertical-align:top
            }
          }
           .contentshop-r {
            width: 100%;
            height: 45px;
            vertical-align:top
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
        border-bottom: 1px solid #FAF7FA;
        color: #B0ADB0;
      }
      .contentshop-he::-webkit-scrollbar {
      display: none;
      }
      .order-1 {
        width: 100%;
        // height: 200px;
        padding: 10px 20px;
        .order-2 {
          font-size: 15px;
          color: #969396;
        }
        .order-3 {
          width: 100%;
          padding: 20px 0;
          color: #969396;
          border-bottom:1px solid #FAF7FA;
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
            color: #E0514F;
          }
        }
        .span-men1 {
          padding-left: 15px;
        }
        .span-men2 {
          font-size: 12px;
          color: #E0514F;
        }
        .span-men3 {
          font-size: 16px;
          color: #E0514F;
          font-weight: 700;
        }
      }
      .foot-btn {
        width: 100%;
        position: fixed;
        bottom: 0;
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
          background-color: #287BFE;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        .foot-rit {
          width: 100%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #287BFE;
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
          background-color: #FAF7FA;
        }
        .comitTime-b {
          width: 100%;
          height: 60px;
          background-color: #FAF7FA;
        }
        .comitTime-1 {
          vertical-align:top;
          height: 45px;
          width: 40%;
          display: inline-block;
          line-height: 45px;
          font-size: 16px;
          font-weight: 700;
          padding-left:20px;
        }
        .comitTime-2 {
          height: 45px;
          width: 60%;
          display: inline-block;
          text-align: end;
          line-height: 45px;
          font-size: 14px;
          color: #B1AFB1;
          padding-right:20px;
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
      border-top: 1px solid #F6F3F6;
      .btn-le {
        box-sizing: border-box;
        display: inline-block;
        width: 50%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
        color: #A3A1A4;
        border-right: 1px solid #F6F3F6;
      }
      .btn-ri {
        display: inline-block;
        width: 50%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
        color: #4C8DF2;
      }
    }
  }
}
// .van-cell {
//   padding: 0 10px;
// }
</style>

