<template>
  <div>
    <video
      controls
      src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5b4e96b891e985e5c60d6e91eab9eaea.mp4"
      class="video"
    >您的浏览器不支持 video 标签。</video>
    <div class="main">
      <p>
        <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt />
        {{postList.user.nickname}}
      </p>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: {
        user: {}
      }
    };
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
  }
};
</script>

<style lang='less' scoped>
.video {
  width: 100%;
}
.main {
  padding: 0 15/360 * 100vw;
  border-bottom: 5px solid #ddd;
  margin-bottom: 100/360 * 100vw;

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