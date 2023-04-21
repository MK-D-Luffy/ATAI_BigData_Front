<template>
  <!-- 内容区域 -->
  <div class="bg-fa of">
    <section class="container">
      <div class="u-body pt25 pb40">

        <aside class="fl uMenu mr20" style="width:22%;min-height:360px">
          <el-card>
            <header class="comm-titl" style="padding-left:19px;padding-top:12px;padding-bottom: 17px">
              <span class="tac f16"><span class="c-333">个人中心</span></span>
              <div style="display:flex; align-items: center;">
                <div style="margin-right: 10px;">
                  <el-avatar style="margin-top:15px;background-color:#fff;"
                             :size="54"
                             :src="loginInfo.avatar"></el-avatar>
                </div>
                <div style="text-align: center;max-width:160px;font-size: 16px">
                  <span>Hi,{{ loginInfo.nickname }}</span>
                </div>
              </div>
            </header>

            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              style="border-right:none"
            >
              <el-menu-item index="1">
                <template>
                  <router-link to="/ucenter/info/basic" tag="li" active-class="current" exact>
                    <i class="el-icon-s-custom"></i>
                    <span>基本信息</span>
                  </router-link>
                </template>
              </el-menu-item>
              <el-menu-item index="2">
                <template>
                  <router-link to="/ucenter/info/resume" tag="li" active-class="current" exact>
                    <i class="el-icon-s-custom"></i>
                    <span>个人简历</span>
                  </router-link>
                </template>
              </el-menu-item>
              <el-menu-item index="3">
                <router-link to="/ucenter/info/password" tag="li" active-class="current" exact>
                  <i class="el-icon-key"></i>
                  <span>修改密码</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="4">
                <router-link to="/ucenter/competition" tag="li" active-class="current" exact>
                  <i class="el-icon-data-analysis"></i>
                  <span>我的比赛</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="5">
                <router-link to="/ucenter/course" tag="li" active-class="current" exact>
                  <i class="el-icon-video-play"></i>
                  <span>我的课程</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="6">
                <router-link to="/ucenter/dataset" tag="li" active-class="current" exact>
                  <i class="el-icon-document"></i>
                  <span>数据集</span>
                </router-link>
              </el-menu-item>
            </el-menu>
          </el-card>

        </aside>

        <el-card>
          <nuxt-child style="width:90%"/>
        </el-card>

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
        avatar: '',
        nickname: '',
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
