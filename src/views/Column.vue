<template>
  <div>
    <Navigate title="栏目管理" />
    <div class="del">
      <p>点击删除以下频道</p>
      <div class="channe">
        <span
          v-for="(item,index) in delArr"
          :key="index"
          :class="['关注','头条'].includes(item.name)?'active':''"
          @click="getDel(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="add">
      <p>点击添加以下频道</p>
      <div class="channe">
        <span v-for="(item,index) in addArr" :key="index" @click="getAdd(item,index)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
//引入组件1
import Navigate from "@/components/Navigate";
export default {
  data() {
    return {
      categories: [],
      delArr: [],
      addArr: []
    };
  },
  //注册组件
  components: {
    Navigate
  },
  //页面加载后触发
  mounted() {
    //获取本地存储数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    this.categories = categories;
    this.delArr = categories.filter(v => {
      return v.is_top === 1;
    });
    this.addArr = categories.filter(v => {
      return v.is_top === 0;
    });
    // console.log(this.delArr);
    // console.log(this.addArr);
  },
  //页面销毁后触发
  destroyed() {
    this.categories = [
      ...this.delArr,
      ...this.addArr,
      this.categories[this.categories.length - 1]
    ];
    localStorage.setItem("categories", JSON.stringify(this.categories));
    console.log(this.categories);
  },
  methods: {
    //点击栏目删除
    getDel(item, index) {
      if (["关注", "头条"].includes(item.name)) return;
      item.is_top = 0;
      this.delArr.splice(index, 1);
      this.addArr.push(item);
    },
    getAdd(item, index) {
      item.is_top = 1;
      this.addArr.splice(index, 1);
      this.delArr.push(item);
    }
  }
};
</script>

<style lang='less' scoped>
.del {
  margin: 0 20/360 * 100vw;
  p {
    font-size: 14/360 * 100vw;
    color: #666;
    margin: 15/360 * 100vw 0;
  }
  .channe {
    display: flex;
    flex-wrap: wrap;

    span {
      width: 65/360 * 100vw;
      height: 35/360 * 100vw;
      line-height: 35/360 * 100vw;
      text-align: center;
      border: 1px solid #aaa;
      margin-bottom: 15/360 * 100vw;
      margin-right: 15/360 * 100vw;
    }
  }
}
.add {
  margin: 0 20/360 * 100vw;
  p {
    font-size: 14/360 * 100vw;
    color: #666;
    margin: 15/360 * 100vw 0;
  }
  .channe {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 65/360 * 100vw;
      height: 35/360 * 100vw;
      line-height: 35/360 * 100vw;
      text-align: center;
      border: 1px solid #aaa;
      margin-bottom: 15/360 * 100vw;
      margin-right: 15/360 * 100vw;
    }
  }
}
.active {
  border: 1px solid #eee;
  color: #999;
}
</style>