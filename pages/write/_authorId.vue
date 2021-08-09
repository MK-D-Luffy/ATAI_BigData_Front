<template>
  <section class="" style="margin-left:auto;margin-right:auto;width:1320px">
    <div id="write">
      <el-container>
        <el-container class="me-area me-write-box">
          <el-main class="me-write-main">
            <div class="me-write-title">

              <el-input
                resize="none"
                style="width:85%;max-width:85%;"
                type="textarea"
                v-model="articleForm.title"
                placeholder="请输入标题"
                :maxlength="36"
                :rows="1"
                class="me-write-input">
              </el-input>

              <el-button round @click="cancel" type="danger">取消</el-button>
              <el-button round @click="publishShow" type="primary">发布</el-button>

            </div>
            <div id="placeholder" style="visibility: hidden;height: 89px;display: none;"></div>
            <markdown-editor :editor="articleForm.editor" class="me-write-editor"></markdown-editor>
          </el-main>
        </el-container>

        <el-dialog title="摘要 分类 标签"
                   :visible.sync="publishVisible"
                   :close-on-click-modal=false
                   custom-class="me-dialog">

          <el-form :model="articleForm" ref="articleForm" :rules="rules">
            <el-form-item prop="summary">
              <el-input type="textarea"
                        v-model="articleForm.summary"
                        style="width:100%"
                        :rows="6"
                        placeholder="请输入摘要">
              </el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="category">
              <el-select v-model="articleForm.category" value-key="id" placeholder="请选择文章分类">
                <el-option v-for="c in categorys" :key="c.id" :label="c.categoryname" :value="c"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文章标签" prop="tags">
              <el-checkbox-group v-model="articleForm.tags">
                <el-checkbox v-for="t in tags" :key="t.id" :label="t.tagname" name="tags">{{ t.tagname }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="publishVisible = false">取 消</el-button>
            <el-button type="primary" @click="publish('articleForm')">发布</el-button>
          </div>
        </el-dialog>
      </el-container>
    </div>
  </section>
</template>

<script>
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import blogApi from '@/api/blog'
import {Message} from "element-ui";  // 引入

export default {
  name: 'BlogWrite',
  beforeRouteEnter(to, from, next) {
    let authorId = to.params.authorId
    if (authorId) {
      blogApi.getMyArticleList(1, 2).then(response => {
        let articlesList = response.data.data.records
        let flag = false
        for (let article of articlesList) {
          if (authorId === article.id) {
            flag = true
            next()
          }
        }
        if (!flag) {
          Message.error('您没有权限操作该文章')
          next("/blog")
        }
      })
    }
    next()
  },
  created() {
    this.authorId = this.$route.params.authorId
  },
  mounted() {
    if (this.authorId) {
      this.getArticleById(this.authorId)
    }

    this.getCategorysAndTags()
    // this.editorToolBarToFixedWrapper = this.$_.throttle(this.editorToolBarToFixed, 200)

    window.addEventListener('scroll', this.editorToolBarToFixedWrapper, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.editorToolBarToFixedWrapper, false)
  },
  watch: {
    title: function () {

    }
  },
  data() {
    return {
      publishVisible: false,
      categorys: [],
      tags: [],
      // title:'',
      authorId: '',
      articleForm: {
        id: '',
        title: '',
        summary: '',
        category: '',
        tags: [],
        editor: {
          value: '',
          ref: '',//保存mavonEditor实例  实际不该这样
          default_open: 'edit',
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            imagelink: true, // 图片链接
            code: true, // code
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            help: true, // 帮助

            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空

            alignleft: true,
            aligncenter: true,
            alignright: true,

            navigation: true, // 导航目录

            subfield: true, // 单双栏模式(快捷键是F12)
            preview: true, // 预览
          }
        }
      },
      rules: {
        summary: [
          {required: true, message: '请输入摘要', trigger: 'blur'},
          {max: 80, message: '不能大于80个字符', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请选择文章分类', trigger: 'change'}
        ],
        tags: [
          {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    title() {
      return '写文章 - For Fun'
    }
  },
  methods: {
    getArticleById(id) {
      let that = this
      blogApi.viewArticle(id).then(response => {
        Object.assign(that.articleForm, response.data.data.data)
        that.articleForm.editor.value = response.data.data.data.content
        that.articleForm.contentId = response.data.data.data.contentId
        let tags = response.data.data.data.tag.split(",")
        this.articleForm.tags = tags

      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '文章加载失败', showClose: true})
        }
      })
    },
    publishShow() {
      if (!this.articleForm.title) {
        this.$message({message: '标题不能为空哦', type: 'warning', showClose: true})
        return
      }

      if (this.articleForm.title.length > 36) {
        this.$message({message: '标题不能大于36个字符', type: 'warning', showClose: true})
        return
      }
      if (!this.articleForm.editor.value) {
        this.$message({message: '内容不能为空哦', type: 'warning', showClose: true})
        return
      }

      this.publishVisible = true;
    },
    //文章发布
    publish(articleForm) {
      let that = this

      // this.$refs[articleForm].validate((valid) => {
      // if (valid) {

      let tag = this.articleForm.tags;
      let tags = "";
      for (let i = 0; i < tag.length; i++) {
        tags = tags + tag[i]
        if (i < tag.length - 1)
          tags += ","
      }
      let article = {
        id: this.articleForm.id,
        title: this.articleForm.title,
        summary: this.articleForm.summary,
        category: "",
        tag: tags,
        bodyId: this.articleForm.contentId,
        content: this.articleForm.editor.value,
        contentHtml: this.articleForm.editor.ref.d_render
      }
      if (typeof this.articleForm.category === 'string') {
        article.category = this.articleForm.category
      } else {
        article.category = this.articleForm.category.categoryname
      }


      this.publishVisible = false;

      let loading = this.$loading({
        lock: true,
        text: '发布中，请稍后...'
      })

      blogApi.publishArticle(article).then((response) => {
        // debugger
        loading.close();
        that.$message({message: '发布成功啦', type: 'success', showClose: true})
        that.$router.push({path: `/blog/${response.data.data.articleId}`})

      }).catch((error) => {
        loading.close();
        if (error !== 'error') {
          that.$message({message: error, type: 'error', showClose: true});
        }
      })

      // } else {
      //   return false;
      // }
      // } );
    },
    cancel() {
      this.$confirm('文章将不会保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/')
      })
    },
    getCategorysAndTags() {
      let that = this
      blogApi.getCategorys()
        .then(response => {
          that.categorys = response.data.data.data
        }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
        }
      })
      that.tags = [{
        "avatar": "/tag/java.png",
        "id": 1,
        "tagname": "Java"
      },
        {
          "avatar": "/tag/",
          "id": 2,
          "tagname": "Spring"
        },
        {
          "avatar": "/tag/hibernate.svg",
          "id": 3,
          "tagname": "Hibernate"
        },
        {
          "avatar": "/tag/maven.png",
          "id": 4,
          "tagname": "Maven"
        },
        {
          "avatar": "/tag/html.png",
          "id": 5,
          "tagname": "Html"
        },]

    },
    editorToolBarToFixed() {

      let toolbar = document.querySelector('.v-note-op');
      let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
      if (curHeight >= 160) {
        document.getElementById("placeholder").style.display = "block"; //bad  用计算属性较好
        toolbar.classList.add("me-write-toolbar-fixed");
      } else {
        document.getElementById("placeholder").style.display = "none";
        toolbar.classList.remove("me-write-toolbar-fixed");
      }
    }
  },
  components: {
    // 'base-header': BaseHeader,
    'markdown-editor': MarkdownEditor
  }
}
</script>

