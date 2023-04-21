<template>
  <article class="col-7 fl" style="background-color:#fff">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="基本资料" class="current">
              个人简历
            </a>
          </section>
        </div>
        <!-- 表格 -->
        <el-form show-message label-width="80px" size="medium" :model="memberResume" ref="memberResume">
          <el-form-item label="姓名">
            <el-input v-model="memberResume.name" style="width:220px"/>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number style="width:180px" v-model="memberResume.age" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="memberResume.sex" style="width:110px" clearable placeholder="请选择">
              <el-option :value="1" label="男"/>
              <el-option :value="0" label="女"/>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="memberResume.mobile" style="width:300px"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="memberResume.email" style="width:300px"/>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="memberResume.school" style="width:330px" placeholder="请选择学校"/>
            <el-select v-model="memberResume.education" style="width:120px" placeholder="请选择学历">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="memberResume.address" style="width:450px"/>
          </el-form-item>
          <el-form-item label="项目经历">
            <el-input v-model="memberResume.experience" style="width:560px" type="textarea" :rows="4"/>
          </el-form-item>
          <el-form-item label="荣誉奖项">
            <el-input v-model="memberResume.reward" style="width:560px" type="textarea" :rows="4"/>
          </el-form-item>
          <el-form-item label="个人技能">
            <el-input v-model="memberResume.skill" style="width:560px" type="textarea" :rows="4"/>
          </el-form-item>
          <el-form-item style="margin-top: 40px;margin-bottom: 40px">
            <el-button :disabled="saveBtnDisabled" plain="true" type="primary" @click="updateResume">保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </article>
</template>
<script>
//引入调用ucenter.js文件
import ucenterApi from '@/api/ucenter'
//引入调用js-cookie
import cookie from 'js-cookie'
import error from "@/layouts/error";

export default {
  inject: ['reload'],
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        nickname: '',
        avatar: '',
      },
      memberResume: {
        id: '',
        name: '',
        age: 0,
        sex: 1,
        mobile: '',
        email: '',
        school: '',
        education: '',
        address: '',
        experience: '',
        reward: '',
        skill: ''
      },
      saveBtnDisabled: false, //保存按钮是否禁用
    }
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    this.showInfoFromCookie()
    if (this.memberResume.id) {
      this.getResumeById()
    }
  },
  methods: {
    showInfoFromCookie() {
      //从cookie中获取用户信息
      var userStr = cookie.get("ATAI_BigData_ucenter")
      //userStr是字符串   需要转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
        this.memberResume.id = this.loginInfo.id
      }
    },
    getResumeById() {
      ucenterApi.getResumeById(this.memberResume.id)
        .then(response => { //修改成功
          console.log(response.data)
          this.memberResume = response.data.data.resume
        })
    },
    updateResume() {
      ucenterApi.updateResume(this.memberResume)
        .then(response => { //修改成功
          this.$message({
            type: 'success',
            message: '修改成功！ 🧙‍♂️'
          });
          this.getResumeById()
          console.log(response.data)
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}

.el-dialog--center .el-dialog__body {
  padding-bottom: 5px;
}
</style>
