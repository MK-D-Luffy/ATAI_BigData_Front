<template>
  <div class="bg-fa of">
    <el-container class="container mt20 mb30">
      <el-header class="bg-ff brbs" style="padding: 30px;height:240px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-image
              class="brbs"
              style="width:232px;height:172px"
              :src="course.cover"></el-image>
          </el-col>
          <el-col :span="18">
            <el-row id="course-item">
              <el-col style="font-size: 22px;font-weight: 700" :span="24">{{ course.name }}</el-col>
              <el-col style="color:#a0a6ab;line-height: 20px" :span="24">{{ course.intro }}</el-col>
              <el-col style="color:#606972;line-height: 20px" :span="24">
                {{ course.participants }}人学习
                <el-divider direction="vertical"></el-divider>
                开课时间:{{ course.begin.substr(0, 10) }} - {{ course.end.substr(0, 10) }}
              </el-col>
              <el-col :span="24">
                <el-button v-if="baomingflag===false" @click="attend" type="primary">参加课程</el-button>
                <el-button v-else type="danger" @click="quit">退出课程</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="mt20" style="height: 630px">
        <el-main class="bg-ff brbs">
          <el-tabs class="pl20 fsize14" tab-position="top" style="height: 200px;">
            <el-tab-pane>
              <span slot="label" class="fsize16">课程目录</span>
              <div v-for="(aClass,index) in courseClass" :key="aClass.id" class="pt20 pb20"
                   style="border-bottom: 1px solid rgb(238, 238, 238);">
                <a @click="view(aClass.id)">
                  <el-row>
                    <el-col :span="3" v-if="baomingflag===true">
                      <el-button v-if="userCourse.learned.substr(index,1)==='1'" size="mini" type="success" plain>已学习
                      </el-button>
                      <el-button v-else size="mini" type="info" plain>未学习</el-button>
                    </el-col>
                    <el-col :span="18">
                      {{ aClass.name }}
                      <el-button v-if="baomingflag===true" size="mini" plain type="primary" style="margin-left: 10px">
                        视频
                      </el-button>
                      <el-button v-if="baomingflag===true" size="mini" plain
                                 style="color:rgb(181, 120, 252);background-color: rgb(241, 234, 251);border:1px solid rgb(241, 234, 251)">
                        文档
                      </el-button>
                    </el-col>
                    <el-col :span="3" v-if="baomingflag===true">
                      <el-link v-if="userCourse.learned.substr(index,1)==='1'" type="primary" :underline="false">继续学习
                      </el-link>
                      <el-link v-else type="primary" :underline="false" @click="start(index)">开始学习</el-link>
                    </el-col>
                  </el-row>
                </a>

              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label" class="fsize16">课程介绍</span>
              <div class="mt20">
                <span class="course-header">课程描述</span>
                <div class="course-info">{{ course.description }}</div>
              </div>
              <div class="mt40">
                <span class="course-header">前置知识</span>
                <div class="course-info">{{ course.blearning }}</div>
              </div>
              <div class="mt40">
                <span class="course-header">课程目标</span>
                <div class="course-info">{{ course.goals }}</div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label" class="fsize16">课程资源</span>
              <div class="mt20">
                <span class="course-header">资源基本信息</span>
                <div class="course-info">
                  {{ course.resource }}
                </div>
              </div>
              <div class="mt40">
                <span class="course-header">参考资料</span>
                <div class="course-info">
                  {{ course.references }}
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside class="bg-ff ml20 brbs" width="280px">
          <div style="padding: 20px;">
            <span class="fsize20" style="font-weight: 600">相关课程</span>
            <div>
              <el-image
                class="brbs"
                style="width:232px;height:172px;margin: 10px 0"
                src="https://jiutian.10086.cn/edu/objects-download/76b106f68cb743d6893871627a30a37f%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C.png"></el-image>
              <div>
                <span class="course-header">李宏毅深度学习进阶</span>
              </div>
              <div>
                xxx人学习
              </div>
            </div>
            <el-divider></el-divider>
            <div>
              <el-image
                class="brbs"
                style="width:232px;height:172px;"
                src="https://jiutian.10086.cn/edu/objects-download/76b106f68cb743d6893871627a30a37f%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C.png"></el-image>
              <div>
                <span class="course-header">李宏毅深度学习进阶</span>
              </div>
              <div>
                xxx人学习
              </div>
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入调用course.js文件
import courseApi from "@/api/course";
//引入调用js-cookie
import cookie from "js-cookie";

