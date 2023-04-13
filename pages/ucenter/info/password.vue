<template>
  <article class="col-7 fl userInfo">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="密码设置" class="current">
              修改密码
            </a>
          </section>
        </div>

        <!-- 手机号 改 邮箱-->
        <div style="margin-top:30px;">
          <el-form label-position="right" status-icon style="width: 75%" label-width="70px" :model="params"
                   ref="paramForm">
            <el-form-item>
              <el-radio-group v-model="params.codeType">
                <el-radio-button label="2">邮箱验证</el-radio-button>
                <el-radio-button label="1">手机号验证</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--手机号-->
            <el-form-item v-if="params.codeType==='1'" label="手机号" class="input-prepend restyle no-radius" prop="mobile"
                          :rules="[{ required: true, message: '请输入该用户手机号', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
              <el-input type="text" placeholder="请输入该用户的手机号" v-model="params.mobile"/>
            </el-form-item>

            <!--邮箱-->
            <el-form-item v-if="params.codeType==='2'" label="邮箱" class="input-prepend restyle no-radius" prop="email"
                          :rules="[{ required: true, message: '请输入该用户的邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
              <el-input type="text" placeholder="请输入该用户的邮箱" v-model="params.email"/>
            </el-form-item>


            <!-- 验证码 -->
            <el-form-item label="验证码" class="input-prepend restyle no-radius" prop="code"
                          :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
              <div style="width: 100%;display: block;float: right;position: relative">
                <el-input style="width:71%;margin-right: 20px" type="text" placeholder="验证码" v-model="params.code"/>
                <el-button :disabled="!sending" type="primary" @click="getCodeFun()"> {{ codeTest }}</el-button>
              </div>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" class="input-prepend" prop="password"
                          :rules="[{ validator: checkPassword, trigger: 'blur' }]">
              <el-input type="password" placeholder="设置新密码"
                        v-model="params.password"
                        autocomplete="off"/>
            </el-form-item>

            <el-form-item label="确认密码" class="input-prepend" prop="password2"
                          :rules="[{ validator: checkPassword2, trigger: 'blur' }]">
              <el-input type="password" placeholder="设置新密码"
                        v-model="params.password2"
                        autocomplete="off"/>
            </el-form-item>

            <el-form-item style="margin-top: 32px">
              <el-button :disabled="saveBtnDisabled" type="primary" @click="submitChange('paramForm')">修改</el-button>
              <el-button @click="resetForm('paramForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      </section>
    </div>
  </article>
