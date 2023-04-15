<template>
  <div class="bg-fa of">
    <section class="container bg-ff mt20 mb40 bradius">
      <el-form :model="dataset" ref="datasetForm" label-width="120px" class="mt20 mr30">
        <el-form-item label="封面图片  ">
          <el-image :src="dataset.image">
          </el-image>
        </el-form-item>

        <el-form-item required label="数据集名称" prop="name"  :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
          <el-input v-model="dataset.name" style="width: 340px"/>
        </el-form-item>

        <el-form-item required label="数据集简介" prop="intro"  :rules="[{ required: true, message: '请输入简介', trigger: 'blur' }]">
          <el-input v-model="dataset.intro" :rows="5" type="textarea"/>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item required label="数据集文件"  :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]">
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
        <!-- 截止日期 -->
        <el-form-item required label="数据集类别" prop="category" :rules="[{ required: true, message: '请选择类别', trigger: 'blur' }]">
          <el-radio-group v-model="dataset.category" size="mini">
            <el-radio label="互联网" border>互联网</el-radio>
            <el-radio label="金融" border>金融</el-radio>
            <el-radio label="语言学" border>语言学</el-radio>
            <el-radio label="卫生保健" border>卫生保健</el-radio>
            <el-radio label="人口统计学" border>人口统计学</el-radio>
            <el-radio label="商业" border>商业</el-radio>
            <el-radio label="教育" border>教育</el-radio>
            <el-radio label="农业" border>农业</el-radio>
            <el-radio label="政治" border>政治</el-radio>
            <el-radio label="其他" border>其他</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('datasetForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </section>

  </div>
</template>
<script>
// 引入调用 dataset.js文件
import datasetApi from '@/api/dataset'
import cookie from "js-cookie";

export default {
  data() {
    return {
      dataset: {
        userId:'',
        image: 'https://wid.s3.cn-north-1.amazonaws.com.cn/production/datasets/bgmap/90ffbe6e-3c48-48f1-be5a-eb851080d34e.png',
        name: '',
        intro: '',
        dataset: '',
        category: ''
      },
      submitCounts: 5,
      fileUploadBtnText: '上传到服务器', // 按钮文字
      fileUploadBtnText1: '上传到服务器', // 按钮文字
      BASE_API: "http://localhost:8666", // 接口API地址
      saveBtnDisabled: false, // 保存按钮是否禁用
      importBtnDisabled: false, // 按钮是否禁用,
      importBtnDisabled1: false, // 按钮是否禁用,
      loading: false,
      loading1: false,
      src: "https://wid.s3.cn-north-1.amazonaws.com.cn/production/datasets/bgmap/90ffbe6e-3c48-48f1-be5a-eb851080d34e.png"
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
        // 清空表单即清空 dataset
        this.dataset = {
          userId:'',
          image: 'https://wid.s3.cn-north-1.amazonaws.com.cn/production/datasets/bgmap/90ffbe6e-3c48-48f1-be5a-eb851080d34e.png',
          name: '',
          intro: '',
          dataset: '',
          category: []
        }
      }
    },
    // 根据比赛id查到比赛信息 回显操作
    getInfo(id) {
      datasetApi
        .getDataset(id)
        .then(response => {
          this.dataset = response.data.dataset;
        })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    // 保存按钮调用的方法
    saveOrUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断修改或添加 dataset 是否有id
          if (!this.dataset.id) {
            const loginCookie = cookie.get("ATAI_BigData_ucenter")
            if (loginCookie !== undefined && loginCookie !== '') {
              const loginInfo = JSON.parse(cookie.get("ATAI_BigData_ucenter"));
            }
            this.dataset.userId = loginInfo.id
            if(this.dataset.userId!==undefined){
              this.addDataset()
            }
          } else {
            this.updateDataset()
          }
        } else {
          return false;
        }
      });
    },

    // 添加比赛的方法
    addDataset() {
      datasetApi
        .addDataset(this.dataset)
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
            path: '/dataset'
          })
        })
    },

    // 修改比赛的方法
    updateDataset() {
      datasetApi
        .updateDataset(this.dataset)
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
            path: '/dataset'
          })
        })
    },
    submitUpload() {
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
    // 上传成功
    fileUploadSuccess(response) {
      // 提示信息
      if (response.success === true) {
        this.fileUploadBtnText = '导入成功'
        this.loading = false
        this.dataset.dataset = response.data.url
        console.log(this.dataset.dataset)
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

.bradius {
  border: 2px solid white;
  border-radius: 15px;
}

.dataset-checkbox {
  margin-bottom: 20px;
}
</style>
