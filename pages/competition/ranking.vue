<template>
  <div class="ranking">
    <el-table
      ref="singleTable"
      :data="ranking"
      border
      header-row-class-name="tableHead"
      row-class-name="tableRow"
      :cell-style="cellStyle"
      @current-change="handleCurrentChange"
      style="width: 100%;">

      <el-table-column
        type="index"
        label="排名"
        align="center"
        width="110">
      </el-table-column>

      <el-table-column
        property="nickName"
        label="参与者"
        align="center"
        width="190">
      </el-table-column>

      <el-table-column
        property="teamName"
        label="团队名"
        align="center"
        width="190">
      </el-table-column>

      <el-table-column
        property="score"
        align="center"
        width="220"
        label="score">
      </el-table-column>
      <el-table-column
        property="deadline"
        label="最优成绩提交时间"
      >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'

export default {
  data() {
    return {
      name: "ranking",
      ranking: "",
      currentRow: null
    }
  },
  mounted() {
    this.getRanking(this.$route.params.id);
  },

  methods: {
    getRanking(competitionId) {
      // debugger
      competitionApi.getRanking(competitionId)
        .then(response => {
          this.ranking = response.data.data.ranking
        })
    },
    handleCurrentChange() {
    },
    cellStyle(data) {
      // 表格的第二列加上小手和padding为0
      if (data.columnIndex === 0) {
        return 'color:#ef9c06'
      }
    },
  }
}
</script>
<style>
.ranking {
  width: 95%;
  margin: 25px 0 0 20px;
}

.tableHead {
  color: #666666;
  font-size: 14px
}

.tableRow {
  color: #333333;
}

</style>

