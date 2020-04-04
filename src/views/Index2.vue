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
      <van-tab v-for="(item,index) in simulation" :key="index" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 列表组件  @load 加载事件 immediate-check 这个属性可以阻止list组件默认就加载一次-->
          <van-list
            immediate-check
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div v-for="(subItem, subIndex) in item.post " :key="subIndex">
              <Exhibition1
                v-if="subItem.type===1&&subItem.cover.length > 0 && subItem.cover.length < 3"
                :data="subItem"
              />
              <Exhibition2 v-if="subItem.type===1&&subItem.cover.length > 2" :data="subItem" />
              <Exhibition3 v-if="subItem.type===2 " :data="subItem" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
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
      //存储本地token
      token: "",
      //栏目数据

      simulation: [],
      //文章数据
      // each: [],

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
    //获取本地token
    const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
    this.token = token;
    //获取本地数据
    const simulation = JSON.parse(localStorage.getItem("simulation"));
    //判断栏目数据
    if (simulation) {
      //登录了,但是第一条数据不是关注
      //未登录,但是第一条数据不是关注
      if (
        (token && simulation[0].name !== "关注") ||
        (!token && simulation[0].name === "关注")
      ) {
        this.getSimulation();
      } else {
        this.simulation = simulation;
        this.getPageindex();
        // console.log(this.simulation);
      }
    } else {
      this.getSimulation();
    }
  },
  methods: {
    //每个栏目都有自己的状态
    getPageindex() {
      //循环添加
      this.simulation = this.simulation.map(item => {
        item.pageIndex = 1;
        item.post = [];
        item.loading = false;
        item.finished = false;
        return item; //map方法里需要return
      });
    },
    //封装请求栏目接口
    getSimulation() {
      const config = {
        url: "/category"
      };
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        console.log(res);
        const { data } = res.data;
        //给数据添加∨
        data.push({ name: "∨" });
        this.simulation = data;

        //把数据存储到本地
        localStorage.setItem("simulation", JSON.stringify(data));
        this.getPageindex();
      });
    },
    //请求文章接口
    getList() {
      const { id, pageIndex, finished } = this.simulation[this.active];
      if (finished) return;
      //获取文章列表
      this.$axios({
        url: "/post",
        param: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      }).then(res => {
        console.log(res);
        const { data, total } = res.data;
        //合并请求数据
        this.simulation[this.active].post = [
          ...this.simulation[this.active].post,
          ...data
        ];

        // 加载状态结束
        this.simulation[this.active].loading = false;
        // 用赋值的方式触发页面刷新
        this.simulation = [...this.simulation];
        // 数据全部加载完成
        if (this.simulation[this.active].post.length === total) {
          this.simulation[this.active].finished = true;
        }
      });
    },
    //加载
    onLoad() {
      // 给当前栏目的页数加1
      this.simulation[this.active].pageIndex += 1;
      this.getList();
      console.log("已经拖动到了底部");
    },
    //下拉刷新
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