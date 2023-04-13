<template>
  <div class="main">
    <div class="title" style="margin-bottom:30px">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
      <span>·</span>
      <a href="/">回到首页</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' },{validator:checkNickname,trigger:'blur'}]"
        >
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="params.nickname"/>
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

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="mobile"
          :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="params.mobile"/>
            <i class="mt5">
              <svg t="1629781216061" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   p-id="1617" width="20" height="20">
                <path
                  d="M721.446307 46.559325 302.577244 46.559325c-51.327892 0-93.086906 41.759014-93.086906 93.086906l0 744.707538c0 51.327892 41.759014 93.086906 93.086906 93.086906l418.869063 0c51.327892 0 93.086906-41.759014 93.086906-93.086906L814.533214 139.646231C814.533214 88.317315 772.774199 46.559325 721.446307 46.559325zM302.577244 93.102266l418.869063 0c25.663434 0 46.542941 20.879507 46.542941 46.543965l0 605.075643L256.034303 744.721874 256.034303 139.646231C256.034303 113.981773 276.91381 93.102266 302.577244 93.102266zM721.446307 930.89671 302.577244 930.89671c-25.663434 0-46.542941-20.879507-46.542941-46.542941l0-93.086906L767.989248 791.266863l0 93.086906C767.989248 910.017203 747.110765 930.89671 721.446307 930.89671z"
                  p-id="1618" fill="#969696"></path>
                <path
                  d="M564.384616 837.809804 459.661462 837.809804c-12.852708 0-23.271471 10.419786-23.271471 23.272495s10.418762 23.272495 23.271471 23.272495l104.723154 0c12.852708 0 23.272495-10.419786 23.272495-23.272495S577.237324 837.809804 564.384616 837.809804z"
                  p-id="1619" fill="#969696"></path>
              </svg>
            </i>
            <!--            <i class="iconfont icon-phone"/>-->
          </div>
        </el-form-item>


        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur' }]"
        >
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="短信验证码" v-model="params.code"/>
            <i class="mt5">
              <svg t="1629697038854" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   p-id="1266" width="19" height="19">
                <path
                  d="M512.672914 0C525.429029 10.386286 536.956343 21.767314 551.936 30.3104 634.645943 77.4144 796.818286 99.064686 921.6 87.771429 921.6 218.053486 919.200914 416.3584 919.200914 546.640457 919.200914 599.888457 928.036571 686.6944 911.7696 726.4256 876.192914 813.407086 780.960914 882.132114 706.911086 933.390629 665.629257 961.974857 622.474971 986.346057 572.094171 1006.562743 555.914971 1013.057829 529.700571 1027.335314 506.294857 1023.268571 395.761371 1004.105143 235.666286 886.959543 176.186514 814.226286 151.844571 784.471771 122.002286 757.1456 109.304686 715.9808 96.899657 675.810743 105.0624 586.313143 105.0624 536.195657 105.0624 409.365943 102.4 214.571886 102.4 87.771429 236.895086 100.820114 456.469943 74.371657 512.672914 0ZM160.914286 146.285714C161.265371 302.723657 160.5632 545.733486 160.914286 702.171429 182.184229 768.321829 297.311086 836.666514 352.373029 874.847086 387.306057 899.072 422.999771 920.722286 464.896 938.627657 476.832914 943.7184 499.390171 959.166171 516.9152 955.333486 605.769143 935.965257 745.325714 834.384457 795.004343 773.471086 814.167771 749.9776 854.922971 735.700114 863.085714 702.171429 863.085714 546.435657 863.085714 302.021486 863.085714 146.285714 727.157029 147.982629 599.771429 129.024 512.672914 84.670171 445.410743 134.465829 281.102629 146.197943 160.914286 146.285714ZM741.931886 307.287771C768.380343 312.173714 788.8896 336.749714 769.550629 362.7008 696.32 434.468571 623.060114 506.2656 549.829486 578.033371 535.903086 591.725714 495.616 644.885943 468.085029 638.654171 448.043886 634.119314 434.205257 612.586057 421.390629 599.976229 388.125257 567.559314 354.859886 535.171657 321.594514 502.754743 310.8864 492.222171 292.103314 471.712914 305.678629 450.501486 313.9584 437.540571 337.364114 428.938971 354.5088 440.056686 394.474057 479.407543 434.468571 518.787657 474.463086 558.167771 557.231543 476.628114 640.058514 395.088457 722.826971 313.578057 729.205029 311.471543 735.583086 309.394286 741.931886 307.287771Z"
                  p-id="1267" fill="#969696"></path>
              </svg>
            </i>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a
              href="javascript:"
              type="button"
              @click="getCodeFun()"
              :value="codeTest"
              style="border: none;background: none;text-decoration:none;color:#969696"
            >{{ codeTest }}</a>
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="email"
          :rules="[{ required: true, message: '请输入辅助邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]"
        >
          <div>
            <el-input type="text" placeholder="辅助邮箱" v-model="params.email"/>
            <i class="mt5">
              <svg t="1629696585111" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   p-id="1509" width="19" height="19">
                <path
                  d="M974.507 201.387A85.333 85.333 0 0 0 896 149.333H128a85.333 85.333 0 0 0-85.333 85.334v554.666A85.333 85.333 0 0 0 128 874.667h768a85.333 85.333 0 0 0 85.333-85.334V234.667a85.333 85.333 0 0 0-6.826-33.28z m-102.4 11.946l-352.64 352.64a10.667 10.667 0 0 1-15.147 0l-352.427-352.64z m45.226 576A21.333 21.333 0 0 1 896 810.667H128a21.333 21.333 0 0 1-21.333-21.334V258.56l352.64 352.64a74.667 74.667 0 0 0 105.6 0l352.426-352.64z"
                  p-id="1510" fill="#969696"></path>
              </svg>
            </i>
            <!--            <i class="iconfont icon-email"/>-->
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{validator: checkPassword, trigger: 'blur'}]"
        >
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="mt5">
              <svg t="1629781201636" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   p-id="1415" width="19" height="19">
                <path
                  d="M791.261743 372.370152 325.827211 372.370152l0-93.08793c0-102.656808 83.517004-186.173813 186.173813-186.173813 102.656808 0 186.173813 83.517004 186.173813 186.173813 0 12.852708 10.419786 23.271471 23.272495 23.271471s23.272495-10.418762 23.272495-23.271471c0-62.162381-24.207367-120.603703-68.159697-164.557057-43.954378-43.953354-102.394675-68.159697-164.558081-68.159697s-120.603703 24.206343-164.558081 68.159697-68.159697 102.394675-68.159697 164.557057l0 93.08793-46.543965 0c-76.99235 0-139.630872 62.637497-139.630872 139.629848l0 325.804684c0 76.991326 62.638521 139.629848 139.630872 139.629848l558.522462 0c76.99235 0 139.630872-62.638521 139.630872-139.629848L930.893638 512C930.892615 435.008674 868.254093 372.370152 791.261743 372.370152zM884.348649 837.805708c0 51.327892-41.75799 93.085882-93.086906 93.085882L232.739281 930.891591c-51.327892 0-93.086906-41.75799-93.086906-93.085882L139.652375 512c0-51.327892 41.759014-93.086906 93.086906-93.086906l558.522462 0c51.328916 0 93.086906 41.759014 93.086906 93.086906L884.348649 837.805708z"
                  p-id="1416" fill="#969696"></path>
                <path
                  d="M512.001024 512c-64.160121 0-116.359401 52.198256-116.359401 116.358377 0 56.23367 40.098156 103.275278 93.202613 114.042186-0.075773 0.761824-0.115707 1.534912-0.115707 2.317215l0 69.815436c0 12.852708 10.418762 23.272495 23.271471 23.272495 12.852708 0 23.271471-10.419786 23.271471-23.272495l0-69.815436c0-0.782303-0.039934-1.555391-0.114683-2.318239 53.103434-10.765884 93.20159-57.807492 93.20159-114.041162C628.359401 564.19928 576.160121 512 512.001024 512zM512.001024 698.173813c-38.496687 0-69.815436-31.318749-69.815436-69.815436s31.318749-69.815436 69.815436-69.815436c38.495663 0 69.814412 31.318749 69.814412 69.815436S550.496687 698.173813 512.001024 698.173813z"
                  p-id="1417" fill="#969696"></path>
              </svg>
            </i>
            <!--            <i class="iconfont icon-password"/>-->
          </div>
        </el-form-item>

