<template>
  <div>
    <div>
      <div class="img">
        <div class="left">
          <h4>
            林志玲穿透视黑纱裙米兰看秀
            腹部微隆显孕味
          </h4>
          <p>火星时报 52跟帖</p>
        </div>
        <img src="https://www.baidu.com/img/bd_logo1.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.img {
  display: flex;
  padding: 20/360 * 100vw 10/360 * 100vw 0;
  border-bottom: 1px solid #eee;
  img {
    display: block;
    width: 121/360 * 100vw;
    height: 75/360 * 100vw;
    //不压缩图片
    flex-shrink: 0;
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
    p {
      font-size: 12/360 * 100vw;
      color: #666;
      line-height: 35/360 * 100vw;
    }
  }
}
</style>