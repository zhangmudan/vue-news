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
    <!-- v-if和v-for编译器不让一同使用 所以才会有红色警告 -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-tabs v-model="active" sticky swipeable @scroll="getScroll">
        <van-tab
          v-for="(item, index) in categories"
          :key="index"
          :title="item.name"
          v-if="item.is_top === 1 || item.name === '∨'"
        >
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
                :data="subItem"
                v-if="
                  subItem.type === 1 &&
                    subItem.cover.length > 0 &&
                    subItem.cover.length < 3
                "
              />
              <Exhibition2
                v-if="subItem.type === 1 && subItem.cover.length > 2"
                :data="subItem"
              />
              <Exhibition3 :data="subItem" v-if="subItem.type === 2" />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <div class="qrcode">
      <!-- 二维码 -->
      <canvas id="qrcode-stage"></canvas>
      <p>手机扫码查看</p>
    </div>
  </div>
</template>

<script>
//引入组件1
import Exhibition1 from "@/components/Exhibition1";
//引入组件2
import Exhibition2 from "@/components/Exhibition2";
//引入组件3
import Exhibition3 from "@/components/Exhibition3";
//生成二维码
import QRCode from "qrcode";

export default {
  //添加name值用于keep-alive中缓存
  name: "index",
  // 添加路由守卫
  // to: 代表你即将要访问的页面
  // from：代表你即将要离开的页面
  // next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
  // beforeRouteEnter 守卫 不能 访问 this
  beforeRouteEnter(to, from, next) {
    // 如果是从栏目管理页进来的，就把数据初始化
    if (
      from.path === "/column" ||
      from.path === "/login" ||
      from.path === "/personal"
    ) {
      // 通过 `vm` 访问组件实例, vm就是this
      next((vm) => {
        //强制刷新页面
        // vm.$router.go(0);
        // 初始化active回到第一个栏目
        vm.active = 0;
        vm.rolode();
      });
    } else {
      next();
    }
  },
  data() {
    return {
      // 菜单的数据
      categories: [],
      // 记录当前tab的切换的索引
      active: 0,
      token: "",
      // 后台返回的数据
      // list: [],
      // loading: false, // 是否正在加载中
      // finished: false, // 是否已经加载完毕
      refreshing: false, // 是否正在下拉加载
    };
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      // 先过滤出is_top等于1
      const arr = this.categories.filter((v) => {
        return v.is_top || v.name === "∨";
      });
      // console.log(arr);

      // 判断如果点击的是最后一个图标，跳转到栏目管理页
      if (this.active === arr.length - 1) {
        this.$router.push("/column");
      } else {
        this.getList();
      }

      //等页面渲染完成后获取滚动距离
      setTimeout(() => {
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 20);
    },
  },
  //注册组件
  components: {
    Exhibition1,
    Exhibition2,
    Exhibition3,
  },
  //activated 只对keep-alive的组件有用,当组件每次被渲染的时候才会执行
  // activated(){//初始化active回到第一个栏目
  // this.active = 0;}
  //mounted 只会执行一次
  mounted() {
    this.rolode();
    const canvas = document.querySelector("#qrcode-stage");
    // 第一个参数canvas节点元素
    // 第二个是生成二维码的链接
    QRCode.toCanvas(
      canvas,
      "http://my-bucket-1301866768.cos-website.ap-guangzhou.myqcloud.com",
      { width: 200 }
    );
  },
  methods: {
    //加载栏目
    rolode() {
      //获取本地token
      const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
      this.token = token;
      //获取本地存储栏目
      const categories = JSON.parse(localStorage.getItem("categories"));
      //如果本地有数据
      if (categories) {
        //登录了但不是关注
        //未登录但是关注
        if (
          (categories[0].name !== "关注" && token) ||
          (categories[0].name === "关注" && !token)
        ) {
          this.getCategories();
        } else {
          this.categories = categories;
          //调用方法给每个栏目加上自己的状态
          this.getPage();
        }
      } else {
        this.getCategories();
      }
    },
    //每个栏目都有自己的状态
    getPage() {
      this.categories = this.categories.map((v) => {
        v.pageIndex = 1;
        v.post = [];
        v.loading = false; // 组件的是否正在加载中
        v.finished = false; // 是否已经加载完毕
        v.scrollY = 0;
        v.isload = false; //自己控制的加载
        return v;
      });
      this.getList();
    },
    //封装文章接口
    getList() {
      const { pageIndex, id, finished, name, isload } = this.categories[
        this.active
      ];
      //限制请求次数
      if (isload) return;
      this.categories[this.active].isload = true;
      //给加载页面+1
      this.categories[this.active].pageIndex += 1;
      if (finished) return;

      const config = {
        url: "/post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id,
        },
      };
      if (name === "关注") {
        config.headers = {
          Authorization: this.token,
        };
      }
      this.$axios(config).then((res) => {
        // console.log(res);
        const { data, total } = res.data;
        this.categories[this.active].post = [
          ...this.categories[this.active].post,
          ...data,
        ];
        // 加载状态结束
        this.categories[this.active].loading = false;
        //赋值刷新页面
        this.categories = [...this.categories];
        // 数据全部加载完成
        if (this.categories[this.active].post.length === total) {
          this.categories[this.active].finished = true;
        }
        //加载完毕后把isload的状态设置为false
        this.categories[this.active].isload = false;
      });
    },
    //封装栏目接口
    getCategories() {
      //未登录
      const config = {
        url: "/category",
      };
      //已登录
      if (this.token) {
        config.headers = {
          Authorization: this.token,
        };
      }
      this.$axios(config).then((res) => {
        // console.log(res);
        const { data } = res.data;
        data.push({ name: "∨" });
        this.categories = data;
        //把数据存储到本地
        localStorage.setItem("categories", JSON.stringify(data));
        //调用方法给每个栏目加上自己的状态
        this.getPage();
      });
    },
    onLoad() {
      // this.categories[this.active].pageIndex += 1;
      this.getList();
      // console.log("已经拖动到了底部");
    },
    getScroll(data) {
      const { scrollTop } = data;
      if (this.categories.length === 0) return;
      this.categories[this.active].scrollY = scrollTop;
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    },
  },
};
</script>

<style scoped lang="less">
@media screen and (max-width: 750px) {
  .qrcode {
    display: none;
  }
}
.qrcode {
  height: fit-content;
  width: 250px;
  height: 250px;
  position: fixed;
  right: 0;
  bottom: 10px;
  text-align: center;
  #qrcode-stage {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
  }

  p {
    line-height: 2;
    text-align: center;
  }
}
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .iconnew {
    font-size: 20/360 * 100vw;
    //放大
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
    border-radius: 50/360 * 100vw;
    font-size: 13/360 * 100vw;
    line-height: 1;
    vertical-align: middle;

    span {
      margin-right: 5px;
      font-size: 13/360 * 100vw;
    }
  }

  .iconwode {
    font-size: 20/360 * 100vw;
  }
}

// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background: #eee;
}

/deep/ .van-tab {
  flex-basis: 15% !important;
  line-height: 44/360 * 100vw;
}

/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 20/360 * 100vw !important;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
  height: 44/360 * 100vw;
  line-height: 44/360 * 100vw;
}

/deep/ .van-tabs__wrap {
  padding-right: 20/360 * 100vw;
  height: 44/360 * 100vw;
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
/deep/ .van-tab__text {
  font-size: 14/360 * 100vw;
}
</style>
