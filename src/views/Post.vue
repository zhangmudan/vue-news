<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        <i class="iconfont iconnew"></i>
      </div>

      <div
        class="follow"
        :class="postList.has_follow?'':'active'"
        @click="follows"
      >{{postList.has_follow?'已关注':'关注'}}</div>
    </div>
    <div class="main">
      <h3>{{postList.title}}</h3>
      <p>{{postList.user.nickname}} {{moment(postList.user.create_date).format("YYYY - MM - DD hh:mm")}}</p>

      <div class="content" v-html="postList.content"></div>
      <div class="icon">
        <div class="iconzan" @click="getLike">
          <i class="iconfont icondianzan"></i>
          <em>{{Number(postList.has_like)>100?'99+':Number(postList.has_like)}}</em>
        </div>
        <div class="iconwei">
          <i class="iconfont iconweixin"></i>
          <em>微信</em>
        </div>
      </div>
    </div>
    <Footer :postList="postList" />
  </div>
</template>

<script>
//引入时间插件
import moment from "moment";
//引入组件
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      postList: {
        user: {}
      },
      moment,
      token: ""
    };
  },
  components: {
    Footer
  },
  mounted() {
    const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
    this.token = token;
    const { id } = this.$route.params;
    // console.log(id);
    const config = {
      url: "/post/" + id
    };
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.postList = data;
      // console.log(this.postList);
    });
  },
  methods: {
    //关注
    follows() {
      let url = "";
      if (this.postList.has_follow) {
        //取消关注
        url = "/user_unfollow/" + this.postList.user.id;
      } else {
        //关注
        url = "/user_follows/" + this.postList.user.id;
      }
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_follow = !this.postList.has_follow;
        this.$toast.success(
          this.postList.has_follow ? "关注成功" : "取消关注成功"
        );
      });
    },
    //收藏
    collection() {
      this.$axios({
        url: "/post_star/" + this.postList.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_star = !this.postList.has_star;
        this.$toast.success(res.data.message);
      });
    },
    //点赞与取消点赞是同一接口
    getLike() {
      this.$axios({
        url: "/post_like/" + this.postList.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_like = !this.postList.has_like;
        if (this.postList.has_like) {
          this.postList.like_length += 1;
        } else {
          this.postList.like_length -= 1;
        }
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15/360 * 100vw;
  .left {
    display: flex;
    align-items: center;
    .iconnew {
      font-size: 54/360 * 100vw;
      margin: 0 3px;
    }
  }
  .follow {
    width: 62/360 * 100vw;
    height: 26/360 * 100vw;
    line-height: 26/360 * 100vw;
    color: #000;
    text-align: center;
    font-size: 12/360 * 100vw;
    border-radius: 13/360 * 100vw;
    border: 1px solid #888;
  }
  .active {
    background-color: #ff0000;
    color: #fff;
    border: 1px solid #ff0000;
  }
}

.main {
  padding: 0 15/360 * 100vw;
  border-bottom: 5px solid #ddd;
  margin-bottom: 100/360 * 100vw;
  p {
    color: #aaa;
    font-size: 12/360 * 100vw;
    margin-top: 10/360 * 100vw;
  }
  .content {
    margin: 20/360 * 100vw 0 30/360 * 100vw 0;
    font-size: 14/360 * 100vw;
    line-height: 28/360 * 100vw;
  }
  /deep/img {
    max-width: 100%;
  }
  .icon {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20/360 * 100vw;
    .iconzan,
    .iconwei {
      width: 80/360 * 100vw;
      height: 28/360 * 100vw;
      line-height: 28/360 * 100vw;
      text-align: center;
      border: 1px solid #000;
      border-radius: 14/360 * 100vw;
      font-size: 12/360 * 100vw;
    }
    .icondianzan {
      margin-right: 8/360 * 100vw;
    }
    .iconweixin {
      color: #00d300;
      margin-right: 8/360 * 100vw;
    }
  }
}
</style>