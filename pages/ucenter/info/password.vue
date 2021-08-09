<template>
  <article class="col-7 fl userInfo"  >
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
        <div style="margin-right: 10%;">
          <el-form status-icon style="width: 90%" label-width="30px" :model="params" ref="params">
            <!--手机号-->
            <!--            <el-form-item class="input-prepend restyle no-radius" prop="mobile"-->
            <!--                          :rules="[{ required: true, message: '请输入该用户手机号', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">-->
            <!--              <div>-->
            <!--                <el-input type="text" placeholder="请输入该用户的手机号" v-model="params.mobile"/>-->
            <!--                <i class="iconfont icon-phone"/>-->
            <!--              </div>-->
            <!--            </el-form-item>-->

            <!--邮箱-->
            <el-form-item class="input-prepend restyle no-radius" prop="email"
                          :rules="[{ required: true, message: '请输入该用户的邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
              <div>
                <el-input type="text" placeholder="请输入该用户的邮箱" v-model="params.email"/>
                <!--                <i class="iconfont icon-phone"/>-->
              </div>
            </el-form-item>


            <!-- 验证码 -->
            <el-form-item class="input-prepend restyle no-radius" prop="code"
                          :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
              <div style="width: 100%;display: block;float: right;position: relative">
                <el-input type="text" placeholder="验证码" v-model="params.code"/>
                <!--                <i class="iconfont icon-phone" />-->
              </div>
              <div class="btn" style="position:absolute;right: 0;width: 15%;">
                <a v-if="sending" href="javascript:" type="button" @click="getCodeFun()" :value="codeTest"
                   style="border: none;background: none;text-decoration:none">{{ codeTest }}</a>
                <span v-else>
                  {{ codeTest }}
                </span>
              </div>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item class="input-prepend" prop="password"
                          :rules="[{ validator: checkPassword, trigger: 'blur' }]">
              <div>
                <el-input type="password" placeholder="设置新密码" v-model="params.password"/>
                <!--                <i class="iconfont icon-password" />-->
              </div>
            </el-form-item>

            <el-form-item>
              <el-button :disabled="saveBtnDisabled" plain="true" type="primary" @click="submitChange('params')">修改
              </el-button>
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
//引入调用js-cookie
import cookie from 'js-cookie'

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
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
      params: { //封装注册输入的数据
        // mobile: '', //手机号
        email: '', //邮箱
        code: '', //验证码
        nickname: '', //昵称
        password: ''
      },
      // checkPass: '',//确认密码
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: '获取验证码',
      saveBtnDisabled: false, //保存按钮是否禁用

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
      debugger
      loginApi.getValidateCode(this.params.email).then(response => {
        let code = response.data.data.code
        if (this.params.code === code) {
          //表单项进行遍历验证
          this.$refs[formName].validate((valid) => {
            if (valid) {
              loginApi.changePassword(this.params)
                .then(response => {
                  this.$message({
                    type: 'success',
                    message: "密码修改成功,请重新登录"
                  })
                  //跳转到登陆页面
                  this.$router.push({
                    path: '/login'
                  })
                }).catch(error => {
                console.log(error);
              })
            } else {
              return false;
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: "验证码错误"
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },

    //给已经输入的手机号发送验证码
    getCodeFun() {
      // this.params.password
      // debugger
      if (this.params.email !== '' && this.sending) {
        registerApi.sendCodeByEmail(this.params.email)
          .then(response => {
            //提示发送验证码成功
            this.$message({
              type: 'success',
              message: "验证🐎已发送🆗"
            })
            //点完发送  60秒内不让再发
            this.sending = false
            //调用倒计时的方法
            this.timeDown()
          }).catch(error => { //请求失败
          console.log(error)
        })
      } else {
        this.$message({
          type: 'warning',
          message: "请先输入邮箱"
        })
      }
    },

    //定时器  发送验证码倒数
    timeDown() {
      let result = setInterval(() => { //setInterval定时器
        --this.second;
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "获取验证码"
        }
      }, 1000);
    },

    save() {
      loginApi.updataMemberInfo(this.memberInfo)
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
      }
      // console.log(this.loginInfo.id)

      loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
        this.memberInfo = response.data.data.memberInfo
      })
      // console.log(this.memberInfo.id)
    },

    //微信登录显示的方法
    wxLogin() {
      //把token值放到cookie里面
      cookie.set('ATAI_BigData_token', this.token, {
        domain: this.global.ip
      })
      cookie.set('ATAI_BigData_ucenter', '', {
        domain: this.global.ip
      })
      //调用接口，根据token值获取用户信息
      loginApi.getLoginMemberInfo()
        .then(response => {
          this.loginInfo = response.data.data.userInfo
          //cookie.set('ATAI_BigData_ucenter',this.loginInfo,{domain: this.global.ip})
        })
      loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
        this.memberInfo = response.data.data.memberInfo
        cookie.set('ATAI_BigData_ucenter', this.memberInfo, {
          domain: this.global.ip
        })
      })
    },

    //手机号格式校验 自定义规则
    checkPhone(rule, value, callback) {
      // debugger;
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      } else {
        this.valite1 = "1";
      }
      return callback();
    },

    //邮箱格式校验
    checkEmail(rule, value, callback) {
      // debugger;
      const mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (rule.required && !value) {
        return callback(new Error("不能为空"));
      }
      if (value) {
        if (!mal.test(value)) {
          callback(new Error("请输入正确邮箱"));
        } else {
          this.valite2 = "1";
          callback();
        }
      }
    },

    checkPassword(rule, value, callback) {
      debugger
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!(value.length >= 6 && value.length <= 32)) {
        callback(new Error('密码长度应在6个到32个字符之间'));
      } else {
        callback()
      }
    },

  }
}
</script>
