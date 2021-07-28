<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 比赛列表 开始 -->
    <section class="container">
      <header class="comm-title all-competition-title">
      </header>

      <section class="c-sort-box unBr">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">比赛类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" @click="view()">全部
                  </a>
                </li>

                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex===index}">
                  <a :title="item.title" href="#" @click="searchOne(item.title,index)">{{ item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>

        <div class="js-wrap">

          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':compObj.active===true}">
                <a title="Active" href="javascript:void(0);" @click="searchActive()">Active</a>
              </li>

              <li :class="{'current bg-orange':compObj.gmtCreateSort!==''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:compObj.gmtCreateSort===''}">
                        <i v-if="compObj.gmtCreateSort==='1'" class="el-icon-bottom"></i>
                        <i v-else class="el-icon-top"></i>
                  </span>
                </a>
              </li>

              <li :class="{'current bg-orange':compObj.hotSort!==''}">
                <a title="参赛人数" href="javascript:void(0);" @click="searchParticipants()">参赛人数
                  <span :class="{hide:compObj.hotSort===''}">
                        <i v-if="compObj.hotSort==='1'" class="el-icon-bottom"></i>
                        <i v-else class="el-icon-top"></i>
                  </span>
                </a>
              </li>

              <li :class="{'current bg-orange':compObj.priceSort!==''}">
                <a title="奖金" href="javascript:void(0);" @click="searchPrice()">奖金&nbsp;
                  <span :class="{hide:compObj.priceSort===''}">
                        <i v-if="compObj.priceSort==='1'" class="el-icon-bottom"></i>
                        <i v-else class="el-icon-top"></i>
                  </span>
                </a>
              </li>
            </ol>
          </section>
        </div>

        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">暂未发布比赛，没有相关数据...</span>
          </section>

          <article class="i-competition-list" v-if="data.total>0">
            <ul class="of">
              <li v-for="competition in data.items" :key="competition.id">
                <section class="i-comp-wrap">
                  <el-row :gutter="22">
                    <el-col :span="2" justify="start">
                      <el-button size="mini" style="pointer-events: none;"
                                 class="greenBtn"
                                 :class="[{greenBtn:competition.level==='新人赛'},
                                          {redBtn: competition.level==='程序设计大赛'},
                                          {orangeBtn:competition.level==='算法大赛'},
                                          {purpleBtn:competition.level==='创新应用大赛'}]">
                        {{ competition.level }}
                      </el-button>
                    </el-col>
                    <a class="i-comp-pic" @click="view(competition.id)">
                      <el-col :span="9" justify="start">
                        <div class="f18">{{ competition.name }}</div>
                      </el-col>
                    </a>
                    <el-col :span="3" justify="start">
                      <div class="">奖金</div>
                    </el-col>
                    <el-col :span="3" justify="start">
                      <div class="">人数</div>
                    </el-col>
                    <el-col :span="4" justify="start">
                      <div class="">比赛截止日期</div>
                    </el-col>
                    <el-col :span="3" justify="start">
                      <div class="">比赛状态</div>
                    </el-col>
                  </el-row>

                  <div class="mt15 i-q-txt" style="min-height:61px;text-align:left">
                    <el-row :gutter="22">
                      <el-col :span="11" justify="start">
                        <div :title="competition.intro" style="min-height:41px;color: #999;font-size: 13px">
                          {{ competition.intro }}
                        </div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f24">￥{{ competition.money }}</div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f24">{{ competition.participants }}</div>
                      </el-col>
                      <el-col :span="4" justify="start">
                        <div class="mt10 hLh30 txtOf tac f24">{{ competition.deadline.substring(0, 10) }}</div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f24" style="color:#fa8c16"
                             v-if="!judgeEnd(competition.deadline.substring(0,10))">进行中
                        </div>
                        <div class="mt10 hLh30 txtOf tac f24" style="color:#b2b2b2"
                             v-else>已结束
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </section>
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
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /比赛列表 结束 -->
  </div>
</template>
<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'

export default {
  data() {
    return {
      data: [], //查询之后接口返回集合
      page: 1, //当前页
      limit: 3, //每页记录数
      subjectNestedList: [], // 分类列表
      oneIndex: -1,
      compObj: {
        name: '',
        level: '',
        active: false,
        hotSort: '',
        gmtCreateSort: '',
        priceSort: ''
      }, // 查询表单对象
      classList: null,
      fullscreenLoading: true,
      greenBtn: 'greenBtn',
      redBtn: 'redBtn',
      orangeBtn: 'orangeBtn',
      purpleBtn: 'purpleBtn'
    }
  },
  created() {
    // debugger
    this.compObj.name = this.$route.query.index
    this.getCompetitionList()
    //分类显示
    this.initSubject()
    this.getClassList()
  },
  methods: {
    //判断是否已经截止,已经截止返回true
    judgeEnd(deadline) {
      let time = new Date(deadline)
      let now = new Date();
      return time < now
    },
    //获取比赛类型列表的方法
    getClassList() {
      competitionApi.findAll()
        .then(response => { //请求成功
          this.classList = response.data.data.items
          // console.log(this.classList)
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    //获取比赛列表
    getCompetitionList(page = 1) { //比赛列表的方法
      // debugger
      this.page = page
      competitionApi.getCompetitionPageList(this.page, this.limit, this.compObj)
        .then(response => { //请求成功
          //response接口返回的数据
          this.data = response.data.data
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    //2 查询所有分类
    initSubject() {
      competitionApi.getAllSubject()
        .then(response => {
          // debugger
          this.subjectNestedList = response.data.data.list
        })
    },
    //分页切换的方法
    //参数是页码数
    gotoPage(page) {
      // debugger
      competitionApi.getCompetitionPageList(page, this.limit, this.compObj)
        .then(response => {
          // debugger
          this.data = response.data.data
        })
    },

    searchOne(subjectParentId, index) {
      // debugger
      //把传递index值赋值给oneIndex,为了active样式生效  页面样式
      if (this.oneIndex === index) {
        this.oneIndex = -1
      } else {
        this.oneIndex = index
      }
      if (this.compObj.level === subjectParentId) {
        this.compObj.level = ''
      } else {
        this.compObj.level = subjectParentId
      }
      //点击某个一级分类进行条件查询
      this.gotoPage(1)
    },

    //查找未截止的比赛
    searchActive() {
      this.compObj.active = !this.compObj.active
      this.gotoPage(1);
    },

    //6 根据参赛人数排序
    searchParticipants() {
      //设置对应变量值，为了样式生效
      if (this.compObj.hotSort === "1") {
        this.compObj.hotSort = "0"
      } else {
        this.compObj.hotSort = "1"
      }

      //把值赋值到compObj
      this.compObj.gmtCreateSort = "";
      this.compObj.priceSort = "";

      //调用方法查询
      this.gotoPage(1)
    },

    //7 最新排序
    searchGmtCreate() {
      //设置对应变量值，为了样式生效
      if (this.compObj.gmtCreateSort === "1") {
        this.compObj.gmtCreateSort = "0"
      } else {
        this.compObj.gmtCreateSort = "1"
      }

      //把值赋值到compObj
      this.compObj.hotSort = ""
      this.compObj.priceSort = "";

      //调用方法查询
      this.gotoPage(1)
    },

    //8 价格排序
    searchPrice() {
      //设置对应变量值，为了样式生效
      if (this.compObj.priceSort === "1") {
        this.compObj.priceSort = "0"
      } else {
        this.compObj.priceSort = "1"
      }

      //把值赋值到compObj
      this.compObj.hotSort = ""
      this.compObj.gmtCreateSort = "";

      //调用方法查询
      this.gotoPage(1)
    },


    view(id) {
      if (id != null) {
        this.$router.push({path: `/competition/${id}`});
      } else {
        this.$router.push({path: `/file`})
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

.greenBtn {
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
}

.redBtn {
  color: #FFF;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.orangeBtn {
  color: #FFF;
  background-color: rgb(246, 179, 80);
  border-color: rgb(246, 179, 80);
}

.purpleBtn {
  color: #FFF;
  background-color: rgb(114, 101, 230);
  border-color: rgb(114, 101, 230);
}
</style>
