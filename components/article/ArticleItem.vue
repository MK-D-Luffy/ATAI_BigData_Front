<template>
  <el-card class="me-area" :body-style="{ padding: '16px',margin:'6px 0 6px' }">
    <div class="me-article-header">

      <a @click="view(id)" class="me-article-title">{{ title }}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-s-comment"></i>&nbsp;{{ commentCounts }}
	    </span>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{ viewCounts }}
	    </span>
    </div>

    <div class="me-artile-description">
      {{ summary }}
    </div>
    <div class="me-article-footer">
	  	<span class="me-article-author">
	    	<i class="iconfont icon-user"></i>&nbsp;{{ nickname }}
	    </span>

      <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{ t }}</el-tag>

      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{ gmtCreate }}
	    </span>

    </div>
  </el-card>


</template>

<script>
import {formatTime} from "../../utils/time";

export default {
  name: 'ArticleItem',
  props: {
    id: String,
    weight: Number,
    title: String,
    commentCounts: Number,
    viewCounts: Number,
    summary: String,
    nickname: String,
    tags: Array,
    gmtCreate: String
  },
  data() {
    return {}
  },
  methods: {
    view(id) {
      this.$router.push({path: `/blog/${id}`})
    }
  }
}
</script>

<style scoped>

.me-article-header {
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
  text-decoration: none;
}

.me-article-title:hover {
  font-weight: 600;
  color: #5fb878;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}

</style>
