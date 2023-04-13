<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
      <span>·</span>
      <a href="/">回到首页</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobileOrEmail"
                      :rules="[{ required: true, message: '请输入手机号或邮箱', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="手机号或邮箱" v-model="user.mobileOrEmail"/>
            <i class="mt5">
              <svg t="1629781046915" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   p-id="1214" width="19" height="19">
                <path
                  d="M928.382896 791.521828c-16.965943-46.689367-41.579822-89.948478-73.155583-128.575208-51.760002-63.320477-120.315971-111.082951-196.762552-137.862498 12.559856-8.716946 24.437758-18.60837 35.477038-29.648675 48.352273-48.351249 74.981299-112.635269 74.981299-181.013069 0-68.3778-26.629026-132.662844-74.981299-181.013069-48.351249-48.349201-112.634245-74.976179-181.00795-74.976179-68.3778 0-132.662844 26.626978-181.012045 74.976179s-74.976179 112.634245-74.976179 181.013069c0 68.3778 26.626978 132.662844 74.976179 181.012045 10.997298 10.997298 22.827073 20.858004 35.334708 29.549351-76.436342 26.701727-144.996406 74.372044-196.810678 137.613676-31.667918 38.653353-56.356545 81.956494-73.376758 128.70525-17.616156 48.38504-26.548133 99.258295-26.548133 151.205681 0 12.852708 10.419786 23.272495 23.272495 23.272495s23.271471-10.419786 23.271471-23.272495c0-184.927657 130.697871-347.138828 311.032057-386.437274 26.902422 9.421428 55.490277 14.340518 84.837909 14.340518 29.29541 0 57.834115-4.902706 84.696603-14.293416 180.095604 39.415177 310.672648 201.692905 310.672648 386.391196 0 12.852708 10.419786 23.272495 23.272495 23.272495s23.272495-10.419786 23.272495-23.272495C954.847064 890.641889 945.942734 839.842359 928.382896 791.521828zM303.487542 314.423402c0-115.489037 93.95727-209.446307 209.445283-209.446307 115.488014 0 209.445283 93.95727 209.445283 209.446307 0 115.489037-93.95727 209.445283-209.445283 209.445283C397.444811 523.868686 303.487542 429.91244 303.487542 314.423402z"
                  p-id="1215" fill="#969696"></path>
              </svg>
            </i>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="mt5">
              <svg t="1629781201636" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="1415" width="19" height="19">
                <path
                  d="M791.261743 372.370152 325.827211 372.370152l0-93.08793c0-102.656808 83.517004-186.173813 186.173813-186.173813 102.656808 0 186.173813 83.517004 186.173813 186.173813 0 12.852708 10.419786 23.271471 23.272495 23.271471s23.272495-10.418762 23.272495-23.271471c0-62.162381-24.207367-120.603703-68.159697-164.557057-43.954378-43.953354-102.394675-68.159697-164.558081-68.159697s-120.603703 24.206343-164.558081 68.159697-68.159697 102.394675-68.159697 164.557057l0 93.08793-46.543965 0c-76.99235 0-139.630872 62.637497-139.630872 139.629848l0 325.804684c0 76.991326 62.638521 139.629848 139.630872 139.629848l558.522462 0c76.99235 0 139.630872-62.638521 139.630872-139.629848L930.893638 512C930.892615 435.008674 868.254093 372.370152 791.261743 372.370152zM884.348649 837.805708c0 51.327892-41.75799 93.085882-93.086906 93.085882L232.739281 930.891591c-51.327892 0-93.086906-41.75799-93.086906-93.085882L139.652375 512c0-51.327892 41.759014-93.086906 93.086906-93.086906l558.522462 0c51.328916 0 93.086906 41.759014 93.086906 93.086906L884.348649 837.805708z"
                  p-id="1416" fill="#969696"></path>
                <path
                  d="M512.001024 512c-64.160121 0-116.359401 52.198256-116.359401 116.358377 0 56.23367 40.098156 103.275278 93.202613 114.042186-0.075773 0.761824-0.115707 1.534912-0.115707 2.317215l0 69.815436c0 12.852708 10.418762 23.272495 23.271471 23.272495 12.852708 0 23.271471-10.419786 23.271471-23.272495l0-69.815436c0-0.782303-0.039934-1.555391-0.114683-2.318239 53.103434-10.765884 93.20159-57.807492 93.20159-114.041162C628.359401 564.19928 576.160121 512 512.001024 512zM512.001024 698.173813c-38.496687 0-69.815436-31.318749-69.815436-69.815436s31.318749-69.815436 69.815436-69.815436c38.495663 0 69.814412 31.318749 69.814412 69.815436S550.496687 698.173813 512.001024 698.173813z"
                  p-id="1417" fill="#969696"></path>
              </svg>
            </i>
          </div>
        </el-form-item>

        <!--        <el-form-item style="margin-bottom: 0">-->
        <!--          <el-radio v-model="params.codeType" label="2" style="color:#7a7a7a">邮箱验证码</el-radio>-->
        <!--          <el-radio v-model="params.codeType" label="1" style="color:#7a7a7a">短信验证码</el-radio>-->
        <!--        </el-form-item>-->

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!--       更多登录方式-->
      <!--      <div class="more-sign">-->
      <!--        <h6>社交帐号登录</h6>-->
      <!--        <ul>-->
      <!--          <li><a id="weixin" class="weixin" target="_blank" href="https://open.weixin.qq.com/connect/qrconnect?appid=wxed9954c01bb89b47&redirect_uri=http%3A%2F%2Fguli.shop%2Fapi%2Fucenter%2Fwx%2Fcallback&response_type=code&scope=snsapi_login&state=zjm#wechat_redirect"><i-->
      <!--                class="iconfont icon-weixin" /></a></li>-->
      <!--          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq" /></a></li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

