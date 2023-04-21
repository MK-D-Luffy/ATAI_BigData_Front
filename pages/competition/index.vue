<template>
  <div class="bg-fa of">
    <el-container class="container mt20">
      <!-- 比赛列表 开始 -->
      <el-main class="c-sort-box unBr">
        <div class="bg-ff  bradius pt30 pl30 pb10">
          <el-form>
            <el-form-item>
              <el-input v-model="compObj.name" placeholder="请输入内容" class="input-with-select" style="width: 540px">
                <el-select v-model="compObj.sort" slot="prepend" placeholder="请选择" style="width: 110px">
                  <el-option label="最新" value="最新"></el-option>
                  <el-option label="最热" value="最热"></el-option>
                </el-select>
                <el-button @click.native="gotoPage(1)" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item lable="状态" class="linkStyle2">
              <span slot="label">状态：</span>
              <el-link @click.native="setStatus(0)" :underline="false" :type="compObj.status===0?'primary':''">全部
              </el-link>
              <el-link @click.native="setStatus(1)" :underline="false" :type="compObj.status===1?'primary':''">进行中
              </el-link>
              <el-link @click.native="setStatus(2)" :underline="false" :type="compObj.status===2?'primary':''">已结束
              </el-link>
            </el-form-item>
            <el-form-item class="linkStyle2">
              <span slot="label">类别：</span>
              <el-link @click.native="setLevel('')" :underline="false" :type="compObj.level===''?'primary':''">全部
              </el-link>
              <el-link @click.native="setLevel('官方赛')" :underline="false"
                       :type="compObj.level==='官方赛'?'primary':''">官方赛
              </el-link>
              <el-link @click.native="setLevel('训练赛')" :underline="false"
                       :type="compObj.level==='训练赛'?'primary':''">训练赛
              </el-link>
              <el-link @click.native="setLevel('大奖赛')" :underline="false"
                       :type="compObj.level==='大奖赛'?'primary':''">大奖赛
              </el-link>
            </el-form-item>
            <el-form-item lable="技术" class="linkStyle2">
              <span slot="label">技术：</span>
              <el-link @click.native="setTech('')" :underline="false" :type="compObj.tech===''?'primary':''">全部
              </el-link>
              <el-link @click.native="setTech('数据挖掘')" :underline="false" :type="compObj.tech==='数据挖掘'?'primary':''">
                数据挖掘
              </el-link>
              <el-link @click.native="setTech('自然语言处理')" :underline="false"
                       :type="compObj.tech==='自然语言处理'?'primary':''">自然语言处理
              </el-link>
              <el-link @click.native="setTech('计算机视觉')" :underline="false" :type="compObj.tech==='计算机视觉'?'primary':''">
                计算机视觉
              </el-link>
              <el-link @click.native="setTech('AI其他')" :underline="false" :type="compObj.tech==='AI其他'?'primary':''">
                AI其他
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
              <li v-for="competition in data.items" :key="competition.id">
                <section class="i-comp-wrap">
                  <el-row :gutter="12">
                    <el-col :span="2" justify="start">
                      <el-button size="mini" style="pointer-events: none;zoom:80%"
                                 class="greenBtn"
                                 :class="[{greenBtn:competition.level==='大奖赛'},
                                          {redBtn: competition.level==='官方赛'},
                                          {purpleBtn:competition.level==='训练赛'},
                                        ]">
                        {{ competition.level }}
                      </el-button>
                    </el-col>
                    <el-col :span="2" justify="start">
                      <el-button size="mini" style="pointer-events: none;zoom:80%"
                                 class="greenBtn"
                                 :class="[{redBtn:competition.tech==='数据挖掘'},
                                          {greenBtn: competition.tech==='自然语言处理'},
                                          {purpleBtn:competition.tech==='计算机视觉'},
                                          {purpleBtn:competition.tech==='AI其他'},
                                        ]">
                        {{ competition.tech }}
                      </el-button>
                    </el-col>
                    <a class="i-comp-pic" @click="view(competition.id)">
                      <el-col :span="7" justify="start">
                        <div class="f14">{{ competition.name.substr(0, 18) }}</div>
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
                        <div :title="competition.intro"
                             style="min-height:41px;color: #999;font-size: 11px;line-height: 20px">
                          {{ competition.intro }}
                        </div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f18">￥{{ competition.money }}</div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f18">{{ competition.participants }}</div>
                      </el-col>
                      <el-col :span="4" justify="start">
                        <div class="mt10 hLh30 txtOf tac f18">{{ competition.deadline.substring(0, 10) }}</div>
                      </el-col>
                      <el-col :span="3" justify="start">
                        <div class="mt10 hLh30 txtOf tac f18" style="color:#fa8c16"
                             v-if="!judgeEnd(competition.deadline.substring(0,10))">进行中
                        </div>
                        <div class="mt10 hLh30 txtOf tac f18" style="color:#b2b2b2"
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
      </el-main>
      <!-- /比赛列表 结束 -->
      <el-aside width="260px">
        <el-card class="mb20" shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-help"></i>
            <span>大型专题赛区</span>
          </div>
          <div v-for="competition in large" :key="competition.id" class="text item"
               style="border-bottom: 2px dashed rgb(235, 238, 245)">
            <a :href="'/competition/'+competition.id">
              <el-image style="height:100px" :src="competition.cover"></el-image>
              {{ competition.name }}
            </a>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'
import indexApi from '@/api/index'
import cookie from "js-cookie";

export default {
  inject: ['reload'],
  data() {
    return {
      data: [], //查询之后接口返回集合
      large: [],
      page: 1, //当前页
      limit: 10, //每页记录数
      compObj: {
        name: '',
        level: '',
        tech: '',
        status: 0,
        sort: '最热'
      }, // 查询表单对象
      greenBtn: 'greenBtn',
      redBtn: 'redBtn',
      purpleBtn: 'purpleBtn'
    }
  },
  created() {
    cookie.set("activeTab", "tab1")
    // debugger
    this.compObj.name = this.$route.query.keyword
    this.getCompetitionList()
    this.getLargeCompetition()
  },
  methods: {
    //获取比赛列表
    getCompetitionList(page = 1) { //比赛列表的方法
      // debugger
      this.page = page
      competitionApi.getCompetitionPageList(this.page, this.limit, this.compObj)
        .then(response => { //请求成功
          //response接口返回的数据
          this.data = response.data.data
          console.log(this.data)
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    getLargeCompetition() { //比赛列表的方法
      indexApi.getLargeCompetition()
        .then(response => { //请求成功
          console.log(response.data)
          this.large = response.data.data.large
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
    //判断是否已经截止,已经截止返回true
    judgeEnd(deadline) {
      let time = new Date(deadline)
      let now = new Date();
      return time < now
    },
    setStatus(status) {
      this.compObj.status = status
      this.gotoPage(1)
    },
    setLevel(level) {
      this.compObj.level = level
      this.gotoPage(1)
    },
    setTech(tech) {
      this.compObj.tech = tech
      this.gotoPage(1)
    },
    //查找未截止的比赛
    searchActive() {
      this.compObj.active = !this.compObj.active
      this.gotoPage(1);
    },
    gotoPage(page) {
      competitionApi.getCompetitionPageList(page, this.limit, this.compObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    view(id) {
      if (id != null) {
        this.$router.push({path: `/competition/${id}`});
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

.purpleBtn {
  color: #FFF;
  background-color: rgb(114, 101, 230);
  border-color: rgb(114, 101, 230);
}

.linkStyle2 a {
  margin-right: 20px;
  font-size: 14px;
}

.bradius {
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
