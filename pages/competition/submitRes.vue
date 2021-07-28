<template>
  <div id="aCoursesList" class="of">
    <!-- 讲师列表 开始 -->
    <section class="container" style="width: 88%;margin-top:15px;">

      <el-form v-if="!endMark">
        <!-- 提交到oss，后端 -->
        <el-form-item>
          <!-- myUpload唯一标识  -->
          <el-upload
            :class="{ notAllowed: submitCounts===0}"
            ref="myUpload"
            :auto-upload="false"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :disabled="importBtnDisabled||submitCounts===0"
            :limit="1"
            :action="BASE_API+'/atitcompetition/atai-user-competition/saveResult/'+competitionId+'/'+userId"
            name="file"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/plain"
          >
            <!-- 设置上传格式 微软excel -->
            <el-button :disabled="submitCounts===0" :class="{ notAllowed: submitCounts===0 }"
                       style="background-color:#00C1DE;color:#fff;"
                       slot="trigger" size="small">选取文件
            </el-button>
            <el-button
              :disabled="submitCounts===0"
              :class="{ notAllowed: submitCounts===0 }"
              :loading="loading"
              style="margin-left: 10px;"
              size="small"
              type="success"

              @click="submitUpload"
            >{{ fileUploadBtnText }}
            </el-button>
            <span style="color:#3C763D;margin-left: 6px">可提交次数为{{ submitCounts }}次</span>
          </el-upload>
        </el-form-item>
      </el-form>

      <el-divider>
        <i class="el-icon-monitor"></i>
      </el-divider>
      <el-table border :data="base" style="width: 100%">
        <el-table-column prop="clo1" label="ATAI_BigData" width="220"></el-table-column>
        <el-table-column prop="clo2" label="比赛信息"></el-table-column>
      </el-table>

    </section>
  </div>
</template>

<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";
//引入调用js-cookie
import cookie from 'js-cookie'

export default {
  name: "submitRes",
  inject: ['reload'],
  props: {
    endMark: Boolean,
    userCompetition: Object,
    teamCompetition: Object,
  },
  //因为父组件props传给子组件的值是通过后端接口返回的数据，
  //也就是说是异步返回的数据，所以导致取值不同步，当然获取不到。
  //所以可以通过在watch中监听props的变化，如果有返回值就直接赋值
  watch: {
    teamCompetition: {
      handler(newVal, oldVal) {
        this.getTeamCompetition();
      },
      immediate: true,
      //如果是对象要深度监听
      deep: true
    },
  },
  data() {
    return {
      BASE_API: "http://localhost:8666", // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
      fileUploadBtnText: "上传到服务器", // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      competitionId: "",
      loading: false,
      userId: "",
      teamName: "",
      competition: "",
      score: 0,
      submitCounts: 0,
      rank: 1,
      nickname: "",
      base: [
        {
          clo1: "我的团队",
          clo2: this.teamName
        },
        {
          clo1: "我的名称",
          clo2: this.nickname
        },
        {
          clo1: "最优成绩提交时间",
          clo2: this.deadline
        },
        {
          clo1: "排名",
          clo2: this.rank
        },
        {
          clo1: "score",
          clo2: this.score
        },
      ]
    };
  },
  created() {
    this.competitionId = this.$route.params.id;
    this.submitCounts = this.userCompetition.submitCounts;
    let userStr = cookie.get("ATAI_BigData_ucenter")
    if (userStr) {
      this.nickname = JSON.parse(userStr).nickname
      this.base[1].clo2 = this.nickname;
      this.getRank(this.competitionId, this.nickname);
    }

  },
  methods: {
    getTeamCompetition() {
      this.teamName = this.teamCompetition.teamName;
      this.score = this.teamCompetition.score;
      this.userId = this.teamCompetition.userId;
      this.base[0].clo2 = this.teamName;
      let time = this.teamCompetition.deadline;
      if (time !== undefined && time !== null) {
        this.base[2].clo2 = time.substring(0, 10) + " " + time.substring(11, 19);
      }
      this.base[4].clo2 = this.score;
    },

    getRank(competitionId, nickname) {
      competitionApi.getRank(competitionId, nickname)
        .then(response => {//请求成功
          // console.log(response.data.data);
          this.rank = response.data.data.rank;
          if (this.rank != null) {
            this.base[3].clo2 = this.rank;
          }
        })
    },

    //点击上传按钮  上传excel文件到接口种
    submitUpload() {
      if (this.$refs.myUpload.$data.uploadFiles.length > 0) {
        this.fileUploadBtnText = "正在上传";
        this.importBtnDisabled = true;
        this.loading = true;
        this.$refs.myUpload.submit(); //js:document.getElementById("myUpload:).submit()
      } else {
        this.$message({
          type: "warning",
          message: "请选择文件"
        });
      }
    },

    //上传成功
    fileUploadSuccess(response) {
      //提示信息
      // debugger
      // console.log(response);
      if (response.success === true) {
        this.fileUploadBtnText = "导入成功";
        this.importBtnDisabled = false;
        this.loading = false;
        this.$message({
          type: "success",
          message: response.message
        });
        //刷得分日期
        this.getTeamCompetition();
        this.getUserCompetition(this.competitionId);
      } else {
        this.fileUploadBtnText = "重新上传";
        this.loading = false;
        this.importBtnDisabled = false;
        this.$message({
          type: "warning",
          message: response.message
        });
      }
    },

    //上传失败
    fileUploadError() {
      this.fileUploadBtnText = "重新上传";
      this.importBtnDisabled = false;
      this.loading = false;
      this.$message({
        type: "error",
        message: "导入文件失败"
      });
    },
  }
};
</script>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}

.notAllowed {
  cursor: not-allowed
}
</style>
