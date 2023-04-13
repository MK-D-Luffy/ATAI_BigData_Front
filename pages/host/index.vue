<template>
  <div class="bg-fa of">
    <section class="container bg-ff mt20 mb40 bradius">
      <el-form label-width="120px" class="mt20 mr30">
        <el-form-item label="比赛名称">
          <el-input v-model="competition.name" style="width: 340px"/>
        </el-form-item>

        <el-form-item label="比赛类型">
          <el-select v-model="competition.level" clearable placeholder="请选择">
            <!--
              数据类型一定要和取出的json中的一致，否则没法回填 classList
              value使用动态绑定的值，比赛类型由1 2 3代替
                      -->
            <a href="/teacher"></a>
            <!-- <a :title="item.title" href="#" @click="searchOne(item.id,index)">{{item.title}}</a> -->
            <el-option
              v-for="(item,index) in classList"
              :key="index"
              :class="{active:oneIndex==index}"
              :value="item.title"
              :label="item.title"
            />

            <!-- <el-option :value="1" label="新人赛" />
            <el-option :value="2" label="创新应用大赛" />
                      <el-option :value="3" label="算法大赛" />-->
          </el-select>
        </el-form-item>
        <el-form-item label="比赛简介">
          <el-input v-model="competition.intro" :rows="5" type="textarea"/>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="赛题描述">
          <!--          <tinymce :height="200" v-model="competition.description"/>-->
          <markdown-editor v-model="competition.description"
                           :editor="editor" :subfield="false" class="me-write-editor"></markdown-editor>
        </el-form-item>
        <!-- 截止日期 -->
        <el-form-item label="截止日期">
          <el-date-picker
            v-model="competition.deadline"
            :picker-options="pickerOptions"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="可提交次数">
          <el-input-number
            :min="1"
            v-model="submitCounts"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="奖金">
          <el-input-number
            :min="0"
            v-model="competition.money"
            controls-position="right"
            placeholder="请填写比赛的奖金"
          />
        </el-form-item>
        <el-form-item label="选择数据集">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :disabled="importBtnDisabled"
            :limit="1"
            :action="BASE_API+'/eduoss/fileoss'"
            name="file"
            accept=".doc, .docx,.txt, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              :loading="loading"
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >{{ fileUploadBtnText }}
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择结果集">
          <el-upload
            ref="upload1"
            :auto-upload="false"
            :on-success="fileUploadSuccess1"
            :on-error="fileUploadError"
            :disabled="importBtnDisabled1"
            :limit="1"
            :action="BASE_API+'/eduoss/fileoss'"
            name="file"
            accept=".xls, .xlsx, .txt, .zip, .rar"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              :loading="loading1"
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload1"
            >{{ fileUploadBtnText1 }}
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
      </el-form>
    </section>

  </div>
</template>
<script>
// 引入调用 competition.js文件
import competitionApi from '@/api/competition'
// 引入Tinymce富文本编辑器
import MarkdownEditor from '@/components/markdown/MarkdownEditor'

