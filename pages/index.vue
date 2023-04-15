<template>
  <div class="bg-fa of">
    <div class="container">
      <div class="mt15">
        <el-card>
          <el-carousel height="360px">
            <el-carousel-item v-for="competition in competitions" :key="competition.id">
              <a :href="'/competition/'+competition.id">
                <img style="width:100%;height:100%"
                     :src="competition.cover"
                     draggable="false"/>
              </a>
            </el-carousel-item>
          </el-carousel>
        </el-card>

        <el-row class="mt20 mb20" :gutter="30">
          <el-col :span="12">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="fsize18 blue">热门课程</span>
                <router-link style="float: right; padding: 3px 0" to="/course" tag="li" active-class="current" exact>
                  <a class="blue" style="text-decoration:none">更多>> </a>
                </router-link>
              </div>

              <el-row v-for="course in courses" :key="course.id">
                <el-col :span="13" style="height:30px" class="text item">
                  <a :href="'/course/'+course.id" class="noticeTitle">
                    {{ course.name }}
                  </a>
                </el-col>
                <el-col :span="3">
                  <el-tag
                    size="small"
                    type="danger"
                    effect="dark">
                    {{ course.level }}
                  </el-tag>
                </el-col>
                <el-col :span="5">
                  <el-tag
                    size="small"
                    type="primary"
                    effect="dark">
                    {{ course.tech.substring(0, 7) }}
                  </el-tag>
                </el-col>
                <el-col :span="3">
                  <i class="el-icon-user">&nbsp;{{ course.participants }}</i>
                </el-col>
              </el-row>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="blue fsize18">热门数据集</span>
                <router-link style="float: right; padding: 3px 0" to="/dataset" tag="li" active-class="current" exact>
                  <a class="blue" style="text-decoration:none">更多>> </a>
                </router-link>
              </div>
              <el-row v-for="dataset in datasets" :key="dataset.id">
                <el-col :span="18" style="height:30px" class="text item">
                  <a :href="'/dataset/'+dataset.id" class="noticeTitle">{{ dataset.name }}</a>
                </el-col>
                <el-col :span="3">
                  <span style="text-align:center">
                    <i class="el-icon-view"></i>
                    {{ dataset.watch }}
                  </span>
                </el-col>
                <el-col :span="3">
                  <span style="text-align:center">
                    <i class="el-icon-download"></i>
                    {{ dataset.download }}
                  </span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>

//引入调用index.js文件
import indexApi from '@/api/index'

export default {

  data() {
    return {
      competitions: [],
      courses: [],
      datasets: []
    }
  },
  created() {
    this.getLargeCompetition()
    this.getHotCourses()
    this.getHotDatasets()
  },
  methods: {
    getLargeCompetition() {
      indexApi.getLargeCompetition()
        .then(response => {
          this.competitions = response.data.data.large
        })
    },
    getHotCourses() {
      indexApi.getHotCourses()
        .then(response => {
          this.courses = response.data.data.hotCourses
        })
    },
    getHotDatasets() {
      indexApi.getHotDatasets()
        .then(response => {
          console.log(response.data.data)
          this.datasets = response.data.data.hotDatasets
        })
    },
    view(id) {
      if (id != null)
        this.$router.push({path: `/introduce/member/${id}`})
      else
        this.$router.push({path: `/introduce/member`})
    }

  }
}
</script>
<style scoped>
.winClass {
  width: 600px;
}

.el-table td, .el-table th {
  text-align: center !important;
}

.el-card .el-card__header {
  padding: 15px;
}

.noticeTitle {
  float: left;
  width: 70%;
  font-size: 14px;
  line-height: 180%;
  color: #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none !important;
}

.noticeTitle:hover {
  color: rgb(64, 158, 255);
}

.el-divider--horizontal {
  margin-top: 8px;
  margin-bottom: 12px;
}

.blue {
  color: rgb(112, 181, 238)
}
</style>
