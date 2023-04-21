<template>
  <div class="bg-fa">
    <div class="container" style="padding-bottom:30px;padding-top: 5px">
      <section class="bg-ff i-comp-wrap1">
        <el-row :gutter="24">
          <el-col :span="8" justify="start">
            <div class="">&nbsp;</div>
          </el-col>
          <el-col :span="3" justify="start">
            <div class="">奖金</div>
          </el-col>
          <el-col :span="2" justify="start">
            <div class="">人数</div>
          </el-col>
          <el-col :span="4" justify="start">
            <div class="">比赛截止日期</div>
          </el-col>
          <el-col :span="3" justify="start">
            <div class="">比赛状态</div>
          </el-col>
          <el-col :span="3" justify="start">
            <div class="">报名</div>
          </el-col>
        </el-row>

        <div class="mt15 i-q-txt fsize18" style="min-height:61px;text-align:left">
          <el-row :gutter="24">
            <el-col :span="8" justify="start">
              <div class="mt10 hLh30 txtOf tac">{{ this.competition.name }}</div>
            </el-col>
            <el-col :span="3" justify="start">
              <div class="mt10 hLh30 txtOf tac">￥{{ this.competition.money }}</div>
            </el-col>
            <el-col :span="2" justify="start">
              <div class="mt10 hLh30 txtOf tac">{{ this.competition.participants }}</div>
            </el-col>
            <el-col :span="4" justify="start">
              <div class="mt10 hLh30 txtOf tac">{{ this.competition.deadline.substring(0, 10) }}</div>
            </el-col>
            <el-col :span="3" justify="start">
              <div class="mt10 hLh30 txtOf tac" style="color:#fa8c16"
                   v-if="!endFlag">进行中
              </div>
              <div class="mt10 hLh30 txtOf tac" style="color:#b2b2b2"
                   v-else>已结束
              </div>
            </el-col>
            <el-col :span="3" justify="start">
              <div v-if="endFlag" class="mt10 hLh30 txtOf tac" style="color:#b2b2b2">已结束</div>
              <div v-else>
                <el-button text-align="center" v-if="!attendFlag" @click="registration()" type="primary">报名比赛
                </el-button>
                <div class="mt10 hLh30 txtOf tac" v-else style="color:#67C23A">已报名</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>

      <el-dialog
        title="确认参加比赛"
        :visible.sync="dialogVisible"
        width="30%"
        center
        :close-on-click-modal="false">
      <span>重要提示： 请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。
            如您对本声明或本协议任何条款有异议，请停止注册或使用软件及所提供的全部服务。
      </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
      </el-dialog>

      <el-tabs class="bg-ff" v-model="activeTab" style=" padding: 20px 40px 25px; margin: 25px 0 10px 0;"
               tab-position="top" @tab-click="changeTab">
        <el-tab-pane name="tab1">
          <span class="fsize16" :class="activeTab==='tab1'?'activeTag':'commonTag'" slot="label">赛制和赛题</span>
          <questions :attendFlag="attendFlag" :competition="competition"></questions>
        </el-tab-pane>
        <el-tab-pane name="tab2" v-if="attendFlag">
          <span class="fsize16" :class="activeTab==='tab2'?'activeTag':'commonTag'" slot="label">参赛队伍</span>
          <team :endFlag="endFlag" :competitionId="competitionId" :teamId="teamId" :userId="userId"></team>
        </el-tab-pane>
        <el-tab-pane name="tab3" v-if="attendFlag">
          <span class="fsize16" :class="activeTab==='tab3'?'activeTag':'commonTag'" slot="label">作品提交</span>
          <submit :endFlag="endFlag" :competitionId="competitionId" :teamId="teamId" :userId="userId"></submit>
        </el-tab-pane>
        <el-tab-pane name="tab4">
          <span class="fsize16" :class="activeTab==='tab4'?'activeTag':'commonTag'" slot="label">交流讨论</span>
          <forum></forum>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";