<!--        <el-form-item style="margin-bottom: 0">-->
<!--          <el-radio v-model="params.codeType" label="2" style="color:#7a7a7a">邮箱验证码</el-radio>-->
<!--          <el-radio v-model="params.codeType" label="1" style="color:#7a7a7a">短信验证码</el-radio>-->
<!--        </el-form-item>-->
        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister('userForm')"
          />
        </div>
        <p class="sign-up-msg mt10">
          点击 “注册” 即表示您同意并愿意遵守ATAI的
          <br/>
          <a target="_blank" href="#">用户协议</a>
          和
          <a target="_blank"
             href="#"
          >隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <!-- <div class="more-sign">
  <h6>社交帐号直接注册</h6>
  <ul>
    <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
      class="iconfont icon-weixin"/></a></li>
    <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
  </ul>
      </div>-->
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

//引入调用register.js文件
import registerApi from "@/api/register";
//引入调用login.js文件
import loginApi from '@/api/login'
//引入调用ucenter.js文件
import ucenterApi from '@/api/ucenter'
//引入调用js-cookie
import cookie from 'js-cookie'

export default {
  layout: "sign",
  data() {
    return {
      params: {
        //封装注册输入的数据
        nickname: "", //昵称
        mobile: "", //手机号
        email: "", //邮箱
        code: "", //验证码
        password: "",
        codeType: "1"//验证码类型
      },
      // codeType: "2",
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码",
      validateEmail: false,
      validatePhone: false
    };
  },
  beforeRouteEnter(to, from, next) {
    let userStr = cookie.get("ATAI_BigData_ucenter")
    //userStr是字符串   需要转换为json对象
    if (userStr) {
      next("/")
    } else {
      next()
    }
  },
  methods: {
    //注册提交的方法
    submitRegister(formName) {
      // debugger
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registerApi.registerMember(this.params).then(response => {
            if (response.data.success) {
              //提示注册成功
              this.$message({
                type: "success",
                message: "注册成功! ✌"
              });
              //跳转到登陆页面
              this.$router.push({path: "/login"});
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
      //点完发送  60秒内不让再发
      if ((this.validatePhone && this.params.codeType === "1") || (this.validateEmail && this.params.codeType === "2")) {
        this.sending = false
      }
      // debugger;
      if (this.params.codeType === "1") {
        if (this.params.mobile !== '') {
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
      let result = setInterval(() => {
        //setInterval定时器
        --this.second;
        this.codeTest = this.second + "秒后可再发";
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.second = 60;
          this.codeTest = "获取验证码";
        }
      }, 1000);
    },

    checkNickname(rule, value, callback) {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else if (value.length > 16) {
        callback(new Error('用户名长度不应超过16个字符'));
      } else {
        ucenterApi.checkNickname(this.params.nickname).then(response => {
          let flag = response.data.data.flag
          if (flag) {
            callback(new Error('用户名已被注册'))
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
        this.validatePhone = false
        return callback(new Error("手机号码格式不正确"));
      } else {
        ucenterApi.checkPhone(this.params.mobile).then(response => {
          let flag = response.data.data.flag
          if (flag) {
            this.validatePhone = false
            callback(new Error('手机号已被注册'))
          } else {
            this.validatePhone = true
            callback()
          }
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
          ucenterApi.checkEmail(this.params.email).then(response => {
            let flag = response.data.data.flag
            if (flag) {
              this.validateEmail = false
              callback(new Error('邮箱已被注册'))
            } else {
              this.validateEmail = true
              callback()
            }
          })
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
  },
};
</script>
