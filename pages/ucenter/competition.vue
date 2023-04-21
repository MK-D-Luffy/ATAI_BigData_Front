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
          <section v-if="competitions.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">您还没有参加比赛哦！</span>
          </section>

          <!-- 表格 -->
          <el-table
            v-if="competitions.length>0"
            :data="competitions"
            fit
            highlight-current-row>
            <el-table-column label="比赛名称" align="center" style="cursor:pointer;">
              <template slot-scope="scope">
                <div class="info">
                  <div class="title">
                    <a @click="view(scope.row.id)" class="compinfo">{{ scope.row.name }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="比赛类型" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" style="pointer-events: none;" type="primary">
                  {{ scope.row.level }}
                </el-button>
              </template>
            </el-table-column>

            <el-table-column label="参加人数" width="120" align="center">
              <template slot-scope="scope">
                {{ scope.row.participants }}
              </template>
            </el-table-column>
            <el-table-column label="截止时间" width="150" align="center">
              <template slot-scope="scope">
                {{ scope.row.deadline.substring(0,10) }}
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
import userApi from '@/api/ucenter'
import cookie from "js-cookie";

export default {
  data() {
    return {
      userId: '',
      competitions: []
    }
  },

  created() {
    const loginInfo = JSON.parse(cookie.get("ATAI_BigData_ucenter"));
    this.userId = loginInfo.id
    this.getUserCompetitions()
  },

  methods: {
    getUserCompetitions() {
      userApi.getUserCompetitions(this.userId)
        .then(response => {
          console.log(response.data)
          this.competitions = response.data.data.data
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
</style>
