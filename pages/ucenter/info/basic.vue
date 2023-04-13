<template>
  <article class="col-7 fl" style="background-color:#fff">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="基本资料" class="current">
              个人信息
            </a>
          </section>
        </div>

        <!-- 表格 -->
        <el-form show-message label-width="80px" size="medium" :model="memberInfo" ref="memberInfo">
          <el-form-item label="昵称" prop="nickname" :rules="[{validator:checkNickname,trigger:'blur'}]">
            <el-input v-model="memberInfo.nickname" style="width:220px"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="memberInfo.sex" style="width:110px" clearable placeholder="请选择">
              <!--
                数据类型一定要和取出的json中的一致，否则没法回填
                value使用动态绑定的值，性别由1 2代替
              -->
              <el-option :value="1" label="女"/>
              <el-option :value="2" label="男"/>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <!--            <el-input v-model="memberInfo.mobile"/>-->
            <span>{{ memberInfo.mobile.substring(0, 3) + "****" + memberInfo.mobile.substring(7, 11) }}</span>
            <el-button @click="mobileDialogVisible = true" style="margin-left:45px" type="primary">修改手机号码</el-button>
          </el-form-item>
          <el-form-item label="邮箱">
            <!--            <el-input v-model="memberInfo.email"/>-->
            <span>{{ memberInfo.email.substring(0, 2) + "****" + memberInfo.email.substring(10) }}</span>
            <el-button @click="emailDialogVisible = true" style="margin-left:24px" type="primary">修改邮箱</el-button>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number style="width:180px" v-model="memberInfo.age" :min="0" controls-position="right"/>
          </el-form-item>

          <el-form-item label="学历">
            <el-select style="width:180px" v-model="memberInfo.education" clearable placeholder="请选择">
              <el-option
                v-for="item in educationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 头像 -->
          <el-form-item label="头像">
            <el-upload
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action=" https://baiyunrain.mynatapp.cc/eduoss/fileoss">
              <img v-if="memberInfo.avatar" :src="memberInfo.avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input
              style="width:600px"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              v-model="memberInfo.sign">
            </el-input>
          </el-form-item>

          <el-form-item style="margin-top: 40px;margin-bottom: 40px">
            <el-button :disabled="saveBtnDisabled" plain="true" type="primary" @click="saveMsg">保存</el-button>
          </el-form-item>
        </el-form>

        <!--安全验证-->
        <el-dialog :close-on-click-modal="false" width="36%" center title="安全性验证" :visible.sync="validateDialogVisible">
          <el-form label-position="right" label-width="100px" :model="validateParams">
            <el-form-item label="手机号码" prop="mobile"
                          :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
              <el-input style="width:64%;margin-right: 12px" v-model="validateParams.mobile"></el-input>
              <el-button :disabled="!sending" type="primary" @click="getCodeFun('1')">{{
                  codeTest
                }}
              </el-button>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input style="width:64%" v-model="validateParams.code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="validateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="validateSecurity()">确 定</el-button>
          </div>
        </el-dialog>

        <!--修改手机号-->
        <el-dialog :close-on-click-modal="false" width="36%" center title="手机号码验证" :visible.sync="mobileDialogVisible">
          <el-form label-position="right" label-width="100px" :model="params">
            <el-form-item label="手机号码" prop="mobile"
                          :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
              <el-input style="width:64%;margin-right: 12px" v-model="params.mobile"></el-input>
              <el-button :disabled="!sending" type="primary" @click="getCodeFun('1')">{{
                  codeTest
                }}
              </el-button>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input style="width:64%" v-model="params.code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="mobileDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveMobileOrEmail('1')">确 定</el-button>
          </div>
        </el-dialog>

        <!--修改邮箱-->
        <el-dialog :close-on-click-modal="false" width="36%" center title="邮箱验证" :visible.sync="emailDialogVisible">
          <el-form label-position="right" label-width="100px" :model="params">
            <el-form-item label="邮箱：" prop="email"
                          :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
              <el-input style="width:64%;margin-right:12px" v-model="params.email"
                        autocomplete="off"></el-input>
              <el-button :disabled="!sending" type="primary" @click="getCodeFun('2')">{{
                  codeTest
                }}
              </el-button>
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
              <el-input style="width:64%" v-model="params.code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="emailDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveMobileOrEmail('2')">确 定</el-button>
          </div>
        </el-dialog>

      </section>
    </div>
  </article>
