<template>
  <div class="bg-fa of">
    <el-container class="container mt20">

      <el-main class="bg-ff bradius pt20 pl20">
        <!--        <article-scroll-page></article-scroll-page>-->
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入内容" class="input-with-select" style="width: 500px">
              <el-select slot="prepend" placeholder="请选择" style="width: 100px">
                <el-option label="最新" value="1"></el-option>
                <el-option label="最热" value="2"></el-option>
              </el-select>
              <el-button @click.native="gotoPage(1)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button style="margin-left:160px;" type="primary">
              <i class="el-icon-edit"></i>
              发布文章
            </el-button>
          </el-form-item>
          <el-form-item lable="类别" class="linkStyle2">
            <el-link @click.native="setCategory()" :underline="false" type="primary">全部</el-link>
            <el-link @click.native="setCategory('互联网')" :underline="false">文章</el-link>
            <el-link @click.native="setCategory('金融')" :underline="false">问答</el-link>
            <el-link @click.native="setCategory('金融')" :underline="false">等待回答</el-link>
          </el-form-item>
          <el-form-item lable="技术" class="linkStyle2">
            <el-link @click.native="setCategory()" :underline="false" type="primary">全部</el-link>
            <el-link @click.native="setCategory('互联网')" :underline="false">数据挖掘</el-link>
            <el-link @click.native="setCategory('金融')" :underline="false">自然语言处理</el-link>
            <el-link @click.native="setCategory('语言学')" :underline="false">计算机视觉</el-link>
            <el-link @click.native="setCategory('语言学')" :underline="false">AI其他</el-link>
          </el-form-item>
        </el-form>

<!--        <ul class="of">-->
<!--          <li v-for="article in articles" :key="article.id">-->
<!--            <section>-->
<!--              <el-row :gutter="22">-->

<!--                <a class="i-comp-pic" @click="view(article.id)">-->
<!--                  <el-col :span="9" justify="start">-->
<!--                    <div class="f14">{{ article.name }}</div>-->
<!--                  </el-col>-->
<!--                </a>-->
<!--                <el-col :span="3" justify="start">-->
<!--                  <div class="">奖金</div>-->
<!--                </el-col>-->
<!--                <el-col :span="3" justify="start">-->
<!--                  <div class="">人数</div>-->
<!--                </el-col>-->
<!--                <el-col :span="4" justify="start">-->
<!--                  <div class="">比赛截止日期</div>-->
<!--                </el-col>-->
<!--                <el-col :span="3" justify="start">-->
<!--                  <div class="">比赛状态</div>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--              <div class="mt15 i-q-txt" style="min-height:61px;text-align:left">-->
<!--                <el-row :gutter="22">-->
<!--                  <el-col :span="11" justify="start">-->
<!--                    <div :title="article.intro"-->
<!--                         style="min-height:41px;color: #999;font-size: 11px;line-height: 20px">-->
<!--                      {{ article.intro }}-->
<!--                    </div>-->
<!--                  </el-col>-->
<!--                </el-row>-->
<!--              </div>-->
<!--            </section>-->
<!--          </li>-->
<!--        </ul>-->

      </el-main>
      <el-aside width="270px">
        <el-card class="mb20" shadow="never">
          <div slot="header" class="clearfix">
            <i class="el-icon-thumb"></i>
            <span>推荐作者</span>
            <el-button style="float: right; padding: 3px 0" type="text">换一换</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-aside>

    </el-container>
  </div>
</template>

<script>
import ArticleScrollPage from './ArticleScrollPage'
import blogApi from "@/api/blog";
import articleItem from "@/components/article/ArticleItem";

export default {
  name: 'Index',
  created() {
    this.getArticle();
  },
  data() {
    return {
      articles: [],
      page: 1,
      limit: 10,
      articleQuery: {}
    }
  },
  methods: {
    getArticle() {
      blogApi.pageArticleCondition(this.page, this.limit, this.articleQuery)
        .then(response => {
          this.articles = response.data.data.records
        })
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
  margin-right: 20px;
  font-size: 14px;
}

</style>
