<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <!-- 因为template标签都是包含着this这个对象中, $router.back() 就如调用data中的数据不需要使用this一样 -->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <div class="input">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="通灵兽消失术" />
      </div>
      <button>搜索</button>
    </div>
    <div class="historic">
      <h5>历史记录</h5>
      <p>美女</p>
    </div>
    <div class="hot">
      <h5>热门搜索</h5>
      <p>办公室小野否认解散</p>
      <p>办公室小野否认解散</p>
      <p>办公室小野否认解散</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 15/360 * 100vw;
  .iconfont {
    font-size: 18/360 * 100vw;
  }
  .input {
    position: relative;
    .iconsearch {
      position: absolute;
      font-size: 14/360 * 100vw;
      color: #999;
      left: 15/360 * 100vw;
      top: 2px;
    }
    input {
      width: 258/360 * 100vw;
      height: 36/360 * 100vw;
      border: 0;
      border: 1px solid #ccc;
      border-radius: 18/360 * 100vw;
      font-size: 12/360 * 100vw;
      color: #222;
      padding-left: 40/360 * 100vw;
    }
  }
  button {
    border: 0;
    background-color: #fff;
    font-size: 13/360 * 100vw;
  }
}
.historic {
  margin: 0 15/360 * 100vw;
  border-bottom: 1px solid #ccc;
  h5 {
    margin: 15/360 * 100vw 0;
    font-size: 13/360 * 100vw;
  }
  p {
    margin-bottom: 15/360 * 100vw;
    font-size: 12/360 * 100vw;
  }
}
.hot {
  margin: 0 15/360 * 100vw;
  h5 {
    margin: 15/360 * 100vw 0;
    font-size: 13/360 * 100vw;
  }
  p {
    margin-bottom: 15/360 * 100vw;
    font-size: 12/360 * 100vw;
  }
}
</style>