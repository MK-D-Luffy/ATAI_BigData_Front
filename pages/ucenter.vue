<template>
  <!-- 内容区域 -->
  <div class="bg-fa of">
    <section class="container">
      <div class="u-body pt25 pb40">

        <aside class="fl uMenu mr20" style="background-color:#fff;width:22%;min-height:360px">
          <header class="comm-titl" style="padding-left:19px;padding-top:12px;padding-bottom: 17px">
            <span class="tac f16"><span class="c-333">个人中心</span></span>
            <div style="display:flex; align-items: center;">
              <div style="margin-right: 10px;">
                <el-avatar style="margin-top:15px" :size="54" :src="loginInfo.avatar"></el-avatar>
              </div>
              <div style="text-align: center;max-width:160px;font-size: 16px">
                <span>Hi,{{ loginInfo.nickname }}</span>
              </div>
            </div>
          </header>

          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            style="border-top:1px solid;border-color:#E7E7E7;"
          >
            <el-menu-item index="1">
              <template>
                <router-link to="/ucenter/info/basic" tag="li" active-class="current" exact>
                  <i class="el-icon-s-custom"></i>
                  <span>个人信息</span>
                </router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/ucenter/info/password" tag="li" active-class="current" exact>
                <i class="el-icon-key"></i>
                <span>修改密码</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/ucenter/study/competition" tag="li" active-class="current" exact>
                <i class="el-icon-data-analysis"></i>
                <span>我的比赛</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/ucenter/study/collect" tag="li" active-class="current" exact>
                <i class="el-icon-document"></i>
                <span>我的文章</span>
              </router-link>
            </el-menu-item>
<!--            <el-menu-item index="5">-->
<!--              <router-link to="/ucenter/msg/message" tag="li" active-class="current" exact>-->
<!--                <i class="el-icon-message"></i>-->
<!--                <span>消息管理</span>-->
<!--              </router-link>-->
<!--            </el-menu-item>-->
          </el-menu>
        </aside>

        <nuxt-child/>

        <div class="clear"/>
      </div>
    </section>
  </div>
  <!-- /内容区域 -->
</template>

<script>
//引入调用js-cookie
import cookie from 'js-cookie'

export default {
  data() {
    return {
      activeIndex: 1,
      avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      },
    }
  },
  created() {
    let userStr = cookie.get("ATAI_BigData_ucenter")
    //userStr是字符串   需要转换为json对象
    if (userStr) {
      this.loginInfo = JSON.parse(userStr)
    }
  },
  methods: {}
}
</script>
