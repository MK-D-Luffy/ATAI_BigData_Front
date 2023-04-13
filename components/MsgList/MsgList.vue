<template>
  <el-container class="mt20 bg-ff">
    <el-main>
      <section class="c-sort-box unBr">
        <article>
          <ul v-if="msgList.length!==0">
            <li style="height:30px" v-for="msg in msgList" :key="msg.id" class="text item">
              <a :href="msg.type+'/'+msg.id" class="msg">
                <i class="el-icon-document"></i>
                &nbsp;
                {{ msg.title }}</a>
              <span class="time">{{ msg.gmtCreate.substring(0, 10) }}</span>
            </li>
          </ul>
          <el-empty v-else :image-size="225"></el-empty>
        </article>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import noticeApi from "@/api/notice";

export default {
  name: 'MsgList',
  props: ["type"],
  data() {
    return {
      msgList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      noticeApi.pageNoticeCondition(1, 100, {'type': this.type})
        .then(response => {
          this.msgList = response.data.data.records
        })
    },
  },
}
</script>

<style scoped>
.msg {
  float: left;
  width: 600px;
  font-size: 16px;
  line-height: 190%;
  color: #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none !important;
}

.time {
  float: right;
  text-align: center
}

.msg:hover {
  color: rgb(64, 158, 255);
}
</style>
