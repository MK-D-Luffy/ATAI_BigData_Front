<template>

  <div>
    <!--         <Message></Message>-->
    <!--&lt;!&ndash;     幻灯片 开始 &ndash;&gt;-->
<!--    <div v-swiper:mySwiper="swiperOption" style="width:80%;height:80%">-->
<!--      <div class="swiper-wrapper">-->

<!--        <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide">-->
<!--          <a target="_blank" :href="banner.linkUrl">-->
<!--            <img :src="banner.imageUrl" :alt="banner.title">-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="swiper-pagination swiper-pagination-white"></div>-->
<!--      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
<!--    </div>-->
    <!--&lt;!&ndash;     幻灯片 结束 &ndash;&gt;-->

    <div>
      <el-table
        :data="tableData1"
        align="center"
        style="width: 100%;font-size:20px">
        <el-table-column
          prop="notice"
          label="通知公告"
          width="800px">
          <template slot-scope="scope">
            <!-- <a style="text-decoration:none;" href="scope.row.notice" target="_blank" class="buttonText">{{scope.row.notice}}</a>
             -->
            <div @click="open(scope.row.content,scope.row.title)">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          width="300px">
          <template slot="header" slot-scope="">
            <a target="_blank"> 发布时间 </a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="aCoursesList">
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">实验室成员</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a @click="view(teacher.id)" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a @click="view(teacher.id)" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{ teacher.intro }}</p>
                    </div>
                  </section>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac">
              <a @click="view()" title="全部成员" class="comm-btn c-btn-2">全部成员</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->


    </div>
  </div>
</template>

<script>

//引入调用index.js文件
import indexApi from '@/api/index'

export default {

  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination' //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next', //下一页dom节点
          prevEl: '.swiper-button-prev' //前一页dom节点
        }
      },
      bannerList: [], //banner数组
      courseList: [],
      teacherList: [],
      tableData1: []
    }

  },
  created() {
    this.getHotTeacher()
    this.getLatestNotice()
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
      indexApi.getLatestNotice()
        .then(response => {
          this.tableData1 = response.data.data.items
        })
    },

    view(id) {
      if (id != null)
        this.$router.push({path: `/member/${id}`})
      else
        this.$router.push({path: `/member`})
    }


  }
}
</script>
<style>
.winClass {
  width: 600px;
}

/*   .btnFalses{
       background-color: #022F92
   }*/
</style>
