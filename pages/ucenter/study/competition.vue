<template>
  <article class="col-7 fl userInfo">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="我的比赛" class="current">
              比赛列表
            </a>
          </section>
        </div>
        <div class="mt40">
          <section v-if="competitionList.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">您还没有参加比赛哦！</span>
          </section>

          <!-- 表格 -->
          <el-table
            v-if="competitionList.length>0"
            :data="competitionList"
            bcompetition
            fit
            highlight-current-row>
            <el-table-column label="比赛类型" width="150" align="center">
              <template slot-scope="scope">
                <el-button size="mini" style="pointer-events: none;"
                           class="greenBtn"
                           :class="[{greenBtn:scope.row.level==='新人赛'},
                                          {redBtn: scope.row.level==='程序设计大赛'},
                                          {orangeBtn:scope.row.level==='算法大赛'},
                                          {purpleBtn:scope.row.level==='创新应用大赛'}]">
                  {{ scope.row.level }}
                </el-button>
                <!--                <el-button type="success" size="mini"></el-button>-->
              </template>
            </el-table-column>
            <el-table-column label="比赛名称" align="center" style="cursor:pointer;">
              <template slot-scope="scope">
                <div class="info">
                  <div class="title">
                    <a @click="view(scope.row.id)" class="compinfo">{{ scope.row.name }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="队伍名称" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.teamName }}
              </template>
            </el-table-column>
            <el-table-column label="分数" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.score }}
              </template>
            </el-table-column>
            <el-table-column label="截止时间" width="250" align="center">
              <template slot-scope="scope">
                {{ scope.row.deadline }}
              </template>
            </el-table-column>


          </el-table>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'

export default {
  data() {
    return {
      competitionList: [],
      greenBtn: 'greenBtn',
      redBtn: 'redBtn',
      orangeBtn: 'orangeBtn',
      purpleBtn: 'purpleBtn'
    }
  },

  created() {
    this.fetchCompetitionList()
  },

  methods: {
    fetchCompetitionList() {
      competitionApi.getMyCompetitionList(1, 10).then(response => {
        this.competitionList = response.data.data.data
      })
    },
    view(id) {
      this.$router.push({path: `/competition/${id}`})
    }
  },
}
</script>
<style>
.compinfo:hover {
  color: #ff6a00;
  text-decoration: none;
}

.greenBtn {
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
}

.redBtn {
  color: #FFF;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.orangeBtn {
  color: #FFF;
  background-color: rgb(246, 179, 80);
  border-color: rgb(246, 179, 80);
}

.purpleBtn {
  color: #FFF;
  background-color: rgb(114, 101, 230);
  border-color: rgb(114, 101, 230);
}
</style>
