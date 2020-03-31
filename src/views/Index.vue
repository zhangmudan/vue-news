<template>
  <div>
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <router-link class="search" to="#">
        <div>
          <i class="iconfont iconsearch"></i>
          <span>搜索新闻</span>
        </div>
      </router-link>
      <router-link to="/personal">
        <i class="iconfont iconwode"></i>
      </router-link>
    </div>
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //绑定当前选中标签的标识符
      active: 0
    };
  },
  watch: {
    //监听标签的索引
    active() {
      // console.log(this.active);
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15/360 * 100vw;
  background-color: #ff0000;
  height: 50/360 * 100vw;
  color: #fff;
  .iconnew {
    font-size: 55/360 * 100vw;
  }
  .search {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36/360 * 100vw;
      width: 210/360 * 100vw;
      border-radius: 18/360 * 100vw;
      background-color: rgba(255, 255, 255, 0.5);
      font-size: 14/360 * 100vw;
      .iconsearch {
        font-size: 14/360 * 100vw;
      }
    }
  }
  .iconwode {
    font-size: 25/360 * 100vw;
  }
}
</style>