import questions from "@/pages/competition/questions";
import forum from "@/pages/competition/forum";
import submit from "@/pages/competition/submit"
import team from "@/pages/competition/team"
//引入调用js-cookie
import cookie from "js-cookie";

export default {
  name: "tabZujian",
  inject: ['reload'],
  components: {
    questions: questions,
    forum: forum,
    submit: submit,
    team: team
  },
  data() {
    return {
      competitionId: '',
      userId: '',
      teamId: '',
      competition: {
        deadline: ''
      },
      competitionTeam: {
        competitionId: '',
        avatar: 'https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg',
        name: 'default_'
      },
      userCompetition: {},
      endFlag: false,
      attendFlag: false,
      dialogVisible: false,
      activeTab: "tab1"
    };
  },
  created() {
    this.activeTab = cookie.get("activeTab")
    this.competitionId = this.$route.params.id;
    //查询比赛的信息
    this.getCompetition(this.competitionId);

    const loginCookie = cookie.get("ATAI_BigData_ucenter")
    //如果已经成功登录,则查询报名队伍信息
    if (loginCookie !== undefined && loginCookie !== '') {
      let loginInfo = JSON.parse(loginCookie)
      this.userId = loginInfo.id
      this.getTeamByUserCompetition(this.userId, this.competitionId);
    }

  },
  methods: {
    changeTab(tab, event) {
      // this.activeTab = tab.name
      cookie.set("activeTab", tab.name)
    },
    //比赛详情的方法
    getCompetition(competitionId) {
      competitionApi
        .getCompetition(competitionId)
        .then(response => {
          //请求成功
          if (response.data.data.competition != null) {
            this.competition = response.data.data.competition;

            let deadline = this.competition.deadline.substring(0, 10);
            let time = new Date(deadline)
            let now = new Date();
            this.endFlag = time < now
          }
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败111"
          });
        });
    },
    //根据用户id，比赛id查询信息
    async getTeamByUserCompetition() {
      await competitionApi
        .getTeamByUserCompetition(this.userId, this.competitionId)
        .then(response => {
          const teamUser = response.data.data.teamUser
          if (teamUser !== null) {
            this.attendFlag = true;
            this.teamId = teamUser.teamId
          }
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败222"
          });
        });
    },
    // //获取团队的信息(在teamId赋值后)
    // getCompetitionTeam() {
    //   competitionApi
    //     .getCompetitionTeam(this.competitionId, this.userId)
    //     .then(response => {
    //       console.log(response.data.data)
    //       this.competitionTeam = response.data.data.data;
    //     });
    // },
    //判断是否已经截止,已经截止返回true
    judgeEnd(deadline) {
      let time = new Date(deadline)
      let now = new Date();
      return time < now
    },

    //显示确认报名
    registration() {
      // debugger;
      const token = cookie.get("ATAI_BigData_token");
      // 如果未登录，提示登录
      if (token) {
        //显示确认报名
        this.dialogVisible = true;
      } else {
        this.$message({
          type: "info",
          message: "请先登录️再进行下一步操作"
        });
        //vue路由跳转
        this.$router.push({
          path: "/login"
        });
      }
    },

    // 确认报名
    confirm() {
      this.dialogVisible = false;
      this.competitionTeam.name += Math.random().toString(36).slice(-8)
      this.competitionTeam.competitionId = this.competitionId
      //根据比赛id，团队名称添加团队
      competitionApi
        .attendCompetition(this.competitionTeam, this.userId)
        .then(response => {
          this.$message({
            type: "success",
            message: "报名成功"
          });
          //重新加载页面
          this.reload();
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败333"
          });
        });
    },
    cancel() {
      this.dialogVisible = false;
      this.$message({
        type: "info",
        message: "取消操作"
      });
    }
  }
};
</script>
<style scoped>
.el-tabs__item {
  font-size: 17px;
  height: 50px;
  line-height: 50px;
}

.activeTag {
  color: black;
  font-weight: 600;
}

.commonTag {
  color: rgb(144, 147, 153);
}
</style>
