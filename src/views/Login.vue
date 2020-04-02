<template>
  <div class="middle">
    <div>
      <i class="iconfont iconicon-test" @click="$router.back()"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <!-- 使用vant的表单 -->
    <!-- van-form是表单的组件， @submit是表单按钮提交的事件 -->
    <van-form @submit="onSubmit" class="form">
      <!-- van-field是表单的字段 -->
      <!-- rules是表单字段的规则，required表示这个输入框是必填 -->
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部，
        并且按钮的native-type="submit"，说明点击这个按钮就会触发submit事件-->
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/register">
      <van-button round block class="link-register">注册</van-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //保存表单数据
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 提交表单时候触发的事件，该事件通过校验才会触发
    // values是表单返回的值，这里的values我们用不上，数据可以在this.form里面拿
    onSubmit(values) {
      // 调用axios发起异步请求，类似$.ajax(类似不代表一样)
      this.$axios({
        // 接口地址
        url: "/login",
        // 声明请求的方法为post请求(一定要注册这个method没有s)
        // 跟vue的methods属性毫无关系
        method: "POST",
        // 参数
        data: this.form
        // .then方法里面的函数就是成功的回调函数,axios没有succces
      }).then(res => {
        console.log(res);

        // 获取到返回的信息
        const { message, data } = res.data;
        // 使用vant的弹窗提示用，success表示成功的弹窗
        this.$toast.success(message);
        //把token和id保存到本地 localStorage只能保存字符串
        localStorage.setItem("userInfor", JSON.stringify(data));
        //跳转到个人中心页
        this.$router.push("/personal");
      });
    },
    register() {
      location.href = "http://localhost:8080/register";
    }
  }
};
</script>

<style lang="less" scoped>
// scoped 表示只针对当前页面
.middle {
  padding: 20/360 * 100vw;
}
.iconicon-test {
  font-size: 27/360 * 100vw;
  line-height: 0;
}
.logo {
  text-align: center;
  margin-top: 20/360 * 100vw;
}
.logo .iconnew {
  font-size: 126/360 * 100vw;
  color: #d81e06;
}
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 / 360 * 100vw;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50 / 360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
}
.link-register {
  margin-top: 20/360 * 100vw;
}
</style>
