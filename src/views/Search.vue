<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <!-- 因为template标签都是包含着this这个对象中, $router.back() 就如调用data中的数据不需要使用this一样 -->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <div class="input">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="输入关键词" autofocus v-model="value" @keyup.enter="search" />
      </div>
      <span @click="search">搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="historic">
      <div class="title">
        <strong>历史记录</strong>
        <i class="iconfont iconicon-test" @click="delelit"></i>
      </div>
      <div class="record">
        <div class="record_item" v-for="(item,index) in list" :key="index">
          <span @click="record(item)">{{item}}</span>
          <i></i>
        </div>
      </div>
    </div>
    <!-- 浮层 -->
    <div class="Floating_layer" v-if="showLayer">
      <!--后台返回的数组 -->
      <div v-for="(item, index) in post" :key="index">
        <!-- 只有单张图片的 -->
        <Exhibition1 :data="item" v-if="item.type===1&&item.cover.length>0&&item.cover.length<3" />
        <Exhibition2 v-if="item.type===1&&item.cover.length>2" :data="item" />
        <Exhibition3 :data="item" v-if="item.type===2" />
      </div>
      <div class="empty" v-if="post.length===0">搜索不到你要的内容</div>
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
export default {
  name: "search",
  data() {
    return {
      value: "",
      list: JSON.parse(localStorage.getItem("history")) || [],
      showLayer: false,
      post: []
    };
  },

  //注册组件
  components: {
    Exhibition1,
    Exhibition2,
    Exhibition3
  },
  methods: {
    search() {
      if (this.value === "") return;
      // console.log(this.value);
      this.list.unshift(this.value);
      this.list = [...new Set(this.list)];
      localStorage.setItem("history", JSON.stringify(this.list));
      // console.log(this.list);
      this.getList();
    },
    //获取文章
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value,
          pageIndex: 1,
          pageSize: 5
        }
      }).then(res => {
        this.showLayer = true;
        // console.log(res);
        const { data } = res.data;
        this.post = data;
      });
    },
    //点击历史记录
    record(item) {
      this.value = item;
      this.getList();
    },
    delelit() {
      this.list = [];
      localStorage.removeItem("history");
    }
  },
  watch: {
    value() {
      if (this.value === "") {
        this.showLayer = false;
      }
    }
  },
  // 添加路由的守卫
  // to: 代表你即将要访问的页面
  // from：代表你即将要离开的页面
  // next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
  // beforeRouteEnter 守卫 不能 访问 this
  beforeRouteEnter(to, from, next) {
    // 通过 `vm` 访问组件实例, vm就是this
    next(vm => {
      // 如果是从首页进来的，就把数据初始化
      if (from.path === "/index") {
        // 隐藏浮层
        vm.showLayer = false;
        // 清空关键字
        vm.value = "";
      }
    });
  }
};
</script>

<style lang='less' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 15/360 * 100vw;
  .iconfont {
    font-size: 18/360 * 100vw;
  }
  .input {
    position: relative;
    .iconsearch {
      position: absolute;
      font-size: 14/360 * 100vw;
      color: #999;
      left: 15/360 * 100vw;
      top: 2px;
    }
    input {
      width: 258/360 * 100vw;
      height: 36/360 * 100vw;
      // line-height: 36/360 * 100vw;
      border: 0;
      border: 1px solid #ccc;
      border-radius: 18/360 * 100vw;
      font-size: 12/360 * 100vw;
      color: #222;
      padding-left: 40/360 * 100vw;
    }
  }
  span {
    font-size: 13/360 * 100vw;
  }
}
.historic {
  margin: 0 15/360 * 100vw;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      margin: 15/360 * 100vw 0;
      font-size: 13/360 * 100vw;
    }
  }
  .record {
    .record_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      font-size: 12/360 * 100vw;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.Floating_layer {
  position: absolute;
  top: 58/360 * 100vw;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  .empty {
    margin: 15/360 * 100vw;
    font-size: 14/360 * 100vw;
    color: #999;
  }
}
</style>