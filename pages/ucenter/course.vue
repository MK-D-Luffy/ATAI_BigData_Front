<template>
  <article class="col-7 fl userInfo">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="我的比赛" class="current">
              课程列表
            </a>
          </section>
        </div>
        <div class="mt40">
          <section v-if="courses.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">您还没有报名课程哦！</span>
          </section>

          <!-- 表格 -->
          <el-table
            v-if="courses.length>0"
            :data="courses"
            fit
            highlight-current-row>
            <el-table-column label="课程名称" align="center" style="cursor:pointer;">
              <template slot-scope="scope">
                <div class="info">
                  <div class="title">
                    <a @click="view(scope.row.id)" class="compinfo">{{ scope.row.name }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="课程类型" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" style="pointer-events: none;" type="primary">
                  {{ scope.row.level }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="参与人数" width="120" align="center">
              <template slot-scope="scope">
                  {{ scope.row.participants }}
              </template>
            </el-table-column>
            <el-table-column label="开课时间" width="220" align="center">
              <template slot-scope="scope">
                {{ scope.row.begin.substring(0,10) }} - {{ scope.row.end.substring(0,10) }}
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
      courses: []
    }
  },
  created() {
    const loginInfo = JSON.parse(cookie.get("ATAI_BigData_ucenter"));
    this.userId = loginInfo.id
    this.getUserCourses()
  },
  methods: {
    getUserCourses() {
      userApi.getUserCourses(this.userId)
        .then(response => {
          console.log(response.data)
          this.courses = response.data.data.userCourses
        })
    },
    view(id) {
      this.$router.push({path: `/course/${id}`})
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
