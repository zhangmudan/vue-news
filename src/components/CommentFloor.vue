<template>
  <div class="floor">
    <div class="user-floor">
      <CommentFloor v-if="data.parent" :data="data.parent" />
      <div class="user-info">
        <div class="info">
          <img :src="$axios.defaults.baseURL+data.user.head_img" alt />
          <div>
            <p>{{data.user.nickname}}</p>
            <p class="time">{{moment(data.user.create_date).fromNow()}}</p>
          </div>
        </div>
        <div class="reply">回复</div>
      </div>
      <div class="floor-content">
        <p>{{data.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//引入时间插件
import moment from "moment";
export default {
  //声明当前的组件名,在当前组件里面,name的值可以用于调用组件自己
  name: "CommentFloor",
  props: ["data"],
  data() {
    return {
      moment
    };
  }
};
</script>

<style lang='less' scoped>
.user-floor {
  margin: 8/360 * 100vw;
  border: 1px solid #ccc;
  .user-info {
    display: flex;
    justify-content: space-between;
    font-size: 13/360 * 100vw;
    padding: 5px;

    .info {
      display: flex;
      img {
        display: block;
        width: 25/360 * 100vw;
        height: 25/360 * 100vw;
        border-radius: 50%;
        margin-right: 5/360 * 100vw;
      }
      .time {
        font-size: 12/360 * 100vw;
        color: #aaa;
      }
    }
    .reply {
      font-size: 13/360 * 100vw;
      color: #666;
    }
  }
}
.floor-content {
  font-size: 13/360 * 100vw;
  padding: 0 5px;
}
</style>