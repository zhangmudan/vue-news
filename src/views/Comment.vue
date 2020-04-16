<template>
  <div>
    <!-- 头部 -->
    <Navigate title="我的跟帖" />
    <!-- 内容 -->
    <div class="content" v-for="(item,index) in dataArr " :key="index">
      <p class="time">{{moment(item.create_date).format("YYYY - MM - DD hh:mm")}}</p>
      <div class="parent" v-if="item.parent">
        <div class="parent-user">回复:{{item.parent.user.nickname}}</div>
        <div class="parent-content">{{item.parent.content }}</div>
      </div>
      <div class="user-comment">{{item.content}}</div>
      <router-link :to="`/post/${item.post.id}`" class="link-post">
        <div>原文：{{item.post.title}}</div>
        <i class="iconfont iconjiantou1"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
//引入头部组件
import Navigate from "@/components/Navigate";
//引入时间插件
import moment from "moment";
export default {
  data() {
    return {
      local: {},
      dataArr: [],
      moment
    };
  },
  components: {
    Navigate
  },
  mounted() {
    //获取本地存储数据
    const local = JSON.parse(localStorage.getItem("userInfor"));
    this.local = local;
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: local.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.dataArr = data;
      // console.log(data);
    });
  }
};
</script>

<style lang='less' scoped>
.content {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .time {
    font-size: 12/360 * 100vw;
    color: #aaa;
    margin: 15/360 * 100vw 0;
  }
  .parent {
    background-color: #e4e4e4;
    font-size: 13/360 * 100vw;
    color: #888;
    .parent-user,
    .parent-content {
      padding: 0 10/360 * 100vw;
      line-height: 35/360 * 100vw;
    }
  }
  .user-comment {
    margin: 10/360 * 100vw 0;
  }
  .link-post {
    display: flex;
    justify-content: space-between;
    margin: 10/360 * 100vw 0;
    div {
      font-size: 14/360 * 100vw;
      color: #aaa;
      //单行省略号
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>