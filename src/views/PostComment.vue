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
              <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
              <div class="info">
                <p>{{item.user.nickname}}</p>
                <!-- moment().fromNow 就是显示距离到当前的时间 -->
                <p class="time">{{moment(item.user.create_date).fromNow()}}</p>
              </div>
            </div>
            <div class="reply">回复</div>
          </div>
          <CommentFloor v-if="item.parent" :data="item" />
          <div class="content">
            <p>{{item.content}}</p>
          </div>
        </div>
      </van-list>
    </div>
    <div class="footer">
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFocus"
        type="textarea"
        placeholder="说点什么吧..."
        class="textarea"
        @focus="focus"
        @blur="blur"
        :isFocus="false"
        :class="isFocus?'active':''"
      />
      <span class="submit" v-if="isFocus">发布</span>
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
      isFocus: false
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
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
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