//引入调用js-cookie
import cookie from 'js-cookie'
//引入调用login.js文件
import loginApi from '@/api/login'
//引入密码加密文件
import {Encrypt} from "@/utils/AESUtils";
import ucenterApi from "@/api/ucenter";

export default {
  layout: 'sign',
  data() {
    return {
      //封装登录的手机号和密码对象
      user: {
        mobileOrEmail: '',
        password: ''
      },
      //获取到用户信息  用于显示头部
      loginInfo: {},
    }
  },

  methods: {
    //登录的方法
    submitLogin() {
      this.$refs['userForm'].validate((valid) => {
          if (valid) {
            //将密码加密
            this.user.password = Encrypt(this.user.password.trim())
            // debugger
            //调用登录接口 返回token字符串
            loginApi.loginMember(this.user)
              .then(response => {
                  if (response.data.success) {
                    // debugger
                    //获取到的token字符串放入cookie
                    //1.cookie名称，2.token参数值，3.作用范围-在什么样的请求中
                    cookie.set("ATAI_BigData_token", response.data.data.token, {expires: 7})

                    //调用接口 根据token解析出用户信息 给首页用
                    loginApi.getLoginMemberInfo()
                      .then(response => {
                        // debugger
                        this.loginInfo = response.data.data.userInfo
                        this.$message({
                          type: 'success',
                          message: "登录成功! ✌",
                        })
                        //获取返回的用户信息  放入cookie
                        cookie.set("ATAI_BigData_ucenter", this.loginInfo, {expires: 7})

                        let dateTime = new Date();
                        dateTime = dateTime.setDate(dateTime.getDate() + 7);
                        dateTime = new Date(dateTime);
                        cookie.set("ATAI_BigData_expires_time", dateTime, {expires: 7})
                        // 路由跳转 跳转到首页
                        // this.$router.push({path: '/'})

                        // 登录成功后，返回上次进入的页面；
                        this.$router.go(-1);
                      })
                  }
                }
              ).catch(error => {
              console.log(error)
            })
          }
        }
      )
    },
  }
}
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
