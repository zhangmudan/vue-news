<template>
  <div class="w">
    <!-- 顶部 -->
    <div class="top"></div>
    <div class="middle">
      <i class="iconfont iconicon-test"></i>
      <i class="iconfont iconnew"></i>
      <input type="text" placeholder="用户名/手机号码" class="txt" />
      <input type="password" placeholder="密码" class="psd" />
      <button>登录</button>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.w {
  width: 10rem;
  height: 19.444444rem;
  .top {
    width: 10rem;
    height: 0.666667rem;
    background-color: #757575;
  }
  .middle {
    width: 10rem;
    height: 16.944444rem;
    background-color: #f2f2f2;
    position: relative;
    padding: 0 0.555556rem;
    .iconicon-test {
      font-size: 0.694444rem;
      color: #000;
      top: 0.694444rem;
    }

    .iconnew {
      position: absolute;
      font-size: 3.611111rem;
      color: #d81e06;
      left: 3.194444rem;
      top: 1.805556rem;
    }
    input {
      border: 0;
      border-bottom: 0.027778rem solid #757575;
      background-color: #f2f2f2;
      width: 8.833333rem;
      height: 1.666667rem;
      line-height: 1.166667rem;
      font-size: 0.472222rem;
    }
    .txt {
      position: absolute;
      left: 0.583333rem;
      top: 5.222222rem;
    }
    .psd {
      position: absolute;
      left: 0.583333rem;
      top: 6.888889rem;
    }
    button {
      position: absolute;
      top: 10rem;
      left: 0.583333rem;
      width: 8.888889rem;
      height: 1.388889rem;
      font-size: 0.5rem;
      border-radius: 0.694444rem;
      color: #f8e4dd;
      border: 0;
      background-color: #d81e06;
    }
  }
  .footer {
    width: 10rem;
    height: 1.333333rem;
    background-color: #000000;
  }
}
</style>