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
    <div class="footer">
      <div class="foot">
        <input type="text" placeholder="发表评论" />

        <div class="comment">
          <i class="iconfont iconpinglun-"></i>
          <em>{{postList.comment_length}}</em>
        </div>
        <i class="iconfont iconshoucang" :class="postList.has_star?'active':''" @click="collection"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
    </div>
  </div>
</template>

<script>
//引入时间插件
import moment from "moment";
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
  mounted() {
    const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
    this.token = token;
    const { id } = this.$route.params;
    // console.log(id);
    this.$axios({
      url: "/post/" + id
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.postList = data;
      // console.log(this.postList);
    });
  },
  methods: {
    //关注
    follows() {
      this.$axios({
        url: "/user_follows/" + this.postList.user.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_follow = true;
        this.$toast.success("关注成功");
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
        this.postList.has_star = true;
        this.$toast.success("收藏成功");
      });
    },
    //点赞
    getLike() {
      this.$axios({
        url: "/post_like/" + this.postList.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_like = true;
        this.$toast.success("点赞成功");
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
.footer {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  background: #eee;
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20/360 * 100vw;
    width: 100%;
    .active {
      color: #ff0000;
    }
    input {
      height: 30/360 * 100vw;
      padding-left: 20/360 * 100vw;
      background: #d7d7d7;
      border: 0;
      font-size: 12/360 * 100vw;
      border-radius: 15/360 * 100vw;
    }

    i {
      font-size: 20/360 * 100vw;
    }
    .comment {
      position: relative;
      em {
        position: absolute;
        top: -8/360 * 100vw;
        left: 13/360 * 100vw;
        background: #ff0000;
        color: #fff;
        height: 14/360 * 100vw;
        width: 30/360 * 100vw;
        line-height: 14/360 * 100vw;
        text-align: center;
        font-size: 8/360 * 100vw;
        border-radius: 7/360 * 100vw;
      }
    }
  }
}
</style>