export default {
  inject: ['reload'],
  data() {
    return {
      course: {
        begin: '',
        end: '',
        cover: ''
      },
      courseClass: [],
      baomingflag: false,
      userCourse: {
        id: '',
        userId: '',
        courseId: '',
        learned: ''
      },
      dialogVisible: false,
    };
  },
  created() {
    const loginInfo = JSON.parse(cookie.get("ATAI_BigData_ucenter"));
    this.userCourse.userId = loginInfo.id
    this.userCourse.courseId = this.$route.params.id

    this.getCourse(this.userCourse.courseId);
    this.getCourseClass(this.userCourse.courseId)
    //查询用户在这个比赛中的信息
    this.getCourseUser(this.userCourse.userId, this.userCourse.courseId);
  },
  methods: {
    getCourse(courseId) {
      courseApi
        .getCourse(courseId)
        .then(response => {
          this.course = response.data.data.course
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败"
          });
        });
    },
    getCourseClass(courseId) {
      courseApi
        .getCourseClass(courseId)
        .then(response => {
          this.courseClass = response.data.data.courseClassList
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败"
          });
        });
    },
    getCourseUser(userId, courseId) {
      courseApi
        .getCourseUser(userId, courseId)
        .then(response => {
          const userCourse = response.data.data.userCourse
          //请求成功
          if (userCourse != null) {
            this.baomingflag = true;
            this.userCourse.id = userCourse.id
            this.userCourse.learned = userCourse.learned
          }
        })
        .catch(error => {
          //请求失败
          this.$message({
            type: "error",
            message: "请求失败"
          });
        });
    },
    attend() {
      this.userCourse.id = ''
      this.userCourse.learned = ''
      for (let i = 0; i < this.courseClass.length; i++) {
        this.userCourse.learned += '0'
      }
      courseApi.addCourseUser(this.userCourse).then(response => {
        this.baomingflag = true
        this.userCourse.id = response.data.data.userCourse.id
        this.$message({
          type: "success",
          message: "参加课程成功"
        });
      }).catch(error => {
        this.$message({
          type: "error",
          message: "请求失败"
        });
      })
    },
    quit() {
      this.$confirm('是否确认退出?(退出课程会导致学习进度丢失)', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(this.userCourse.id)
        courseApi.deleteCourseUser(this.userCourse.userId, this.userCourse.courseId).then(response => {
          this.baomingflag = false
          this.$message({
            type: "success",
            message: "退出课程成功"
          });
          this.$router.push({path: `/course`});
        }).catch(error => {
          this.$message({
            type: "error",
            message: "请求失败"
          });
        })
      }).catch(() => {
      });

    },
    //判断是否已经截止,已经截止返回true
    start(index) {
      const tmp = this.userCourse.learned
      this.userCourse.learned = tmp.substring(0, index) + '1' + tmp.substring(index + 1);
      courseApi.updateCourseUser(this.userCourse).then(response => {
        console.log((response))
      }).catch(error => {
        this.$message({
          type: "error",
          message: "请求失败"
        });
      })
    },
    view(id) {
      if (id != null) {
        this.$router.push({path: `/course/class/${id}`});
      } else {
        this.reload();
      }
    }
  }
};
</script>
<style scoped>
.brbs {
  border: 2px solid white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}

#course-item .el-col {
  margin-bottom: 18px;
}

.course-header {
  font-weight: 600;
  font-size: 16px;
}

.course-info {
  color: rgba(0, 0, 0, .65)
}
</style>
