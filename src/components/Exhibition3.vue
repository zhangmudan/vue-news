<template>
  <div>
    <div class="imgList">
      <div class="left">
        <h4>
          林志玲穿透视黑纱裙米兰看秀
          腹部微隆显孕味
          林志玲穿透视黑纱裙米兰看秀
        </h4>
        <div class="img">
          <img
            src="https://img20.360buyimg.com/pop/s590x470_jfs/t1/96873/9/16971/86050/5e81b8b7E155cd831/72e5f13df051f626.jpg.webp"
            alt
          />
          <div class="cover">
            <i class="iconfont iconshipin"></i>
          </div>
        </div>
        <p>火星时报 52跟帖</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.imgList {
  padding: 20/360 * 100vw 10/360 * 100vw 0;
  border-bottom: 1px solid #eee;

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
    .img {
      position: relative;
      .cover {
        position: absolute;
        width: 55/360 * 100vw;
        height: 55/360 * 100vw;
        line-height: 55/360 * 100vw;
        text-align: center;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.2);

        top: 50%;
        left: 50%;
        transform: translateX(-27/360 * 100vw) translateY(-27/360 * 100vw);
        .iconshipin {
          font-size: 44/360 * 100vw;
          color: #fff;
        }
      }
    }
    img {
      display: block;
      width: 340/360 * 100vw;
      height: 170/360 * 100vw;
      //防止图片挤压变形
      object-fit: cover;
    }
    p {
      font-size: 12/360 * 100vw;
      color: #666;
      line-height: 35/360 * 100vw;
    }
  }
}
</style>