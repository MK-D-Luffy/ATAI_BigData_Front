<template>
  <div id="aCoursesList" class="questions" style="margin-left:14px;">
    <!-- 赛题描述 开始 -->

    <section class="container" style="width:98%;margin-top:25px;">

      <el-form>
        <el-form-item style="margin-bottom:0" v-if="baominflag">
          <span style="font-size:24px;margin-right:20px;">赛题数据</span>
          <el-tag style="zoom:100%">
            <i class="el-icon-download"/>
            <a :href="cover">点击下载赛题</a>
          </el-tag>
        </el-form-item>

        <div id="description" v-html="description"></div>
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
    competition: Object
  },
  watch: {
    competition: {
      handler() {
        if (this.competition!==undefined) {
          this.cover = this.competition.cover
          this.description = this.competition.description
        }
      },
      immediate: true,
      deep: true // 如果是对象要深度监听
    }
  },
  data() {
    return {
      baomin: "报名比赛",
      teamId: "",
      classList: [],
      cover: "",
      description: ""
    };
  },
};
</script>
<style>
#description h1, #description h2, #description h3, #description h4, #description h5, #description h6 {
  padding-top: 20px;
  padding-bottom: 8px;
}

#description hr {
  position: relative;
  top: 0.20em;
  border: none;
  border-bottom: 1px solid rgba(128, 128, 128, 0.33);
  background-color: rgba(128, 128, 128, 0.33);
}

#description p {
  padding: 12.8px 0;
  line-height: 26px;
  font-size: 14px;
}

#description ul li {
  list-style: disc;
  margin-left: 15px
}

#description ol li {
  list-style: decimal;
  margin-left: 15px
}

#description table {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}

#description table th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
  text-align: center;
}

#description table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
  text-align: center;
}

</style>
