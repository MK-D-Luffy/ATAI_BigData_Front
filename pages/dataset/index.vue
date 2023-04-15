<template>
  <div class="bg-fa of">
    <!-- 比赛列表 开始 -->
    <section class="container">
      <section class="mt30 c-sort-box unBr">
        <div class="container bg-ff mt20 bradius">
          <el-form label-width="30px" class="mt30 mr30">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="datasetObj.name" class="input-with-select" style="width: 540px">
                <el-select v-model="datasetObj.sort" slot="prepend" placeholder="请选择" style="width: 150px">
                  <el-option @click.native="sort(0)" label="最新" value="1"></el-option>
                  <el-option @click.native="sort(1)" label="浏览量从高到低" value="2"></el-option>
                  <el-option @click.native="sort(2)" label="下载量从高到低" value="3"></el-option>
                </el-select>
                <el-button @click.native="gotoPage(1)" slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-button @click="checkAndGo('edit')" style="margin-left:290px;margin-right: 15px" type="primary">
                上传数据集
              </el-button>
              <el-button @click="checkAndGo('mine')">我的数据集</el-button>
            </el-form-item>
            <el-form-item id="linkStyle">
              <el-link :type="datasetObj.category===''?'primary':''" @click.native="setCategory('')" :underline="false">
                全部分类
              </el-link>
              <el-link :type="datasetObj.category==='互联网'?'primary':''" @click.native="setCategory('互联网')"
                       :underline="false">互联网
              </el-link>
              <el-link :type="datasetObj.category==='金融'?'primary':''" @click.native="setCategory('金融')"
                       :underline="false">金融
              </el-link>
              <el-link :type="datasetObj.category==='语言学'?'primary':''" @click.native="setCategory('语言学')"
                       :underline="false">语言学
              </el-link>
              <el-link :type="datasetObj.category==='卫生保健'?'primary':''" @click.native="setCategory('卫生保健')"
                       :underline="false">卫生保健
              </el-link>
              <el-link :type="datasetObj.category==='人口统计学'?'primary':''" @click.native="setCategory('人口统计学')"
                       :underline="false">人口统计学
              </el-link>
              <el-link :type="datasetObj.category==='商业'?'primary':''" @click.native="setCategory('商业')"
                       :underline="false">商业
              </el-link>
              <el-link :type="datasetObj.category==='教育'?'primary':''" @click.native="setCategory('教育')"
                       :underline="false">教育
              </el-link>
              <el-link :type="datasetObj.category==='农业'?'primary':''" @click.native="setCategory('农业')"
                       :underline="false">农业
              </el-link>
              <el-link :type="datasetObj.category==='政治'?'primary':''" @click.native="setCategory('政治')"
                       :underline="false">政治
              </el-link>
              <el-link :type="datasetObj.category==='其他'?'primary':''" @click.native="setCategory('其他')"
                       :underline="false">其他
              </el-link>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">暂未发布比赛，没有相关数据...</span>
          </section>

          <article class="i-competition-list" v-if="data.total>0">
            <ul class="of">
              <li v-for="dataset in data.items" :key="dataset.id">
                <router-link :to="'/dataset/'+dataset.id">
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

            <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>

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
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /比赛列表 结束 -->
  </div>
</template>
<script>
//引入调用competition.js文件
import datasetApi from '@/api/dataset'
import cookie from "js-cookie";

export default {
  inject: ['reload'],
  data() {
    return {
      data: [], //查询之后接口返回集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0,
      datasetObj: {
        name: '',
        sort: "最新",
        category: ''
      },
      fullscreenLoading: true,
    }
  },
  created() {
    this.datasetObj.name = this.$route.query.keyword
    this.getDatasetList()
  },
  methods: {
    //获取比赛列表
    getDatasetList(page = 1) { //比赛列表的方法
      // debugger
      this.page = page
      datasetApi.getDatasetPageList(this.page, this.limit, this.datasetObj)
        .then(response => { //请求成功
          //response接口返回的数据
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    sort(sortId) {
      if (sortId === 0) {
        this.datasetObj.sort = "最新"
      } else if (sortId === 1) {
        this.datasetObj.sort = "浏览量从高到低"
      } else if (sortId === 2) {
        this.datasetObj.sort = "下载量从高到低"
      }
      this.gotoPage(1)
    },
    setCategory(category) {
      this.datasetObj.category = category
      this.gotoPage(1)
    },
    //显示确认报名
    checkAndGo(type) {
      const token = cookie.get("ATAI_BigData_token");
      // 如果未登录，提示登录
      if (token) {
        //显示确认报名
        // this.dialogVisible = true;
        if (type === 'edit') {
          this.$router.push({
            path: "/dataset/edit"
          });
        } else if (type === 'mine') {
          // this.$router.push({
          //   path: "/mine"
          // });
        }
      } else {
        this.$message({
          type: "info",
          message: "请先登录️再进行下一步操作"
        });
        //vue路由跳转
        this.$router.push({
          path: "/login"
        });
      }
    },
    //分页切换的方法
    //参数是页码数
    gotoPage(page) {
      datasetApi.getDatasetPageList(page, this.limit, this.datasetObj)
        .then(response => {
          this.data = response.data.data
          console.log(this.data)
        })
    },
    view(id) {
      if (id != null) {
        this.$router.push({path: `/dataset/${id}`});
      } else {
        this.reload();
      }
    }
  }

};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}

.hide {
  display: none;
}

.show {
  display: block;
}

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
