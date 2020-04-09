<template>
  <div>
    <Navigate title="精彩跟帖" />
    <div class="comment">
      <div class="user">
        <div class="user-info">
          <img src="https://img.yzcdn.cn/vant/tree.jpg" alt />
          <div class="info">
            <p>火星网友</p>
            <p class="time">2小时前</p>
          </div>
        </div>
        <div class="reply">回复</div>
      </div>
      <div class="content">
        <p>文章说的很有道理</p>
      </div>
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
      moment
    };
  },
  components: {
    Navigate
  }
};
</script>

<style lang='less' scoped>
.comment {
  border-bottom: 1px solid #ccc;
  .user {
    display: flex;
    justify-content: space-between;
    margin: 15/360 * 100vw;
    .user-info {
      display: flex;
      font-size: 14/360 * 100vw;
      img {
        display: block;
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
        border-radius: 50%;
        margin-right: 10/360 * 100vw;
      }
      .info {
        .time {
          font-size: 12/360 * 100vw;
          color: #aaa;
        }
      }
    }
  }
  .content {
    margin: 0 15/360 * 100vw 10/360 * 100vw;
    font-size: 14/360 * 100vw;
  }
}
</style>