<template>
  <div class="bg-fa of">
    <el-container class="container mt20 mb30">
      <el-header class="bg-ff brbs" style="padding: 15px 0px 15px 15px;height:180px;">
        <el-row :gutter="100">
          <el-col :span="4">
            <el-image
              class="brbs"
              style="width:180px;height:135px"
              :src="dataset.image"></el-image>
          </el-col>
          <el-col :span="18">
            <el-row id="course-item">
              <el-col style="font-size: 18px;font-weight: 700" :span="24">{{ dataset.name }}</el-col>
              <el-col style="color:#a0a6ab;line-height: 20px" :span="24">
                <el-avatar
                  size="small"
                  :src="dataset.avatar===null?'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png':dataset.avatar">
                </el-avatar>
                <span class="vam disIb mb20">{{ dataset.username === null ? '官方数据集' : dataset.username }}</span>
              </el-col>
              <el-col id="datasetInfo" style="color:#606972;line-height: 20px" :span="24">
                <i class="el-icon-time">
                  {{ dataset.gmtCreate.substring(0, 16) }}
                </i>
                <i class="el-icon-view">&nbsp;{{ dataset.watch }}</i>
                <i class="el-icon-download">&nbsp;{{ dataset.download }}</i>
                <el-button style="zoom:80%" type="primary" plain>
                  <i style="margin-right: 0px !important;" class="el-icon-collection-tag">{{ dataset.category }}</i>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="mt20" style="min-height: 350px">
        <el-main class="bg-ff brbs" style="padding: 20px">
          <div>
            <div class="fsize18 mb10" style="font-weight: 700">简介</div>
            <div>
              {{ dataset.intro }}
            </div>
            <div class="fsize18 mb10 mt40" style="font-weight: 700">数据文件</div>
            <div>
              <a target="_blank" :href="dataset.url" download>
                <el-button @click="addDownload" type="primary">
                  点击下载数据
                </el-button>
              </a>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import datasetApi from "@/api/dataset";

export default {
  data() {
    return {
      dataset: {
        gmtCreate: ''
      },
      page: 1,
      limit: 10,
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getDataset();
    this.addWatch()
  },
  methods: {
    getDataset() { //比赛列表的方法
      datasetApi.getDataset(this.id)
        .then(response => { //请求成功
          this.dataset = response.data.data.dataset
          console.log(this.dataset)
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    addWatch() {
      datasetApi.addWatch(this.id)
        .then(response => { //请求成功
          console.log(response.data)
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    addDownload() {
      datasetApi.addDownload(this.id)
        .then(response => { //请求成功
          console.log(response.data)
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    }
  }
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
