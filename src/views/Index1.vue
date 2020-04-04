<template>
  <div>
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <router-link class="search" to="/search">
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
    <!-- v-model 当前索引值 是唯一的  sticky粘性布局 swipeable 是否开启手势滑动-->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- 列表组件  @load 加载事件 immediate-check 这个属性可以阻止list组件默认就加载一次-->
        <van-list
          v-model="simulation[active].loading"
          :finished="simulation[active].finished"
          finished-text="我也是有底线的"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-tab v-for="(item,index) in simulation" :key="index" :title="item.name">
            <div v-for="(item, index) in simulation[active].posts " :key="index">
              <Exhibition1
                v-if="item.type===1&&item.cover.length > 0 && item.cover.length < 3"
                :data="item"
              />
              <Exhibition2 v-if="item.type===1&&item.cover.length > 2" :data="item" />
              <Exhibition3 v-if="item.type===2 " :data="item" />
            </div>
          </van-tab>
        </van-list>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
//引入组件1
import Exhibition1 from "@/components/Exhibition1";
//引入组件2
import Exhibition2 from "@/components/Exhibition2";
//引入组件3
import Exhibition3 from "@/components/Exhibition3";
export default {
  data() {
    return {
      //栏目数据
      simulation: [],
      // 记录当前的栏目的id
      categoryId: 999,
      // each: [],//文章数据
      userInfor: {}, //本地数据
      //绑定当前选中标签的标识符
      active: 0,
      // loading: false, // 是否正在加载中
      // finished: false, // 是否已加载完成，
      refreshing: false // 是否正在下拉加载
    };
  },
  watch: {
    //监听标签的索引
    active() {
      if (this.active === this.simulation.length - 1) {
        this.$router.push("/column");
        return;
      }
      //请求不同栏目文章
      this.getList();
    }
  },
  // 注册组件
  components: {
    Exhibition1,
    Exhibition2,
    Exhibition3
  },
  mounted() {
    //获取本地数据
    let simulation = JSON.parse(localStorage.getItem("simulation"));
    //获取本地数据token 如果没有值就等于一个对象
    let userInfor = JSON.parse(localStorage.getItem("userInfor")) || {};

    this.userInfor = userInfor;
    //再次进入页面本地数据存在情况
    if (simulation) {
      //登录了但第一条数据不是关注
      //没有登录或退出登录但第一条数据是关注
      if (
        (simulation[0].name !== "关注" && userInfor.token) ||
        (simulation[0].name === "关注" && !userInfor.token)
      ) {
        this.getSimulation();
      } else {
        this.simulation = simulation;
        //给数据加上pageIndex=1
        this.getPageindex();
        // console.log(this.simulation);
      }
    } else {
      // 本地没有数据
      this.getSimulation();
    }
  },

  methods: {
    // 循环给栏目加上自己的状态
    getPageindex() {
      this.simulation = this.simulation.map(item => {
        item.pageIndex = 1;
        item.posts = [];
        item.loading = false;
        item.finished = false;
        return item;
      });
      //加载文章
      this.getList();
    },
    //请求栏目数据
    getSimulation() {
      //请求配置
      const config = { url: "/category" };
      if (this.userInfor.token) {
        config.headers = {
          Authorization: this.userInfor.token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        data.push({ name: "∨" });
        this.simulation = data;
        //把数据存到本地
        localStorage.setItem("simulation", JSON.stringify(data));
        // 给每个栏目都加上自己的状态
        this.getPageindex();
      });
    },
    //加载
    onLoad() {
      //加载下一页
      this.simulation[this.active].pageIndex += 1;
      //加载文章
      this.getList();
    },
    //封装加载文章函数
    getList() {
      const { pageIndex, id, finished } = this.simulation[this.active];
      //加载完毕后直接结束,不需要请求
      if (finished) return;

      // 从栏目数据中解构

      this.$axios({
        url: "/post",
        // params就是url问号后面的参数
        params: {
          pageIndex: pageIndex, //页数
          pageSize: 5, //数据条数
          category: id //数据id
        }
      }).then(res => {
        // console.log(res);
        //total 总条数
        const { data, total } = res.data;
        //// 把新的文章数据合并到原来的文章列表中
        // this.each = [...this.each, ...data];
        // 这里因为active也会导致页面更新
        this.simulation[this.active].posts = [
          ...this.simulation[this.active].posts,
          ...data
        ];
        // console.log(this.each);
        // 加载状态结束
        this.simulation[this.active].loading = false;
        // 赋值的方式页面才会更新
        this.simulation = [...this.simulation];
        //是否最后一页
        if (this.simulation[this.active].posts.length === total) {
          this.simulation[this.active].finished = true;
        }
      });
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("下拉完成");
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