<style>
/*修改文章展示部分*/
@import '../../assets/css/v-note-show.css';

.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}

.me-write-info {
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
}

.me-write-btn {
  margin-top: 10px;
}

.me-write-box {
  /* max-width: 700px; */
  /*margin: 40px auto 0;*/
}

.me-write-main {
  padding: 0;
}

.me-write-title {
  /* max-width: 700px; */
  /* padding: 80px auto 0; */
  margin: 20px 20px 20px 10px;
}

.me-write-input textarea {
  font-size: 28px;
  font-weight: 600;

  height: 20px;
  border: none;
}

.el-textarea {
  width: 100%;
}

.me-write-editor {
  min-height: 770px !important;
}

.v-note-wrapper {
  min-height: 600px !important;
  max-height: 700px !important;
}

/*修改导航栏的样式*/
.v-note-navigation-wrapper {
  opacity: 0.08 !important;
}

.v-note-navigation-wrapper:hover {
  opacity: 0.9 !important;
}

.v-note-navigation-wrapper .v-note-navigation-content h1,
.v-note-navigation-wrapper .v-note-navigation-content h2,
.v-note-navigation-wrapper .v-note-navigation-content h3,
.v-note-navigation-wrapper .v-note-navigation-content h4,
.v-note-navigation-wrapper .v-note-navigation-content h5,
.v-note-navigation-wrapper .v-note-navigation-content h6 {
  margin: 6px 0 !important;
  font-weight: 400 !important;
  font-size: 17px;
  color: #33302f !important;
  cursor: pointer;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  border-bottom: none;
}

.v-note-navigation-title {
  height: 48px;
  width: 100%;
  border-bottom: 1px solid #f2f6fc;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  line-height: 50px;
  font-size: 18px !important;
  font-weight: 600 !important;
  margin: 5px 0;
  box-sizing: border-box;
  padding: 0 12px 0 18px;
}

.v-note-panel .me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-write-toolbar-fixed {
  position: fixed;
  width: 700px !important;
  top: 60px;
}

.v-note-op {
  box-shadow: none !important;
}

.auto-textarea-input, .auto-textarea-block {
  font-size: 18px !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  height: 100%;
  padding: 8px 25px 15px 25px !important;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}

</style>
