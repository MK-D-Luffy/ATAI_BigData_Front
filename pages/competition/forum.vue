<template>
  <el-container class="container">
<!--    <el-header class="mt10">-->
<!--      <el-form>-->
<!--        <el-form-item>-->
<!--          <el-input placeholder="请输入内容" class="input-with-select" style="width: 500px">-->
<!--            <el-button @click.native="gotoPage(1)" slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
<!--          <el-button style="margin-left:390px;" type="primary">-->
<!--            <i class="el-icon-edit"></i>-->
<!--            发布文章-->
<!--          </el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-header>-->
    <el-container>
      <!--      <el-empty description="还没有内容，赶紧去“等待回答”贡献第一条内容吧～"></el-empty>-->
      <el-main>
        <div class="me-view-card">
          <!--            <div class="me-view-comment">-->
          <div>
            <div class="me-view-comment-write" style="margin-bottom: 20px;">
              <el-row :gutter="20">
                <el-col :span="20" style="display:flex;align-items:center;">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="你的评论..."
                    class="me-view-comment-text"
                    v-model="comment.content"
                    resize="none"
                    style="width:90%;margin-right:16px"
                  ></el-input>
                  <el-button type="primary" size="30" style="" @click="publishComment()">发表评论
                  </el-button>
                  <!--                    <emoji style="width: 700px;margin-top: 300px"></emoji>-->
                </el-col>
              </el-row>
            </div>

            <div class="me-view-comment-title">
              <span>共有 {{ commentCounts }} 条评论</span>
            </div>

            <commment-item
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="article.id"
              :index="index"
              :rootCommentCounts="comments.length"
              @getArticle="getArticle"
              :key="c.id"
            ></commment-item>
          </div>
        </div>
      </el-main>

<!--      <el-main>
        <el-card style="width:900px">
          <el-row>
            <el-col :span="24" class="fsize18 fw6 mb10">2023-04-13 23:00:46</el-col>
            <el-col :span="24" class="mb10">sss</el-col>
            <el-row>
              <el-col :span="1" justify="start">
                <el-image
                  style="width: 20px; height: 20px;"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  fit="fill"
                ></el-image>
              </el-col>
              <el-col :span="4" justify="start">
                <header class="dateset-title">saddsaaaaaaaa</header>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
      </el-main>-->
    </el-container>
  </el-container>
</template>

<script>
import CommmentItem from "@/components/comment/CommentItem";
import blogApi from "@/api/blog";
import commentApi from "@/api/comment";
import cookie from "js-cookie";
import default_avatar from "@/assets/img/tipQe.png";
import emoji from "@/components/emoji"


export default {
  name: "forum",
  created() {
    this.getArticle();
  },
  watch: {
    $route: "getArticle"
  },
  components: {
    CommmentItem, emoji
  },
  data() {
    return {
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        nickname: "",
        authorId: "",
        avatar: "",
        content: "",
        contentId: "",
        tags: [],
        tag: "",
        category: {},
        gmtCreate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview"
        }
      },
      competitionId: "",
      comments: [],
      commentCounts: 0,
      comment: {
        article: {},
        content: ""
      }
    };
  },
  computed: {
    avatar() {
      // let avatar = this.$store.state.avatar
      if (avatar.length > 0) {
        return avatar;
      }
      return default_avatar;
    }
  },
  methods: {
    getArticle() {
      this.getCommentsByArticle();
    },
    publishComment() {
      // debugger
      let that = this;
      // debugger
      const token = cookie.get("ATAI_BigData_token");
      // 如果未登录，提示登录
      if (token) {
        if (!that.comment.content) {
          return;
        }
        that.comment.articleId = this.$route.params.id;
        commentApi
          .publishComment(that.comment)
          .then(response => {
            // debugger
            that.$message({type: 'success', message: '评论成功', showClose: true})
            that.comment.content = "";
            this.getArticle();
          })
          .catch(error => {
            if (error !== "error") {
              that.$message({
                type: "error",
                message: "评论失败",
                showClose: true
              });
            }
          });
      } else {
        // debugger
        this.$message({
          type: "info",
          message: "请先登录️再进行下一步操作"
        });

        //vue路由跳转

        this.$router.push({
          path: "/login"
        });
      }
    },
    getCommentsByArticle() {
      // debugger
      let that = this;
      commentApi
        .getCommentsByArticle(1, 2, this.$route.params.id)
        .then(response => {
          // debugger
          that.comments = response.data.data.data;
          that.commentCounts = response.data.data.data.length;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true
            });
          }
        });
    }
  },
};
</script>

<style>
.me-view-body {
  margin: 20px auto 140px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  padding: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}
</style>
