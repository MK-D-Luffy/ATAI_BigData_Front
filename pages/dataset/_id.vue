<template>
  <div class="bg-fa of">
    <el-container class="container mt20 mb30">
      <el-header class="bg-ff brbs" style="padding: 15px 0px 15px 15px;height:180px;">
        <el-row :gutter="100">
          <el-col :span="4">
            <el-image
              class="brbs"
              style="width:180px;height:135px"
              src="https://jiutian.10086.cn/edu/objects-download/76b106f68cb743d6893871627a30a37f%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C.png"></el-image>
          </el-col>
          <el-col :span="18">
            <el-row id="course-item">
              <el-col style="font-size: 18px;font-weight: 700" :span="24">九天人工智能培训</el-col>
              <el-col style="color:#a0a6ab;line-height: 20px" :span="24">
                <el-avatar
                  size="small"
                  src="https://www.datafountain.cn/_df_static/img/avatar.f744cf3.jpg">
                </el-avatar>
                <span class="vam disIb mb20">111111111</span>
              </el-col>
              <el-col id="datasetInfo" style="color:#606972;line-height: 20px" :span="24">
                <i class="el-icon-time">
                  2023.3.3 14.56
                </i>
                <i class="el-icon-download">17</i>
                <i class="el-icon-view">100</i>
                <el-button style="zoom:80%" type="primary" plain>
                  <i style="margin-right: 0px !important;" class="el-icon-collection-tag">互联网</i>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="mt20" style="height: 350px">
        <el-main class="bg-ff brbs" style="padding: 20px">
          <div>
            <div class="fsize18 mb10" style="font-weight: 700">简介</div>
            <div>
              电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测
              电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测
              电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格预测电力现货价格
            </div>
            <div class="fsize18 mb10 mt40" style="font-weight: 700">数据文件</div>
            <div>
              <el-button type="primary">
<!--                TODO-->
                <a style="color:white" href="">点击下载数据</a>
              </el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import blogApi from "@/api/blog";
import articleItem from "@/components/article/ArticleItem";
import datasetApi from "@/api/dataset";

export default {
  name: 'Index',
  created() {
    this.getDatasetList();
  },
  data() {
    return {
      dataset: {},
      page: 1,
      limit: 10,
    }
  },
  methods: {
    getDatasetList(page = 1) { //比赛列表的方法
      // debugger
      this.page = page
      datasetApi.getDatasetPageList(this.page, this.limit, {})
        .then(response => { //请求成功
          //response接口返回的数据
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
  },
}
</script>
<style scoped>
.brbs {
  border: 2px solid white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}

#course-item .el-col {
  margin-bottom: 18px;
}

.course-header {
  font-weight: 600;
  font-size: 16px;
}

.course-info {
  color: rgba(0, 0, 0, .65)
}

#datasetInfo i {
  margin-right: 30px;
}
</style>
