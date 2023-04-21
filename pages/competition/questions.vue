<template>
  <div id="aCoursesList" class="questions" style="">
    <!-- 赛题描述 开始 -->
    <section class="container" >
      <el-tag class="mt10 mb10" style="zoom:120%">
        <a :underline="false" target="_blank" :href="data" download>点击下载赛题数据&nbsp;</a>
        <i class="el-icon-download"></i>
      </el-tag>
      <div id="description" v-html="description"></div>
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
    baomingflag: Boolean,
    competition: Object
  },
  watch: {
    competition: {
      handler() {
        if (this.competition !== undefined) {
          this.data = this.competition.data
          this.description = this.competition.description
        }
      },
      immediate: true,
      deep: true // 如果是对象要深度监听
    }
  },
  data() {
    return {
      teamId: "",
      classList: [],
      data: "",
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
