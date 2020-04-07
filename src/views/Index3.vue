<template>
  <div>
    <!-- 红色的头部 -->
    <div class="header">
      <span class="iconfont iconnew"></span>
      <router-link to="/search" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>

    <!-- tab栏切换 -->
    <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
    <!-- sticky：是否使用粘性定位布局 -->
    <!-- swipeable: 是否开启手势滑动切换 -->
    <van-tabs v-model="active" sticky swipeable @scroll="getScrollY">
      <van-tab
        v-for="(item, index) in categories"
        :key="index"
        :title="item.name"
        v-if="item.is_top===1 || item.name==='∨'"
      >
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load 滚动到底部时候触发的函数 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
            :immediate-check="false"
          >
            <!-- 假设list是后台返回的数组，里有10个元素 -->
            <div v-for="(subItem, subIndex) in item.post" :key="subIndex">
              <!-- 只有单张图片的 -->
              <Exhibition1
                v-if="(subItem.type === 1 && subItem.cover.length>0||subItem.cover.length<3)"
                :data="subItem"
              />
              <Exhibition2 v-if="(subItem.type === 1 && subItem.cover.length>2)" :data="subItem" />
              <Exhibition3 v-if="(subItem.type === 2 )" :data="subItem" />
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
  //添加name值用于keep-alive中缓存
  name: "index",
  data() {
    return {
      categories: [], // 菜单的数据
      active: 0, // 记录当前tab的切换的索引
      //   list: [], // 后台返回的数据
      token: "", //存储本地token
      //   loading: false, // 是否正在加载中
      //   finished: false, // 是否已经加载完毕
      refreshing: false // 是否正在下拉加载
    };
  },
  //注册组件
  components: {
    Exhibition1,
    Exhibition2,
    Exhibition3
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      //过滤is_top=1的数据
      const arr = this.categories.filter(v => {
        return v.is_top === 1 || v.name === "∨";
      });
      // 判断如果点击的是最后一个图标，跳转到栏目管理页
      if (this.active === arr.length - 1) {
        this.$router.push("/column");
      }
      this.getList();
      //需要页面加载完以后再触发,时间随便写
      setTimeout(() => {
        // 页面滚动到当前栏目下的scrollY值
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 0);
    }
  },
  mounted() {
    //获取本地存储的token
    const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
    this.token = token;
    //获取本地存储栏目
    const categories = JSON.parse(localStorage.getItem("categories"));
    //如果存储有数据
    if (categories) {
      //登录了但是第一条数据不是关注
      //未登录但是第一条数据是关注
      if (
        (categories[0].name !== "关注" && token) ||
        (categories[0].name === "关注" && !token)
      ) {
        this.getCategories();
      } else {
        this.categories = categories;
        //调用方法添加属性
        this.getPageindex();
      }
    } else {
      this.getCategories();
    }
  },
  methods: {
    //给每个栏目添加自己的状态
    getPageindex() {
      this.categories = this.categories.map(item => {
        item.pageIndex = 1;
        item.post = [];
        item.loading = false; // 是否正在加载中
        item.finished = false; // 是否已经加载完毕
        item.scrollY = 0;
        item.isload = false;
        return item;
      });
      // 请求文章列表数据,是一定要放到栏目处理之后执行；
      this.getList();
      //   console.log(this.categories);
    },
    //封装请求文章接口
    getList() {
      // 获取当前页数
      const { pageIndex, id, finished, name, isload } = this.categories[
        this.active
      ];
      if (isload) return;
      this.categories[this.active].isload = true;
      //触动加载时,给页面+1
      this.categories[this.active].pageIndex += 1;
      if (finished) return;
      const config = {
        url: "/post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      };
      //如果登录了
      if (name === "关注") {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.categories[this.active].post = [
          ...this.categories[this.active].post,
          ...data
        ];
        //用赋值的方式刷新页面
        this.categories = [...this.categories];
        // 加载状态结束
        this.categories[this.active].loading = false;

        // 数据全部加载完成
        if (this.categories[this.active].post.length === total) {
          this.categories[this.active].finished = true;
        }
        this.categories[this.active].isload = false;
      });
    },
    //封装栏目接口
    getCategories() {
      const config = {
        url: "/category"
      };
      //如果登录了
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        data.push({ name: "∨" });
        this.categories = data;
        //把数据存储到本地
        localStorage.setItem("categories", JSON.stringify(data));
        //给栏目添加自己的状态
        this.getPageindex();
      });
    },
    //获取滚动数据
    getScrollY(data) {
      if (this.categories.length === 0) return;
      const { scrollTop } = data;
      this.categories[this.active].scrollY = scrollTop;
    },
    onLoad() {
      this.getList();
      //   console.log("已经拖动到了底部");
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .iconnew {
    font-size: 20px;
    transform: scale(3);
    position: relative;
    left: 20/360 * 100vw;
  }

  .search {
    flex: 1;
    height: 32/360 * 100vw;
    margin: 0 50/360 * 100vw;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 13px;
    line-height: 1;
    vertical-align: middle;

    span {
      margin-right: 5px;
    }
  }

  .iconwode {
    font-size: 20px;
  }
}

// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background: #eee;
}

/deep/ .van-tab {
  flex-basis: 15% !important;
}

/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 20px !important;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}

/deep/ .van-tabs__wrap {
  padding-right: 20px;
}

/deep/ .van-tabs__nav {
  position: static;
}

/deep/ .van-tabs__line {
  display: none;
}

/deep/ .van-tab--active {
  border-bottom: 1px #ff0000 solid;
}
</style>