<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>我的关注</strong>
      <span></span>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 20/360 * 100vw;
  span {
    font-size: 20/360 * 100vw;
  }
}
</style>
