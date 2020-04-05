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
      <span>搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="historic">
      <div class="title">
        <strong>历史记录</strong>
        <i class="iconfont iconicon-test"></i>
      </div>
      <div class="record">
        <div class="record_item">
          <span>美女</span>
          <i></i>
        </div>
        <div class="record_item">
          <span>搜索办公室小野否认解散办公室小野否认解散美女记录</span>
          <i></i>
        </div>
        <div class="record_item">
          <span>美女搜索记录</span>
          <i></i>
        </div>
      </div>
    </div>
    <!-- 浮层 -->
    <div class="Floating_layer">
      <div class="layer_item">
        <span>搜索记录</span>
        <i class="iconfont iconjiantou1"></i>
      </div>
      <div class="layer_item">
        <span>搜索记录</span>
        <i class="iconfont iconjiantou1"></i>
      </div>
      <div class="layer_item">
        <span>搜索记录办公室小野否认解散办公室小野否认解散办公室小野否认解散</span>
        <i class="iconfont iconjiantou1"></i>
      </div>
      <div class="layer_item">
        <span>搜索记录</span>
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <!-- 热门搜索 -->
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
  span {
    font-size: 13/360 * 100vw;
  }
}
.historic {
  margin: 0 15/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      margin: 15/360 * 100vw 0;
      font-size: 13/360 * 100vw;
    }
  }
  .record {
    .record_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      font-size: 12/360 * 100vw;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.Floating_layer {
  position: absolute;
  top: 58/360 * 100vw;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  padding: 0 15/360 * 100vw;
  display: none;
  .layer_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    font-size: 12/360 * 100vw;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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