</template>
<script>
//引入调用login.js文件
import loginApi from '@/api/login'
//引入调用register.js文件
import registerApi from '@/api/register'
//引入调用ucenter.js文件
import ucenterApi from '@/api/ucenter'
//引入调用js-cookie
import cookie from 'js-cookie'
import {Encrypt} from "@/utils/AESUtils";

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        avatar: '',
        nickname: '',
      },
      memberInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: '',
        sign: '',
      },
      params: { //封装修改密码输入的数据
        id: '',
        mobile: '', //手机号
        email: '', //邮箱
        code: '', //验证码
        password: '',
        password2: '',//确认密码
        codeType: '2'
      },
      // checkPass: '',//确认密码
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: '获取验证码',
      saveBtnDisabled: false, //保存按钮是否禁用,
      validateEmail: false,
      validatePhone: false
    }
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    // if (this.token) { //判断路径是否有token值
    //   this.wxLogin()
    // }
    this.showInfoFromCookie()
  },

  methods: {
    //修改密码提交的方法
    submitChange(formName) {
      this.params.password = Encrypt(this.params.password.trim())
      this.params.password2 = Encrypt(this.params.password2.trim())
      if (this.params.codeType === '1') {
        this.params.email = ''
      } else if (this.params.codeType === '2') {
        this.params.mobile = ''
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ucenterApi.changePassword(this.params)
            .then(response => {
              if (response.data.success) {
                this.$message({
                  type: 'success',
                  message: "修改成功,请重新登录！"
                })
                //跳转到登陆页面
                this.$router.push({
                  path: '/login'
                })
              }
            }).catch(error => {
            console.log(error);
          })
        } else {
          return false;
        }
      })
    },

    //给已经输入的手机号发送验证码
    getCodeFun() {
      if (!this.sending) {
        return
      }
      //点完发送  180秒内不让再发
      if (this.validateEmail || this.validatePhone) {
        this.sending = false
      }
      // debugger;
      if (this.params.codeType === "1") {
        if (this.params.mobile !== '') {
          registerApi.sendCodeByPhone(this.params.mobile)
            .then(response => {
              //提示发送验证码成功
              this.$message({
                type: 'success',
                message: "验证🐎已发送🆗"
              })

              //调用倒计时的方法
              this.timeDown()
            }).catch(error => { //请求失败
            //如果发送失败,就设置可以发送
            this.sending = true
            console.log(error)
          })
        } else {
          this.$message({
            type: 'warning',
            message: "请先输入手机号"
          })
        }
      } else if (this.params.codeType === "2") {
        if (this.params.email !== '') {
          registerApi.sendCodeByEmail(this.params.email)
            .then(response => {
              //提示发送验证码成功
              this.$message({
                type: 'success',
                message: "验证🐎已发送🆗"
              })
              //调用倒计时的方法
              this.timeDown()
            }).catch(error => { //请求失败
            //如果发送失败,就设置可以发送
            this.sending = true
            console.log(error)
          })
        } else {
          this.$message({
            type: 'warning',
            message: "请先输入邮箱"
          })
        }
      }
    },

    //定时器  发送验证码倒数
    timeDown() {
      let result = setInterval(() => { //setInterval定时器
        --this.second;
        this.codeTest = this.second + "秒后可再发"
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.second = 60;
          this.codeTest = "获取验证码"
        }
      }, 1000);
    },

    save() {
      ucenterApi.updateMemberInfo(this.memberInfo)
        .then(response => { //修改成功
          //提示成功
          this.$message({
            type: 'success',
            message: '修改成功！ 🧙‍♂️'
          });
          this.showInfoFromCookie()
        })
    },

    //从cookie中获取用户信息
    showInfoFromCookie() {
      //从cookie中获取用户信息
      var userStr = cookie.get("ATAI_BigData_ucenter")
      //userStr是字符串   需要转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
        this.params.id = this.loginInfo.id
        loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
          this.memberInfo = response.data.data.memberInfo
        })
      }
    },

    //微信登录显示的方法
    wxLogin() {
      //把token值放到cookie里面
      cookie.set('ATAI_BigData_token', this.token)
      cookie.set('ATAI_BigData_ucenter', '')
      //调用接口，根据token值获取用户信息
      loginApi.getLoginMemberInfo()
        .then(response => {
          this.loginInfo = response.data.data.userInfo
        })
      loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
        this.memberInfo = response.data.data.memberInfo
      })
    },

    //手机号格式校验 自定义规则
    checkPhone(rule, value, callback) {
      // debugger;
      if (!/^1[34578]\d{9}$/.test(value)) {
        this.validatePhone = false
        return callback(new Error("手机号码格式不正确"));
      } else {
        this.validatePhone = true
      }
      return callback();
    },

    //邮箱格式校验
    checkEmail(rule, value, callback) {
      // debugger;
      const mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (rule.required && !value) {
        this.validateEmail = false
        return callback(new Error("不能为空"));
      }
      if (value) {
        if (!mal.test(value)) {
          this.validateEmail = false
          callback(new Error("请输入正确邮箱"));
        } else {
          this.validateEmail = true
          callback();
        }
      }
    },

    checkPassword(rule, value, callback) {
      // debugger
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!(value.length >= 6 && value.length <= 32)) {
        callback(new Error('密码长度应在6个到32个字符之间'));
      } else {
        callback()
      }
    },

    checkPassword2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.params.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