export default {
  components: {MarkdownEditor}, // 组件的声明
  data() {
    return {
      competition: {
        name: '',
        level: 1,
        intro: '',
        description: '',
        deadline: '00:00:00',
        cover: '',
        result: '',
        money: 0,
        submitCounts: 5,
      }, // v-model双向绑定
      submitCounts: 5,
      fileUploadBtnText: '上传到服务器', // 按钮文字
      fileUploadBtnText1: '上传到服务器', // 按钮文字
      BASE_API: "http://localhost:8666", // 接口API地址
      saveBtnDisabled: false, // 保存按钮是否禁用
      importBtnDisabled: false, // 按钮是否禁用,
      importBtnDisabled1: false, // 按钮是否禁用,
      loading: false,
      loading1: false,
      classList: ['官方赛','训练赛','新人赛'],
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
    }
  },
  watch: {
    // vue的监听
    $route(to, from) {
      // 路由变化方式，路由一发生变化 就执行方法
      this.init()
    }
  },
  created() {
    // 页面渲染前执行
    this.init()
  },
  methods: {
    init() {
      // 判断路径有id值  修改操作
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        // 判断路径没有id值  添加操作
        // 清空表单即清空 competition
        this.competition = {
          name: '',
          level: '',
          intro: '',
          description: '',
          deadline: '',
          cover: '',
          result: '',
          money: ''
        } // v-model双向绑定
      }
      // this.getClassList()
    },
    // 根据比赛id查到比赛信息 回显操作
    getInfo(id) {
      competitionApi
        .getCompetitionById(id)
        .then(response => {
          this.competition = response.data.competition
        })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    // 保存按钮调用的方法
    saveOrUpdate() {
      this.competition.submitCounts = this.submitCounts;
      // 判断修改或添加 competition 是否有id
      if (!this.competition.id) {
        // 添加
        this.addCompetition()
      } else {
        // 修改
        this.updateCompetition()
      }
    },

    // 添加比赛的方法
    addCompetition() {
      competitionApi
        .addCompetitionInfo(this.competition)
        .then(response => {
          // 添加成功
          // 提示成功
          this.$message({
            type: 'success',
            message: '添加成功！ 😄'
          })
          // 回到比赛列表页面
          // vue路由跳转
          this.$router.push({
            path: '/competition'
          })
        })
    },

    // 修改比赛的方法
    updateCompetition() {
      competitionApi
        .updateCompetition(this.competition)
        .then(response => {
          // 修改成功
          // 提示成功
          this.$message({
            type: 'success',
            message: '修改成功！ 🧙‍♂️'
          })
          // 回到讲师列表页面
          // vue路由跳转
          this.$router.push({
            path: '/competition'
          })
        })
    },

    submitUpload() {
      debugger
      if (this.$refs.upload.$data.uploadFiles.length > 0) {
        this.fileUploadBtnText = '正在上传'
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit() // js:document.getElementById("upload:).submit()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择文件'
        })
      }
    },

    submitUpload1() {
      debugger
      if (this.$refs.upload1.$data.uploadFiles.length > 0) {
        this.fileUploadBtnText1 = '正在上传'
        this.importBtnDisabled1 = true
        this.loading1 = true
        this.$refs.upload1.submit() // js:document.getElementById("upload:).submit()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择文件'
        })
      }
    },

    // 上传成功
    fileUploadSuccess(response) {
      // 提示信息
      if (response.success === true) {
        this.fileUploadBtnText = '导入成功'
        this.loading = false
        this.competition.cover = response.data.url
        console.log(this.competition.cover)
        this.$message({
          type: 'success',
          message: response.message
        })
      } else {
        this.fileUploadBtnText = '重新上传'
        this.loading = false
        this.importBtnDisabled = false
        this.$message({
          type: 'warning',
          message: response.message
        })
      }
    },
    // 上传成功
    fileUploadSuccess1(response) {
      // 提示信息
      if (response.success === true) {
        this.fileUploadBtnText1 = '导入成功'
        this.loading1 = false
        this.competition.result = response.data.url
        console.log(this.competition.result)
        this.$message({
          type: 'success',
          message: response.message
        })
      } else {
        this.fileUploadBtnText1 = '重新上传'
        this.loading1 = false
        this.importBtnDisabled1 = false
        this.$message({
          type: 'warning',
          message: response.message
        })
      }
    },
    // 上传失败
    fileUploadError() {
      this.fileUploadBtnText = '重新上传'
      this.importBtnDisabled = false
      this.loading = false
      this.$message({
        type: 'error',
        message: '导入文件失败'
      })
    }
  }
}
</script>

<style scoped>
.active {
  background: #bdbdbd;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.greenBtn {
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
}

.redBtn {
  color: #FFF;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.orangeBtn {
  color: #FFF;
  background-color: rgb(246, 179, 80);
  border-color: rgb(246, 179, 80);
}

.purpleBtn {
  color: #FFF;
  background-color: rgb(114, 101, 230);
  border-color: rgb(114, 101, 230);
}

.bradius {
  border: 2px solid white;
  border-radius: 15px;
}
</style>
