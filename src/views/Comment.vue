<template>
  <div>
    <!-- 头部 -->
    <Navigate title="我的跟帖" />
    <!-- 内容 -->
    <div class="content">
      <p class="time">2019-10-10 10:25</p>
      <p class="comment">啊信是张信哲吗？张信哲是不是的张学友弟弟？</p>
      <p class="originalText">
        原文：阿信分享《说好不哭》幕后故事：只听...
        <i class="iconfont iconjiantou1"></i>
      </p>
    </div>
  </div>
</template>

<script>
//引入头部组件
import Navigate from "@/components/Navigate";
export default {
  components: {
    Navigate
  }
};
</script>

<style lang='less' scoped>
.content {
  margin: 20/360 * 100vw;
}
</style>