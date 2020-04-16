<template>
  <div class="footer">
    <div class="foot">
      <router-link :to="`/post-comment/${postList.id}`">
        <input type="text" placeholder="发表评论" />
      </router-link>
      <router-link :to="`/post-comment/${postList.id}`" class="comment">
        <i class="iconfont iconpinglun-"></i>
        <em>{{postList.comment_length}}</em>
      </router-link>

      <i class="iconfont iconshoucang" :class="postList.has_star?'active':''" @click="collection"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postList"],
  methods: {
    //收藏
    collection() {
      const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
      this.$axios({
        url: "/post_star/" + this.postList.id,
        headers: {
          Authorization: token
        }
      }).then(res => {
        // console.log(res);
        this.postList.has_star = !this.postList.has_star;
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang='less' scoped>
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
    padding: 10/360 * 100vw;
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