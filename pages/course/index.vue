<template>
  <div class="bg-fa of">
    <section class="container mt20">
      <section class="mt30 c-sort-box unBr">
        <div class="bg-ff bradius pt20 pl20">
          <el-form>
            <el-form-item lable="类别" class="linkStyle2">
              <el-link :type="courseObj.timeStatus===''?'primary':''" @click.native="setTimeStatus('')" :underline="false">全部</el-link>
              <el-link :type="courseObj.timeStatus==='进行中'?'primary':''" @click.native="setTimeStatus('进行中')" :underline="false">进行中</el-link>
              <el-link :type="courseObj.timeStatus==='即将开始'?'primary':''" @click.native="setTimeStatus('即将开始')" :underline="false">即将开始</el-link>
              <el-link :type="courseObj.timeStatus==='已经结束'?'primary':''" @click.native="setTimeStatus('已经结束')" :underline="false">已经结束</el-link>
            </el-form-item>
            <el-form-item lable="类别" class="linkStyle2">
              <el-link :type="courseObj.level===''?'primary':''" @click.native="setLevel('')" :underline="false">全部</el-link>
              <el-link :type="courseObj.level==='入门'?'primary':''" @click.native="setLevel('入门')" :underline="false">入门</el-link>
              <el-link :type="courseObj.level==='进阶'?'primary':''" @click.native="setLevel('进阶')" :underline="false">进阶</el-link>
              <el-link :type="courseObj.level==='实战'?'primary':''" @click.native="setLevel('实战')" :underline="false">实战</el-link>
            </el-form-item>
            <el-form-item lable="技术" class="linkStyle2">
              <el-link :type="courseObj.tech===''?'primary':''"  @click.native="setTech('')" :underline="false">全部</el-link>
              <el-link :type="courseObj.tech==='机器学习/深度学习'?'primary':''"  @click.native="setTech('机器学习/深度学习')" :underline="false">机器学习/深度学习</el-link>
              <el-link :type="courseObj.tech==='工具与框架'?'primary':''"  @click.native="setTech('工具与框架')" :underline="false">工具与框架</el-link>
              <el-link :type="courseObj.tech==='计算机视觉'?'primary':''"  @click.native="setTech('计算机视觉')" :underline="false">计算机视觉</el-link>
              <el-link :type="courseObj.tech==='自然语言处理'?'primary':''"  @click.native="setTech('自然语言处理')" :underline="false">自然语言处理</el-link>
              <el-link :type="courseObj.tech==='智能数据分析'?'primary':''"  @click.native="setTech('智能数据分析')" :underline="false">智能数据分析</el-link>
              <el-link :type="courseObj.tech==='智能语音'?'primary':''"  @click.native="setTech('智能语音')" :underline="false">智能语音</el-link>
              <el-link :type="courseObj.tech==='AI其他'?'primary':''"  @click.native="setTech('AI其他')" :underline="false">AI其他</el-link>
            </el-form-item>
            <el-form-item style="margin-top: 20px">
              <el-input v-model="courseObj.name" placeholder="搜索课程" class="input-with-select" style="width: 400px">
                <el-button @click.native="gotoPage(1)" slot="append" icon="el-icon-search"></el-button>
              </el-input>
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
              <li v-for="course in data.items" :key="course.id">
                <a @click="view(course.id)">

                  <section class="i-course-wrap">
                    <el-row :gutter="22">
                      <el-col :span="4" justify="start">
                        <el-image
                          style="width: 180px; height: 120px;margin-right:20px;border-radius:10px"
                          :src="course.cover"
                          fit="fill"
                        ></el-image>
                      </el-col>
                      <el-col style="margin-left:20px" :span="18" justify="start">
                        <el-row>
                          <el-col :span="22" justify="start">
                            <header class="course-title">
                              <span>{{ course.name }}</span>
                            </header>
                          </el-col>
                          <el-col :span="2" justify="end">
                            <el-button type="primary" plain disabled size="small">{{ course.tech }}</el-button>
                          </el-col>
                        </el-row>
                        <el-row class="course-intro">
                          {{ course.intro }}
                        </el-row>
                        <el-row id="course-icons">
                          <el-col :span="3" justify="start">
                            {{ course.participants }}人在学习
                          </el-col>
                          <el-col :span="8">
                            开课时间：{{ course.begin.substr(0, 10) }} - {{ course.end.substr(0, 10) }}
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </section>
                </a>
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
  </div>
</template>

<script>
import courseApi from "@/api/course";

export default {
  name: 'Index',
  created() {
    this.getCourseList();
  },
  data() {
    return {
      data: [],
      course: [],
      page: 1,
      limit: 10,
      courseObj: {
        name:'',
        timeStatus: '',
        level: '',
        tech: ''
      }
    }
  },
  methods: {
    getCourseList(page = 1) { //比赛列表的方法
      this.page = page
      courseApi.getCoursePageList(this.page, this.limit, this.courseObj)
        .then(response => { //请求成功
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    setTimeStatus(timeStatus) {
      this.courseObj.timeStatus = timeStatus
      this.gotoPage(1)
    },
    setLevel(level) {
      this.courseObj.level = level
      this.gotoPage(1)
    },
    setTech(tech) {
      this.courseObj.tech = tech
      this.gotoPage(1)
    },
    gotoPage(page) {
      courseApi.getCoursePageList(this.page, this.limit, this.courseObj)
        .then(response => { //请求成功
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    view(id) {
      if (id != null) {
        this.$router.push({path: `/course/${id}`});
      } else {
        this.reload();
      }
    }
  },
}
</script>

<style scoped>
.el-aside {
  margin-left: 20px;
  width: 260px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
  margin-bottom: 10px;
}

.bradius {
  border: 2px solid white;
  border-radius: 7px;
}

.linkStyle2 {
  margin-bottom: 5px;
}

.linkStyle2 a {
  margin-right: 26px;
  font-size: 14px;
}

.course-title {
  text-align: left;
  font-weight: 600;
  font-size: 20px;
}

/*.course-title:hover{*/
/*  color:#0082ff;*/
/*}*/

.course-intro {
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

.i-course-wrap {
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

.i-course-wrap:hover {
  color: #0082ff;
}

#course-icons i {
  /*padding: 10px 0;*/
}
</style>
