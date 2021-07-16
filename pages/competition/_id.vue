<template>
  <div class="container" style="background-color:#fff;margin-bottom: 120px">
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
          <div class="">赛季</div>
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
            <div class="mt10 hLh30 txtOf tac f24" style="color:#fa8c16">进行中</div>
          </el-col>
          <el-col :span="3" justify="start">
            <el-button text-align="center" v-if="!baominflag" @click="registration()" type="primary">报名比赛
            </el-button>
            <div class="mt10 hLh30 txtOf tac f24" v-else style="color:#67C23A">已报名</div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!--    <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>-->

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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-tabs style=" padding: 20px 20px 25px; margin: 15px 0 10px 0;" :tab-position="tabPosition">
      <el-tab-pane label="赛题与数据">
        <questions :baominflag="baominflag"></questions>
      </el-tab-pane>
      <el-tab-pane label="排行榜">
        <ranking :test="competitionId"></ranking>
      </el-tab-pane>
      <el-tab-pane label="论坛">
        <forum></forum>
      </el-tab-pane>
      <el-tab-pane v-if="baominflag" label="提交结果">
        <submitRes :teamId="teamId"></submitRes>
      </el-tab-pane>
      <el-tab-pane v-if="baominflag" label="我的团队">
        <team :teamName="teamName" :teamId="teamId"></team>
      </el-tab-pane>
    </el-tabs>


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
      // 报名时封装的信息
      competitionUserInfo: {
        competitionId: "",
        teamName: ""
      },
      dialogVisible: false,
      teamId: "",
      teamName: ""
    };
  },
  created() {
    this.competitionId = this.$route.params.id;
    this.competitionUserInfo.compentitionId = this.competitionId;
    this.getCompetition(this.competitionId);
    this.getUserCompetition(this.competitionId);
    // 如果没报名则初始化团队名
    if (!this.baominflag) {
      this.getUserName();
    }
  },
  methods: {
    // 报名时将团队初始化为用户名
    getUserName() {
      debugger
      loginApi.getLoginMemberInfo().then(response => {
        let username = response.data.data.userInfo.nickname;
        if (username != null) {
          this.competitionUserInfo.teamName = username;
        }
      })
    },
    // 确认报名
    confirm() {
      this.dialogVisible = false;
      this.insertUserCompetition();
    },
    //比赛详情的方法
    getCompetition(compentitionId) {
      competitionApi
        .getCompetition(compentitionId)
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
            type: "info",
            message: "请求失败111"
          });
        });
    },
    //根据用户id，比赛id查询信息
    getUserCompetition(compentitionId) {
      competitionApi
        .getUserCompetition(compentitionId)
        .then(response => {
          //请求成功
          console.log(response.data.data)
          debugger;
          if (response.data.data.userCompetition != null) {
            this.baominflag = true;
            this.teamId = response.data.data.userCompetition.teamId;
            console.log(response.data.data.userCompetition.teamName)
            this.teamName = response.data.data.userCompetition.teamName;
          }
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "info",
            message: "请求失败222"
          });
        });
    },

    registration() {
      // debugger;
      const token = cookie.get("ATAI_BigData_token");
      // 如果未登录，提示登录
      if (token) {
        //报名
        this.dialogVisible = true;
      } else {
        // debugger
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
    open() {
      this.$prompt(
        "请输入队伍名称【队伍存在将自动加入，不存在则创建】",
        "加入队伍",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(({value}) => {
          console.log(value);
          this.competitionUserInfo.teamName = value;

          //调用接口插入队伍信息
          this.insertUserCompetition();
          this.$message({
            type: "success",
            message: "你的队伍是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //根据比赛id，团队名称添加团队
    insertUserCompetition() {
      competitionApi
        .insertUserCompetition(this.competitionUserInfo)
        .then(response => {
          //请求成功
          // debugger;
          this.teamId = response.data.data.teamId;
          // console.log(this.teamId);
          // console.log(this.competitionUserInfo.compentitionId);
          this.$router.push({
            path:
              "/competition/" + this.competitionUserInfo.compentitionId
          });
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "info",
            message: "请求失败333"
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
