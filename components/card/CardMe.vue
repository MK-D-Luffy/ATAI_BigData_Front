<template>
  <el-card>
    <div class="me-author-name">白云Rain</div>
    <div class="me-author-description">
      <span><i class="el-icon-location-outline"></i> &nbsp;浙江&台州</span>
      <span><i class="me-icon-job"></i> &nbsp;java开发工程师</span>
    </div>
    <div class="me-author-tool">
      <i @click="showTool(qq)" :title="qq.title" class="me-icon-QQ"></i>
      <i @click="showTool(github)" :title="github.title" class="me-icon-github"></i>
    </div>
  </el-card>

</template>

<script>
  export default {
    name: 'CardMe',
    data() {
      return {
        qq: {title: 'QQ', message: '1905470291@qq.com'},
        github: {
          title: 'github',
          message: '<a target="_blank" href="https://github.com/shimh-develop">https://github.com/shimh-develop</a>'
        }
      }
    },
    methods: {
      showTool(tool) {
        this.$message({
          duration: 2500,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: '<strong>' + tool.message + '</strong>'
        });
      }
    }
  }
</script>

<style scoped>
  .me-author-name {
    text-align: center;
    font-size: 28px;
    height: 48px;
    border-bottom: 1px solid #5FB878;
    margin: 20px 0 5px;
  }

  .me-author-description {
    padding: 8px 0;
  }

  .me-icon-job {
    padding-left: 16px;
  }

  .me-author-tool {
    text-align: center;
    padding-top: 5px;
  }

  .me-author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
  }
</style>
