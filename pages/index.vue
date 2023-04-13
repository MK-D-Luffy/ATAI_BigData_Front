<template>
  <div class="bg-fa of">
    <div class="container">
      <div class="mt15">
        <el-card>
          <el-carousel height="420px">
            <el-carousel-item>
              <img src="http://www.carch.ac.cn/xwdt/sysxw/202107/W020210702455460617808.jpg" draggable="false">
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://www.carch.ac.cn/xwdt/sysxw/202110/W020211019619706916447.jpg" draggable="false">
            </el-carousel-item>
          </el-carousel>
        </el-card>

        <el-row class="mt20 mb20" :gutter="30">
          <el-col :span="14">
            <el-card>
              <div slot="header" class="clearfix">
                <span @click="changeChoose()" :class="{'blue':choose===1}" class="fsize18">科研成果</span>
                <el-divider direction="vertical"></el-divider>
                <span @click="changeChoose()" :class="{'blue':choose===2}" class="fsize18">学术动态</span>
                <router-link style="float: right; padding: 3px 0" :to="choose===1?'/introduce/achievement':'/news/academic'" tag="li" active-class="current"
                             exact>
                  <a class="blue" style="text-decoration:none">
                    更多>>
                  </a>
                </router-link>
              </div>
<!--                            <div>-->
<!--                              <el-image style="width:200px;height:120px"-->
<!--                                        src="http://www.carch.ac.cn/xwdt/sysxw/202110/W020211019619706749752.jpg"></el-image>-->
<!--                            </div>-->
<!--                            <div style="border-top: 1px dashed #cbc7c7;margin:10px 0;"></div>-->
              <ul>
                <li style="height:30px" v-for="a in aList" :key="a" class="text item">
                  <a v-if="choose===1" :href="'/introduce/achievement/'+a.id" class="noticeTitle">
                    {{ a.title }}
                  </a>
                  <a v-else-if="choose===2" :href="'/news/academic/'+a.id" class="noticeTitle">{{ a.title }}</a>
                  <span style="float:right;text-align:center">{{ a.gmtCreate.substring(0, 10) }}</span>
                </li>
              </ul>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="blue fsize18">通知公告</span>
                <router-link style="float: right; padding: 3px 0" to="/news/notice" tag="li" active-class="current"
                             exact>
                  <a class="blue" style="text-decoration:none">
                    更多>>
                  </a>
                </router-link>
              </div>
              <ul>
                <li style="height:30px" v-for="notice in noticeList" :key="notice" class="text item">
                  <a :href="'news/notice/'+notice.id" class="noticeTitle">{{ notice.title }}</a>
                  <span style="float:right;text-align:center">{{ notice.gmtCreate.substring(0, 10) }}</span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>

        <div style="padding-bottom: 80px">
          <article class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in teacherList" :key="teacher.id">
                <el-card id="member" class="i-teach-wrap member">
                  <div slot="header" class="fsize18" style="padding: 0px">
                    {{teacher.level===2?'实验室领导':'实验室成员'}}
                  </div>
                  <div class="i-teach-pic" style="padding: 0px">
                    <a @click="view(teacher.id)" :title="teacher.name">
                      <img :alt="teacher.name" :src="teacher.avatar">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a @click="view(teacher.id)" :title="teacher.name" class="fsize18 c-666">{{
                        teacher.name
                      }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.career }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.intro }}</p>
                  </div>
                </el-card>
              </li>

            </ul>
            <div class="clear"></div>
          </article>
          <section class="tac">
            <a @click="view()" title="全部成员" class="comm-btn c-btn-2">查看全部</a>
          </section>
        </div>
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
      bannerList: ['1'], //banner数组
      teacherList: [],
      noticeList: [],
      aList: [],
      choose: 1
    }

  },
  created() {
    this.getHotTeacher()
    this.getLatestNotice()
    this.getLatestAList(this.choose)
  },
  methods: {
    open(topic, title) {
      this.$alert(topic, title, {
        confirmButtonText: '确定',
        customClass: 'winClass',//弹窗样式
        callback: action => {
        }
      });
    },

    //查询名师
    getHotTeacher() {
      indexApi.getHotTeacher()
        .then(response => {
          this.teacherList = response.data.data.teacherList
        })
    },

    //查询公告
    getLatestNotice() {
      indexApi.getLatestNotice("notice")
        .then(response => {
          this.noticeList = response.data.data.items
        })
    },

    getLatestAList(choose) {
      let type = choose === 1 ? "achievement" : "academic";
      indexApi.getLatestNotice(type)
        .then(response => {
          this.aList = response.data.data.items
        })
    },

    changeChoose() {
      this.choose = 3 - this.choose;
      this.getLatestAList(this.choose)
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
