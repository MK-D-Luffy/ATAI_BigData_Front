<template>
  <el-container class="mt10" style="min-height: 500px">
    <el-aside width="160px" class="mr30" style="border-right: 1px solid rgb(235, 238, 245)">
      <el-menu
        :default-active="teamIndex"
        text-color="rgb(149, 152, 157)">
        <el-menu-item @click="setTeamIndex('1')" index="1">
          <span>我的队伍</span>
        </el-menu-item>
        <el-menu-item v-if="!endFlag" @click="setTeamIndex('2')" index="2">
          <span>全部队伍</span>
        </el-menu-item>
        <el-menu-item v-if="!endFlag" @click="setTeamIndex('3')" index="3">
          <span>组队申请</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main v-if="teamIndex==='1'">
      <el-card>
        <el-row>
          <el-col :span="3" justify="start">
            <el-image
              style="width: 90px; height: 90px;margin-right:10px;border-radius:5px"
              :src="competitionTeam.avatar"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :span=18>
            <div class="pb10 fsize16 fw6">
              {{ competitionTeam.name }}
            </div>
            <div class="pb10 fsize14">
              <span v-if="competitionTeam.intro!==null">
                {{ competitionTeam.intro }}
              </span>
              <span v-else>暂无队伍宣言，请完善</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div style="align-items: center;color:rgb(144, 147, 153)">开放组队申请</div>
            <el-switch
              class="ml20"
              v-model="isAllowed">
            </el-switch>
          </el-col>
        </el-row>
      </el-card>

      <div class="fsize16 fw6" style="margin: 20px 0">队伍成员</div>
      <el-card v-for="teamUser in teamUsers" :key="teamUser.id" class="mb20"
               :class="teamUser.isLeader===1?'leaderTag':''">
        <el-row>
          <el-col :span="3" justify="start">
            <el-image
              style="width: 90px; height: 90px;margin-right:10px;border-radius:5px"
              src="https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :span=18>
            <div class="pb10 fsize16 fw6">
              {{ teamUser.name }}
              <i v-if="userId===teamUser.userId" class="el-icon-s-custom"></i>
            </div>
            <div class="pb10 fsize14">
              <span v-if="teamUser.intro!==null">
                {{ teamUser.intro }}
              </span>
              <span v-else>这个人很懒，还没有留下自我宣言</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-main>

    <el-main v-else-if="teamIndex==='2'">
      <el-input placeholder="请输入队伍名" v-model="name" style="width:300px" class="mb20">
        <el-button slot="append" icon="el-icon-search" @click="gotoPage(1)"></el-button>
      </el-input>
      <el-empty v-if="teamList.items.length===0" :image-size="200" description="暂无队伍信息"></el-empty>
      <el-card v-else v-for="team in teamList.items" :key="team.id" class="mb20">
        <el-row>
          <el-col :span="4" justify="start">
            <el-image
              style="width: 105px; height: 105px;margin-right:10px;border-radius:5px"
              src="https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :span=17>
            <div class="pb10 fsize16 fw6">
              {{ team.name }}
            </div>
            <div class="pb5">
              <el-avatar size="small" v-for="user in team.users" :key="user.id" class="mr5"
                         src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </div>
            <div class="fsize14" style="color:rgb(144, 147, 153)">
              <span v-if="team.intro!==null">
                {{ team.intro }}
              </span>
              <span v-else>暂无队伍宣言，请完善</span>
            </div>
          </el-col>
          <el-col :span="3">
            <el-button v-if="team.participated===false" type="primary" @click="joinTeam(team.id)">申请加入</el-button>
            <div v-else class="mt10 hLh30 txtOf tac fsize20" style="color:#67C23A">已申请</div>
          </el-col>
        </el-row>
      </el-card>
      <!-- 公共分页 开始 -->
      <div>
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a :class="{undisable: !teamList.hasPrevious}" style="width:50px" href="#" title="首页"
             @click.prevent="gotoPage(1)">首页</a>

          <a :class="{undisable: !teamList.hasPrevious}" href="#" title="前一页"
             @click.prevent="gotoPage(teamList.current-1)">&lt;</a>

          <a v-for="page in teamList.pages" :key="page"
             :class="{current: teamList.current === page, undisable: teamList.current === page}"
             :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>

          <a :class="{undisable: !teamList.hasNext}" href="#" title="后一页"
             @click.prevent="gotoPage(teamList.current+1)">&gt;</a>

          <a :class="{undisable: !teamList.hasNext}" style="width:50px" href="#" title="末页"
             @click.prevent="gotoPage(teamList.pages)">末页</a>

          <div class="clear"/>
        </div>
      </div>
      <!-- 公共分页 结束 -->
    </el-main>
    <el-main v-else>
      <el-empty v-if="joinTeamUsers.length===0" :image-size="200" description="暂无组队申请"></el-empty>
      <el-card v-for="joinTeamUser in joinTeamUsers" :key="joinTeamUser.id" class="mb20">
        <el-row>
          <el-col :span="3" justify="start">
            <el-image
              style="width: 90px; height: 90px;margin-right:10px;border-radius:5px"
              src="https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :span=18>
            <div class="pb10 fsize16 fw6">
              {{ joinTeamUser.name }}
            </div>
            <div class="pb10 fsize14">
              <span v-if="joinTeamUser.intro!==null">
                {{ joinTeamUser.intro }}
              </span>
              <span v-else>这个人很懒，还没有留下自我宣言</span>
            </div>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col class="mt10 mb20" :span="24">
                <el-button size="mini" type="primary" @click="acceptJoinTeam(joinTeamUser.userId,joinTeamUser.teamId)">
                  允许加入
                </el-button>
              </el-col>
              <el-col :span="24">
                <el-button size="mini" type="danger" @click="refuseJoinTeam(joinTeamUser.userId)">拒绝加入</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import competitionApi from "@/api/competition";

