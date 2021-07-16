<template>
  <div class="container" style="width: 90%;margin-top:15px;">

    <div style="margin-bottom:20px">
      <div style="font-size: 24px;width:82%;display: inline-block">
        <span>我的团队:{{ teamName }}</span>
      </div>
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">退出</el-button>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label" style="display: block;text-align: center; width: 120px!important;"> 团队成员</span>
        <!--        团队管理-->
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="display: block;text-align: center; width: 120px!important;"> 加入一个团队</span>
        <div style="padding:32px 0 24px 15px">
          申请加入团队
          <el-input v-model="teamName_key" style="width:30%;margin: 0 10px" placeholder="请输入队伍名称"></el-input>
          <el-button icon="el-icon-search" @click="searchTeams" circle></el-button>
        </div>
        <div>
          <table id="teams" v-for="team in teams" :key="team">
            <tr>
              <td>{{ team }}</td>
              <td>
                <el-button icon="el-icon-search" @click="searchTeams" circle></el-button>
              </td>
            </tr>
          </table>
          <!--          <el-table-->
          <!--            :data="teams"-->
          <!--            :show-header="false"-->
          <!--            border="true"-->
          <!--            style="width: 100%">-->
          <!--            <el-table-column-->
          <!--              prop="date"-->
          <!--              label="日期"-->
          <!--              width="180">-->
          <!--            </el-table-column>-->
          <!--            <el-table-column-->
          <!--              prop="name"-->
          <!--              label="姓名"-->
          <!--              width="180">-->
          <!--            </el-table-column>-->
          <!--          </el-table>-->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";

export default {
  name: "team",
  props: {
    teamName: {
      type: String,
      default: null
    },
    teamId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      competitionId: "",
      teamMembers: [],
      teamName_key: "",
      teams: []
    }
  },
  created() {
    this.competitionId = this.$route.params.id
    this.getTeamMembers();
  },
  methods: {
    getTeamMembers() {

      competitionApi.getTeamCompetition(this.competitionId, this.teamId).then(response => {
        this.teamMembers = response.data.data.teamCompetition.friend
        console.log(this.teamMembers)
      });
    },
    searchTeams() {
      competitionApi.searchTeams(this.competitionId, this.teamName_key).then(response => {
        this.teams = response.data.data.teams
        console.log(this.teams)
      });
    }
  },
}
</script>

<style>
#teams {
  border: 10px;
  cellspacing: 0;
  cellpadding: 0
}
</style>
