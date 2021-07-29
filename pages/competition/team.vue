<template>
  <div class="container" style="width: 90%;margin-top:15px;">

    <div style="margin-bottom:20px">
      <div style="font-size: 24px;width:82%;display: inline-block;height: 44px">
        <span>我{{ this.teamLevel === 1 ? "组织" : "加入" }}的团队:
          <span v-if="!editFlag">
          {{ teamName }}
          </span>
           <el-input v-else v-model="teamName" style="width:30%" placeholder="请输入团队名"></el-input>
        </span>

      </div>
      <!--如果日期截止或者团队名可编辑则切换状态-->
      <span v-if="!endMark" style="margin-top:5px" class="fr">
        <span v-if="teamLevel===1">
            <span v-if="!editFlag">
                  <el-button type="primary" @click="editFlag=true">编辑</el-button>
            </span>
            <span v-else>
                <el-button type="success" @click="changeTeamName">确认</el-button>
                <el-button type="info" @click="editFlag=false">取消</el-button>
            </span>
        </span>
        <span v-else>
            <el-button type="danger" @click="quitTeam">离开队伍</el-button>
        </span>
      </span>

    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label" style="display: block;text-align: center; width: 120px!important;"> 团队成员</span>
        <!--团队管理-->
        <el-table
          :data="teamMembers"
          style="width: 100%">
          <el-table-column
            prop="nickname"
            label="团队成员昵称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sign"
            label="个性签名">
          </el-table-column>
          <el-table-column
            v-if="teamLevel===1"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="!(scope.row.nickname===nickname)"
                         plain size="mini"
                         @click="deleteTeamMember(scope.row.id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table v-if="senders.length!==0" :data="senders">
          <el-table-column label="收到邀请函">
            <el-table-column
              prop="senderName"
              label="昵称"
              width="430">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="acceptMember(scope.row)">接受</el-button>
                <el-button type="danger" plain size="mini" @click="refuseMember(scope.row)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <el-table v-if="receivers.length!==0" :data="receivers">
          <el-table-column label="我的申请">
            <el-table-column
              prop="teamName"
              label="团队名"
              width="430">
            </el-table-column>
            <el-table-column
              label="状态">
              <span style="color:#67C23A">正在申请中</span>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane v-if="!endMark">
        <span slot="label" style="display: block;text-align: center; width: 120px!important;"> 加入一个团队</span>
        <div style="padding:32px 0 24px 15px">
          申请加入团队
          <el-input v-model="teamName_key" style="width:30%;margin: 0 10px" placeholder="请输入队伍名称"></el-input>
          <el-button icon="el-icon-search" @click="searchTeams" circle></el-button>
        </div>
        <div>
          <el-table v-if="searchFlag" :data="teams" style="width:50%" :show-header="false">
            <el-table-column prop="teamName" align="center" width="240"></el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="applyToJoinTeam(scope.row.teamName)">申请加入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";
//引入调用js-cookie
import cookie from 'js-cookie'

export default {
  name: "team",
  inject: ['reload'],
  props: {
    //比赛截止标志,如果截止则为true
    endMark: {
      type: Boolean,
      default: true
    },
    userCompetition: Object,
    teamCompetition: Object,
  },
  //因为父组件props传给子组件的值是通过后端接口返回的数据，
  //也就是说是异步返回的数据，所以导致取值不同步，当然获取不到。
  //所以可以通过在watch中监听props的变化，如果有返回值就直接赋值
  watch: {
    teamCompetition: {
      handler(newVal, oldVal) {
        // console.log(this.teamCompetition)
        this.teamMembers = this.teamCompetition.friend
      },
      immediate: true,
      deep: true // 如果是对象要深度监听
    }
  },
  data() {
    return {
      competitionId: "",
      teamMembers: [],
      senders: [],
      receivers: [],
      userId: "",
      teamId: "",
      teamName: "",
      teamLevel: 0,
      nickname: "",
      // 用于根据团队名查找其他团队时使用
      teamName_key: "",
      teams: [],
      //是否进行编辑
      editFlag: false,
      searchFlag: false,
    }
  },
  created() {
    this.competitionId = this.$route.params.id
    this.userId = this.userCompetition.userId
    this.teamId = this.userCompetition.teamId
    this.teamName = this.userCompetition.teamName
    this.teamLevel = this.userCompetition.teamLevel
    let userStr = cookie.get("ATAI_BigData_ucenter")
    if (userStr) {
      this.nickname = JSON.parse(userStr).nickname
    }
    this.getSenders();
    this.getReceivers();
  },
  methods: {
    getReceivers() {
      competitionApi
        .getReceivers(this.competitionId, this.userId)
        .then(response => {
          this.receivers = response.data.data.receivers
        })
    },
    quitTeam() {
      competitionApi
        .quitTeam(this.competitionId, this.userId)
        .then(response => {
          this.$message({
            type: "success",
            message: "退出成功"
          });
          this.reload()
        })
    },
    acceptMember(apply_msg) {
      competitionApi
        .acceptMember(this.competitionId, apply_msg.senderId,this.userId, this.teamName)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.reload();
          } else {
            this.$message({
              type: "success",
              message: "添加失败"
            });
            this.reload();
          }
        })
    },
    refuseMember(apply_msg) {
      competitionApi
        .refuseMember(this.competitionId, apply_msg.senderId)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.reload();
          } else {
            this.$message({
              type: "success",
              message: "操作失败"
            });
            this.reload();
          }
        })
    },
    getSenders() {
      competitionApi.getSenders(this.competitionId, this.userId).then(response => {
        this.senders = response.data.data.senders;
      });
    },
    applyToJoinTeam(teamName) {
      competitionApi.applyToJoinTeam(this.competitionId, teamName, this.userId).then(response => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "申请成功"
          });
        }
      });
    },
    searchTeams() {
      competitionApi.searchTeams(this.competitionId, this.teamName_key).then(response => {
        let teams = response.data.data.teams
        for (let i = 0; i < teams.length; i++) {
          if (teams[i].teamName === this.teamName) {
            teams.splice(i, 1);
          }
        }
        this.teams = teams
        this.searchFlag = true
      });
    },
    changeTeamName() {
      competitionApi.changeTeamName(this.competitionId, this.teamId, this.teamName).then(response => {
        if (response !== undefined) {
          if (response.data.success) {
            this.editFlag = false;
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.reload();
          } else if (!response.data.success) {
            this.$message({
              type: "error",
              message: response.message
            });
          }
        }
      });
    },
    //通过修改该用户的团队名实现删除
    deleteTeamMember(userId) {
      this.$confirm('请确认删除成员！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        competitionApi.createTeamName(this.competitionId, userId).then(response => {
          if (response !== undefined) {
            if (response.data.success) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.reload();
            } else if (!response.data.success) {
              this.$message({
                type: "error",
                message: response.message
              });
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style>
.el-table thead.is-group th {
  background: #fff;
}
</style>
