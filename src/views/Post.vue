<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="active">关注</div>
      </div>
    </div>
    <div class="main">
      <h3>
        车主注意啦！9月下旬部分临时泊位进行
        清洁保养
      </h3>
      <span>火星时报</span>
      <span>2019-10-10</span>
      <p>为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：</p>
      <div class="icon">
        <div class="iconzan">
          <i class="iconfont icondianzan"></i>
          <em>112</em>
        </div>
        <div class="iconwei">
          <i class="iconfont iconweixin"></i>
          <em>微信</em>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>精彩跟帖</p>
      <p>暂无跟帖,抢占沙发</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15/360 * 100vw;
  .left {
    display: flex;
    align-items: center;
    .iconnew {
      font-size: 54/360 * 100vw;
      margin: 0 3px;
    }
  }
  .right {
    width: 62/360 * 100vw;
    height: 26/360 * 100vw;
    line-height: 26/360 * 100vw;
    color: #fff;
    text-align: center;
    font-size: 12/360 * 100vw;
    border-radius: 13/360 * 100vw;
  }
}
.active {
  background-color: #ff0000;
  border-radius: 13/360 * 100vw;
}
.main {
  padding: 0 15/360 * 100vw;
  border-bottom: 5px solid #ddd;
  span {
    color: #aaa;
    font-size: 12/360 * 100vw;
    margin-right: 20/360 * 100vw;
  }
  p {
    margin: 20/360 * 100vw 0 30/360 * 100vw 0;
    font-size: 14/360 * 100vw;
    line-height: 28/360 * 100vw;
  }
  .icon {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20/360 * 100vw;
    .iconzan,
    .iconwei {
      width: 80/360 * 100vw;
      height: 28/360 * 100vw;
      line-height: 28/360 * 100vw;
      text-align: center;
      border: 1px solid #000;
      border-radius: 14/360 * 100vw;
      font-size: 12/360 * 100vw;
    }
    .icondianzan {
      margin-right: 8/360 * 100vw;
    }
    .iconweixin {
      color: #00d300;
      margin-right: 8/360 * 100vw;
    }
  }
}
</style>