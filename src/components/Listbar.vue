<template>
  <div class="listbar">
    <router-link to="#">
      <span>{{label}}</span>
      <span class="right">
        {{tips}}
        <i class="iconfont iconjiantou1"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  //声明可接收数据
  props: ["label", "tips"]
};
</script>

<style lang='less' scoped>
.listbar {
  margin-left: 20/360 * 100vw;
  a {
    display: flex;
    justify-content: space-between;
    height: 50/360 * 100vw;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
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