<template>
  <div>
    <div class="imgList">
      <div class="left">
        <h4>{{data.title}}</h4>
      </div>

      <div class="list-img">
        <img
          v-for="(item,index) in data.cover"
          :key="index"
          :src="$axios.defaults.baseURL + item.url"
          alt
        />
      </div>
      <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style scoped lang='less'>
.imgList {
  padding: 20/360 * 100vw 10/360 * 100vw 0;
  border-bottom: 1px solid #eee;
  .list-img {
    display: flex;
    justify-content: space-between;
    img {
      display: block;
      width: 33%;
      height: 75/360 * 100vw;
      //不压缩图片
      flex-shrink: 0;
    }
  }

  .left {
    h4 {
      font-size: 15/360 * 100vw;
      font-weight: 500;
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      /* 这是一个以前的弹性盒子 */
      display: -webkit-box;
      /* 在哪一行显示省略号 */
      -webkit-line-clamp: 2;
      /* 控制 列的方向 */
      -webkit-box-orient: vertical;
    }
  }
  p {
    font-size: 12/360 * 100vw;
    color: #666;
    line-height: 35/360 * 100vw;
  }
}
</style>