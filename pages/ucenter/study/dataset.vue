<template>
  <div>
    <div>
      <!-- /无数据提示 开始-->
      <section class="no-data-wrap" v-if="data.total===0">
        <em class="icon30 no-data-ico">&nbsp;</em>
        <span class="c-666 fsize14 ml10 vam">暂未发布比赛，没有相关数据...</span>
      </section>

      <article class="i-competition-list" v-if="data.total>0">
        <ul class="of">
          <li v-for="dataset in data.items" :key="dataset.id">
            <router-link to="/dataset/1">
              <section class="i-dataset-wrap">
                <el-row :gutter="22">
                  <el-col :span="4" justify="start">
                    <el-image
                      style="width: 180px; height: 120px;margin-right:20px;border-radius:10px"
                      :src="dataset.image"
                      fit="fill"
                    ></el-image>
                  </el-col>
                  <el-col style="margin-left:20px" :span="18" justify="start">
                    <el-row>
                      <el-col :span="22" justify="start">
                        <header class="dateset-title">{{ dataset.name }}</header>
                      </el-col>
                      <el-col :span="2" justify="end">
                        <el-button size="small" icon="el-icon-collection-tag">{{ dataset.category }}</el-button>
                      </el-col>
                    </el-row>
                    <el-row class="dataset-intro">
                      {{ dataset.intro }}
                    </el-row>
                    <el-row id="dataset-icons">
                      <el-col :span="4" justify="start">
                          <span title>
                            <el-avatar style="background-color:#fff;"
                                       size="small"
                                       :src="dataset.avatar">
                            </el-avatar>
                            <span class="vam disIb mb20">{{ dataset.username }}</span>
                          </span>
                      </el-col>
                      <el-col :span="4">
                        <i class="el-icon-time"></i>
                        {{ dataset.gmtCreate.substr(0, 10) }}
                      </el-col>
                      <el-col :span="2">
                        <i class="el-icon-view"></i>
                        {{ dataset.watch }}
                      </el-col>
                      <el-col :span="2" justify="end">
                        <i class="el-icon-download"></i>
                        {{ dataset.download }}
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </section>
            </router-link>
          </li>
        </ul>

        <div class="clear"></div>
      </article>
    </div>
    <!-- 公共分页 开始 -->
    <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a :class="{undisable: !data.hasPrevious}" style="width:50px" href="#" title="首页"
           @click.prevent="gotoPage(1)">首页</a>

        <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页"
           @click.prevent="gotoPage(data.current-1)">&lt;</a>

        <a v-for="page in data.pages" :key="page"
           :class="{current: data.current === page, undisable: data.current === page}"
           :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>

        <a :class="{undisable: !data.hasNext}" href="#" title="后一页"
           @click.prevent="gotoPage(data.current+1)">&gt;</a>

        <a :class="{undisable: !data.hasNext}" style="width:50px" href="#" title="末页"
           @click.prevent="gotoPage(data.pages)">末页</a>

        <div class="clear"/>
      </div>
    </div>
  </div>
</template>

<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'
import datasetApi from "@/api/dataset";

export default {
  data() {
    return {
      data: [],
      page: 1,
      limit: 5
    }
  },
  created() {
    this.getDatasetList()
  },
  methods: {
    getDatasetList(page = 1) { //比赛列表的方法
      // debugger
      this.page = page
      datasetApi.getDatasetPageList(this.page, this.limit)
        .then(response => { //请求成功
          //response接口返回的数据
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    view(id) {
      this.$router.push({path: `/competition/${id}`})
    }
  },
}
</script>
<style>
.bradius {
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}

#linkStyle a {
  margin-right: 20px;
  font-size: 14px;
}

.dateset-title {
  text-align: left;
  font-weight: bold;
  font-size: 20px;
}

.dataset-intro {
  height: 53px;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  word-break: break-all;
  -webkit-box-orient: vertical;
  text-align: left;
}

.i-dataset-wrap {
  background: #fff;
  border: 1px solid transparent;
  display: block;
  /*margin: 6px 0 55px 30px;*/
  margin-left: 30px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: .3s;
  -webkit-transition: .3s;
}

#dataset-icons i {
  padding: 10px 0;
}
</style>
