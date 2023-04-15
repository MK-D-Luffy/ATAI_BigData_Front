<template>
  <el-container class="mt10" style="min-height: 500px">
    <el-aside width="160px" class="mr30" style="border-right: 1px solid rgb(235, 238, 245)">
      <el-menu
        :default-active="submitIndex"
        text-color="rgb(149, 152, 157)">
        <el-menu-item v-if="!endFlag" @click="setSubmitIndex('1')" index="1">
          <span>作品提交</span>
        </el-menu-item>
        <el-menu-item @click="setSubmitIndex('2')" index="2">
          <span>历史提交</span>
        </el-menu-item>
        <el-menu-item @click="setSubmitIndex('3')" index="3">
          <span>排行榜</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main v-if="submitIndex==='1'">
      <el-row>
        <el-col :span="24">
          <el-tag type="warning">依据竞赛规则每队总共可提交 5 次，队伍今日还可提交 {{ submitCounts }} 次，您本人今日还可提交 {{ submitCounts }} 次</el-tag>
        </el-col>
        <el-col class="mt20 fsize14" :span="24">
          <span>结果文件</span>
          <el-tag size="mini" type="info">必传项，成绩评测必备文件</el-tag>
        </el-col>
        <el-col class="mt15" :span="24">
          <el-form>
            <el-form-item>
              <el-upload
                :class="{ notAllowed: submitCounts===0}"
                drag
                ref="myUpload"
                :auto-upload="false"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :disabled="importBtnDisabled||submitCounts===0"
                :limit="1"
                :action="BASE_API+'/ataiservice/atai-competition/submit/'+competitionId+'/'+teamId+'/'+userId"
                name="file"
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/plain,.py"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
            <el-form-item>
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
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-main v-else-if="submitIndex==='2'" style="padding: 10px 20px 20px 10px !important;">
      <el-tabs v-model="submit2Index">
        <el-tab-pane name="1">
          <span slot="label" class="fsize16 fw6 mb20" style="color:black">我的提交</span>
          <el-card v-for="record in recordsByUser" :key="record.id" class="mb20">
            <el-row>
              <el-col class="pb10 fsize16 fw6" style="border-bottom: 1px dashed #e4e7ed;" :span=24>
                {{ record.filename }}
              </el-col>
            </el-row>
            <el-row class="mt10 mb15">
              <el-col :span=6>
                <span style="color: #c0c4cc;font-size: 13px;">最终得分:</span>
                <span class="fw6">{{ record.score }}</span>
              </el-col>
              <el-col :span=6>
                <span style="color: #c0c4cc;font-size: 13px;">提交时间:</span>
                <span class="fw6">{{ record.gmtCreate.substring(0, 16) }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-tag style="width:430px" type="info">备注:无</el-tag>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="fsize16 fw6" style="color:black">队伍提交</span>
          <el-card v-for="record in recordsByTeam" :key="record.id" class="mb20">
            <el-row>
              <el-col class="pb10 fsize16 fw6" style="border-bottom: 1px dashed #e4e7ed;" :span=19>
                {{ record.filename }}
              </el-col>
              <el-col class="fsize12 fw4" style="color: #909399;" :span="5">
                上传用户：SADAddddddddd
              </el-col>
            </el-row>
            <el-row class="mt10 mb15">
              <el-col :span=6>
                <span style="color: #c0c4cc;font-size: 13px;">最终得分:</span>
                <span class="fw6">{{ record.score }}</span>
              </el-col>
              <el-col :span=6>
                <span style="color: #c0c4cc;font-size: 13px;">提交时间:</span>
                <span class="fw6">{{ record.gmtCreate.substring(0, 16) }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-tag style="width:430px" type="info">备注:无</el-tag>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else style="padding: 0 20px 20px 10px !important;">
      <div class="ranking">
        <el-table
          ref="singleTable"
          :data="rankList"
          border
          header-row-class-name="tableHead"
          row-class-name="tableRow"
          style="width: 100%;">
          <el-table-column
            type="index"
            label="排名"
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            property="name"
            label="团队名"
            align="center"
            width="230">
          </el-table-column>
          <el-table-column
            property="score"
            align="center"
            width="160"
            label="score">
          </el-table-column>
          <el-table-column
            property="bestTime"
            align="center"
            label="最优成绩提交时间">
          </el-table-column>
        </el-table>

      </div>
    </el-main>
  </el-container>
</template>

<script>
//引入调用competition.js文件
import competitionApi from "@/api/competition";

export default {
  name: "submit",
  inject: ['reload'],
  props: {
    endFlag: Boolean,
    userId: String,
    teamId: String,
    competitionId: String
  },
  data() {
    return {
      BASE_API: "http://localhost:8666", // 接口API地址
      fileUploadBtnText: "上传到服务器", // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      submitCounts: 0,
      activeIndex: "1",
      submitIndex: "1",
      submit2Index: "1",
      recordsByUser: [],
      recordsByTeam: [],
      rankList: []
    };
  },
  mounted() {
    // this.submitCounts = this.userCompetition.submitCounts;
    this.getCompetitionTeam()
    this.getRecordsByUserId()
    this.getRecordsByTeamId()
    this.getRankList();
  },
  methods: {
    setSubmitIndex(submitIndex) {
      this.submitIndex = submitIndex
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
      // cookie.set('activeTab','tab4')
      this.reload()
      if (response.success === true) {
        this.fileUploadBtnText = "导入成功";
        this.importBtnDisabled = false;
        this.loading = false;
        this.$message({
          type: "success",
          message: response.message
        });
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
    getCompetitionTeam() {
      competitionApi.getCompetitionTeam(this.teamId)
        .then(response => {
          this.submitCounts = response.data.data.data.submitCounts
        })
    },
    getRecordsByUserId() {
      competitionApi.getRecordsByUserId(this.competitionId, this.userId)
        .then(response => {
          console.log(response.data)
          this.recordsByUser = response.data.data.records
        })
    },
    getRecordsByTeamId() {
      competitionApi.getRecordsByTeamId(this.competitionId, this.teamId)
        .then(response => {
          this.recordsByTeam = response.data.data.records
        })
    },
    getRankList() {
      competitionApi.getRankList(this.competitionId)
        .then(response => {
          this.rankList = response.data.data.rankList
        })
    },
  }
};
</script>
<style scoped>
.el-table td,
.el-table th {
  text-align: center !important;
}

.notAllowed {
  cursor: not-allowed
}

p {
  font-size: 16px;
  margin-bottom: 20px;
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
</style>
