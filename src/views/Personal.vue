<template>
  <div>
    <!-- 导航 -->
    <Navigate title="个人中心" isShow="true" />
    <!-- 头部 -->
    <router-link to="/editprofile">
      <div class="header">
        <div class="img">
          <!-- 渲染头像时因为来自后台所以要加上后台地址 -->
          <!-- <img :src="'http://127.0.0.1:3000' + userInfo.head_img" alt /> -->
          <!-- 获取axios的基路径 -->
          <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="这是图片" />
        </div>
        <div class="profile">
          <div>
            <i class="iconfont iconxingbienan" v-if="userInfo.gender === 1"></i>
            <i class="iconfont iconxingbienv" v-if="userInfo.gender === 0"></i>
            <span>{{ userInfo.nickname }}</span>
            <p>{{ moment(userInfo.create_date).format("YYYY - MM - DD") }}</p>
          </div>

          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </router-link>
    <!-- 列表 -->
    <!-- :key 不是报错,可以不加,但是vue希望给循环指定唯一的key ,所以推荐加上 -->
    <Listbar
      v-for="(item, index) in listbar"
      :key="index"
      :label="item.label"
      :tips="item.tips"
      :path="item.path"
    />
    <!-- click.native这个事件类型，会给Listbar这个组件最外部的div强制绑定点击事件
    不要去跟事件传递作比较-->
    <Listbar label="退出" @click.native="out" />
  </div>
</template>

<script>
//导入列表组件
import Listbar from "@/components/Listbar";
//头部组件
import Navigate from "@/components/Navigate";
//引入时间插件
import moment from "moment";
export default {
  data() {
    return {
      //组织列表数据
      listbar: [
        { label: "我的关注", tips: "关注的用户", path: "/follow" },
        { label: "我的跟帖", tips: "跟帖/回复", path: "/comment" },
        { label: "我的收藏", tips: "文章/视频", path: "/start" }
      ],
      //用户信息
      userInfo: {},
      //挂载插件
      moment
    };
  },
  components: {
    //注册子组件
    Listbar,
    Navigate
  },
  mounted() {
    //获取本地数据
    const jsonStr = localStorage.getItem("userInfor");
    const userJson = JSON.parse(jsonStr);
    //发起请求
    this.$axios({
      url: "/user/" + userJson.user.id,
      //不写method 默认请求发送为get
      method: "GET",
      //添加验证信息
      headers: {
        Authorization: userJson.token
      }
    }).then(response => {
      // console.log(response);
      const { data } = response.data;
      this.userInfo = data;
    });
  },
  methods: {
    out() {
      //引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 $dialog 方法，在所有组件内部都可以直接调用此方法
      this.$dialog
        .confirm({
          title: "退出",
          message: "您确定退出吗?"
        })
        .then(() => {
          localStorage.removeItem("userInfor");
          this.$router.replace("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 30/360 * 100vw 20/360 * 100vw;
  border-bottom: 5px solid #e4e4e4;
  .img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .profile {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-left: 10/360 * 100vw;
    font-size: 15/360 * 100vw;
    .iconxingbienan {
      color: #70b6ea;
      font-size: 18/360 * 100vw;
      margin-right: 5px;
    }
    .iconxingbienv {
      color: #ff759a;
      font-size: 18/360 * 100vw;
      margin-right: 5px;
    }
    p {
      color: #999;
      line-height: 26/360 * 100vw;
    }
  }
}
</style>
