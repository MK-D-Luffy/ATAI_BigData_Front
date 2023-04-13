<template>
  <client-only>
    <div class="in-wrap">
      <!-- 公共头引入 -->
      <header id="header">
        <section class="container">
          <h1 id="logo">
            <a href="#" title="ATAI_BigData">
              <img src="~/assets/img/logo.png" width="100%" alt="ATAI_BigData">
            </a>
          </h1>
          <div class="h-r-nsl" style="font-weight: 700;">
            <ul class="nav">
              <router-link to="/" tag="li" active-class="current" exact>
                <a>首页</a>
              </router-link>
              <router-link to="/competition" tag="li" active-class="current">
                <a>竞赛</a>
              </router-link>
              <router-link to="/course" tag="li" active-class="current">
                <a>学习</a>
              </router-link>
              <router-link to="/blog" tag="li" active-class="current">
                <a>论坛</a>
              </router-link>
              <router-link to="/dataset" tag="li" active-class="current">
                <a>数据集</a>
              </router-link>
              <router-link to="/host" tag="li" active-class="current">
                <a>我要办赛</a>
              </router-link>
            </ul>

            <ul class="h-r-login">
              <li v-if="!loginInfo.id" id="no-login">
                <a href="/login" title="登录">
                  <!--                <em class="icon18 login-icon">&nbsp;</em>-->
                  <span class="vam ml5">登录</span>
                </a>
                |
                <a href="/register" title="注册">
                  <span class="vam ml5">注册</span>
                </a>
              </li>

              <li v-if="loginInfo.id" id="is-login-one" class="mr10">
                <!--              <a id="headerMsgCountId" href="/ucenter/msg/message" title="消息">-->
                <a id="headerMsgCountId" href="#" title="消息">
                  <span class="vam ml5">消息</span>
                </a>
                <!--              <q class="red-point">&nbsp;</q>-->
              </li>

              <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                <a href="/ucenter/info/basic" title>
                  <el-avatar style="background-color:#fff;"
                             :size="size"
                             :src=loginInfo.avatar>
                  </el-avatar>
                  <span id="userName" class="vam disIb" style="padding:0 2px">{{ loginInfo.nickname }}</span>
                </a>
                <a href="javascript:void(0);" title="退出" @click="logout()" class="ml10">退出</a>
              </li>

              <!-- /未登录显示第1 li；登录后显示第2，3 li -->
            </ul>
<!--            <aside class="h-r-search">-->
<!--              <form action="#" method="post">-->
<!--                <label class="h-r-s-box" style="margin-right:30px">-->
<!--                  <input style="width:110px;" type="text" placeholder="输入比赛" v-model="keyword"-->
<!--                         name="queryCourse.courseName" value>-->
<!--                  &lt;!&ndash;                  <router-link :to="{path:'/competition',query: {keyword: this.keyword}}">&ndash;&gt;-->
<!--                  &lt;!&ndash;                 &ndash;&gt;-->
<!--                  &lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                  <button type="submit" class="s-btn" @click="search()">-->
<!--                    <em class="icon18">&nbsp;</em>-->
<!--                  </button>-->
<!--                </label>-->
<!--              </form>-->
<!--            </aside>-->
          </div>
          <aside class="mw-nav-btn">
            <div class="mw-nav-icon"></div>
          </aside>
          <div class="clear"></div>
        </section>
      </header>
      <!-- /公共头引入 -->

      <nuxt v-if="isRouterAlive" style="min-height:640px"/>
      <!--    <nuxt style="min-height:640px"/>-->

      <!-- 公共底引入 -->
      <!--      下面白色-->
      <!--      <div style="width:100%;background-color:#fff;box-shadow: 0 -2px 4px 0 rgba(0,0,0,0.1);height:48px;">-->
      <!--        <div class="container">-->
      <!--        </div>-->
      <!--      </div>-->
      <footer id="footer">
        <section class="container">
          <div class>
            <h4 class="hLh30">
              <span class="fsize18 f-fM c-fff">友情链接</span>
            </h4>
            <ul class="of flink-list">
              <li>
                <a href="http://www.cqut.edu.cn/" title="重庆理工大学" style="font-size: 14px" target="_blank">重庆理工大学</a>
              </li>
            </ul>
            <!--          <div class="clear"></div>-->
          </div>
          <div class="b-foot">
            <section class="fl col-7" style="margin-top:20px">
              <section class="mr20">
                <section class="b-f-link">
                  <a href="#" title="关于我们" target="_blank">关于我们</a>|
                  <a href="http://www.cqut.edu.cn/" title="联系我们" target="_blank">联系我们</a>|
                  <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                  <a href="https://github.com/1731lin/" title="github" target="_blank">github</a>|
                  <span>Email：1905470291@qq.com</span>
                </section>
                <section class="b-f-link mt10">
                  <span>©2021版权均归ATAI所有 </span>
                </section>
              </section>
            </section>

            <aside class="fl col-3 tac mt15">
              <section class="gf-tx">
              <span>
                <a href="https://atai-bigdata.oss-cn-chengdu.aliyuncs.com/2021/atai/1630216606459.jpg"><img
                  src="~/assets/img/wx-icon.png" alt></a>
              </span>
              </section>
              <section class="gf-tx">
              <span>
                <a href="https://weibo.com"><img src="~/assets/img/wb-icon.png" alt></a>
              </span>
              </section>
            </aside>
            <div class="clear"></div>
          </div>
        </section>
      </footer>
      <!-- /公共底引入 -->
    </div>
  </client-only>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

//引入调用js-cookie
import cookie from 'js-cookie'
//引入调用login.js文件
import loginApi from '@/api/login'
import competitionApi from '@/api/competition'

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        avatar: '',
        nickname: '',
      },
      keyword: '',
      size: "small",
      isRouterAlive: true,
    }
  },
  watch: {
    isRouterAlive: function (val) {
      this.showInfoFromCookie();
    }
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    if (this.token) {//判断路径是否有token值
      this.wxLogin()
    }
    this.showInfoFromCookie()
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    //从cookie中获取用户信息
    showInfoFromCookie() {
      //从cookie中获取用户信息
      let userStr = cookie.get("ATAI_BigData_ucenter")
      // console.log(userStr)
      //userStr是字符串需要转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },

    //搜索
    search() {
      // alert(this.keyword)
      this.$router.push({path: '/competition', query: {keyword: this.keyword}})
    },

    //退出  cookie清空
    logout() {
      cookie.set('ATAI_BigData_ucenter', "")
      cookie.set('ATAI_BigData_token', "")
      //回首页
      window.location.href = "/"
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
    },
  },
};
</script>
<style scoped>
#footer {
  /*background-image: url(../assets/img/v-play-bg.jpg);*/
  background-color: rgb(37, 37, 37);
  border-top-width: 0;
  border-top-style: solid;
  color: #999;
  width: 100%;
  overflow: hidden;
  padding-top: 30px
}

/*滚动条整体样式*/
::-webkit-scrollbar {
  width: 10px; /*竖向滚动条的宽度*/
  height: 10px; /*横向滚动条的高度*/
}

::-webkit-scrollbar-thumb { /*滚动条里面的小方块*/
  background: #666666;
  border-radius: 5px;
}

::-webkit-scrollbar-track { /*滚动条轨道的样式*/
  background: #ccc;
  border-radius: 5px;
}
</style>
