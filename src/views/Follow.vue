<template>
  <div>
    <!-- 导航 -->
    <Navigate title="我的关注" />
    <div class="left" v-for="(item,index) in follows " :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt="这是图片" />
      <div class="content">
        <p>{{item.nickname}}</p>
        <p>{{moment(item.create_date).format("YYYY - MM - DD")}}</p>
      </div>
      <div class="right" @click="unfollow(item.id,index)">取消关注</div>
    </div>
  </div>
</template>

<script>
//头部组件
import Navigate from "@/components/Navigate";
//引入时间插件
import moment from "moment";
export default {
  data() {
    return {
      follows: [],
      //挂载插件
      moment,
      local: {}
    };
  },
  components: { Navigate },
  mounted() {
    //获取本地存储数据
    const local = JSON.parse(localStorage.getItem("userInfor"));
    this.local = local;
    // console.log(local);
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: local.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.follows = data;
      // console.log(data);
    });
  },
  methods: {
    unfollow(id, index) {
      // console.log(id, index);
      //引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 $dialog 方法，在所有组件内部都可以直接调用此方法
      this.$dialog
        .confirm({
          title: "取消关注",
          message: "您确定取消关注吗?"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.local.token
            }
          }).then(res => {
            // console.log(res);
            this.$toast.success("取消关注成功");
            this.follows.splice(index, 1);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  display: flex;
  justify-content: space-between;
  margin-top: 10/360 * 100vw;
  border-bottom: 1px solid #d7d7d7;
  padding: 20/360 * 100vw;
  img {
    display: block;
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    border-radius: 50%;
    //防止图片变形
    object-fit: cover;
  }
}
.right {
  margin-left: 60/360 * 100vw;
  width: 75/360 * 100vw;
  height: 30/360 * 100vw;
  background-color: #e1e1e1;
  text-align: center;
  line-height: 30/360 * 100vw;
  border-radius: 15/360 * 100vw;
  font-size: 14/360 * 100vw;
}
</style>
