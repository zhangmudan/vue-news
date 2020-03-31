<template>
  <div>
    <Navigate title="栏目管理" />
    <div class="del">
      <p>点击删除以下频道</p>
      <div class="channel">
        <div>推荐</div>
        <div>热点</div>
        <div>娱乐</div>
        <div>科技</div>
      </div>
      <div class="channel">
        <div>推荐</div>
        <div>热点</div>
        <div>娱乐</div>
        <div>科技</div>
      </div>
    </div>
  </div>
</template>

<script>
//引入组件1
import Navigate from "@/components/Navigate";
export default {
  components: {
    Navigate
  }
};
</script>

<style lang='less' scoped>
.del {
  margin: 0 20/360 * 100vw;
  p {
    font-size: 14/360 * 100vw;
    color: #666;
    margin: 15/360 * 100vw 0;
  }
  .channel {
    display: flex;
    justify-content: space-between;
    div {
      width: 65/360 * 100vw;
      height: 35/360 * 100vw;
      line-height: 35/360 * 100vw;
      text-align: center;
      border: 1px solid #ccc;
      margin-bottom: 15/360 * 100vw;
    }
  }
}
</style>