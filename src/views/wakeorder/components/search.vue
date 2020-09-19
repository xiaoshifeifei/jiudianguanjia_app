<template>
  <div class="mainss">
      <!-- 搜索部分 -->
      <div class="content-1">
        <div class="sous">
          <van-search v-model="value" placeholder="输入房号/楼层搜索" autofocus clearable class="sous-1" background="#F8F8F8"/>
        </div>
        <van-button type="info" class="btn-ss">搜索</van-button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    // year: {
    //   type:[String,Number],
    //   default: String
    // },
    // month:{
    //   type:[String, Number],
    //   default: String
    // }
  },
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    // console.log('页面已加载')
  },
  methods: {
    // console.log('页面已加载')
  }
}
</script>

<style lang="less" scoped>
.mainss {
  padding: 20px 20px 0 20px;
  background-color: #fff;
  .content-1 {
    width: 100%;
    height: 50px;
    .sous {
      display: inline-block;
      width: calc(100% - 110px);
      vertical-align:middle;
      border-radius: 25px;
      overflow: hidden;
      margin-right: 10px;
      vertical-align: top;
      .sous-1 {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
    .btn-ss {
      display: inline-block;
      width: 100px;
      height: 40px;
      border-radius: 25px;
      font-size: 16px;
    }
  }
}
</style>
