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

    <!-- tab栏切换 -->
    <!-- v-model 当前索引值 是唯一的 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-list v-model="loading" :finished="finished" finished-text="我也是有底线的" @load="onLoad">
        <van-tab v-for="(item,index) in simulation" :key="index" :title="item">
          <div>
            <p>
              <Exhibition1 v-for="(item,index) in each" :key="index" />
              <!-- <Exhibition2 /> -->
              <!-- <Exhibition3 /> -->
            </p>
          </div>
        </van-tab>
      </van-list>
    </van-tabs>
  </div>
</template>

<script>
//引入组件1
import Exhibition1 from "@/components/Exhibition1";
//引入组件2
// import Exhibition2 from "@/components/Exhibition2";
//引入组件3
// import Exhibition3 from "@/components/Exhibition3";
export default {
  data() {
    return {
      simulation: [
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "∨"
      ],
      each: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //绑定当前选中标签的标识符
      active: 0,
      loading: false,
      finished: false
    };
  },
  watch: {
    //监听标签的索引
    active() {
      if (this.active === this.simulation.length - 1) {
        this.$router.push("/column");
      }
    }
  },
  // 注册组件
  components: {
    Exhibition1
    // Exhibition2,
    // Exhibition3
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.each.push(1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.each.length >= 20) {
          this.finished = true;
        }
      }, 1500);
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
// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background-color: #e4e4e4;
}
/deep/ .van-tab {
  //因为是行内的所以用!important覆盖
  flex-basis: 15% !important;
}
/deep/ .van-tab:nth-last-child(2) {
  width: 20/360 * 100vw !important;
  background-color: #e4e4e4;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}
/deep/ .van-tabs__wrap {
  padding-right: 30/360 * 100vw;
}
/deep/ .van-tabs__nav {
  position: static;
}
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  border-bottom: 2px solid #ff0000;
}
</style>