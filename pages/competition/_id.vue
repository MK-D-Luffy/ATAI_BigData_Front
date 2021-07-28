<template>
  <div style="background-color:#fff;">
    <div class="container" style="padding-bottom: 120px;padding-top: 5px">
      <section class="i-comp-wrap1">
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

        <div class="mt15 i-q-txt" style="min-height:61px;text-align:left">
          <el-row :gutter="24">
            <el-col :span="8" justify="start">
              <div class="mt10 hLh30 txtOf tac f24">{{ this.competition.name }}</div>
            </el-col>
            <el-col :span="3" justify="start">
              <div class="mt10 hLh30 txtOf tac f24">￥{{ this.competition.money }}</div>
            </el-col>
            <el-col :span="2" justify="start">
              <div class="mt10 hLh30 txtOf tac f24">{{ this.competition.participants }}</div>
            </el-col>
            <el-col :span="4" justify="start">
              <div class="mt10 hLh30 txtOf tac f24">{{ this.deadline }}</div>
            </el-col>
            <el-col :span="3" justify="start">
              <div class="mt10 hLh30 txtOf tac f24" style="color:#fa8c16"
                   v-if="!judgeEnd(this.deadline)">进行中
              </div>
              <div class="mt10 hLh30 txtOf tac f24" style="color:#b2b2b2"
                   v-else>已结束
              </div>
            </el-col>
            <el-col :span="3" justify="start">
              <div v-if="judgeEnd(this.deadline)" class="mt10 hLh30 txtOf tac f24" style="color:#b2b2b2">已结束</div>
              <div v-else>
                <el-button text-align="center" v-if="!baominflag" @click="registration()" type="primary">报名比赛
                </el-button>
                <div class="mt10 hLh30 txtOf tac f24" v-else style="color:#67C23A">已报名</div>
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

      <el-tabs v-model="activeTab" style=" padding: 20px 20px 25px; margin: 15px 0 10px 0;" :tab-position="tabPosition">
        <el-tab-pane name="tab1" label="赛题与数据">
          <questions :baominflag="baominflag" :competition="competition"></questions>
        </el-tab-pane>
        <el-tab-pane name="tab2" label="排行榜">
          <ranking></ranking>
        </el-tab-pane>
        <el-tab-pane name="tab3" label="论坛">
          <forum></forum>
        </el-tab-pane>
        <el-tab-pane name="tab4" v-if="baominflag" label="提交结果">
          <submitRes :endMark="judgeEnd(this.deadline)"
                     :userCompetition="userCompetition"
                     :teamCompetition="teamCompetition"></submitRes>
        </el-tab-pane>
        <el-tab-pane name="tab5" v-if="baominflag" label="我的团队">
          <team :endMark="judgeEnd(this.deadline)"
                :userCompetition="userCompetition"
                :teamCompetition="teamCompetition"></team>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";
import loginApi from "@/api/login";
import questions from "@/pages/competition/questions";
import ranking from "@/pages/competition/ranking";
import forum from "@/pages/competition/forum";
import submitRes from "@/pages/competition/submitRes"
import team from "@/pages/competition/team"
//引入调用js-cookie
import cookie from "js-cookie";

export default {
  name: "tabZujian",
  inject: ['reload'],
  components: {
    questions: questions,
    ranking: ranking,
    forum: forum,
    submitRes: submitRes,
    team: team
  },
  data() {
    return {
      tabPosition: "left",
      competitionId: "",
      competition: {},
      deadline: "",
      baominflag: false,
      userCompetition: {},
      teamCompetition: {},
      dialogVisible: false,
      teamId: "",
      activeTab: "tab1"
    };
  },
  created() {
    this.competitionId = this.$route.params.id;
    //查询比赛的信息
    this.getCompetition(this.competitionId);
    //查询用户在这个比赛中的信息
    this.getUserCompetition(this.competitionId);
  },
  methods: {
    //获取团队的信息(在teamId赋值后)
    getTeamCompetition() {
      // debugger
      competitionApi
        .getTeamCompetition(this.competitionId, this.teamId)
        .then(response => {
          this.teamCompetition = response.data.data.teamCompetition;
        });
    },

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
      //根据比赛id，团队名称添加团队
      competitionApi
        .insertUserCompetition(this.competitionId)
        .then(response => {
          //请求成功
          // debugger;
          this.teamId = response.data.data.teamId;
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
    },

    //比赛详情的方法
    getCompetition(competitionId) {
      // debugger
      competitionApi
        .getCompetition(competitionId)
        .then(response => {
          //请求成功
          if (response.data.data.competition != null) {
            this.competition = response.data.data.competition;
            this.deadline = this.competition.deadline.substring(0, 10);
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
    getUserCompetition(competitionId) {
      competitionApi
        .getUserCompetition(competitionId)
        .then(response => {
          // debugger
          //请求成功
          if (response.data.data.userCompetition != null) {
            this.baominflag = true;
            this.userCompetition = response.data.data.userCompetition;
            this.teamId = this.userCompetition.teamId;

            console.log(this.userCompetition)

            //获取所在团队的信息
            this.getTeamCompetition();
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
  }
};
</script>
<style scoped>
.el-tabs__item {
  font-size: 17px;
  height: 50px;
  line-height: 50px;
}
</style>
