<template>
  <div class="bg-fa of">
    <section class="container">
      <el-container style="margin-bottom: 30px">

        <el-main class="me-articles" style="padding-top:16px">

          <article-scroll-page></article-scroll-page>

        </el-main>

        <el-aside>
          <card-me class="me-area" style="margin-top: 16px;"></card-me>
          <card-tag :tags="hotTags"></card-tag>

          <card-article cardHeader="最热文章" :articles="hotArticles"></card-article>

          <card-archive cardHeader="文章归档" :archives="archives"></card-archive>

          <card-article cardHeader="最新文章" :articles="newArticles"></card-article>
        </el-aside>

      </el-container>
    </section>
  </div>
</template>

<script>
import CardMe from '@/components/card/CardMe'
import CardArticle from '@/components/card/CardArticle'
import CardArchive from '@/components/card/CardArchive'
import CardTag from '@/components/card/CardTag'
import ArticleScrollPage from './ArticleScrollPage'

// import {getArticles, getHotArtices, getNewArtices} from '@/api/article'
// import {getHotTags} from '@/api/tag'
// import {listArchives} from '@/api/article'

export default {
  name: 'Index',
  created() {
    // this.getHotArtices()
    // this.getNewArtices()
    // this.getHotTags()
    // this.listArchives()
  },
  data() {
    return {
      hotTags: [],
      hotArticles: [],
      newArticles: [],
      archives: []
    }
  },
  methods: {
    // getHotArtices() {
    //   let that = this
    //   getHotArtices().then(data => {
    //     that.hotArticles = data.data
    //   }).catch(error => {
    //     if (error !== 'error') {
    //       that.$message({type: 'error', message: '最热文章加载失败!', showClose: true})
    //     }

    //   })

    // },
    // getNewArtices() {
    //   let that = this
    //   getNewArtices().then(data => {
    //     that.newArticles = data.data
    //   }).catch(error => {
    //     if (error !== 'error') {
    //       that.$message({type: 'error', message: '最新文章加载失败!', showClose: true})
    //     }

    //   })

    // },
    // getHotTags() {
    //   let that = this
    //   getHotTags().then(data => {
    //     that.hotTags = data.data
    //   }).catch(error => {
    //     if (error !== 'error') {
    //       that.$message({type: 'error', message: '最热标签加载失败!', showClose: true})
    //     }

    //   })
    // },
    // listArchives() {
    //   listArchives().then((data => {
    //     this.archives = data.data
    //   })).catch(error => {
    //     if (error !== 'error') {
    //       that.$message({type: 'error', message: '文章归档加载失败!', showClose: true})
    //     }
    //   })
    // }

  },
  components: {
    'card-me': CardMe,
    'card-article': CardArticle,
    'card-tag': CardTag,
    'article-scroll-page': ArticleScrollPage,
    CardArchive
  }
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
</style>