export default {
  name: "team",
  inject: ['reload'],
  props: {
    endFlag: Boolean,
    competitionId: String,
    teamId: String,
    userId: String
  },
  // watch: {
  //   teamId: {
  //     immediate: true,  //很重要，初始化就可以被监听
  //     handler(newVal) {
  //       this.teamId = newVal
  //       // this.valueType = newVal;   //赋值给data
  //       // this.getDistrictList();   //拿到参数后去做请求
  //       console.log(this.teamId )
  //
  //     },
  //   }
  // },
  data() {
    return {
      competitionTeam: {
        avatar: 'https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg',
        name: '',
        intro: '',
        isAllowed: 1
      },
      isAllowed: true,
      teamUsers: [],
      name: '',
      teamList: [],
      joinTeamUsers: [],
      //是否进行编辑
      editFlag: false,
      searchFlag: false,
      teamIndex: '1',
      page: 1,
      limit: 5
    }
  },
  mounted() {
    setTimeout(() => {
      // 方法区
      this.getCompetitionTeam()
      this.getTeamUsers();
      this.getTeamList()
      this.getJoinTeamUser()
    }, 500);

  },
  methods: {
    setTeamIndex(index) {
      this.teamIndex = index
    },
    getCompetitionTeam() {
      competitionApi.getCompetitionTeam(this.teamId)
        .then(response => { //请求成功
          this.competitionTeam = response.data.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    getTeamUsers() {
      competitionApi
        .getTeamUsers(this.teamId)
        .then(response => {
          this.teamUsers = response.data.data.users
        })
    },
    getTeamList(page = 1) { //比赛列表的方法
      this.page = page
      competitionApi.getTeamPageList(this.page, this.limit, this.teamId, this.userId, this.name)
        .then(response => { //请求成功
          this.teamList = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    gotoPage(page) {
      competitionApi.getTeamPageList(page, this.limit, this.name)
        .then(response => {
          this.teams = response.data.data
        })
    },
    joinTeam(teamId) {
      this.$confirm('申请通过后无法修改队伍信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let teamJoin = {}
        teamJoin.userId = this.userId
        teamJoin.competitionId = this.competitionId
        teamJoin.teamId = teamId   //我请求加入的队伍
        competitionApi.joinTeam(teamJoin).then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "申请成功"
            });
          }
        });
      })
    },
    getJoinTeamUser() {
      competitionApi.getJoinTeamUser(this.competitionId, this.teamId)
        .then(response => {
          this.joinTeamUsers = response.data.data.users
        });
    },
    acceptJoinTeam(userId, oldTeamId) {
      competitionApi
        .acceptJoinTeam(userId, this.competitionId, oldTeamId, this.teamId)
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
    refuseJoinTeam(userId) {
      competitionApi
        .refuseJoinTeam(userId, this.competitionId, this.teamId)
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
  }
}
</script>
<style>
.el-table thead.is-group th {
  background: #fff;
}

.el-menu {
  border-right: none;
}

.el-menu {
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.el-menu-item {
  border-top: 1px solid #fff;
  /*padding: 4px 8px;*/
  /*height: 42px;*/
}

.el-menu-item:hover {
  color: rgb(0, 112, 248) !important;
  /*background-color: #1956A5 !important;*/
}

.el-menu-item span {
  font-size: 14px;
}

.el-menu .is-active {
  color: rgb(0, 112, 248);
  background-color: rgb(242, 248, 250) !important;
  border-left: 3px solid #0070f8;
}

.leaderTag {
  border-top: 3px solid rgb(230, 162, 60);
}
</style>
