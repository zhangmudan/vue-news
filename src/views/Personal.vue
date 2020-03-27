<template>
  <div>
    <div class="header">
      <div class="img">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
      </div>
      <div class="profile">
        <div>
          <i class="iconfont iconxingbienan"></i>
          <span>火星网友</span>
          <p>2019-10-10</p>
        </div>
        <div class="jiantou">
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </div>
    <!-- :key 不是报错,可以不加,但是vue希望给循环指定唯一的key ,所以推荐加上 -->
    <Listbar v-for="(item,index) in listbar" :key="index" :label="item.label" :tips="item.tips" />
  </div>
</template>

<script>
//导入列表组件
import Listbar from "@/components/Listbar";
export default {
  data() {
    return {
      //组织数据
      listbar: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖/回复" },
        { label: "我的收藏", tips: "文章/视频" },
        { label: "设置", tips: "" }
      ]
    };
  },
  components: {
    //注册子组件
    Listbar
  },
  mounted() {
    //获取本地数据
    const jsonStr = localStorage.getItem("userInfor");
    const userJson = JSON.parse(jsonStr);
    //发起请求
    this.$axios({
      url: "/user/" + userJson.user.id,
      //不见method 默认请求发送为get
      method: "GET",
      //添加验证信息
      headers: {
        Authorization: userJson.token
      }
    }).then(response => {
      console.log(response);
    });
  },
  methods: {}
};
</script>

<style lang='less' scoped>
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
    p {
      color: #999;
      line-height: 26/360 * 100vw;
    }
  }
}
</style>