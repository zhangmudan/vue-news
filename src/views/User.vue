<template>
  <div>
    <div class="user">
      <div class="img">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
      </div>
      <div class="infor">
        <div>
          <i class="iconfont iconxingbienan"></i>
          <span>火星网友</span>
          <p>2019-10-10</p>
        </div>

        <div class="jiantou">
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </div>
    <div class="fenge"></div>
    <div class="content">
      <div>
        <span>我的关注</span>
        <span class="right">
          关注用户
          <i class="iconfont iconjiantou1"></i>
        </span>
      </div>
      <div>
        <span>我的跟帖</span>
        <span class="right">
          跟帖/回复
          <i class="iconfont iconjiantou1"></i>
        </span>
      </div>
      <div>
        <span>我的收藏</span>
        <span class="right">
          文章/视频
          <i class="iconfont iconjiantou1"></i>
        </span>
      </div>
      <div>
        <span>设置</span>
        <span class="right">
          <i class="iconfont iconjiantou1"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.user {
  margin: 30/360 * 100vw 20/360 * 100vw;
  display: flex;
  .img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .infor {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-left: 10/360 * 100vw;
    font-size: 15/360 * 100vw;
    .iconxingbienan {
      color: #70b6ea;
      font-size: 18/360 * 100vw;
      margin-right: 5/360 * 100vw;
    }
    p {
      color: #999;
      line-height: 26/360 * 100vw;
    }
  }
}
.fenge {
  height: 5/360 * 100vw;
  background-color: #e4e4e4;
}
.content {
  margin-left: 20/360 * 100vw;
  div {
    display: flex;
    justify-content: space-between;
    height: 50/360 * 100vw;
    align-items: center;
    border-bottom: 1/360 * 100vw solid #e4e4e4;
    font-size: 16/360 * 100vw;
    span.right {
      font-size: 15/360 * 100vw;
      color: #999;
      margin-right: 15/360 * 100vw;
    }
    .right .iconjiantou1 {
      font-size: 16/360 * 100vw;
    }
  }
}
</style>