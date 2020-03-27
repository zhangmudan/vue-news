<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>编辑资料</strong>
      <span></span>
    </div>
    <!-- 头部 -->
    <div class="header">
      <div class="img">
        <!-- 渲染头像时因为来自后台所以要加上后台地址 -->
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
      </div>
    </div>
    <!-- 列表 -->
    <!-- :key 不是报错,可以不加,但是vue希望给循环指定唯一的key ,所以推荐加上 -->
    <Listbar
      v-for="(item, index) in listbar"
      :key="index"
      :label="item.label"
      :tips="item.tips"
    />
  </div>
</template>

<script>
//导入列表组件
import Listbar from "@/components/Listbar";
export default {
  data() {
    return {
      listbar: [
        { label: "昵称", tips: "火星网友" },
        { label: "密码", tips: "******" },
        { label: "性别", tips: "男" }
      ]
    };
  },
  components: {
    Listbar
  }
};
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
.header {
  display: flex;
  justify-content: center;
  padding: 30/360 * 100vw 20/360 * 100vw;
  .img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
