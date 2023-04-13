<template>
  <el-container class="mt20 bg-ff">
    <el-main>
      <section class="c-sort-box unBr">
        <article>
          <h3 class="fsize30 msgTitle">{{ msg.title }}</h3>
          <div class="tac mb5">
            <i class="el-icon-time"></i>&nbsp;{{ msg.gmtCreate.substring(0, 10) }}
          </div>
          <div v-html="msg.contentHtml">
          </div>
        </article>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import noticeApi from "@/api/notice";

export default {
  name: 'Msg',
  data() {
    return {
      msg: {
        gmtCreate: ''
      }
    }
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let id = this.$route.params.id;
      noticeApi.getNoticeById(id)
        .then(response => {
          this.msg = response.data.data.data;
        })
    }
  },
}
</script>

<style scoped>
.msgTitle {
  color: #0e51a1;
  line-height: 160%;
  text-align: center;
  padding: 10px 15px;
}

img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
</style>