</template>
<script>
//引入调用login.js文件
import loginApi from '@/api/login'
//引入调用ucenter.js文件
import ucenterApi from '@/api/ucenter'
//引入调用js-cookie
import cookie from 'js-cookie'
import registerApi from "@/api/register";
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
      memberInfo: {
        id: '',
        age: '',
        avatar: '',
        education: '',
        mobile: '',
        email: '',
        nickname: '',
        sex: '',
        sign: '',
      },
      educationOptions: [],
      saveBtnDisabled: false, //保存按钮是否禁用
      mobileDialogVisible: false,
      emailDialogVisible: false,
      codeType: "2",
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: '获取验证码',
      validateMobile: false,
      validateEmail: false,
      //用于修改绑定手机号或邮箱
      params: {
        mobile: '',
        email: '',
        code: ''
      },
      //用于进行安全性验证
      validateParams: {
        mobile: '',
        code: ''
      },

    }
  },

  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    // if (this.token) {//判断路径是否有token值
    //   this.wxLogin()
    // }
    this.updateEducationOption();
    this.showInfoFromCookie()
  },

  methods: {
    //每年更新
    updateEducationOption() {
      let myDate = new Date();
      let year = Number(myDate.getFullYear());
      let month = Number(myDate.getMonth());
      let options = []
      if (month >= 7) {
        for (let i = year - 3; i <= year - 1; i++) {
          let obj1 = {};
          let obj2 = {};
          let str1 = i + "级本科生"
          let str2 = i + "级研究生"
          obj1["label"] = str1
          obj1["value"] = str1
          options.push(obj1)
          obj2["label"] = str2
          obj2["value"] = str2
          options.push(obj2)
        }
        console.log(options)
      }
      this.educationOptions = options

    },
    //安全性验证
    validateSecurity() {
      ucenterApi.validateSecurity(this.validateParams, this.memberInfo.id).then(response => {
        if (response.data.success) {
          this.$message({
            type: 'success',
            message: "校验成功！ 🧙‍♂️"
          })
          this.reload();
        } else {
          this.$message({
            type: 'error',
            message: "校验失败!!!"
          })
        }
      }).catch(error => {
        console.log(error);
      })
    },

    // 提交修改手机号或邮箱信息的方法
    saveMobileOrEmail(type) {
      if (type === '1') {
        this.emailDialogVisible = false
        this.params.email = ""
      } else if (type === '2') {
        this.mobileDialogVisible = false
        this.params.mobile = ""
      }
      ucenterApi.changeMobileOrEmail(this.params, this.memberInfo.id).then(response => {
        if (response.data.success) {
          this.$message({
            type: 'success',
            message: "修改成功！ 🧙‍♂️"
          })
          this.reload();
        } else {
          this.$message({
            type: 'error',
            message: "修改失败!!!"
          })
        }
      }).catch(error => {
        console.log(error);
      })
    },

    //给已经输入的手机号发送验证码
    getCodeFun(codeType) {
      if (!this.sending) {
        return
      }
      //点完发送  60秒内不让再发
      if (this.validateMobile || this.validateEmail) {
        this.sending = false
      }
      // debugger;
      if (codeType === "1") {
        if (this.params.mobile !== '') {
          if (this.validateMobile) {
            registerApi.sendCodeByPhone(this.params.mobile)
              .then(response => {
                if (response.data.success) {
                  //提示发送验证码成功
                  this.$message({
                    type: 'success',
                    message: "验证🐎已发送🆗"
                  })
                  //调用倒计时的方法
                  this.timeDown()
                } else {
                  this.sending = true
                }
              }).catch(error => { //请求失败
              //如果发送失败,就设置可以发送
              this.sending = true
              console.log(error)
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: "请先输入手机号"
          })
        }
      } else if (codeType === "2") {
        if (this.params.email !== '') {
          if (this.validateEmail) {
            registerApi.sendCodeByEmail(this.params.email)
              .then(response => {
                if (response.data.success) {
                  //提示发送验证码成功
                  this.$message({
                    type: 'success',
                    message: "验证🐎已发送🆗"
                  })
                  //调用倒计时的方法
                  this.timeDown()
                } else {
                  this.sending = true
                }
              }).catch(error => { //请求失败
              //如果发送失败,就设置可以发送
              this.sending = true
              console.log(error)
            })
          }
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

    saveMsg() {
      // this.memberInfo.education = this.memberInfo.education[1] + this.memberInfo.education[0]
      console.log(this.memberInfo)
      ucenterApi.updateMemberInfo(this.memberInfo)
        .then(response => { //修改成功
          if (response.data.success) {
            //提示成功
            this.$message({
              type: 'success',
              message: '修改成功！ 🧙‍♂️'
            });

            //更新用户信息
            loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
              this.memberInfo = response.data.data.memberInfo
              this.loginInfo.nickname = this.memberInfo.nickname
              this.loginInfo.avatar = this.memberInfo.avatar
              let expire = cookie.get("ATAI_BigData_expires_time")
              // 将修改后的数据重新保存到token中
              cookie.set("ATAI_BigData_ucenter", this.loginInfo, {expires: new Date(expire)})
              this.reload();
            })

          }
        })
    },

    // 头像上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.memberInfo.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败! （非20000）')
      }
    },

    // 头像上传失败（http）
    handleAvatarError() {
      this.$message.error('上传失败! （http失败）')
    },

    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return (isJPG || isPNG) && isLt1M
    },

    //从cookie中获取用户信息
    showInfoFromCookie() {
      //从cookie中获取用户信息
      var userStr = cookie.get("ATAI_BigData_ucenter")
      //userStr是字符串   需要转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
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
          cookie.set('ATAI_BigData_ucenter', this.loginInfo)
        })
      loginApi.getMemberInfoSelf(this.loginInfo.id).then(response => {
        this.memberInfo = response.data.data.memberInfo
        cookie.set('ATAI_BigData_ucenter', this.memberInfo)
      })
    },

    checkNickname(rule, value, callback) {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else if (value.length > 16) {
        callback(new Error('用户名长度不应超过16个字符'));
      } else {
        ucenterApi.checkNickname(this.memberInfo.nickname).then(response => {
          let flag = response.data.data.flag
          if (flag) {
            callback(new Error('用户名重复'))
          } else {
            callback()
          }
        })
      }
    },

    //手机号格式校验 自定义规则
    checkPhone(rule, value, callback) {
      // debugger;
      if (!/^1[34578]\d{9}$/.test(value)) {
        this.validateMobile = false
        return callback(new Error("手机号码格式不正确"));
      } else {
        ucenterApi.checkPhone(this.params.mobile).then(response => {
          let flag = response.data.data.flag
          if (flag) {
            this.validateMobile = false
            callback(new Error('手机号已被注册'))
          } else {
            this.validateMobile = true
            callback()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

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
