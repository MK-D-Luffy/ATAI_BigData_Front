<template>
  <div class="bg-fa of">
    <el-container style="margin:20px 50px 30px 50px">
      <el-main class="bg-ff brbs" style="padding: 30px;">
        <el-row>
          <el-col :span="7">
            <div class="onlineHelp cg-box">
              <div class="tools">
                <div class="page">第 {{ pageNum }} /{{ pageTotalNum }}页</div>
                <el-input v-model.number="goPageNum" style="width: 50px;margin-right: 8px"></el-input>
                <el-button size="mini" type="success" @click.stop="goPage"> 前往</el-button>
                <el-button size="mini" type="primary" @click.stop="prePage"> 上一页</el-button>
                <el-button size="mini" type="primary" @click.stop="nextPage"> 下一页</el-button>
              </div>
              <div class="pdf-box">
                <pdf ref="pdf"
                     :src="url"
                     :page="pageNum"
                     @progress="loadedRatio = $event"
                     @page-loaded="pageLoaded($event)"
                     @num-pages="pageTotalNum=$event"
                     @error="pdfError($event)"
                     @link-clicked="page = $event">
                </pdf>
              </div>
            </div>
          </el-col>
          <el-col :span="17">
            <!--在视频外面加一个容器-->
            <div class="input_video">
              <video-player class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
              ></video-player>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
//引入调用course.js文件
import courseApi from "@/api/course";
//引入调用js-cookie
import cookie from "js-cookie";
import pdf from 'vue-pdf'
import 'video.js/dist/video-js.css';
import {videoPlayer} from 'vue-video-player';

export default {
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  components: {
    pdf, videoPlayer
  },
  data() {
    return {
      classId: '',
      class: {},
      url: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      pageNum: 1,
      pageTotalNum: 1,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      goPageNum: 1,
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'//url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,//当前时间和持续时间的分隔符
          durationDisplay: true,//显示持续时间
          remainingTimeDisplay: false,//是否显示剩余时间功能
          fullscreenToggle: true  //全屏按钮
        }
      }
    };
  },
  created() {
    this.classId = this.$route.params.id
    this.getClass(this.classId)
  },
  methods: {
    getClass(classId) {
      courseApi
        .getClass(classId)
        .then(response => {
          this.class = response.data.data.class
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败"
          });
        });
    },
    // 上一页函数，
    prePage() {
      var page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页函数
    nextPage() {
      var page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 前往页数
    goPage() {
      if (!this.goPageNum || /\D/.test(this.goPageNum) || this.goPageNum < 1 || this.goPageNum > this.pageTotalNum) {
        this.$message.warning('输入页码有误')
        return
      }
      this.pageNum = this.goPageNum
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded(e) {
      this.curPageNum = e
    },
    // 其他的一些回调函数。
    pdfError(error) {
      console.error(error)
    }
  }
}
</script>
<style>
.onlineHelp {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}

.onlineHelp .tools {
  position: absolute;
  top: 10px;
  /*right: 10px;*/
  z-index: 999;
}

.onlineHelp .tools .page {
  display: inline-block;
  margin-right: 10px;
}

.onlineHelp .pdf-box {
  height: 100%;
  overflow: auto;
  width: 90%;
  margin-top: 30px;
}

.input_video {
  width: 1100px;
  /*height: 750px;*/
  margin: 0 auto;
}

/*播放按钮设置成宽高一致，圆形，居中*/
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  margin-left: -1em !important;
  width: 2em !important;
  outline: none;
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

/*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time {
  order: 3 !important;
}

/*进度条背景轨道*/
.video-js .vjs-slider {
  border-radius: 1em;
}

/*进度条进度*/
.vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level {
  border-radius: 1em;
}

/*鼠标进入播放器后，播放按钮颜色会变*/
.video-js:hover .vjs-big-play-button, .vjs-custom-skin > .video-js .vjs-big-play-button:active, .vjs-custom-skin > .video-js .vjs-big-play-button:focus {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

/*control bar*/
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

/*点击按钮时不显示蓝色边框*/
.video-js .vjs-control-bar button {
  outline: none;
}
</style>
