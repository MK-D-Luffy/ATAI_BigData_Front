<template>
  <article class="col-7 fl userInfo">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="我的比赛" class="current">
              数据集列表
            </a>
          </section>
        </div>
        <div class="mt40">
          <section v-if="datasets.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">您还没有发布数据集哦！</span>
          </section>

          <!-- 表格 -->
          <el-table
            v-if="datasets.length>0"
            :data="datasets"
            fit
            highlight-current-row>
            <el-table-column label="数据集名称" align="center" style="cursor:pointer;">
              <template slot-scope="scope">
                <div class="info">
                  <div class="title">
                    <a @click="view(scope.row.id)" class="compinfo">{{ scope.row.name }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="数据集类型" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" style="pointer-events: none;" type="primary">
                  {{ scope.row.category }}
                </el-button>
              </template>
            </el-table-column>

            <el-table-column width="60" align="center">
              <template slot-scope="scope">
                <i class="el-icon-view">&nbsp; {{ scope.row.watch }}</i>
              </template>
            </el-table-column>
            <el-table-column width="60" align="center">
              <template slot-scope="scope">
                <i class="el-icon-download">&nbsp; {{ scope.row.download }}</i>
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
      datasets: []
    }
  },

  created() {
    const loginInfo = JSON.parse(cookie.get("ATAI_BigData_ucenter"));
    this.userId = loginInfo.id
    this.getUserDatasets()
  },

  methods: {
    getUserDatasets() {
      userApi.getUserDatasets(this.userId)
        .then(response => {
          console.log(response.data)
          this.datasets = response.data.data.userDatasets
        })
    },
    view(id) {
      this.$router.push({path: `/dataset/${id}`})
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
