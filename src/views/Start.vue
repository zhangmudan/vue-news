<template>
  <div>
    <!-- 头部 -->
    <Navigate title="我的收藏" />
    <div v-for="(item,index) in data_list" :key="index">
      <!-- 只有单张图片的 -->
      <Exhibition1 :data="item" v-if="item.type===1&&item.cover.length>0&&item.cover.length<3" />
      <Exhibition2 v-if="item.type===1&&item.cover.length>2" :data="item" />
      <Exhibition3 :data="item" v-if="item.type===2" />
    </div>
  </div>
</template>

<script>
//引入头部组件
import Navigate from "@/components/Navigate";
//引入组件1
import Exhibition1 from "@/components/Exhibition1";
//引入组件2
import Exhibition2 from "@/components/Exhibition2";
//引入组件3
import Exhibition3 from "@/components/Exhibition3";
export default {
  data() {
    return {
      local: {},
      data_list: []
    };
  },
  components: {
    Navigate,
    Exhibition1,
    Exhibition2,
    Exhibition3
  },
  mounted() {
    //获取本地存储数据
    const local = JSON.parse(localStorage.getItem("userInfor"));
    this.local = local;
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: local.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      // console.log(data);
      this.data_list = data;
    });
  }
};
</script>

<style >
</style>