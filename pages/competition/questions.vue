<template>
  <div id="aCoursesList" class="questions" style="margin-left:14px;">
    <!-- 赛题描述 开始 -->

    <section class="container" style="width:98%;margin-top:25px;">

      <el-form>

        <el-form-item v-if="baominflag">
          <!--                  <el-tag type="info">报名后可以下载赛题</el-tag>-->
          <span style="font-size:24px;margin-right:30px;margin-bottom: 30px">赛题数据</span>
          <el-tag style="zoom:110%">
            <i class="el-icon-download"/>
            <a :href="competition.cover">点击下载赛题</a>
          </el-tag>
        </el-form-item>

        <div v-html="competition.description"></div>

      </el-form>

    </section>
  </div>
</template>
<script>
//引入调用teacher.js文件
import competitionApi from "@/api/competition";
//引入调用js-cookie
import cookie from "js-cookie";

export default {
  name: "questions",
  props: {
    baominflag: Boolean,
    required: true
  },
  data() {
    return {
      baomin: "报名比赛",
      xiazai: "JavaScript：;",
      teamId: "",
      classList: [],
      competition: {
        description: ""
      },
      // tableData2:[{
      //   text:"比赛数据",
      //   dowload:""
      // }]
    };
  },
  created() {
    const token = cookie.get("ATAI_BigData_token");
    //根据id获取比赛
    this.getCompetitionDetailInfo(this.$route.params.id);
  },

  methods: {
    //根据id获取比赛
    getCompetitionDetailInfo(id) {
      //比赛列表的方法
      competitionApi
        .getCompetitionDetailInfo(id)
        .then(response => {
          //请求成功
          //response接口返回的数据
          debugger;
          this.competition = response.data.data.competition;

        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
h1, h2, h3, h4, h5, h6 {
  margin-top: 20px;
  margin-bottom: 15px;
}

h1::after, h2::after, h3::after, h4::after, h5::after, h6::after {
  content: '';
  display: block;
  position: relative;
  top: 0.33em;
  border-bottom: 1px solid rgba(128, 128, 128, 0.33);
  margin-top: 3px;
  /*margin-bottom: 15px;*/
}

p {
  margin: 16.8px 0;
  line-height: 26px;
  font-size: 14px;
  /*text-align: center;*/
}
</style>
