<template>
  <div>
    <!-- 导航 -->
    <Navigate title="编辑资料" />
    <!-- 头部 -->
    <div class="header">
      <div class="img">
        <!-- 渲染头像时因为来自后台所以要加上后台地址 -->
        <img :src="'http://127.0.0.1:3000' + userInfo.head_img" alt />
        <!-- 调用文件上传按钮 -->
        <van-uploader :after-read="afterRead" class="uploads" />
      </div>
    </div>
    <!-- 列表 -->
    <!-- 昵称 -->
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="showNickname=true" />
    <van-dialog v-model="showNickname" title="修改昵称" show-cancel-button @confirm="confirmNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 密码 -->
    <Listbar label="密码" tips="******" @click.native="showPassword=true" />
    <van-dialog v-model="showPassword" title="修改密码" show-cancel-button @confirm="confirmPassword">
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>
    <!-- 性别 -->
    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" @click.native="showGender=true" />
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
//导入列表组件
import Listbar from "@/components/Listbar";
//头部组件
import Navigate from "@/components/Navigate";
export default {
  data() {
    return {
      //用户详情
      userInfo: {},
      //本地数据
      userJson: {},
      showNickname: false,
      nickname: "",
      showPassword: false,
      password: "",
      showGender: false,
      gender: "",
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ]
    };
  },
  components: {
    //注册组件
    Listbar,
    Navigate
  },
  mounted() {
    //获取本地存储的id和token
    const userJson = JSON.parse(localStorage.getItem("userInfor"));
    this.userJson = userJson;
    //解构数据
    const { token, user } = userJson;
    // console.log(token, user);
    this.$axios({
      url: "/user/" + user.id,
      //添加验证信息
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
      this.password = data.password;
    });
  },
  methods: {
    //上传头像
    afterRead(file) {
      // console.log(file);
      const url = file.file;
      //创建表单
      const fd = new FormData();
      fd.append("file", url);
      this.$axios({
        url: "/upload",
        method: "POST",
        //添加验证信息
        headers: {
          Authorization: this.userJson.token
        },
        data: fd
      }).then(res => {
        // console.log(res);
        const { url } = res.data.data;
        //替换页面显示图片
        this.userInfo.head_img = url;
        //调用修改函数,与数据库关联
        this.modify({ head_img: url });
      });
    },
    //上传信息函数
    modify(data) {
      this.$axios({
        url: "/user_update/" + this.userJson.user.id,
        method: "POST",
        //添加验证信息
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("修改成功");
      });
    },
    //修改昵称
    confirmNickname() {
      //调用修改函数,与数据库关联
      this.modify({ nickname: this.nickname });
      //把修改后的数据显示在页面
      this.userInfo.nickname = this.nickname;
    },
    //修改密码
    confirmPassword() {
      this.modify({ password: this.password });
    },
    //修改性别
    onSelect(item) {
      this.modify({ gender: item.value });
      this.userInfo.gender = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 20/360 * 100vw;
  span {
    font-size: 20/360 * 100vw;
  }
}
.header {
  display: flex;
  justify-content: center;
  padding: 30/360 * 100vw 20/360 * 100vw;
  .img {
    display: flex;
    position: relative;
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .uploads {
      position: absolute;
      left: 50%;
      transform: translateX(-35/360 * 100vw);
      opacity: 0;
    }
  }
}
</style>
