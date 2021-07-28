<template>
  <div class="me-view-body" style="background-color: #fff">
    <section class="container">
      <el-container class="me-view-container">
        <el-main>
          <div class="me-view-card">
            <h1 class="me-view-title">{{ article.title }}</h1>

            <div class="me-view-author">
              <a class>
                <img class="me-view-picture" :src="article.avatar"/>
              </a>
              <div class="me-view-info">
                <span>{{ article.nickname }}</span>
                <div class="me-view-meta">
                  <span>{{ article.gmtCreate }}</span>
                  <span>阅读 {{ article.viewCounts }}</span>
                  <span>评论 {{ article.commentCounts }}</span>
                </div>
              </div>
              <el-button
                v-if="this.loginInfo.id==this.article.authorId"
                @click="editArticle()"
                style="position: absolute;left: 82%;top:265px"
                type="primary"
                size="mini"
                round
                icon="el-icon-edit"
              >编辑
              </el-button>
              <el-button
                v-if="this.loginInfo.id==this.article.authorId"
                @click="removeArticle()"
                style="position: absolute;left: 75%;top:265px;"
                type="danger"
                size="mini"
                round
                icon="el-icon-edit"
              >删除
              </el-button>
            </div>

            <div class="me-view-content">
              <markdown-editor :editor="article.editor"></markdown-editor>
            </div>

            <div class="me-view-tag">
              标签：
              <!--<el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagname}}</el-tag>-->
              <el-button
                size="mini"
                type="primary"
                v-for="t in article.tags"
                :key="t.id"
                round
                plain
              >{{ t }}
              </el-button>
            </div>

            <div class="me-view-tag">
              文章分类：
              <!--<span style="font-weight: 600">{{article.category.categoryname}}</span>-->
              <el-button size="mini" type="primary" round plain>{{ article.category }}</el-button>
            </div>

            <div class="me-view-end">
              <el-alert title="文章End..." type="success" center :closable="false"></el-alert>
            </div>

            <div class="me-view-comment">
              <div class="me-view-comment-write">
                <el-row :gutter="25" style="position:relative">
                  <el-col :span="1.5" style="position:relative;top:8px;">
                    <a class>
                      <img class="me-view-picture" :src="article.avatar"/>
                    </a>
                  </el-col>
                  <el-col :span="20">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="你的评论..."
                      class="me-view-comment-text"
                      v-model="comment.content"
                      resize="none"
                    ></el-input>
                  </el-col>
                  <el-col :span="1.5" style="position:relative;top:8px;">
                    <el-button type="primary" @click="publishComment()">评论</el-button>
                  </el-col>
                </el-row>
              </div>

              <div class="me-view-comment-title">
                <span>{{ article.commentCounts }} 条评论</span>
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
      </el-container>
    </section>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import CommmentItem from "@/components/comment/CommentItem";
import blogApi from "@/api/blog";
import commentApi from "@/api/comment";
import cookie from "js-cookie";
import default_avatar from "@/assets/img/tipQe.png";

export default {
  name: "BlogView",
  created() {
    this.getArticle();
    debugger;
  },
  watch: {
    $route: "getArticle"
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
      loginInfo: {},
      comments: [],
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
    editArticle() {
      this.$router.push({path: `/write/${this.article.id}`});
    },
    removeArticle() {
      this.$confirm('确定要删除该文章吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        blogApi
          .removeMyArticle(that.$route.params.id)
          .then(response => {
            this.$router.push({path: `/blog/`});
            that.$message({
              type: "success",
              message: "文章删除成功",
              showClose: true
            });
          })
          .catch(error => {
            if (error !== "error") {
              that.$message({
                type: "error",
                message: "文章删除失败",
                showClose: true
              });
            }
          });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作",
          showClose: true
        });
      });
      // let that = this;
      // blogApi
      //   .removeMyArticle(that.$route.params.id)
      //   .then(response => {
      //     this.$router.push({path: `/blog/`});
      //   })
      //   .catch(error => {
      //     if (error !== "error") {
      //       that.$message({
      //         type: "error",
      //         message: "文章删除失败",
      //         showClose: true
      //       });
      //     }
      //   });
    },

    getArticle() {
      let that = this;
      blogApi
        .viewArticle(that.$route.params.id)
        .then(response => {
          debugger;
          Object.assign(that.article, response.data.data.data);
          // that.article = response.data.data
          that.article.editor.value = response.data.data.data.content;
          that.article.tags = that.article.tag.split(",");
          var userStr = cookie.get("ATAI_BigData_ucenter");
          //userStr是字符串   需要转换为json对象
          if (userStr) {
            this.loginInfo = JSON.parse(userStr);
          }

          that.getCommentsByArticle();
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    },
    publishComment() {
      debugger;
      let that = this;
      debugger;
      const token = cookie.get("ATAI_BigData_token");
      // 如果未登录，提示登录
      if (token) {
        if (!that.comment.content) {
          return;
        }
        that.comment.articleId = that.article.id;
        commentApi
          .publishComment(that.comment)
          .then(response => {
            debugger;
            // that.$message({type: 'success', message: '评论成功', showClose: true})
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
        debugger;
        this.$message({
          type: "error",
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
        .getCommentsByArticle(1, 2, that.article.id)
        .then(response => {
          // debugger
          that.comments = response.data.data.data;
          console.log(that.comments);
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
  components: {
    "markdown-editor": MarkdownEditor,
    CommmentItem
  }
};
</script>

<style>
/*修改文章展示部分*/
@import '../../assets/css/v-note-show.css';

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
  margin-top: 24px;
  margin-bottom: 8px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
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

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #ff7875;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 35px;
  padding-bottom: 15px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper {
  max-height: unset !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}

.v-note-wrapper .v-note-panel .v-note-show.single-show {
  -webkit-box-flex: 0;
  flex: 0 0 100% !important;
  width: 100%;
}

</style>
