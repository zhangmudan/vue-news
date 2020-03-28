<template>
  <div>
    <!-- 导航 -->
    <Navigate title="我的关注" />
    <div class="list">
      <div class="left">
        <div class="img">
          <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt />
        </div>
        <div class="content">
          <p>火星新闻报</p>
          <p>2019-10-10</p>
        </div>
      </div>
      <div class="right">取消关注</div>
    </div>
  </div>
</template>

<script>
//头部组件
import Navigate from "@/components/Navigate";
export default {
  components: { Navigate }
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10/360 * 100vw;
  border-bottom: 1px solid #d7d7d7;
  padding: 20/360 * 100vw;
  .left {
    display: flex;

    .img {
      width: 40/360 * 100vw;
      height: 40/360 * 100vw;
      margin: 0 15/360 * 100vw;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    width: 75/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: #e1e1e1;
    text-align: center;
    line-height: 30/360 * 100vw;
    border-radius: 15/360 * 100vw;
    font-size: 14/360 * 100vw;
  }
}
</style>
