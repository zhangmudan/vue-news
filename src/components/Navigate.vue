<template>
  <!-- 导航 -->
  <div class="nav">
    <!-- 因为template标签都是包含着this这个对象中, $router.back() 就如调用data中的数据不需要使用this一样 -->
    <span class="iconfont iconjiantou2" @click="$router.replace('/')" v-if="isShow"></span>
    <span class="iconfont iconjiantou2" @click="$router.back()" v-else></span>
    <strong>{{title}}</strong>
    <span class="iconfont iconshouye" @click="$router.push('/')" v-if="isShow"></span>
    <!-- v-else 指令必须接着v-if后面使用 -->
    <span v-else></span>
  </div>
</template>

<script>
export default {
  props: ["title", "isShow"]
};
</script>

<style lang='less' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 15/360 * 100vw;
  span {
    font-size: 20/360 * 100vw;
  }
  strong {
    font-size: 16/360 * 100vw;
  }
}
</style>