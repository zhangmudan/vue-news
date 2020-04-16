<template>
  <div>
    <Navigate title="精彩跟帖" />
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="comment" v-for="(item,index) in list " :key="index">
          <div class="user">
            <div class="user-info">
              <img :src="$axios.defaults.baseURL+item.user.head_img" alt="这是图片" />
              <div class="info">
                <p>{{item.user.nickname}}</p>
                <!-- moment().fromNow 就是显示距离到当前的时间 -->
                <p class="time">{{moment(item.create_date).fromNow()}}</p>
              </div>
            </div>
            <div class="reply" @click="handleReply(item)">回复</div>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
          <CommentFloor v-if="item.parent" :data="item.parent" @replyFloor="handleReply" />
        </div>
      </van-list>
    </div>
    <div class="footer">
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFocus"
        type="textarea"
        :placeholder="list_item.user?`回复:@`+list_item.user.nickname:'说点什么吧...'"
        class="textarea"
        @focus="focus"
        @blur="blur"
        @keyup.enter="submit"
        :isFocus="false"
        :class="isFocus?'active':''"
        ref="textarea"
      />
      <span class="submit" v-if="isFocus" @click="submit">发布</span>
    </div>
  </div>
</template>

<script>
//头部组件
import Navigate from "@/components/Navigate";
//楼层组件
import CommentFloor from "@/components/CommentFloor";
//引入时间插件
import moment from "moment";
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
export default {
  data() {
    return {
      moment,
      id: "",
      list: [],
      loading: false,
      finished: false,
      // 请求的页数
      pageIndex: 1,
      // 请求的条数
      pageSize: 5,
      message: "",
      rows: 1,
      //记录是否聚焦
      isFocus: false,
      //回复对象
      list_item: {}
    };
  },
  components: {
    Navigate,
    CommentFloor
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id;
    this.getList();
  },
  methods: {
    getList() {
      this.$axios({
        url: "/post_comment/" + this.id,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.list = [...this.list, ...data];
        this.pageIndex += 1;
        // 异步更新数据
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.getList();
    },
    //聚焦弹起输入框
    focus() {
      this.isFocus = true;
    },
    //失焦收起输入框
    blur() {
      // 失去焦点时候，不要立马就隐藏发布按钮，需要在按钮点击之后再隐藏
      setTimeout(() => {
        this.isFocus = false;
        //失去焦点是如果输入框为空,把回复的人清空
        if (this.message.trim() === "") {
          this.list_item = {};
        }
      }, 200);
    },
    //点击发布
    submit() {
      if (this.message.trim() == "") return;
      const { token } = JSON.parse(localStorage.getItem("userInfor")) || {};
      const data = {
        content: this.message
      };
      if (this.list_item.id) {
        data.parent_id = this.list_item.id;
      }
      this.$axios({
        url: "/post_comment/" + this.id,
        headers: {
          Authorization: token
        },
        data,
        method: "POST"
      }).then(res => {
        this.message = "";
        this.$toast.success(res.data.message);
        this.list = [];
        this.pageIndex = 1;
        this.getList();
        // 清空回复的数据
        this.list_item = {};
        this.isFocus = false;
      });
    },
    //回复
    handleReply(item) {
      // 因为点击时候失去焦点，已经触发了blur事件
      setTimeout(() => {
        this.list_item = item;
        this.isFocus = true;
        // 输入框获得焦点
        this.$refs.textarea.focus();
      }, 200);
    }
  }
};
</script>

<style lang='less' scoped>
.main {
  margin-bottom: 80/360 * 100vw;
}
.comment {
  border-bottom: 1px solid #ccc;
  .user {
    display: flex;
    justify-content: space-between;
    margin: 10/360 * 100vw;
    .user-info {
      display: flex;
      font-size: 13/360 * 100vw;
      img {
        display: block;
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
        border-radius: 50%;
        margin-right: 10/360 * 100vw;
      }
      .info {
        .time {
          font-size: 12/360 * 100vw;
          color: #aaa;
        }
      }
    }
    .reply {
      font-size: 13/360 * 100vw;
      color: #666;
    }
  }

  .content {
    margin: 0 8/360 * 100vw 10/360 * 100vw;
    font-size: 13/360 * 100vw;
  }
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 5/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .textarea {
    background: #eee;
    border-radius: 5/360 * 100vw;
    padding: 5px 15px;
  }
  .active {
    height: 82px !important;
    border-radius: 8px;
  }
  .submit {
    margin-left: 5px;
    padding: 3px 10px;
    color: #fff;
    background: red;
    border-radius: 25/360 * 100vw;
    font-size: 13px;
    flex-shrink: 0;
  }
}
</style>